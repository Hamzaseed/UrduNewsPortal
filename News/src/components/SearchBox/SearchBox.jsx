// SearchBox.jsx
import React, { useState } from "react";
import "./SearchBox.css";
import { newsList } from "../../assets/assets";
import { Link } from "react-router-dom";

const dummyNews = [
  { id: 1, title: "پاکستان کی معیشت میں بہتری" },
  { id: 2, title: "سی پیک منصوبے کی تازہ ترین صورتحال" },
  { id: 3, title: "کرکٹ ٹیم کی شاندار کامیابی" },
];

const SearchBox = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    const filtered = newsList.filter((item) =>
      item.title.includes(query)
    );
    setResults(filtered);
    setNotFound(filtered.length === 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <dialog className="modal-overlay" open>
      <article className="modal-content">
        {/* Close Button */}
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close search dialog"
        >
          ✖
        </button>

        <header>
          <h2 className="search-heading">
            اگر آپ کو کسی مخصوص خبر کی تلاش ہے تو یہاں نیچے دئیے گئے فارم کی مدد سے تلاش کریں
          </h2>
        </header>

        <form 
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <label htmlFor="search-input" className="visually-hidden">
            تلاش کیجیے
          </label>
          <input
            id="search-input"
            type="search"
            className="search-input"
            placeholder="جو تلاش کرنا چاہ رہے ہیں یہاں لکھیں..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-describedby="search-instructions"
          />

          <button type="submit" className="search-btn">
            تلاش کریں
          </button>
        </form>

        <section 
          className="results-box"
          aria-live="polite"
          aria-atomic="true"
        >



          
          {results.length > 0 && (
       <ul className="results-list">
              {results.map((item) => (
                <li key={item.id} className="result-item">
                 <Link to={`/news/${item.id}`} onClick={onClose}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}

          {notFound && (
            <p className="not-found" role="alert">
              معاف کیجئے! آپ کی تلاش سے متعلق کوئی خبر نہیں ملی۔
            </p>
          )}
        </section>

        <p id="search-instructions" className="visually-hidden">
          تلاش کے لیے متن درج کریں اور تلاش کریں بٹن دبائیں یا انٹر کی دبائیں
        </p>
      </article>
    </dialog>
  );
};

export default SearchBox;