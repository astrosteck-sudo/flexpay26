const pool = require("../config/db");

const findOrCreateDiscordUser = async (profile) => {
  const discordId = profile.id;

  const [existingUser] = await pool.query(
    "SELECT * FROM users WHERE discord_id = ?",
    [discordId]
  );

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  const username = profile.username;
  const email = profile.email || null;

  const [result] = await pool.query(
    `
      INSERT INTO users
      (username,email,discord_id,provider)
      VALUES (?,?,?,?)
    `,
    [username, email, discordId, "discord"]
  );

  const [newUser] = await pool.query(
    "SELECT * FROM users WHERE id=?",
    [result.insertId]
  );

  return newUser[0];
};

module.exports = {
  findOrCreateDiscordUser,
};