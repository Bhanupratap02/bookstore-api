import { connection } from "../db.js";

export const getPublishers = async (req, res) => {
  try {
    const query = await connection.query("SELECT * FROM Publisher");
    return res.status(200).json(query[0]);
  } catch (error) {
    console.log("getPublishers Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSpecificPublisher = async (req, res) => {
  try {
    const query = await connection.query(
      "SELECT * FROM Publisher WHERE name = ? OR id = ?",
      [req.params.id, req.params.id]
    );
    return res.status(200).json(query[0]);
  } catch (error) {
    console.log("getSpecificPublisher Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePublisher = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      await connection.query("UPDATE Publisher SET name = ? WHERE id = ?", [
        name,
        req.params.id,
      ]);
    }
    return res.status(200).json({ message: "Publisher updated" });
  } catch (error) {
    console.log("updatePublisher", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePublisher = async (req, res) => {
  try {
    await connection.query("DELETE FROM Publisher WHERE id = ?", [
      req.params.id,
    ]);
    return res.status(200).json({ message: "Delete Publisher Succesfully" });
  } catch (error) {
    console.log("getAuthors Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
