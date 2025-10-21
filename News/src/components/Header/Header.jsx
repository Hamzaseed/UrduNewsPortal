import React, { useContext, useState } from "react";
import "./Header.css";
import { Link , NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
  FaSearch,
  FaStar,
  FaCamera,
  FaHeartbeat,
  FaBookOpen,
  FaApple,
  FaFlagCheckered,
  FaFireAlt,
  FaChartPie,
  FaUserCircle
} from "react-icons/fa";
import { IoHomeOutline, IoNewspaperOutline, IoDiamondOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { FaScaleUnbalancedFlip } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronLeft } from "react-icons/fa";
import { assets } from "../../assets/assets";
import SearchBox from "../SearchBox/SearchBox";
import AuthForm from "../AuthForm/AuthForm";
import { MdOutlineCancel } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [OpenSearch , SetOpenSearch] = useState(false)
  const toggleSearch =()=>SetOpenSearch(!OpenSearch);


  const {user, setUser} = useContext(AuthContext);

  const [showAuth, setShowAuth] = useState(false);

  
 
  const handleAuthClick = () => {
    setShowAuth(true);
  };

  const handleClose = () => {
    setShowAuth(false);
  };

  const handleAuthSubmit = (formData, type) => {
    // Mock success login/signup
    console.log(type, formData);
    setUser({ name: formData.name || "صارف" });
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
   
  };

  return (
    <>
    <main  className="container"    >
      <header className="site-header">
        {/* Top Bar */}
        <section className="top-bar">
          <div className="epaper-button">
            <Link to="/testing" >
              <IoNewspaperOutline size={20} color="white" /> E-PAPER
            </Link>
   {OpenSearch && <SearchBox className="search-btn"   onClose={() => SetOpenSearch(false)} />}

          </div>

          <IoNewspaperOutline
            size={25}
            color="white"
            className="mobile-epaper-icon"
          />

          <nav className="social-icons" aria-label="Social links">
            <a ><FaFacebookF size={15} /></a>
            <a ><FaTwitter size={15} /></a>

          <a><FaSearch onClick={toggleSearch} size={15} /></a>  
          {OpenSearch && <SearchBox className="search-btn"   onClose={() => SetOpenSearch(false)} />}
                      <a ><FaYoutube size={15} /></a>
            <a ><FaPinterestP size={15} /></a>
            <a ><FaLinkedinIn size={15} /></a>
            <a ><FaInstagram size={15} /></a>
          </nav>

          <nav className="top-links" aria-label="Top links">
            <NavLink to="/Policies/ContactUs"   >رابطہ</NavLink>
            <NavLink to="/Policies/AboutUs"  >ہمارے بارے میں</NavLink>
            <NavLink to="/Policies/privacy"      >پرائیویسی پالیسی</NavLink>
            <NavLink to="/Policies/copyright"   >کاپی رائٹس</NavLink>
          {user && user.role === "admin" && (
  <NavLink to="/Admin">منتظم</NavLink>
)}
{!user ? (
  <button onClick={handleAuthClick} className="login-btn">
    لاگ ان / سائن اپ
  </button>
) : (
  <FaUserCircle
    className="user-icon"
    size={28}
    title="لاگ آؤٹ"
    onClick={handleLogout}
  />
)}

          </nav>
 {showAuth && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="auth-close" onClick={handleClose}>
            ×
          </button>
          <AuthForm onSubmit={handleClose} />
        </div>
      </div>
    )}

    <img  className="mobile-logo"    src={assets.mobilelogo} alt="" />
          <button
            onClick={toggleSidebar}
            className="menu-bar"
            aria-label="Open menu"
          >
            <GiHamburgerMenu size={30} color="white" />
          
          </button>

          
        </section>

        {/* Middle Banner */}
        <section className="middle-banner">
          <div className="banner-text">
            <img alt="Advertisement banner" />
          </div>
          <div className="logo">
            <img src={assets.logo} alt="Logo" />
          </div>
        </section>

        {/* Main Menu */}
     <nav className="main-menu" aria-label="Main navigation">
  <ul>
    <li><Link to="/category/politics">سیاست <FaScaleUnbalancedFlip /></Link></li>
    <li><Link to="/category/technology">ٹیکنالوجی <FaApple size={15} /></Link></li>
    <li><Link to="/category/education">تعلیم <FaBookOpen size={15} /></Link></li>
    <li><Link to="/category/entertainment">شوبز <IoDiamondOutline /></Link></li>

    {/* --- Dropdown for میڈیا --- */}
    <li className="dropdown">
      <Link to="/category/media">میڈیا <FaCamera size={15} /></Link>
      <ul className="dropdown-menu">
        <li><Link to="/category/photos">تصاویر اور مناظر</Link></li>
        <li><Link to="/category/videos">ویڈیوز</Link></li>
      </ul>
    </li>
    {/* --- End dropdown --- */}

    <li><Link to="/category/health">صحت <FaHeartbeat size={15} /></Link></li>
    <li><Link to="/category/sports">کھیل <FaFlagCheckered size={15} /></Link></li>
    <li><Link to="/category/business">کاروبار <FaChartPie /></Link></li>
    <li><Link to="/category/international">بین الاقوامی <TfiWorld size={15} /></Link></li>
    <li><Link to="/category/pakistan">پاکستان <FaStar /></Link></li>
    <li><Link to="/category/article">کالمز <GrArticle /></Link></li>
    <li><Link to="/category/important">اہم خبریں <FaFireAlt size={15} /></Link></li>
    <li><Link to="/"><IoHomeOutline size={15} /> صفحہ اول</Link></li>
  </ul>
</nav>


      </header>
</main>
      {/* Sidebar (Mobile Menu) */}
      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-label="Mobile menu"
      >
        <div className="sidebar-header">
          <button
            className="close-button"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaChevronLeft size={20} />
            <span> Back</span>
          </button>
        </div>

        <nav aria-label="Sidebar navigation">
          <ul>
            <li><Link to="/category/photos">تصاویر اور مناظر</Link></li>
        <li><Link to="/category/videos">ویڈیوز</Link></li>
            <li><Link  onClick={toggleSidebar}    >ٹیکنالوجی <FaApple size={15} /></Link></li>
            <li><Link to="/category/poliics"  onClick={toggleSidebar}    >سیاست <FaScaleUnbalancedFlip /></Link></li>
            <li><Link onClick={toggleSidebar} to="/category/education" >تعلیم <FaBookOpen size={15} /></Link></li>
            <li><Link onClick={toggleSidebar} to="/category/entertainment" >شوبز <IoDiamondOutline /></Link></li>
            <li><Link onClick={toggleSidebar} to="/category/media">میڈیا <FaCamera size={15} /></Link></li>
            <li><Link   onClick={toggleSidebar} to="/category/health"   >صحت <FaHeartbeat size={15} /></Link></li>
            <li><Link  onClick={toggleSidebar} to="/category/sports"  >کھیل <FaFlagCheckered size={15} /></Link></li>
            <li><Link onClick={toggleSidebar} to="/category/business"  >کاروبار <FaChartPie /></Link></li>
            <li><Link onClick={toggleSidebar} to="/category/international" >بین الاقوامی <TfiWorld size={15} /></Link></li>
            <li><Link to="/category/pakistan"   onClick={toggleSidebar}   >پاکستان <FaStar /></Link></li>
            <li><Link to="/category/article"   onClick={toggleSidebar}    >کالمز <GrArticle /></Link></li>
            <li><Link  onClick={toggleSidebar}  to="/important" >اہم خبریں <FaFireAlt size={15} /></Link></li>
            <li><Link   onClick={toggleSidebar} to="/" >صفحہ اول <IoHomeOutline size={15} /></Link></li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;
