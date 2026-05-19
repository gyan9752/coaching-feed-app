
"use client";

import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      const res = await fetch("http://localhost:5000/feed");
      const data = await res.json();
      setFeeds(data.feeds || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let isMounted = true;

  const loadFeeds = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/feed");
      const data = await res.json();

      console.log("API RESPONSE:", data); // DEBUG IMPORTANT

      if (isMounted) {
        setFeeds(Array.isArray(data.feeds) ? data.feeds : []);
      }
    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  loadFeeds();

  const handleNewFeed = (feed) => {
    setFeeds((prev) => {
      const exists = prev.some((f) => f._id === feed._id);
      if (exists) return prev;
      return [feed, ...prev];
    });
  };

  socket.on("newFeed", handleNewFeed);

  return () => {
    isMounted = false;
    socket.off("newFeed", handleNewFeed);
  };
}, []);

  const addFeed = async () => {
    if (!title || !message) return;

    await fetch("http://localhost:5000/feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });

    setTitle("");
    setMessage("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Coaching Feed</h1>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write message..."
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={addFeed}>Post Feed</button>
      </div>

      <div className="feedSection">
        {loading ? (
          <p>Loading feeds...</p>
        ) : feeds.length === 0 ? (
          <p>No feeds yet</p>
        ) : (
          feeds.map((feed) => (
            <div className="feedCard" key={feed._id}>
              <div className="feedHeader">{feed.title}</div>
              <div className="feedBody">{feed.message}</div>
              <div className="feedFooter">
                {new Date(feed.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: auto;
          padding: 20px;
          font-family: Arial;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(78, 18, 18, 0.1);
          margin-bottom: 20px;
        }

        h1 {
          margin-bottom: 15px;
        }

        input, textarea {
          width: 100%;
          padding: 10px;
          margin: 8px 8px 0 0;
          border: 1px solid #427d18;
          border-radius: 8px;
          outline: none;
        }

        textarea {
          min-height: 80px;
          resize: none;
        }

        button {
          background: #427d18;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
        }

        button:hover {
          background: #1b9d37;
        }

        .feedSection {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feedCard {
          background: #ffffff7e;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(81, 5, 5, 0.08);
        }

        .feedHeader {
          font-weight: bold;
          font-size: 16px;
        }

        .feedBody {
          margin-top: 5px;
          color: #615151;
        }

        .feedFooter {
          margin-top: 10px;
          font-size: 12px;
          color: #888;
        }
      `}</style>
    </div>
  );
}
