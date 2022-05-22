import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// it shall have this import below but github does not accomodate it
// due to a large file size, thus, shall be imported manually on src/videos/video.mp4
// when imported, add a property on VideoBG ---> type='video/mp4'
import Video from "../../../videos/video.mp4";
// import Video from "../../../images/svg-1.svg"; //---> remove after importing video
import { Button } from "../ButtonElement";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const navigate = useNavigate();

  const route_login = () => {
    let path = "/login";
    navigate(path);
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted playsInline src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Incident Management Made Easy</HeroH1>
        <HeroP>
          Sign up for a free account and start managing your incidents now!
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to="/dashboard"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onClick={route_login}
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
