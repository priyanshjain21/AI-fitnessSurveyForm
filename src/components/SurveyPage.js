import React, { useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

function SurveyPage() {
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve email passed from HomePage
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showOtherActivity, setShowOtherActivity] = useState(false);


  const handleCheckboxChange = (e, groupName) => {
    const { value, checked } = e.target;

    if (value === "Other") {
      setShowOtherActivity(checked);
    }
    setFormData((prev) => ({
      ...prev,
      [groupName]: {
        ...prev[groupName],
        [value]: checked,
      },
    }));
  };

  const [showFeedbackTimingOther, setShowFeedbackTimingOther] = useState(false);

  const handleFeedbackTimingChange = (e) => {
    const { value } = e.target;
  
    if (value === "Other") {
      setShowFeedbackTimingOther(true);
    } else {
      setShowFeedbackTimingOther(false);
    }
  
    setFormData((prev) => ({ ...prev, Q12: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Email not found. Please restart the survey.');
      return;
    }

    try {
      const responseDocRef = doc(db, 'surveyResponses', email);
      await setDoc(responseDocRef, { email, responses: formData });
      navigate('/thank-you');
    } catch (error) {
      alert('Failed to save response. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>AI Fitness Movement Analysis Survey</h1>
      <form onSubmit={handleSubmit}>
        {/* Q1 */}
        <div className="form-section">
          <label>Q1. Which best describes your fitness level?</label>
          <select name="Q1" onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="Beginner">Beginner (just starting out)</option>
            <option value="Intermediate">Intermediate (regular exercise for 6+ months)</option>
            <option value="Advanced">Advanced (consistent training for 2+ years)</option>
            <option value="Athletic/Professional">Athletic/Professional</option>
          </select>
        </div>

        {/* Q2 */}
        <div className="form-section">
          <label>Q2. What types of physical activities do you regularly engage in? (Select all that apply)</label>
          <div className="checkbox-group">
            <label><input type="checkbox" value="Weight training" onChange={(e) => handleCheckboxChange(e, 'Q2')} /> Weight training</label>
            <label><input type="checkbox" value="Cardio workouts" onChange={(e) => handleCheckboxChange(e, 'Q2')} /> Cardio workouts</label>
            <label><input type="checkbox" value="Yoga" onChange={(e) => handleCheckboxChange(e, 'Q2')} /> Yoga</label>
            <label><input type="checkbox" value="Sports" onChange={(e) => handleCheckboxChange(e, 'Q2')} /> Sports</label>
            <label><input type="checkbox" value="Other" onChange={(e) => handleCheckboxChange(e, 'Q2')} /> Other (please specify)</label>
            {showOtherActivity && <input type="text" name="Q2" onChange={handleInputChange} />}
          </div>
        </div>

        {/* AI Assistance Areas (Q3, Q4, Q5, Q6) */}
        <div className="form-section">
          <label>Rank the following areas where AI assistance would be most beneficial: <br></br><br></br>[Note -: Rank from 1-5,  1 being the Least important, 5 being the Most important]</label>
          {[
    { name: "Q3", text: "Q3. Real-time form correction during exercises" },
    { name: "Q4", text: "Q4. Detailed biomechanical analysis of movements" },
    { name: "Q5", text: "Q5. Injury prevention guidance" },
    { name: "Q6", text: "Q6. Performance optimization recommendations" },
  ].map((question, index) => (
    <div key={index} className="form-section">
      <label>{question.text}</label>
      <select name={question.name} onChange={handleInputChange} required>
        <option value="">Select</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
    </div>
  ))}
</div>
        <div className="form-section">

        <h3> For the area you deemed most important, please describe:</h3>

<div className="form-section">

        <label>Q7. What specific challenges do you face?</label>
        <textarea name="Q7" onChange={handleInputChange} required />
        </div>
        <div className="form-section">

        <label>Q8. What type of feedback would be most helpful?</label>
        <textarea name="Q8" onChange={handleInputChange} required />
        </div>

        <div className="form-section">

        <label>Q9. What exercises or movements are most challenging?</label>
        <textarea name="Q9" onChange={handleInputChange} required />
        </div>

        <div className="form-section">

        <label>Q10. What is the ONE exercise or movement you would most want AI assistance with?</label>
        <input type="text" name="Q10" onChange={handleInputChange} required />
        </div>

        <div className="form-section">

        <label>Q11. Why did you choose this particular exercise/movement?</label>
        <textarea name="Q11" onChange={handleInputChange} required />
        </div> </div>

        <div className="form-section">

        <h3> Practical Application </h3>

        <div className="form-section">

        <label>Q12. When would you prefer to receive AI feedback?</label><br></br>
          <select name="Q12" onChange={handleFeedbackTimingChange} required>
            <option value="">Select</option>
            <option value="Real-time during exercise">Real-time during exercise</option>
            <option value="Post-workout analysis">Post-workout analysis</option>
            <option value="Both">Both</option>
            <option value="Other">Other (please specify)</option>
          </select>
          {showFeedbackTimingOther && <input type="text" name="feedbackTimingOther" onChange={handleInputChange} />}
        </div>

        <div className="form-section">

        <label>Q13. What type of feedback would be most helpful? (Select all that apply)</label><br></br>
        <div className="checkbox-group">
        <label><input type="checkbox" value="Visual demonstrations" onChange={(e) => handleCheckboxChange(e, 'Q13')} /> Weight training</label>
            <label><input type="checkbox" value="Voice instructions" onChange={(e) => handleCheckboxChange(e, 'Q13')} /> Cardio workouts</label>
            <label><input type="checkbox" value="Written corrections" onChange={(e) => handleCheckboxChange(e, 'Q13')} /> Yoga</label>
            <label><input type="checkbox" value="Side-by-side comparison with correct form" onChange={(e) => handleCheckboxChange(e, 'Q13')} /> Sports</label>
            <label><input type="checkbox" value="3D movement analysis" onChange={(e) => handleCheckboxChange(e, 'Q13')} /> Other (please specify)</label>
            {showOtherActivity && <input type="text" name="Q13" onChange={handleInputChange} />}
          </div>

</div></div>
        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}

export default SurveyPage;

