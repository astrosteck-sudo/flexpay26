const db = require("../config/db");

const getOrderByReference = async (req, res) => {
  console.log('order Refernce order')
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
      [reference]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    return res.json({
      order: orders[0]
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getOrderByReference
};