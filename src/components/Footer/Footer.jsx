import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <main className='container' >
    <footer className="footer-container">
      <section className="footer-content">
        {/* Column 1 - English Pages */}
        <section className="footer-section">
          <h3>English Pages</h3>
          <section className="footer-links">
            <ul>
            <li><Link to="/EnPolicies/privacy">Privacy Policy</Link></li>
<li><Link to="/EnPolicies/ContactUs">Contact Us</Link></li>
<li><Link to="/EnPolicies/copyright">Copyrights</Link></li>
<li><Link to="/EnPolicies/AboutUs">About Us - En</Link></li>

            </ul>
          </section>
        </section>

        {/* Column 2 - Urdu Pages Part 1 */}
        <section className="footer-section urdu-section">
          <h3>اُردو صفحات</h3>
          <section className="footer-links">
            <ul>
              <li><Link to='/category/important' >اہم خبریں</Link></li>
              <li><Link to='/category/pakistan'     >پاکستان</Link></li>
              <li><Link to='/category/international'       >بین الاقوامی</Link></li>
              <li><Link to='/category/sports' >کھیل</Link></li>
            </ul>
          </section>
        </section>

        {/* Column 3 - Urdu Pages Part 2 */}
        <section className="footer-section urdu-section">
          <h3>اہم صفحات</h3>
          <section className="footer-links">
            <ul>
              <li><Link to="/Policies/privacy"  >پرائیویسی پالیسی</Link></li>
              <li><Link to="/Policies/ContactUs"   >ہم سے رابطہ کریں</Link></li>
              <li><Link to='/Policies/copyright'  >حقوق نقل و اشاعت</Link></li>
              <li><Link to="/Policies/AboutUs"   >ہمارے بارے میں</Link></li>
            </ul>
          </section>
        </section>

        {/* Column 4 - Urdu Pages Part 3 */}
        <section className="footer-section urdu-section">
          <h3>ہمارا نیٹ ورک</h3>
          <section className="footer-links">
            <ul>
              <li><a href="#">ہمارا یوٹیوب چینل</a></li>
              <li><a href="#">ہمارا فیس بک پیج</a></li>
              <li><a href="#">ہمارا ٹویٹر پروفائل</a></li>
              <li><a href="#">ہمارا ٹکٹ سپورٹ سیکشن</a></li>
            </ul>
          </section>
        </section>

        {/* Footer Bottom - spans all columns */}
        <section className="footer-bottom">
          <p>© {new Date().getFullYear()} Urdu News. All rights reserved.</p>
        </section>
      </section>
    </footer>
    </main>
  );
};

export default Footer;
