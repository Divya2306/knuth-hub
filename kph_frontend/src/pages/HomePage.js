// src/pages/HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';

const HomePage = () => {
  const [websites, setWebsites] = useState([]);
  const [tools, setTools] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(null);

  const websiteCarouselRef = useRef(null); // Reference for website container
  const toolCarouselRef = useRef(null);    // Reference for tool container

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await fetch('https://knuth-hub.onrender.com/api/websites');
        if (!res.ok) throw new Error("Error fetching websites");
        const data = await res.json();
        setWebsites(data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };
    fetchWebsites();
  }, []);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('https://knuth-hub.onrender.com/api/tools');
        if (!res.ok) throw new Error("Error fetching tools");
        const data = await res.json();
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  const toggleMoreInfo = (index) => {
    setShowMoreInfo(showMoreInfo === index ? null : index);
  };

  // Scroll the container by a fixed amount
  const scroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 50; // Amount of pixels to scroll
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="home-page">
      <section className="title-section">
        <h1 className="main-title">Knuth Programming Hub</h1>
        <p className="subtitle">Unlock the World of Coding</p>
      </section>

      <section className="content-section">
        <h2 className="section-heading">Websites for Practice</h2>
        <div className="scroll-container">
          <button className="scroll-button left" onClick={() => scroll('left', websiteCarouselRef)}>
            <FaChevronLeft />
          </button>
          <div className="card-carousel" ref={websiteCarouselRef}>
            {websites.map((website, index) => (
              <div key={index} className="card">
                <a href={website.link} target="_blank" rel="noopener noreferrer" className="card-title">
                  <img src={website.logo} alt={`${website.name} logo`} className="card-image" />
                  <h3 className="card-name">{website.name}</h3>
                </a>
                <button className="info-button" onClick={() => toggleMoreInfo(index)}>
                  {showMoreInfo === index ? "Hide Info" : "More Info"}
                  <FaInfoCircle className="info-icon" />
                </button>
                {showMoreInfo === index && <p className="card-info">{website.info}</p>}
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right', websiteCarouselRef)}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-heading">Recommended Tools</h2>
        <div className="scroll-container">
          <button className="scroll-button left" onClick={() => scroll('left', toolCarouselRef)}>
            <FaChevronLeft />
          </button>
          <div className="card-carousel" ref={toolCarouselRef}>
            {tools.map((tool, index) => (
              <div key={index} className="card">
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className="card-title">
                  <img src={tool.logo} alt={`${tool.name} logo`} className="card-image" />
                  <h3 className="card-name">{tool.name}</h3>
                </a>
                <button className="info-button" onClick={() => toggleMoreInfo(`tool-${index}`)}>
                  {showMoreInfo === `tool-${index}` ? "Hide Info" : "More Info"}
                  <FaInfoCircle className="info-icon" />
                </button>
                {showMoreInfo === `tool-${index}` && <p className="card-info">{tool.info}</p>}
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right', toolCarouselRef)}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="steps-section">
        <h2 className="section-heading">Instructions for Joining Codeforces Group</h2>
        <ul className="steps-list">
          <li>1. Visit the Codeforces website and create an account.</li>
          <li>2. Mention your college name in your Codeforces profile.</li>
          <li>3. Visit Codeforces Group and send a request as a participant.</li>
          <li>4. Inform someone on the Telegram group with your handle that you have sent a request to join.</li>
          <li>5. Participate in regular challenges and coding sessions!</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
