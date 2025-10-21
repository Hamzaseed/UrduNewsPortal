import React, { useEffect, useState } from "react";
import "./Ticker.css";
import { Link } from "react-router-dom";
import { newsList } from "../../assets/assets";

const Ticker = () => {
  const [ticker, setTicker] = useState([]);

  useEffect(() => {
    const filtered = newsList.filter((item) => item.category === "important");
    setTicker(filtered);
  }, []); // no need for [newsList] since it's a static import

  return (
    <main className="container">
      <section className="ticker-container" aria-label="Breaking News Ticker">
        <header className="breaking-head">
          <span id="left-triangle" aria-hidden="true"></span>
          اہم خبریں
        </header>

        <div className="news-ticker">
          {ticker.slice(0, 4).map((item) => (
            <div className="ticker-item" key={item.id}>
              <Link to={`/news/${item.id}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Ticker;
