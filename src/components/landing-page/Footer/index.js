import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from './FooterElements';

const toggleHome = () => {
  scroll.scrollToTop();
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to='/login'>How it Works?</FooterLink>
              <FooterLink to='/login'>Testimonials</FooterLink>
              <FooterLink to='/login'>Terms of Service</FooterLink>
              <FooterLink to='/login'>Privacy & Agreement</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLink to='/login'>Contact</FooterLink>
              <FooterLink to='/login'>Support</FooterLink>
              <FooterLink to='/login'>Promotions</FooterLink>
              <FooterLink to='/login'>Sponsorship</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink to='/login'>Instagram</FooterLink>
              <FooterLink to='/login'>Facebook</FooterLink>
              <FooterLink to='/login'>Youtube</FooterLink>
              <FooterLink to='/login'>Twitter</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Programmers</FooterLinkTitle>
              <FooterLink to='/login'>FrontEnd Engineer</FooterLink>
              <FooterLink to='/login'>Emanuelle O. Martin</FooterLink>
              <FooterLink to='/login'>Backend Engineer</FooterLink>
              <FooterLink to='/login'>Dwain B. Magracia</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/' onClick={toggleHome}>FilinGO</SocialLogo>
            <WebsiteRights>
              FilinGO &copy; 2022 All Rights Reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter'
              >
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Youtube'
              >
                <FaYoutube />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
