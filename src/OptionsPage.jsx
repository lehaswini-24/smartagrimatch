import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translateText } from "./translateApi";
import "./OptionsPage.css"; 

function OptionsPage({ language }) {
  const navigate = useNavigate();
  const location = useLocation();
  const district = location.state?.district;

  const [translations, setTranslations] = useState({
    title: "Choose an Option",
    agriHub: "Agri Stats",
    farmerLogin: "Farmer Login",
    consumerLogin: "Consumer Login",
    dietPlan: "Diet Plan",
    processAllocation: "Process Allocation",
  });

  useEffect(() => {
    const translateLabels = async () => {
      if (language !== "en") {
        const translatedValues = await Promise.all([
          translateText("Choose an Option", language),
          translateText("Agri Stats", language),
          translateText("Farmer Login", language),
          translateText("Consumer Login", language),
          translateText("Diet Plan", language),
          translateText("Process Allocation", language),
        ]);

        setTranslations({
          title: translatedValues[0],
          agriHub: translatedValues[1],
          farmerLogin: translatedValues[2],
          consumerLogin: translatedValues[3],
          dietPlan: translatedValues[4],
          processAllocation: translatedValues[5],
        });
      }
    };

    translateLabels();
  }, [language]);

  return (
    <div className="home-container">
      <div className="app-header">
        <h1>{translations.title}</h1>
      </div>

      <div className="button-container">
        <button className="nav-button" onClick={() => navigate("/agri-stats")}>
          {translations.agriHub}
        </button>
        <button className="nav-button" onClick={() => navigate("/farmer-login")}>
          {translations.farmerLogin}
        </button>
        <button className="nav-button" onClick={() => navigate("/consumer-login")}>
          {translations.consumerLogin}
        </button>
        <button className="nav-button" onClick={() => navigate("/diet-plan")}>
          {translations.dietPlan}
        </button>
        <button className="nav-button" onClick={() => navigate("/process-allocation")}>
          {translations.processAllocation} {/* ✅ New Button */}
        </button>
      </div>
    </div>
  );
}

export default OptionsPage;
