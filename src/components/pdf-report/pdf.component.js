import React from "react";
import ReactToPrint from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
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
  const [logoState, setLogoState] = useState();

  const getLogo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/get-logo"
      );

      setLogoState(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLogo();
  }, []);

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
          logo={logoState}
          ref={componentRef}
        />
      </div>
    </div>
  );
};

export default PdfComponent;
