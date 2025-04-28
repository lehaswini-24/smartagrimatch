import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelector.css'; // Make sure this is imported

const languages = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  ur: 'اردو',
  or: 'ଓଡ଼ିଆ',
  pa: 'ਪੰਜਾਬੀ',
  as: 'অসমীয়া',
};

function LanguageSelector({ setLanguage }) {
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    navigate('/state-district-selection'); // Navigate to state/district selection
  };

  return (
    <div className="language-selector-container">
      <h1 className="app-header">SmartAgriMatch</h1>
      <select className="language-selector" defaultValue="" onChange={handleLanguageChange}>
        <option value="" disabled>Select Language</option>
        {Object.keys(languages).map((langCode) => (
          <option key={langCode} value={langCode}>
            {languages[langCode]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
