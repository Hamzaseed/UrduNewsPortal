import React, { useState, useEffect } from 'react';
import './NewsBox.css';
import { Link, useParams } from 'react-router-dom';

const NewsBox = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
const {id} = useParams();

  useEffect(() => {
    if (stories.length === 0) return;

    // Change story every 15 minutes (900000ms)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 900000);

    return () => clearInterval(interval);
  }, [stories]);

  if (stories.length === 0) {
    return <p>No stories available</p>;
  }

  const story = stories[currentIndex];

  return (
  
    <article className="news-box">
      {/* Image */}
      <div className="news-visual">
        <img src={story.img} alt={story.title} />
      </div>

      {/* Title */}
      <header className="news-headline">
     <Link to={`news/${story.id}`}  >  <h2>{story.title}</h2></Link>  
      </header>

      {/* Meta */}
      <footer className="news-details">
        <span className="news-author">{story.author}</span>
        <span className="dot" aria-hidden="true">•</span>
        <time className="news-date">{story.date}</time>
        <span className="dot" aria-hidden="true">•</span>
        <span className="news-comments">{story.comments} تبصرے</span>
        <span className="dot" aria-hidden="true">•</span>
        <span className="news-views">{story.views} مناظر</span>
      </footer>
    </article>
 
  );
};

export default NewsBox;

