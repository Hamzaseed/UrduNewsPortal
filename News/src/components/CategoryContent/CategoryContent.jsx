import React, { useState, useContext } from "react";
import { FaEye, FaCommentAlt, FaClock, FaThLarge, FaList } from "react-icons/fa";
import "./CategoryContent.css";
import { Link, useParams } from "react-router-dom";
import { NewsContext } from "../../Context/NewsContext";

const CategoryContent = () => {
  const [viewMode, setViewMode] = useState("grid");
  const { categoryname } = useParams();
  const { getNewsByCategory } = useContext(NewsContext);

  const categoryLabels = {
    important: "اہم خبریں",
    sports: "کھیل",
    health: "صحت",
    politics: "سیاست",
    international: "بین الاقوامی",
    article: "کالمز",
    entertainment: "شوبز",
    education: "تعلیم",
    business: "کاروبار",
    technology: "ٹیکنالوجی",
    pakistan: "پاکستان",
    media: "میڈیا",
    videos: "ویڈیوز",
    photos: "تصاویر اور مناظر",
  };

  const news = getNewsByCategory(categoryname);

  return (
    <main className="container">
      <section className="category-content-wrapper">
        {/* Header */}
        <header className="category-content-header">
          <h2>{categoryLabels[categoryname] || categoryname}</h2>

          <nav className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </nav>

          <p>اس کیٹا گری میں {news.length} خبریں موجود ہیں</p>
        </header>

        {/* News Grid/List */}
        <section
          className={`category-news ${viewMode === "list" ? "list-view" : "grid"}`}
        >
          {news.map((item, index) => {
            let imageSrc = item.img;

            // ✅ If it's a video item, extract YouTube thumbnail
            if (categoryname === "media" || categoryname === "videos" || item.video) {
              const videoUrl = item.video || item.img; // fallback if video field missing
              const videoId =
                videoUrl?.split("v=")[1]?.split("&")[0] ||
                videoUrl?.split("youtu.be/")[1]?.split("?")[0];

              if (videoId) {
                imageSrc = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }

            return (
              <article key={index} className="category-news-card">
                <img
                  src={imageSrc}
                  alt={item.title}
                  className="category-news-image"
                />

                <div className="category-news-body">
                  <Link className="category-news-title" to={`/news/${item.id}`}>
                    <h3>{item.title}</h3>
                  </Link>

                  <div className="category-news-meta">
                    <span>
                      <FaEye /> {item.views} نظارے
                    </span>
                    <span>
                      <FaCommentAlt /> {item.comments} تبصرے
                    </span>
                    <span>
                      <FaClock /> {item.date}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
};

export default CategoryContent;
