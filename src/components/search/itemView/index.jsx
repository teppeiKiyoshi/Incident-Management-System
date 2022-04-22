import React from 'react'
import styled from 'styled-components';

const TvShowContainer = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
  `;

const Thumbnail = styled.div`
  width: auto;
  height: 100%; 

  img {
    width: auto;
    height: 100%;
  }
`

const ShowName = styled.h3`
  font-size: 14px;
  color: #111;
  margin-left: 15px;
  font-weight: 500;
`

const TVShow = (props) => {
  const { thumbnailSrc, name  } = props;

  return (
    <TvShowContainer >
      <Thumbnail>
        <img src={thumbnailSrc} alt={props.name} />
      </Thumbnail>
      <ShowName className='search-bar-content-item'>{name}</ShowName>
    </TvShowContainer>
  )
}

export default TVShow