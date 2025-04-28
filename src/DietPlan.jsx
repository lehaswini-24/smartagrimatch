import React, { useEffect, useState } from "react";
import { translateText } from "./translateApi";
import "./OptionsPage.css";

function DietPlan({ language, district }) {
  const [translatedText, setTranslatedText] = useState(`Diet Plan `);
  const [inputs, setInputs] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    healthConditions: "",
  });
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const translatePageTitle = async () => {
      if (language !== "en") {
        const translated = await translateText(`Diet Plan of ${district}`, language);
        setTranslatedText(translated);
      }
    };
    translatePageTitle();
  }, [language, district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const generateDietPlan = () => {
    const baseRequirement = 2.5;
    const multiplier = 1 + (inputs.weight / 100) + (inputs.age / 100);
    const result = (baseRequirement * multiplier).toFixed(2);

    setRecommendation({
      vegetables: (result * 0.4).toFixed(2),
      fruits: (result * 0.3).toFixed(2),
      grains: (result * 0.2).toFixed(2),
      pulses: (result * 0.1).toFixed(2),
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", textAlign: "left" }}>
      <h1>{translatedText}</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Age: <input type="number" name="age" value={inputs.age} onChange={handleChange} />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={inputs.gender}
            onChange={handleChange}
            style={{ width: "150px", marginLeft: "10px" }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Height (cm): <input type="number" name="height" value={inputs.height} onChange={handleChange} />
        </label>

        <label>
          Weight (kg): <input type="number" name="weight" value={inputs.weight} onChange={handleChange} />
        </label>

        <label>
          Health Conditions (if any): <input type="text" name="healthConditions" value={inputs.healthConditions} onChange={handleChange} />
        </label>

        
      </div>
      <button className="nav-button" onClick={generateDietPlan}>
  Recommend Diet Plan
</button>


      {recommendation && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weekly Requirements (in metric tonnes):</h2>
          <ul>
            <li>Vegetables: {recommendation.vegetables}</li>
            <li>Fruits: {recommendation.fruits}</li>
            <li>Grains: {recommendation.grains}</li>
            <li>Pulses: {recommendation.pulses}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DietPlan;
