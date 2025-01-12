import React from 'react';
import '../styles/index.css';
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <p>
        <a href="https://github.com/elsilv/meowtivate"
          target="_blank"
          rel="noopener noreferrer"
        >
         View on GitHub <FaGithub/>
        </a>
      </p>
      <p>&copy; 2024 Meowtivate. All rights reserved.</p>

    </footer>
  );
};

export default Footer;
