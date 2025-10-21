import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "../../Context/NewsContext";
import "./Card.css";
import {
  FaClock,
  FaCommentAlt,
  FaRegEye,
  FaStar,
  FaApple,
  FaHeartbeat,
  FaCamera,
  FaBookOpen,
  FaMicrochip,
  FaVideo,
  FaChartPie,
  FaFlagCheckered,
  FaImage,
} from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { IoDiamondOutline } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import { Link } from "react-router-dom";

function Card({ category }) {
  const { getNewsByCategory } = useContext(NewsContext);
  const newsList = getNewsByCategory(category);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate news every 5 seconds
  useEffect(() => {
    if (newsList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsList.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [newsList]);

  const item = newsList[currentIndex];

  const categoryIcons = {
    important: <FaStar  size={24} color="white" />,
    sports: <FaHeartbeat size={24}  color="white" />,
    health: <FaApple size={24} color="white" />,
    politics: <FaFlagCheckered size={24} color="white" />,
    international: <TfiWorld size={24} color="white" />,
    article: <GrArticle size={24} color="white"/>,
    entertainment: <IoDiamondOutline size={24} color="white" />,
    education: <FaBookOpen size={24} color="white" />,
    business: <FaChartPie  size={24} color="white" />,
    technology: <FaMicrochip size={24} color="white"/>,
    pakistan: <FaStar size={24} color="white" />,
    media: <FaCamera size={24} color="white" />,
    videos: <FaVideo size={24} color="white" />,
    photos: <FaImage size={24} color="white" />,
  };

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




  if (!item) return null;

  return (
    <div className="card fade-in">
      {/* Header */}
      <header className="card-header">
        <div className="icon-container">{categoryIcons[category]}</div>
        <div className="category">{categoryLabels[category]}</div>
      </header>

      {/* Image */}
      <div className="card-image">
    <img src={item.img} alt={item.title || category} />
      </div>

      {/* Content */}
      <section className="card-content">
     <Link  to={`/news/${item.id}`} >  <h3>{item.title}</h3> </Link> 
        <p>{item.description}</p>

        <footer className="card-footer">
          <div className="footer-item">
            <FaClock /> <span>{item.date}</span>
          </div>
          <div className="footer-item">
            <FaCommentAlt /> <span>{item.comments}</span>
          </div>
          <div className="footer-item">
            <FaRegEye /> <span>{item.views}</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Card;
