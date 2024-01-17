import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../src/stiluri.css';
const Principal = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();

  const handleAddProductClick = () => {
    navigate('/login/principal/add-product/' + userEmail);
  };

  const handleSeeingFriendship = () => {
    navigate('/login/principal/friendship/' + userEmail);
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <button className="button" onClick={handleAddProductClick}>
          Adauga produs
        </button>
        <button className="button" onClick={handleSeeingFriendship}>Vizualizeaza prietenii</button>
        <button className="button">Button 3</button>
        <button className="button">Button 4</button>
      </div>

      <div className="right-panel">
        <ul className="list">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>

        <div className="bottom-section">
          <button className="button">Bottom Button</button>
          <input type="text" placeholder="Enter something" />
        </div>
      </div>
    </div>
  );
};

export default Principal;
