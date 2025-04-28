import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgriStats from "./AgriStats.jsx";
import FarmerLogin from "./FarmerLogin.jsx";
import ConsumerLogin from "./ConsumerLogin.jsx";
import DietPlan from "./DietPlan.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import StateDistrictSelection from "./StateDistrictSelection.jsx";
import OptionsPage from "./OptionsPage.jsx";
import ProcessAllocation from "./ProcessAllocation.jsx"; // ✅ Import the new page

function App() {
  const [language, setLanguage] = useState("en");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState(""); // ✅ Added taluk state

  return (
    <Router>
      <Routes>
        {/* Language Selection */}
        <Route path="/" element={<LanguageSelector setLanguage={setLanguage} />} />
        <Route path="/process-allocation" element={<ProcessAllocation />} />
        {/* State, District, and Taluk Selection */}
        <Route
          path="/state-district-selection"
          element={
            <StateDistrictSelection
              language={language}
              setState={setState}
              setDistrict={setDistrict}
              setTaluk={setTaluk} // ✅ Pass setTaluk
            />
          }
        />

        {/* Options Page (after selection) */}
        <Route
          path="/options"
          element={<OptionsPage language={language} district={district} taluk={taluk} />} // ✅ Pass taluk
        />

        {/* Placeholder Pages with Taluk Data */}
        <Route path="/agri-stats" element={<AgriStats language={language} district={district} taluk={taluk} />} />
        <Route path="/farmer-login" element={<FarmerLogin language={language} district={district} taluk={taluk} />} />
        <Route path="/consumer-login" element={<ConsumerLogin language={language} district={district} taluk={taluk} />} />
        <Route path="/diet-plan" element={<DietPlan language={language} district={district} taluk={taluk} />} />
        <Route path="/process-allocation" element={<ProcessAllocation language={language} />} />
      </Routes>
    </Router>
  );
}

export default App;
