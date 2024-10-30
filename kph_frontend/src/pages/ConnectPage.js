import React from 'react';
import './ConnectPage.css';

function ConnectPage() {
  const links = [
    { name: 'Telegram', url: 'https://t.me/yourhub' },
    { name: 'WhatsApp', url: 'https://wa.me/yourhub' },
    { name: 'Discord', url: 'https://discord.gg/yourhub' },
    { name: 'GitHub', url: 'https://github.com/yourhub' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourhub' },
    { name: 'Linktree', url: 'https://linktr.ee/yourhub' },
    { name: 'Codeforces', url: 'https://codeforces.com/group/yourhub' },
    { name: 'Email', url: 'mailto:yourhub@example.com' },
    { name: 'Instagram', url: 'https://instagram.com/yourhub' }
  ];

  return (
    <div className="connect-page">
      <h1>Connect with Us</h1>
      <ul className="connect-list">
        {links.map((link, index) => (
          <li key={index} className="connect-item">
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectPage;
