import React from 'react'
import './HeadLines.css'
import { FaEye } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { Link } from 'react-router-dom';

const HeadLines = ({ title, id, img, views, date }) => {
  return (
    <article className="news-container">
      <div className="news-image">
        <img src={img} alt={title} />
      </div>

      <div className="news-content">
        <Link to={`/news/${id}`}>
          <h4 className="news-title">{title}</h4>
        </Link>

        <div className="news-meta">
          <span>
            <time className="news-date" dateTime={date}>
              {date} <CiClock2 />
            </time>
          </span>
          <span className="news-views">
            {views} <FaEye />
          </span>
        </div>
      </div>
    </article>
  )
}

export default HeadLines
