import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Firebase config import
import { collection, addDoc } from "firebase/firestore";
import "./OptionsPage.css"; // Import for nav-button styling

function FarmerLogin() {
  const [name, setName] = useState("");
  const [landHolding, setLandHolding] = useState("");
  const [soilType, setSoilType] = useState("");
  const [pastExpertise, setPastExpertise] = useState([]);
  const [waterQuantity, setWaterQuantity] = useState("");
  const [waterQuality, setWaterQuality] = useState("");

  const soilOptions = [
    "Red Soil",
    "Black Soil",
    "Sandy Loam",
    "Clayey Soil",
    "Clay Loam",
    "Laterite"
  ];

  const cropOptions = [
    "Paddy",
    "Millets",
    "Groundnut",
    "Sugarcane",
    "Cotton",
    "Chickpea",
    "Banana",
    "Brinjal",
    "Tomato",
    "Onion"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "farmers"), {
        name,
        landHolding: parseFloat(landHolding),
        soilType,
        pastExpertise,
        waterQuantity: parseFloat(waterQuantity),
        waterQuality: parseFloat(waterQuality),
      });
      alert("Farmer data added successfully!");
      setName("");
      setLandHolding("");
      setSoilType("");
      setPastExpertise([]);
      setWaterQuantity("");
      setWaterQuality("");
    } catch (error) {
      console.error("Error adding farmer data: ", error);
    }
  };

  return (
    <div>
      <h1>Farmer Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Farmer Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "200px", padding: "5px", marginLeft: "10px" }}
          />
        </label>
        <br />

        <label>
          Land Holding (ha):{" "}
          <input
            type="number"
            value={landHolding}
            onChange={(e) => setLandHolding(e.target.value)}
            required
            style={{ width: "200px", padding: "5px", marginLeft: "10px" }}
          />
        </label>
        <br />

        <label>
          Soil Type:{" "}
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            required
            style={{ width: "200px", padding: "5px", marginLeft: "10px" }}
          >
            <option value="">Select Soil Type</option>
            {soilOptions.map((soil, index) => (
              <option key={index} value={soil}>
                {soil}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label style={{ display: "block", marginTop: "10px" }}>
          Past Expertise (Crops):
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px", marginLeft: "10px" }}>
            {cropOptions.map((crop, index) => (
              <label key={index} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value={crop}
                  checked={pastExpertise.includes(crop)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPastExpertise([...pastExpertise, crop]);
                    } else {
                      setPastExpertise(pastExpertise.filter((c) => c !== crop));
                    }
                  }}
                  style={{ marginRight: "5px" }}
                />
                {crop}
              </label>
            ))}
          </div>
        </label>

        <br />

        <label>
          Water Quantity (Liters per day):{" "}
          <input
            type="number"
            value={waterQuantity}
            onChange={(e) => setWaterQuantity(e.target.value)}
            required
            style={{ width: "200px", padding: "5px", marginLeft: "10px" }}
          />
        </label>
        <br />

        <label>
          Water Quality (TDS in ppm):{" "}
          <input
            type="number"
            value={waterQuality}
            onChange={(e) => setWaterQuality(e.target.value)}
            required
            style={{ width: "200px", padding: "5px", marginLeft: "10px" }}
          />
        </label>
        <br />

        <button type="submit" className="nav-button" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FarmerLogin;
