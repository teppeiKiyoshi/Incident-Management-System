import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useParams } from "react-router-dom";

import DataComponent from "./data.component";

const PdfComponent = () => {
  const { id } = useParams();
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <a href="#">Print this out!</a>}
        content={() => componentRef.current}
      />
      <DataComponent ref={componentRef} />
    </div>
  );
};

export default PdfComponent;
