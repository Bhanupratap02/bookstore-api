import express from "express";
import registers from "./routes/registers.routes.js";
import booksRouter from "./routes/index.routes.js";
import authorsRouter from "./routes/authors.routes.js";
import publishersRouter from "./routes/publishers.routes.js";
import salesRouter from "./routes/sales.routes.js";
// import { notFound, errorHandler } from "./middlewares/error.middleware.js";
const app = express(); // create an instance of express app
const port = process.env.PORT || 3000;
app.use(express.json()); // parse json body
// app.use(express.urlencoded({ extended: true }));
// parse urlencoded body

app.get("/api", (req, res) => {
  res.send("Welcome To Book Store Api");
});
app.use(registers);
app.use(booksRouter);
app.use(authorsRouter);
app.use(publishersRouter);
app.use(salesRouter);

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
