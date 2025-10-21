import React, { useState, useContext } from "react";
import "./AuthForm.css";
import { AuthContext } from "../../Context/AuthContext";

const AuthForm = ({ onSubmit }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login, signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(formData.name, formData.email, formData.password);
    } else {
      login(formData);
    }

    if (onSubmit) onSubmit(); // ✅ close modal
  };

  return (
    <div className="auth-container">
      <div className="auth-card urdu-font">
        <h2>{isSignup ? "نیا اکاؤنٹ بنائیں" : "خوش آمدید"}</h2>
        <p className="subtitle">
          {isSignup
            ? "شروع کرنے کے لیے سائن اپ کریں"
            : "اپنے اکاؤنٹ میں لاگ ان کریں"}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label>نام</label>
              <input
                type="text"
                name="name"
                placeholder="اپنا نام درج کریں"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>ای میل</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>پاس ورڈ</label>
            <input
              type="password"
              name="password"
              placeholder="اپنا پاس ورڈ درج کریں"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            {isSignup ? "سائن اپ" : "لاگ ان"}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? "کیا پہلے سے اکاؤنٹ موجود ہے؟" : "اکاؤنٹ نہیں ہے؟"}
          <button
            className="toggle-btn"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "لاگ ان کریں" : "سائن اپ کریں"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
