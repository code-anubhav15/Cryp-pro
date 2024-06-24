import React, { useState } from 'react';
import './Login.css';
import Sidebar from '../Sidebar/Sidebar';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert("Login failed: " + responseData.error);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert("Signup failed: " + responseData.error);
    }
  };

  const animationsignIn = () => {
    document.querySelector('.wrapper').classList.add('animate-signIn');
    document.querySelector('.wrapper').classList.remove('animate-signUp');
    document.querySelector('.wrapper').classList.remove('animate-forgotPassword');
  };

  const animationsignUp = () => {
    document.querySelector('.wrapper').classList.add('animate-signUp');
    document.querySelector('.wrapper').classList.remove('animate-signIn');
    document.querySelector('.wrapper').classList.remove('animate-forgotPassword');
  };

  const animationForgotPassword = () => {
    document.querySelector('.wrapper').classList.add('animate-forgotPassword');
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <div className="side"><Sidebar /></div>

        <div className="form-wrapper sign-up">
          <form onSubmit={signup}>
            <h2>Sign Up</h2>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder='Email Address'
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            <button type="submit" className="btn">Sign Up</button>
            <div className="sign-link">
              <p>Already have an account? <a href="#" className="signIn-link" onClick={animationsignUp}>Sign In</a></p>
            </div>
          </form>
        </div>

        <div className="form-wrapper sign-in">
          <form onSubmit={login}>
            <h2>Login</h2>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder='Email Address'
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="forgot-pass">
              <a href="#" onClick={animationForgotPassword}>Forgot Password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <div className="sign-link">
              <p>Don't have an account? <a href="#" className="signUp-link" onClick={animationsignIn}>Sign Up</a></p>
            </div>
          </form>
        </div>

        <div className="form-wrapper forgot-password">
          <form>
            <h2>Forgot Password</h2>
            <p>Try eating Almonds!!</p>
            <div className="input-group">
              <input type="email" required />
              <label>Email</label>
            </div>
            <button type="submit" className="btn">Reset Password</button>
            <div className="sign-link">
              <p>Did it strike!? <a href="#" className="signIn-link" onClick={animationsignIn}>Sign In</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
