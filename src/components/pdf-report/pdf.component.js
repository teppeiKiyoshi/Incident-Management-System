import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import DataComponent from "./data.component";

const PdfComponent = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const location = useLocation();
  const reports = location.state == null ? false : location.state.reports;
  console.log(reports);

  return (
    <div className="container d-flex flex-column p-5">
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-danger btn-block w-25 mb-4">Print</button>
        )}
        content={() => componentRef.current}
      />
      <DataComponent ref={componentRef} reports={reports} />
    </div>
  );
};

export default PdfComponent;
