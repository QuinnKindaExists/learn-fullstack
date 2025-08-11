import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/books").then(res => setBooks(res.data));
  }, []);

  const addBook = () => {
    axios.post("http://localhost:5000/books", form).then(res => {
      setBooks([...books, res.data]);
      setForm({ title: "", author: "" });
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 BookSwap</h1>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Author"
        value={form.author}
        onChange={e => setForm({ ...form, author: e.target.value })}
      />
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} — {b.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
