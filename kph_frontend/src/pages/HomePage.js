import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [websites, setWebsites] = useState([]);
  const [tools, setTools] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(null);

  // Fetch websites data
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/websites');
        setWebsites(res.data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };
    fetchWebsites();
  }, []);

  // Fetch tools data
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tools');
        setTools(res.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  const toggleMoreInfo = (index) => {
    setShowMoreInfo(showMoreInfo === index ? null : index);
  };

  return (
    <div className="home-page">
      {/* Title Section */}
      <section className="title-section">
        <h1 className="main-title">Knuth Programming Hub</h1>
        <p className="subtitle">Unlock the World of Coding</p>
      </section>

      {/* Websites Section */}
      <section className="content-section">
        <h2>Websites for Practice</h2>
        <div className="card-container">
          {websites.map((website, index) => (
            <div key={index} className="card">
              <a href={website.link} target="_blank" rel="noopener noreferrer" className="card-title">
                <img src={website.image} alt={`${website.name} logo`} className="card-image" />
                <h3>{website.name}</h3>
              </a>
              <button className="info-button" onClick={() => toggleMoreInfo(index)}>
                {showMoreInfo === index ? "Hide Info" : "More Info"}
              </button>
              {showMoreInfo === index && <p className="card-info">{website.info}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="content-section">
        <h2>Recommended Tools</h2>
        <div className="card-container">
          {tools.map((tool, index) => (
            <div key={index} className="card">
              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="card-title">
                <img src={tool.image} alt={`${tool.name} logo`} className="card-image" />
                <h3>{tool.name}</h3>
              </a>
              <button className="info-button" onClick={() => toggleMoreInfo(`tool-${index}`)}>
                {showMoreInfo === `tool-${index}` ? "Hide Info" : "More Info"}
              </button>
              {showMoreInfo === `tool-${index}` && <p className="card-info">{tool.info}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Steps to Join Section */}
      <section className="steps-section">
        <h2>Steps to Join Our Codeforces Group</h2>
        <ul className="steps-list">
          <li>1. Visit the Codeforces website and sign up.</li>
          <li>2. Search for our group: <span>Knuth Programming Hub</span>.</li>
          <li>3. Click on 'Join' and complete any required steps.</li>
          <li>4. Participate in regular challenges and coding sessions!</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
