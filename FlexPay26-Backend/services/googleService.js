const pool = require("../config/db");

const findOrCreateGoogleUser = async (profile) => {
  const googleId = profile.id;
  const username = profile.displayName;
  const email = profile.emails?.[0]?.value || null;

  // Check if user exists by google_id or email
  const [existingUser] = await pool.query(
    "SELECT * FROM users WHERE google_id = ? OR email = ?",
    [googleId, email],
  );

  if (existingUser.length > 0) {
    // If user exists but has no google_id, update it
    if (!existingUser[0].google_id) {
      await pool.query(
        "UPDATE users SET google_id = ?, provider = ? WHERE user_id = ?",
        [googleId, "google", existingUser[0].user_id],
      );

      const [updatedUser] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [existingUser[0].user_id],
      );
      return updatedUser[0];
    }

    // Otherwise just return the existing user
    return existingUser[0];
  }

  // If no user found, create new one
  const [result] = await pool.query(
    `
      INSERT INTO users
      (username,email,google_id,provider)
      VALUES (?,?,?,?)
    `,
    [username, email, googleId, "google"],
  );

  const [newUser] = await pool.query(
    "SELECT * FROM users WHERE user_id = ?",
    [result.insertId],
  );

  return newUser[0];
};

module.exports = {
  findOrCreateGoogleUser,
};
