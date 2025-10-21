import React, { useRef, useState, useEffect, useContext } from "react";
import "./VideoCarousel.css";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { NewsContext } from "../../Context/NewsContext";

import { Link } from "react-router-dom";

export default function VideoCarousel() {
  const carouselRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);


const {news} = useContext(NewsContext);

const {getNewsByCategory} = useContext(NewsContext);


const videos = getNewsByCategory("videos");

  useEffect(() => {
    const container = carouselRef.current;
    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, [scrollPos]);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const cardWidth = window.innerWidth < 600 ? 180 : 250; // mobile smaller width
    const maxScroll = container.scrollWidth - container.clientWidth;

    setScrollPos((prev) => {
      if (direction === "left") {
        return prev + cardWidth > maxScroll ? maxScroll : prev + cardWidth;
      } else {
        return prev - cardWidth < 0 ? 0 : prev - cardWidth;
      }
    });
  };

  return (
    <div className="carousel-container">
   <Link  to="/category/videos" >  <button className="carousel-btn left" >
        <FaChevronLeft />
        <span    >مزید دیکھیں</span>
      </button>
      </Link> 

      <div className="carousel" ref={carouselRef}>
      {videos.map((video) => (
  <Link to={`/news/${video.id}`} key={video.id} className="video-card">
    <img
      src={`https://img.youtube.com/vi/${
        video.img.split("v=")[1]?.split("&")[0] ||
        video.img.split("youtu.be/")[1]?.split("?")[0]
      }/hqdefault.jpg`}
      alt={video.title}
      className="video-thumb"
    />
    <div className="play-icon">
      <img src={assets.play} alt="play" />
    </div>
    <div className="video-views">
      <FaEye /> {video.views} مناظر
    </div>
  </Link>
))}

      </div>

      <div className="carousel-arrows">
        <button className="arrow-btn" onClick={() => scroll("right")}>
          <FaChevronLeft />
        </button>
        <button className="arrow-btn" onClick={() => scroll("left")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
