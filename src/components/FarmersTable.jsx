import React from "react";

const FarmersTable = ({ farmers }) => {
  return (
    <div>
      <h2>Farmers Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Farmer Name</th>
            <th>Land Holding (ha)</th>
            <th>Soil Type</th>
            <th>Past Expertise</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length > 0 ? (
            farmers.map((farmer, index) => (
              <tr key={index}>
                <td>{farmer.name}</td>
                <td>{farmer.landHolding}</td>
                <td>{farmer.soilType}</td>
                <td>{farmer.pastExpertise}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No farmers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmersTable;
