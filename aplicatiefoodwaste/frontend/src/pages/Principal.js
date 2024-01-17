import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stiluri.css';

const Principal = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();

  const handleAddProductClick = () => {
    navigate('/login/principal/add-product/' + userEmail);
  };

  const handleSeeingFriendship = () => {
    navigate('/login/principal/friendship/' + userEmail);
  };

  const handleSeeingGrupuri = () => {
    navigate('/login/principal/grupuri/' + userEmail);
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <button className="button" onClick={handleAddProductClick}>
          Adauga produs
        </button>
        <button className="button" onClick={handleSeeingFriendship}>Cereri prietenie</button>
        <button className="button" onClick={handleSeeingGrupuri}>Grupuri</button>
        <button className="button">Lista prieteni</button>
      </div>

      <div className="right-panel">
        <ul className="list">
          <h1>Lista alimente disponibile</h1>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>

        <div className="bottom-section">
          <button >Alege aliment</button>
          <input type="text" placeholder="Il vreau!" />
          <input type="text" placeholder="Id-ul posesorului" />
        </div>
      </div>
    </div>
  );
};

export default Principal;
