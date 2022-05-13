import React from "react";
import styled from "styled-components";

const TvShowContainer = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
`;

const MainConcern = styled.h3`
  font-size: 14px;
  color: #111;
  margin-left: 15px;
  font-weight: 500;
`;

const ConcernDesc = styled.span`
  font-size: 12px;
  margin-left: 15px;
  color: #5e5e5e;
`;

const TVShow = (props) => {
  const { reportId, concern, description } = props;

  const goToReport = (id) => {
    window.location = "/forums/" + id;
  };

  return (
    <TvShowContainer onClick={() => goToReport(reportId)}>
      <MainConcern>{concern}</MainConcern>
      <ConcernDesc>{description.substring(0, 60) + "..."}</ConcernDesc>
    </TvShowContainer>
  );
};

export default TVShow;
