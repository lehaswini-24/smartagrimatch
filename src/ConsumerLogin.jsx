import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Firebase config import
import { collection, addDoc } from "firebase/firestore";

function ConsumerLogin() {
  const [crop, setCrop] = useState("");
  const [demand, setDemand] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "consumers"), { crop, demand: parseFloat(demand) });
      alert("Consumer data added successfully!");
      setCrop("");
      setDemand("");
    } catch (error) {
      console.error("Error adding consumer data: ", error);
    }
  };

  return (
    <div>
      <h1>Consumer Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Crop: <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} required /></label>
        <label>Demand (Metric Tons): <input type="number" value={demand} onChange={(e) => setDemand(e.target.value)} required /></label>
        <button type="submit" style={{ width: "auto", padding: "5px 15px", marginTop: "10px", marginLeft: "5px", cursor: "pointer" }}>Submit</button>
      </form>
    </div>
  );
}

export default ConsumerLogin;
