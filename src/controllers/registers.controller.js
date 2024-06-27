import { connection } from "../db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/generateToken.js";
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await connection.query(
      "SELECT * FROM REGISTER WHERE username = ?",
      [username]
    );
    // console.log("user", user[0].length,user[0]);
    if (user[0].length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(
      JSON.stringify(password),
      user[0][0].password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    // const token = generateToken(user.rows[0].id);
    const token = generateToken({ username });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("sign in error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    // encrypt & save password
    const encryptedPassword = await bcrypt.hash(JSON.stringify(password), 10);
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    } else {
      // const user = await connection.query(
      //     "INSERT INTO REGISTER (username, password) VALUES ($1, $2) RETURNING *", [username, encryptedPassword]
      //     );
      const response = await connection.query(
        "INSERT INTO REGISTER (username,password) VALUES (?,?)",
        [username, encryptedPassword]
      );
      console.log("register response", response);
      return res.json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log("Sign Up error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
