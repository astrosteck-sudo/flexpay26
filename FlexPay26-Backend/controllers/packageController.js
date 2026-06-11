const db = require("../config/db");

const getPackages = async (req, res) => {
  try {

    const [packages] = await db.query(
      `
      SELECT *
      FROM diamond_packages
      WHERE active = TRUE
      ORDER BY diamond_amount ASC
      `
    );

    return res.json({
      packages
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });

  }
};

module.exports = {
  getPackages
};