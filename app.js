import React, { useState } from "react";
import ProxyDataFetcher from "./components/ProxyDataFetcher";

function App() {
  const [city, setCity] = useState("Surabaya");
  const [query, setQuery] = useState("galaxy");
  const [topic, setTopic] = useState("technology");
  const [user, setUser] = useState("octocat");

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>My Proxy Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="Surabaya">Surabaya</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search query"
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="News topic"
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="GitHub user"
          style={{ marginLeft: "10px" }}
        />
      </div>

      <ProxyDataFetcher city={city} query={query} topic={topic} user={user} />
    </div>
  );
}

export default App;
