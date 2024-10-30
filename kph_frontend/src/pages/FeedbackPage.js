import React, { useState } from 'react';
import './FeedbackPage.css';

function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', feedback: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Submit form data to the backend
  };

  return (
    <div className="feedback-page">
      <h1>Feedback</h1>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Feedback
          <textarea name="feedback" value={form.feedback} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackPage;
