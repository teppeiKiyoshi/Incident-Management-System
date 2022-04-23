import React from 'react';
import './footer.scss';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaGooglePlusG,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaLocationArrow
} from 'react-icons/fa';

const FooterMain = () => {
  return (
    <>
      <footer className='main-footer'>
        <div className='footer-container'>
          <div className='section about-us'>
            <h2 className='header-title'>About Us</h2>
            <p className='footer-pText'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio eius modi porro ipsa vero debitis aliquid voluptatibus
              necessitatibus deserunt, ullam quod totam maxime. Iure, id
              molestias! Nemo laudantium aspernatur nam facere atque voluptatem
              commodi expedita ea cumque, officia provident molestias?
            </p>
            <ul class='footer-social'>
              <li>
                <a>
                  <FaFacebookSquare className='fa-brands' />
                </a>
              </li>
              <li>
                <a>
                  <FaTwitterSquare className='fa-brands' />
                </a>
              </li>
              <li>
                <a>
                  <FaInstagram className='fa-brands' />
                </a>
              </li>
              <li>
                <a>
                  <FaGooglePlusG className='fa-brands' />
                </a>
              </li>
              <li>
                <a>
                  <FaLinkedin className='fa-brands' />
                </a>
              </li>
            </ul>
          </div>
          <div className='section quick-links'>
            <h2 className='header-title'>Quick Links</h2>
            <ul>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Partners</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <a>News & Events</a>
              </li>
              <li>
                <a>Institutional Achievements</a>
              </li>
              <li>
                <a>Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div class='section contact-info'>
            <h2 className='header-title'>Contact Info</h2>
            <ul className='cont-info'>
              <li>
                <span>
                  <FaLocationArrow className='fa-brands' />
                </span>
                <span>
                  4th Floor Pimentel Building,
                  <br />
                  825 EDSA Quezon City,
                  <br />
                  Philippines 3000
                </span>
              </li>
              <li>
                <span>
                  <FaPhoneAlt className='fa-brands' />
                </span>
                <p>
                  <a>+63 912 345 6789</a>
                  <br />
                  <a>+63.2.426.3140</a>
                </p>
              </li>
              <li>
                <span>
                  <FaEnvelope className='fa-brands' />
                </span>
                <p>
                  <a>info@bayanacademy.edu.ph</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div class='copyright-txt'>
        <p>
          Copyright &copy; 2022 Filingo. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default FooterMain;
