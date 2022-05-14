import React from "react";

const DataComponent = React.forwardRef((props, ref) => (
  <table ref={ref}>
    <thead>
      <th>Student No.</th>
      <th>Student Name</th>
      <th>Year and Section</th>
      <th>Replies</th>
      <th>Evaluator</th>
      <th>Date</th>
    </thead>
    <tbody>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
      <tr>
        <td>data 1</td>
        <td>data 2</td>
        <td>data 3</td>
      </tr>
    </tbody>
  </table>
));

export default DataComponent;
