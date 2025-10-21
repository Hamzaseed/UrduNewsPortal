import React, { useState, useEffect , useContext } from "react";
import "./Homepage.css";
import { assets, cardData } from "../../assets/assets";
import HeadLines from "../HeadLines/HeadLines";
import { FaEye } from "react-icons/fa";
import SectionHeader from "../Section/SectionHeader";
import NewsBox from "../NewsBox/NewsBox";
import Card from "../Card/Card";
import SocialButtons from "../SocialButtons/SocialButtons";
import { NewsContext } from "../../Context/NewsContext";
import { Link, useParams } from "react-router-dom";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
  import { Helmet } from "react-helmet-async";

const Homepage = () => {


const categoryName = useParams();







  const newspapers = [
    { img: assets.DailyExpress, date: "Daily Jang – 30 October 2020" },
    { img: assets.DailyExpress_second, date: "Daily Jang – 31 October 2020" },
    { img: assets.DailyExpress_third, date: "Daily Jang – 01 November 2020" },
  ];

  const [current, setCurrent] = useState(0);

 const [cardData, setcardata] = useState([]);

  const { news } = useContext(NewsContext);


 const { getNewsByCategory } = useContext(NewsContext);

  const importantNews = getNewsByCategory("important");
  const internationalNews = getNewsByCategory("international");
  const articles = getNewsByCategory("article");
const business = getNewsByCategory("business");
  const technology = getNewsByCategory("technology");
  const sports = getNewsByCategory("sports");
  const health = getNewsByCategory("health");


  const nextSlide = () => setCurrent((prev) => (prev + 1) % newspapers.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? newspapers.length - 1 : prev - 1));



   const today = new Date();
  const dayNumber = today.getDate(); 
  
   if (!importantNews || importantNews.length < 5) {
    return <p>Loading news...</p>;
  }


  const startIndex = dayNumber % importantNews.length;
  
  // Pick 4 news items, wrapping around if needed
  const smallCards = [
    ...importantNews.slice(startIndex, startIndex + 4),
    ...importantNews.slice(0, Math.max(0, startIndex + 4 - importantNews.length))
  ];

  // Pick the "big card" (e.g., the next one after the small cards)
  const bigCard = importantNews[(startIndex + 4) % importantNews.length];

  return (
    <>
 
   
    <main className="container">
      <section className="news-grid">
        {/* Left side (4 small cards) */}
        <div className="small-grid">
          {smallCards.map((item) => (
            <articles className="news-card" key={item.id}>
          <Link  to={`/news/${item.id}`}  >       <img src={item.img} alt={item.title} />  </Link> 
              <div className="overlay">
                <h2>{item.title}</h2>
                <div className="meta">
                 <span>👁 {item.views} ناظرین</span> 
                  <span>💬 {item.comments} تبصرے</span>
                  <span>📅 {item.date}</span>
                </div>
              </div>
            </articles>
          ))}
        </div>

        {/* Right side (1 large card) */}
        <article className="news-card large">
      <Link  to={`/news/${bigCard.id}`} >   <img src={bigCard.img} alt={bigCard.title} /> </Link> 
          <div className="overlay">
            <h2>{bigCard.title}</h2>
            <div className="meta">
              <span><FaEye /> {bigCard.views} ناظرین</span>
              <span>💬 {bigCard.comments} تبصرے</span>
              <span>📅 {bigCard.date}</span>
            </div>
          </div>
        </article>
      </section>

      {/* Important News */}
      <section className="category-primary">
        <div>
          <SectionHeader title="اہم خبریں" />
          <div className="category-primary-grid">
             <NewsBox stories={importantNews} /> 
            <div className="important-news">
              {importantNews.slice(0,4).map((news, index) => (
                <HeadLines key={index} id={news.id}  title={news.title} img={news.img} views={news.views} date={news.date} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <SectionHeader title="اشتہار" />
        </div>
      </section>

      {/* Columns & International News */}
      <section className="category-secondary">
        <div>
          <SectionHeader  title="کالمز" />
          <div className="articles"   >
          {articles.slice(0,4).map((article, index) => (
            <HeadLines key={index} id={article.id}  title={article.title} img={article.img} views={article.views} date={article.date} />
          ))}
        </div>
    </div>
        <div>
          <SectionHeader title="بین الاقوامی" />
          <div className="international-news">
            {internationalNews.slice(0,8).map((news, index) => (
              <HeadLines key={index} id={news.id} title={news.title} img={news.img} views={news.views} date={news.date} />
            ))}
          </div>
        </div>
      </section>

      <div className="video-container"></div>

      {/* Card Section */}
      <section className="card-container">
 
 
        <Card category="sports" />
       
    
        <Card category="international" />
        <Card category="important" />
    
      </section>
      <VideoCarousel/>
    
    </main>
     </>
  );
};

export default Homepage;
