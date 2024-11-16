// src/components/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function HomePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const emailDocRef = doc(db, 'surveyEmails', email);
      await setDoc(emailDocRef, { email });
      navigate('/survey', { state: { email } });
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error("Firestore error:", err);
    }
  };
  
  return (
    <div className="container">
      <h1>AI Fitness Movement Analysis Survey</h1>
      <h2>A Research Project by MIS Students at Iowa State University</h2>
      <p>Welcome! 👋</p>
      <p>Thank you for participating in our research study on AI applications in fitness and movement analysis. We are a team of Management Information Systems students exploring how artificial intelligence could help people improve their exercise form and movement patterns.</p>
      <div className= "form-section">
        <h3>What This Survey Is About</h3>
        <p>We're investigating how AI could become your personal movement coach - helping with everything from basic exercise form to complex athletic movements. Whether you're a complete beginner or a seasoned athlete, your input is valuable to our research.</p>
        <p><strong>Time Required:</strong> 5-7 minutes</p>
      </div>
      <div className="form-section">
        <h3>Important Guidelines for Completing This Survey:</h3>
        <ul>
          <li>✨ <strong>Trust Your First Instinct:</strong> Answer questions with your immediate thoughts. There are no "right" or "wrong" answers.</li>
          <li>🎯 <strong>Focus on Your Personal Experience:</strong> Share your actual needs and your unique perspective.</li>
          <li>🤔 <strong>No Overthinking Required:</strong> Go with your gut feeling. No technical knowledge about AI or fitness expertise is needed.</li>
          <li>⚡ <strong>Quick Tips for Best Results:</strong> Answer based on your current situation, not future goals. Be honest about your challenges and needs.</li>
        </ul> 
      </div>
      <div className="form-section">
        <h3>Privacy Statement</h3>
        <p>Your responses are completely anonymous and will be used solely for academic research purposes. We are not collecting any personally identifiable information.</p>
      </div>
      <p>If you have questions while completing the survey, please contact: <strong>anwar07@iastate.edu</strong></p>

      <form onSubmit={handleSubmit} className="form-section">
        <label>Email Address (required):</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Let's Begin!</button>
      </form>
    </div>
  );
}

export default HomePage;
