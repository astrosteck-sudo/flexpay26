const axios = require("axios");
const db = require("../config/db");
const crypto = require("crypto");

const initializePayment = async (req, res) => {
  try {
    const { player_id, package_id } = req.body;
    if (!player_id || !package_id) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    if (player_id.length > 11 || player_id.length < 9) {
      return res.status(400).json({
        message: "Input valid player ID",
      });
    }

    const userId = req.user.user_id;

    // Get user email

    const [users] = await db.query("SELECT email FROM users WHERE user_id=?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const email = users[0].email;

    // Get package

    const [packages] = await db.query(
      `
      SELECT *
      FROM diamond_packages
      WHERE package_id=?
      `,
      [package_id],
    );

    if (packages.length === 0) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    const pkg = packages[0];

    // Paystack initialization

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,

        amount: Number(pkg.price) * 100,

        // callback_url: `${process.env.FRONTEND_URL}/payment/success`,http://localUser not found:5000
        callback_url: `https://flexpay26.vercel.app/payment/success`,

        metadata: {
          user_id: userId,
          player_id,
          package_id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    return res.status(200).json({
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Payment initialization failed",
    });
  }
};

const paystackWebhook = async (req, res) => {
  try {
    // Verify Paystack signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest("hex");

    const signature = req.headers["x-paystack-signature"];

    if (hash !== signature) {
      return res.status(401).json({
        message: "Invalid signature",
      });
    }

    // Parse Paystack event
    const event = JSON.parse(req.body.toString());

    // Only process successful payments
    if (event.event !== "charge.success") {
      return res.sendStatus(200);
    }

    const paymentData = event.data;

    const reference = paymentData.reference;

    // Check if already processed
    const [processed] = await db.query(
      `
        SELECT *
        FROM processed_payments
        WHERE reference = ?
        `,
      [reference],
    );

    if (processed.length > 0) {
      return res.sendStatus(200);
    }

    // Extract metadata
    const { user_id, player_id, package_id } = paymentData.metadata;

    // Verify package exists
    const [packages] = await db.query(
      `
        SELECT *
        FROM diamond_packages
        WHERE package_id = ?
        `,
      [package_id],
    );

    if (packages.length === 0) {
      return res.status(400).json({
        message: "Package not found",
      });
    }

    const pkg = packages[0];

    // Verify amount paid
    const paidAmount = paymentData.amount / 100;

    if (Number(paidAmount) !== Number(pkg.price)) {
      return res.status(400).json({
        message: "Amount mismatch",
      });
    }

    // Create order
    await db.query(
      `
      INSERT INTO orders (
        user_id,
        player_id,
        diamond_amount,
        amount_paid,
        paystack_reference,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user_id, player_id, pkg.diamond_amount, pkg.price, reference, "paid"],
    );

    // Update user statistics
    await db.query(
      `
      UPDATE users
      SET
        total_spent = total_spent + ?,
        total_diamonds = total_diamonds + ?,
        total_orders = total_orders + 1
      WHERE user_id = ?
      `,
      [pkg.price, pkg.diamond_amount, user_id],
    );

    // Save processed payment reference
    await db.query(
      `
      INSERT INTO processed_payments
      (reference)
      VALUES (?)
      `,
      [reference],
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.sendStatus(500);
  }
};

module.exports = {
  initializePayment,
  paystackWebhook,
};
