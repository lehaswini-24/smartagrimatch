import React from "react";

const ConsumersTable = ({ consumers }) => {
  return (
    <div>
      <h2>Consumer Demand</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Demand (Metric Tons)</th>
          </tr>
        </thead>
        <tbody>
          {consumers.length > 0 ? (
            consumers.map((consumer, index) => (
              <tr key={index}>
                <td>{consumer.crop ? consumer.crop : "No crop name provided"}</td>
                <td>{consumer.demand}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No consumer demand found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsumersTable;
