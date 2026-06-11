const { pool } = require("../config/db");

exports.createOrder = async (req, res) => {
  try {
    const { player_id, diamond_amount } = req.body;

    if (!player_id || !diamond_amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const userId = req.user.user_id;

    const result = await pool(
      `
      INSERT INTO orders
      (
        user_id,
        player_id,
        diamond_amount
      )
      VALUES (?, ?, ?)
      `,
      [
        userId,
        player_id,
        diamond_amount
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Order created",
      order_id: result.insertId,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.getDashboardStats = async (req, res) => {
  try {

    const userId = req.user.user_id;

    const stats = await pool(
      `
      SELECT
        total_spent,
        total_diamonds,
        total_orders
      FROM users
      WHERE user_id = ?
      `,
      [userId]
    );

    return res.json({
      success: true,
      stats: stats[0],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};

exports.getMyOrders = async (req, res) => {
  try {

    const userId = req.user.user_id;

    const orders = await queryDB(
      `
      SELECT *
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};