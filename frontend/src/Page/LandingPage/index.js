import React from 'react';

import './style.css';
import fixture from '../../Fixture/landing';

const LandingPage = () => (
  <div>
    <h1>{fixture.name}</h1>
    <img src={fixture.stations[0].avatar} alt="" width="200" height="auto" />
  </div>
);

export default LandingPage;
