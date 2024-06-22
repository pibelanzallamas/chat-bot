"use client";

import { useRef, useState, useEffect } from "react";
import NLPCloudClient from "nlpcloud";
import "./page.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([
    "hola, que tal?",
    "bien bien, que tranzas?",
  ]);
  const [jojo, setJojo] = useState(["bien, y tu?", "nada ahi, agitandole"]);

  const client = new NLPCloudClient({
    model: "dolphin-yi-34b",
    token: "",
    gpu: true,
  });

  const context =
    "This is a discussion between a human and an AI. The human is happy but curious and the AI is empathetic and helpful. The AI is called Jojo.";
  const history = [];
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [user, jojo]);

  function handleSubmit(e) {
    e.preventDefault();
    setUser([...user, query]);

    client
      .chatbot({
        input: query,
        context: context,
        history: history,
      })
      .then(function (response) {
        history.push({
          input: query,
          response: response.data.response,
        });
        setJojo([...jojo, response.data.response]);
      })
      .catch(function (err) {
        console.error(err.response.status);
        console.error(err.response.data.detail);
      });
    setQuery("");
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await axios.post("http://localhost:5000/api/nlpcloud", {
  //       input: query,
  //       context,
  //       history,
  //     });
  //     setResponse(result.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

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
