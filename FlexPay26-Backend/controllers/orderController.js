const db = require("../config/db");

const getOrderByReference = async (req, res) => {
  console.log("order Refernce order");
  try {
    const { reference } = req.params;

    const [orders] = await db.query(
      `
      SELECT 
        o.order_id,
        o.player_id,
        o.diamond_amount,
        o.amount_paid,
        o.status,
        o.created_at,
        d.diamond_amount AS package_name
      FROM orders o
      JOIN diamond_packages d
        ON o.diamond_amount = d.diamond_amount
      WHERE o.paystack_reference = ?
      `,
      [reference],
    );

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.json({
      order: orders[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // User stats

    const [users] = await db.query(
      `
      SELECT
        total_spent,
        total_diamonds,
        total_orders
      FROM users
      WHERE user_id = ?
      `,
      [userId],
    );

    // User orders

    const [orders] = await db.query(
      `
      SELECT
        order_id,
        player_id,
        diamond_amount,
        amount_paid,
        status,
        created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId],
    );

    return res.json({
      stats: users[0],
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getOrders = async (req, res) => {
  try {

    const [orders] = await db.query(
      `
      SELECT
        order_id,
        player_id,
        diamond_amount,
        amount_paid,
        status,
        created_at
      FROM orders
      WHERE status IN
      ('paid','processing')
      ORDER BY created_at ASC
      `
    );

    res.json({
      orders
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};


module.exports = {
  getOrderByReference,
  getDashboard,
  getOrders
};
