"use client";

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "./page.css";

export default function Home() {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([
    "hola, que tal?",
    "bien bien, que tranzas?",
  ]);
  const [jojo, setJojo] = useState(["bien, y tu?", "nada ahi, agitandole"]);
  const context =
    "This is a discussion between a human and an AI. The human is happy but curious and the AI is empathetic and helpful. The AI is called Jojo.";
  const [history, setHistory] = useState([
    { input: "hola, que tal?", response: "bien, y tu?" },
    { input: "bien bien, que tranzas?", response: "nada ahi, agitandole" },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setUser([...user, query]);

    axios
      .post("http://localhost:5000/api/nlpcloud", {
        context,
        history,
        input: query,
      })
      .then((resp) => {
        const response = resp.data;

        setHistory(response.history);
        setJojo((elemento) => [...elemento, response.response]);
      })
      .catch((err) => {
        console.log(err);
      });

    setQuery("");
  }

  //para seguir la conver con el scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [user, jojo]);

  return (
    <main>
      <h1>Future Bot</h1>
      <p>Welcome to Future Bot, the bot that tells your about the future.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Ask to bot:</label>
        <input
          name="input"
          id="input"
          placeholder="Write a question"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </form>
      <div className="container" ref={containerRef}>
        <div className="party">
          {user && user.map((u, index) => <p key={index}>User: {u}</p>)}
        </div>
        <div className="party">
          {jojo && jojo.map((j, index) => <p key={index}>Jojo: {j}</p>)}
        </div>
      </div>
    </main>
  );
}
