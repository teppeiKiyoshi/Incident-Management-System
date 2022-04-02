import React from 'react'
import Icon1 from '../../../images/svg-1.svg';
import Icon2 from '../../../images/svg-2.svg';
import Icon3 from '../../../images/svg-3.svg';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServiceElements'

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Lessen Your Worries</ServicesH2>
          <ServicesP>We help you sleep at night and reduce your stress while increasing overall effectivity.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Easy Access</ServicesH2>
          <ServicesP>You can access of all of what we offer with ease throughout the world.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Premium Benefits</ServicesH2>
          <ServicesP>Unlock your true potential with a gold card that saves you time up to 50%!</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services