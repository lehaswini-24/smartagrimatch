import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Function to fetch JSON data dynamically
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

const AllocationProcessor = () => {
  const [farmers, setFarmers] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [cropsData, setCropsData] = useState(null);
  const [soilsData, setSoilsData] = useState(null);
  const [suitabilityData, setSuitabilityData] = useState(null);
  const [productionData, setProductionData] = useState(null);
  const [allocationResult, setAllocationResult] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // Fetch Farmers and Consumers Data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmerSnapshot = await getDocs(collection(db, "farmers"));
        const consumerSnapshot = await getDocs(collection(db, "consumers"));

        setFarmers(farmerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setConsumers(consumerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
        setFetchError("Failed to load farmer or consumer data.");
      }
    };

    fetchData();
  }, []);

  // Fetch JSON files for soil suitability & production rates
  useEffect(() => {
    const loadData = async () => {
      setFetchError(null);
      const crops = await fetchJSON("crops.json");
      const soils = await fetchJSON("soils.json");
      const suitability = await fetchJSON("soil_crop_suitability.json");
      const production = await fetchJSON("production_per_hectare.json");

      if (crops && soils && suitability && production) {
        setCropsData(crops);
        setSoilsData(soils);
        setSuitabilityData(suitability);
        setProductionData(production);
      } else {
        setFetchError("Failed to fetch one or more data files.");
      }
    };

    loadData();
  }, []);

  // 🚀 **Process Allocation**
  const handleAllocation = () => {
    if (!farmers.length || !consumers.length) {
      alert("No farmer or consumer data available.");
      return;
    }

    let remainingDemand = { ...Object.fromEntries(consumers.map(c => [c.crop, parseFloat(c.demand)])) };
    let allocations = [];
    let unusedLand = [];

    console.log("Consumers:", consumers);
    console.log("Farmers:", farmers);
    console.log("Production Data:", productionData);
    console.log("Suitability Data:", suitabilityData);

    // Process crops in order of demand
    Object.keys(remainingDemand).forEach((crop) => {
      if (remainingDemand[crop] <= 0) return;

      const suitableSoils = suitabilityData[crop] || [];
      console.log(`Checking crop: ${crop}, Suitable soils: `, suitableSoils);

      // Assign scores to farmers based on suitability and expertise
      let farmerScores = farmers.map(farmer => {
        let score = 0;
        if (suitableSoils.includes(farmer.soilType)) score += 1; // Soil match
        if (farmer.pastExpertise.includes(crop)) score += 1; // Expertise match
        return { ...farmer, score };
      });

      // Sort farmers by highest score (priority) and largest landholding
      farmerScores.sort((a, b) => b.score - a.score || b.landHolding - a.landHolding);
      console.log("Sorted Farmers by Score: ", farmerScores);

      // Allocate crops
      for (let i = 0; i < farmerScores.length; i++) {
        let farmer = farmerScores[i];
        if (farmer.score === 0 || remainingDemand[crop] <= 0) continue;

        const productivity = productionData[crop] || 0;
        if (productivity === 0) continue;

        let maxYield = farmer.landHolding * productivity;
        let allocatedQuantity = Math.min(remainingDemand[crop], maxYield);
        let allocatedArea = allocatedQuantity / productivity;

        // 🔹 **Precision Handling**
        let formattedAllocatedArea = allocatedArea;
        if (!Number.isInteger(allocatedArea)) {
          formattedAllocatedArea = allocatedArea.toString().includes('.') ? allocatedArea : Math.ceil(allocatedArea * 100) / 100;
        }

        // Update farmer's remaining land and reduce demand
        remainingDemand[crop] -= allocatedQuantity;
        farmer.landHolding -= formattedAllocatedArea;

        allocations.push({
          farmer: farmer.name,
          crop,
          allocatedQuantity,
          allocatedArea: formattedAllocatedArea,  // ✅ **Precision applied**
          unusedLand: farmer.landHolding, 
        });

        // Track unused land
        if (farmer.landHolding > 0) {
          unusedLand.push({ farmer: farmer.name, landLeft: farmer.landHolding });
        }

        if (remainingDemand[crop] <= 0) break; // Stop when demand is met
      }
    });

    console.log("Final Allocations: ", allocations);
    console.log("Unused Land: ", unusedLand);

    setAllocationResult({ allocations, unusedLand });
  };

  return (
    <div>
      <h2>Allocation Processor</h2>
      <button onClick={handleAllocation} style={{ width: "auto", padding: "5px 10px", marginTop: "10px", marginLeft: "5px" }}>Process Allocation</button>

      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

      {allocationResult && (
        <div>
          <h3>Crop Allocation Results</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Assigned Crops</th>
                <th>Unused Land (ha)</th>
              </tr>
            </thead>
            <tbody>
              {allocationResult.allocations.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.farmer}</td>
                  <td>{`${entry.crop}: ${entry.allocatedQuantity.toFixed(2)} MT (${entry.allocatedArea} ha)`}</td>
                  <td>{Number(entry.unusedLand).toFixed(3)}</td>  {/* ✅ **Fixed Unused Land Display** */}
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Unused Land</h3>
          {allocationResult.unusedLand.map((entry, index) => (
            <p key={index}>
              <strong>{entry.farmer}</strong> has <strong>{Number(entry.landLeft).toFixed(3)} ha</strong> left.
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllocationProcessor;
