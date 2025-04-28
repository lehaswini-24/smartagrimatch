import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AllocationProcessor from "./components/AllocationProcessor";

function ProcessAllocation() {
  const [farmers, setFarmers] = useState([]);
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      const querySnapshot = await getDocs(collection(db, "farmers"));
      const farmerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFarmers(farmerList);
    };

    const fetchConsumers = async () => {
      const querySnapshot = await getDocs(collection(db, "consumers"));
      const consumerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConsumers(consumerList);
    };

    fetchFarmers();
    fetchConsumers();
  }, []);

  return (
    <div>
      <h1>Process Allocation</h1>
      <h2>Farmers Details</h2>
      <table border="1">
        <thead>
          <tr><th>Farmer Name</th><th>Land Holding (ha)</th><th>Soil Type</th><th>Past Expertise</th></tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td>{farmer.name}</td>
              <td>{farmer.landHolding}</td>
              <td>{farmer.soilType}</td>
              <td>{farmer.pastExpertise}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Consumer Demand</h2>
      <table border="1">
        <thead>
          <tr><th>Crop</th><th>Demand (Metric Tons)</th></tr>
        </thead>
        <tbody>
          {consumers.map((consumer) => (
            <tr key={consumer.id}>
              <td>{consumer.crop}</td>
              <td>{consumer.demand}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AllocationProcessor farmers={farmers} consumers={consumers} />
    </div>
  );
}

export default ProcessAllocation;
