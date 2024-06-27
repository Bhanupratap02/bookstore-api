import { connection } from "../db.js";

export const getBooksSold = async (req, res) => {
  try {
    const result = await connection.query("SELECT * FROM Sale");
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log("getBooksSold Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sellBook = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const book = await connection.query("SELECT * FROM Book WHERE id = ?", [
      req.params.id,
    ]);
    if (book[0].length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    let stockId = book[0][0].stock_id;
    const stock = await connection.query("SELECT * FROM Stock WHERE id = ?", [
      stockId,
    ]);
    let price = stock[0][0].price;
    await connection.query(
      "UPDATE Stock SET quantity = quantity - ? WHERE id = ?",
      [amount, stockId]
    );
    await connection.query(
      "INSERT INTO Sale (quantity_sold,total_profit,id_book) VALUES (?,?,?)",
      [amount, price * amount, req.params.id]
    );
    return res.status(200).json({ message: "Book Sold Successfully" });
  } catch (error) {
    console.log("sellBook Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
