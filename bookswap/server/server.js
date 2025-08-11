import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all books
app.get("/books", async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

// Add a book
app.post("/books", async (req, res) => {
  const { title, author } = req.body;
  const book = await prisma.book.create({ data: { title, author } });
  res.json(book);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));