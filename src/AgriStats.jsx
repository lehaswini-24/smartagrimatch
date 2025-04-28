import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const fetchJSON = async (fileName) => {
  try {
    const response = await fetch(`/data/${fileName}`);
    if (!response.ok) throw new Error(`Failed to load ${fileName}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

function AgriStats() {
  const [crops, setCrops] = useState([]);
  const [productionData, setProductionData] = useState({});
  const [soilSuitability, setSoilSuitability] = useState({});
  const [soilAbundance, setSoilAbundance] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const cropsData = await fetchJSON("crops.json");
      const production = await fetchJSON("production_per_hectare.json");
      const suitability = await fetchJSON("soil_crop_suitability.json");
      const abundance = await fetchJSON("soil_abundance.json");

      if (cropsData) setCrops(cropsData.crops);
      if (production) setProductionData(production);
      if (suitability) setSoilSuitability(suitability);
      if (abundance) setSoilAbundance(abundance);
    };

    loadData();
  }, []);

  // ✅ Combine Soil Abundance with Suitable Crops for Labels
  const soilLabels = Object.keys(soilAbundance).map((soil) => {
    const crops = soilSuitability[soil]?.join(", ") || "No crops listed";
    return `${soil}: ${crops}`;
  });
  const soilData = Object.values(soilAbundance);

  return (
    <div>
      <h1>Agri Stats</h1>

      {/* Frequently Cultivated Crops */}
      <h2>Frequently Cultivated Crops</h2>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <Pie
          data={{
            labels: crops,
            datasets: [
              {
                label: "Crops in Vellore",
                data: crops.map(() => Math.random() * 100),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
              },
            ],
          }} /*navigate("https://agritech.tnau.ac.in/org_farm/orgfarm_prac_agri_paddy.html") */
        />
        <div className="button-container">
        <button className="nav-button" onClick={() => window.location.href='https://agritech.tnau.ac.in/org_farm/orgfarm_prac_agri_paddy.html'}>{"Learn Organic Cultivation"}
        </button>
        </div>
      </div>

      {/* Production per Hectare */}
      <h2>Production per Hectare</h2>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar
          data={{
            labels: Object.keys(productionData),
            datasets: [
              {
                label: "Production (MT/ha)",
                data: Object.values(productionData),
                backgroundColor: "#36A2EB",
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      {/* Soil Types & Suitable Crops Pie Chart */}
      <h2>Soil Types & Suitable Crops</h2>
      <div style={{ width: "500px", margin: "0 auto" }}>
        <Pie
          data={{
            labels: soilLabels,
            datasets: [
              {
                label: "Soil Distribution (%)",
                data: soilData,
                backgroundColor: ["#D2691E", "#A52A2A", "#8B4513", "#CD853F", "#DEB887", "#F4A460"],
              },
            ],
          }}
        />
        
      </div>
    </div>
  );
}

export default AgriStats;
