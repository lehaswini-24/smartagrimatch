import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stateDistrictData from "./stateDistrictData";
import { translateText } from "./translateApi";
import "./StateDistrictSelection.css";

function StateDistrictSelection({ language, setState, setDistrict, setTaluk }) {
  const navigate = useNavigate();

  const taluks = ["Anaicut", "Katpadi", "Gudiyattam", "Pernambut", "Kilvaithinankuppam"];
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");

  const [translatedStateOptions, setTranslatedStateOptions] = useState([]);
  const [translatedDistrictOptions, setTranslatedDistrictOptions] = useState([]);
  const [translatedTalukOptions, setTranslatedTalukOptions] = useState([]);

  const [translations, setTranslations] = useState({
    title: "Select State, District, and Taluk",
    stateLabel: "Select State/UT:",
    districtLabel: "Select District:",
    talukLabel: "Select Taluk:",
    confirmButton: "Confirm and Proceed",
  });

  // Fetch translations for static labels
  useEffect(() => {
    const translateLabels = async () => {
      if (language !== "en") {
        const translatedLabels = await Promise.all([
          translateText("Select State, District, and Taluk", language),
          translateText("Select State/UT:", language),
          translateText("Select District:", language),
          translateText("Select Taluk:", language),
          translateText("Confirm and Proceed", language),
        ]);

        setTranslations({
          title: translatedLabels[0],
          stateLabel: translatedLabels[1],
          districtLabel: translatedLabels[2],
          talukLabel: translatedLabels[3],
          confirmButton: translatedLabels[4],
        });
      }
    };

    translateLabels();
  }, [language]);

  // Translate dropdown options (AFTER selections)
  useEffect(() => {
    const translateOptions = async () => {
      if (language !== "en") {
        // Translate state names
        const translatedStates = await Promise.all(
          Object.keys(stateDistrictData).map(state => translateText(state, language))
        );
        setTranslatedStateOptions(translatedStates);

        // Translate district names
        if (selectedState) {
          const translatedDistricts = await Promise.all(
            stateDistrictData[selectedState].map(district => translateText(district, language))
          );
          setTranslatedDistrictOptions(translatedDistricts);
        }

        // Translate taluk names
        if (selectedDistrict) {
          const translatedTaluks = await Promise.all(
            taluks.map(taluk => translateText(taluk, language))
          );
          setTranslatedTalukOptions(translatedTaluks);
        }
      }
    };

    translateOptions();
  }, [language, selectedState, selectedDistrict]);

  // Handle state selection
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(stateDistrictData[state] || []);
    setSelectedDistrict(""); // Reset district selection
    setSelectedTaluk(""); // Reset taluk selection
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTaluk(""); // Reset taluk selection
  };

  // Handle taluk selection
  const handleTalukChange = (e) => {
    setSelectedTaluk(e.target.value);
  };

  // Confirm selection
  const handleConfirm = () => {
    if (selectedTaluk) {
      setState(selectedState);
      setDistrict(selectedDistrict);
      setTaluk(selectedTaluk);
      navigate("/options");
    }
  };

  return (
    <div className="state-district-container">
      <div className="selection-box">
        <h1>{translations.title}</h1>

        {/* State Selection */}
        <label>{translations.stateLabel}</label>
        <select value={selectedState} onChange={handleStateChange}>
          <option value="" disabled>{translations.stateLabel}</option>
          {Object.keys(stateDistrictData).map((stateName, index) => (
            <option key={index} value={stateName}>
              {language !== "en" ? translatedStateOptions[index] : stateName}
            </option>
          ))}
        </select>

        {/* District Selection */}
        {selectedState && (
          <>
            <label>{translations.districtLabel}</label>
            <select value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="" disabled>{translations.districtLabel}</option>
              {districts.map((districtName, index) => (
                <option key={index} value={districtName}>
                  {language !== "en" ? translatedDistrictOptions[index] : districtName}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Taluk Selection */}
        {selectedDistrict && (
          <>
            <label>{translations.talukLabel}</label>
            <select value={selectedTaluk} onChange={handleTalukChange}>
              <option value="" disabled>{translations.talukLabel}</option>
              {taluks.map((talukName, index) => (
                <option key={index} value={talukName}>
                  {language !== "en" ? translatedTalukOptions[index] : talukName}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Confirm Button */}
        <button className="nav-button" onClick={handleConfirm} disabled={!selectedTaluk}>
          {translations.confirmButton}
        </button>
      </div>
    </div>
  );
}

export default StateDistrictSelection;
