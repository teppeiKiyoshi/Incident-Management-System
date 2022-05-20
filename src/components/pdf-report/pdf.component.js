import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./table.scss";

import DataComponent from "./data.component";

const PdfComponent = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const location = useLocation();
  const reports = location.state == null ? false : location.state.reports;
  const filter = location.state == null ? false : location.state.filter;
  const fullname = location.state == null ? false : location.state.by;
  var today = new Date();
  var date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  return (
    <div className="container">
      <div className="container-content">
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current}
        />
        <DataComponent
          reports={reports}
          fullname={fullname}
          filter={filter}
          date={date}
          ref={componentRef}
        />
      </div>
    </div>
  );
};

export default PdfComponent;
