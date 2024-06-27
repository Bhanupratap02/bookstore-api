import { connection } from "../db.js";

export const getAuthors = async (req, res) => {
  try {
    const query = await connection.query("SELECT * FROM Author");
    return res.status(200).json(query[0]);
  } catch (error) {
    console.log("getAuthors Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSpecificAuthor = async (req, res) => {
  try {
    const query = await connection.query(
      "SELECT * FROM Author WHERE name = ? OR id = ?",
      [req.params.id, req.params.id]
    );
    return res.status(200).json(query[0]);
  } catch (error) {
    console.log("getSpecificAuthors Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      await connection.query("UPDATE Author SET name = ? WHERE id = ?", [
        name,
        req.params.id,
      ]);
    }

    return res.status(200).json({ message: "Author updated" });
  } catch (error) {
    console.log("updateAuthor Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    await connection.query("DELETE FROM Author WHERE id = ?", [req.params.id]); //delete from Author where id = req.params.id
    return res.status(200).json({ message: "Author DELETE" });
  } catch (error) {
    console.log("deleteAuthor Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
