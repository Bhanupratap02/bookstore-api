import { connection } from "../db.js";

export const getBooks = async (req, res) => {
  try {
    const query = await connection.query("SELECT * FROM ConsultBook");
    res.status(200).json(query[0]);
  } catch (error) {
    console.log("get Books Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSpecificBooks = async (req, res) => {
  try {
    const query = await connection.query(
      "SELECT * FROM ConsultBook WHERE Title = ? OR Author = ? OR id = ? ",
      [req.params.id, req.params.id, req.params.id]
    );
    res.status(200).json(query[0]);
  } catch (error) {
    console.log("get Specific Books Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const modifyCatalogue = async (req, res) => {
  try {
    const { title, author, publisher, stock, price } = req.body;
    const getAuthor = await connection.query(
      " SELECT id from Author WHERE name = ?",
      [author]
    );
    let authorId = getAuthor[0].length > 0 ? getAuthor[0][0].id : null; // if author is already in the database, get the id
    if (authorId === null) {
      const insertAuthor = await connection.query(
        "INSERT INTO Author (name) VALUES (?)",
        [author]
      );
      authorId = insertAuthor[0].insertId;
    }
    const getPublisher = await connection.query(
      "SELECT id from Publisher WHERE name = ?",
      [publisher]
    );
    let publisherId = getPublisher[0].length > 0 ? getPublisher[0][0].id : null; // if publisher is already in the database, get the id
    if (publisherId === null) {
      const insertPublisher = await connection.query(
        "INSERT INTO Publisher (name) VALUES (?)",
        [publisher]
      );
      publisherId = insertPublisher[0].insertId;
    }
    const getBook = await connection.query(
      "SELECT id,author_id,publisher_id,stock_id FROM Book WHERE title = ? AND author_id = ? AND publisher_id = ?",
      [title, authorId, publisherId]
    );
    let bookId = getBook[0].length > 0 ? getBook[0][0].id : null;
    if (bookId === null) {
      const addStock = await connection.query(
        "INSERT INTO Stock (quantity,price) VALUES (?,?)",
        [stock, price]
      );
      const stockId = addStock[0].insertId;
      const addBook = await connection.query(
        "INSERT INTO Book (title,author_id,publisher_id,stock_id) VALUES (?,?  ,?,?)",
        [title, authorId, publisherId, stockId]
      );
      bookId = addBook[0].insertId;
    } else {
      const existingStockId = getBook[0][0].stock_id;
      await connection.query(
        "UPDATE Stock SET quantity = quantity + ? WHERE id = ?",
        [stock, existingStockId]
      ); // update stock quantity
    }
    return res.status(201).json({ message: "Book Added Succesfully" });
  } catch (error) {
    console.log("modifyCatalogue Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateBooks = async (req, res) => {
  try {
    const { title, author, publisher, stock, price } = req.body;
    const book = await connection.query("SELECT * FROM Book WHERE id = ?", [
      req.params.id,
    ]);
    if (book[0].length === 0) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    let bookId = book[0][0].id;
    let authorId = book[0][0].author_id;
    let publisherId = book[0][0].publisher_id;
    let stockId = book[0][0].stock_id;
    if (title) {
      await connection.query("UPDATE Book SET title = ? WHERE id = ?", [
        title,
        bookId,
      ]);
    }
    if (author) {
      await connection.query("UPDATE Author SET name = ? WHERE id = ?", [
        author,
        authorId,
      ]);
    }
    if (publisher) {
      await connection.query("UPDATE Publisher SET name = ? WHERE id = ?", [
        publisher,
        publisherId,
      ]);
    }
    if (stock) {
      await connection.query("UPDATE Stock SET quantity = ? WHERE id = ?", [
        stock,
        stockId,
      ]);
    }
    if (price) {
      await connection.query("UPDATE Stock SET price = ? WHERE id = ?", [
        price,
        stockId,
      ]);
    }
    // await connection.query(
    //   "UPDATE Stock SET quantity = ? , price = ? WHERE id = ?",
    //   [stock, price, stockId]
    // );
    return res.status(200).json({ message: "Book Updated Succesfully" });
  } catch (error) {
    console.log("updateBooks Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const book = await connection.query("SELECT * FROM Book WHERE id = ?", [
      req.params.id,
    ]);
    if (book[0].length === 0) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    let stockId = book[0][0].stock_id;
    await connection.query("DELETE FROM Book WHERE id = ?", [req.params.id]);
    await connection.query("DELETE FROM Stock WHERE id = ?", [stockId]); //delete stock
    return res.status(200).json({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log("deleteBook Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
