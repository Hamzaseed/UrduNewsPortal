import { createContext, useState, useEffect } from "react";
import { newsList } from "../assets/assets";

export const NewsContext = createContext(null);

export const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // in future replace with API fetch
        setNews(newsList);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getNewsByCategory = (category) => {
    if (!category) return news;
    return news.filter((item) => item.category === category);
  };

  const ContextValue = {
    news,
    loading,
    getNewsByCategory,
  };

  return (
    <NewsContext.Provider value={ContextValue}>
      {children}
    </NewsContext.Provider>
  );
};
