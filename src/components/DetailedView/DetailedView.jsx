import React, { useContext, useEffect, useState } from "react";
import "./DetailedView.css";
import { assets, internationalNews } from "../../assets/assets";
import { FaCommentAlt, FaClock } from "react-icons/fa";
import { FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from "react-icons/fa6";
import SocialButtons from "../SocialButtons/SocialButtons";
import SectionHeader from "../Section/SectionHeader";
import { NewsContext } from "../../Context/NewsContext";
import { Link, useParams } from "react-router-dom";
import { newsList } from "../../assets/assets";

const DetailedView = () => {
  const { id } = useParams(); 
  const { news } = useContext(NewsContext);

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Move ALL states before any return
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({
    angry: 0,
    neutral: 0,
    ok: 0,
    good: 0,
    love: 0,
  });

  useEffect(() => {
    const fetchNewsDetails = () => {
      let source = news.length > 0 ? news : newsList;
  const found = source.find((n) => String(n.id) === String(id));
  setStory(found || null);
  setLoading(false);
    };
    fetchNewsDetails();
  }, [id, news]);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (!story) {
    return <p>خبر نہیں ملی 😢</p>;
  }

  const increaseSize = () => setFontSize((prev) => Math.min(prev + 2, 32));
  const decreaseSize = () => setFontSize((prev) => Math.max(prev - 1, 12));

  const reactionsData = [
    { type: "angry", label: "خفتہ بایند", img: assets.reaction1 },
    { type: "neutral", label: "بہتر ہو سکتی تھی", img: assets.reaction2 },
    { type: "ok", label: "ٹھیک ہے", img: assets.reaction3 },
    { type: "good", label: "اچھا ہے", img: assets.reaction4 },
    { type: "love", label: "بہت اچھا ہے", img: assets.reaction5 },
  ];

  const handleReactionClick = (type) => {
    setSelectedReaction(type);
    setReactionCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Comment Submitted:", { name, email, comment, subscribe });
    // Reset form
    setComment("");
    setName("");
    setEmail("");
    setSubscribe(false);
  };

  return (
    <main className="dv-container" role="main">
      <div className="dv-right">
        <article className="dv-video-section" itemScope itemType="https://schema.org/NewsArticle">
          <header className="dv-header">
            <h1 className="dv-title" itemProp="headline">
              {story.title}
            </h1>
          </header>

          {/* Social Sharing */}
          <aside className="socialicons-container" aria-label="Share this article">
            <SocialButtons  url={window.location.href} text={story.title} />
          </aside>

        <figure className="dv-image-container">
  {story.img?.includes("youtube.com") || story.img?.includes("youtu.be") ? (
    // YouTube video embed
    <iframe
      width="100%"
      height="400"
      src={
        story.img.includes("watch?v=")
          ? story.img.replace("watch?v=", "embed/")
          : story.img.replace("youtu.be/", "www.youtube.com/embed/")
      }
      title={story.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : story.img?.endsWith(".mp4") ? (
    // Local or hosted video
    <video controls itemProp="video" width="100%">
      <source src={story.img} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    // Default: image
    <img src={story.img} alt={story.title} itemProp="image" />
  )}
</figure>


          <div className="extended">
            <nav className="font-controls" aria-label="Font size controls">
              <button onClick={increaseSize} aria-label="Increase font size" className="font-control-btn">
                <FaMagnifyingGlassPlus color="gray" size={20} />
              </button>
              <button onClick={decreaseSize} aria-label="Decrease font size" className="font-control-btn">
                <FaMagnifyingGlassMinus color="gray" size={20} />
              </button>
            </nav>
            <div className="details">
              <span itemProp="datePublished">
                <FaClock /> {story.date}
              </span>
              <span itemProp="commentCount">
                <FaCommentAlt /> {story.comments}
              </span>
            </div>
          </div>

          <div className="detailed-description-wrapper">
            <div
              className="detailed-description"
              style={{ fontSize: `${fontSize}px` }}
              itemProp="articleBody"
            >
              <p>{story.description || "تفصیل دستیاب نہیں ہے۔"}</p>
            </div>
          </div>
        </article>

        {/* Reactions */}
        <section className="reactions-section" aria-labelledby="reactions-heading">
          <h3 id="reactions-heading" className="reaction-title">
            اس خبر پر اپنی رائے کا اظہار کریں
          </h3>
          <div className="reactions" role="group" aria-labelledby="reactions-heading">
            {reactionsData.map((reaction) => (
              <button
                key={reaction.type}
                className={`reaction-btn ${reaction.type} ${selectedReaction === reaction.type ? "active" : ""}`}
                onClick={() => handleReactionClick(reaction.type)}
                aria-pressed={selectedReaction === reaction.type}
                aria-label={`${reaction.label} - ${reactionCounts[reaction.type]} votes`}
              >
                <img src={reaction.img} alt={reaction.label} className="reaction-img" />
                <span className="label">{reaction.label}</span>
                <span className="count">{reactionCounts[reaction.type]} Votes</span>
              </button>
            ))}
          </div>
        </section>

        {/* Read more */}
        <aside className="read-more-section" aria-labelledby="read-more-heading">
          <h3 id="read-more-heading">مزید پڑھیں</h3>
          <div className="view-furthur">
            {(news.list > 0 ? news : newsList) .filter((item)=> item.category === story .category && item.id !== story.id).slice(0.6).map((item, index)=>(
          <Link to={`/news/${item.id}`}  >    <article key={index} className="dv-news-card"> 
                <img src={item.img} alt={item.title} />
                <h4>{item.title}</h4>
              </article> 
              </Link> 
            ))}
             
           
          </div>
        </aside>

        {/* Comment Form */}
        <section className="comments-container" aria-labelledby="comments-heading">
          <header className="comments-header">
            <p className="assurance">آپکا ای میل ایڈریس شائع نہیں کیا جائے گا*</p>
            <h3 id="comments-heading" className="comments-title">تبصرہ لکھیں</h3>
          </header>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="commenter-name" className="form-label">نام:</label>
                <input
                  id="commenter-name"
                  type="text"
                  className="form-input"
                  placeholder="آپ کا نام"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="commenter-email" className="form-label">ای میل:</label>
                <input
                  id="commenter-email"
                  type="email"
                  className="form-input"
                  placeholder="آپ کا ای میل"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment-text" className="form-label">تبصرہ:</label>
              <textarea
                id="comment-text"
                className="comment-textarea"
                placeholder="اپنا تبصرہ یہاں لکھیں..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                required
              />
            </div>

            <div className="subscription-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                />
                <span className="checkmark"></span>
                میں ای میل نیوزلیٹر سبسکرائب کرنا چاہتا ہوں
              </label>
            </div>

            <button type="submit" className="submit-button">تبصرہ جمع کروائیں</button>
          </form>
        </section>
      </div>

     
      <aside className="dv-left" aria-label="Related news and popular content">
      
       
        <section>
          <SectionHeader />
        </section>
      </aside>
    </main>
  );
};

export default DetailedView;
