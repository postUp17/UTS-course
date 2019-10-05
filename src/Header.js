import React from 'react';
import { Navbar } from 'react-bootstrap';

import Logo from './img/Logo.png';

const titleStyle = {
  marginLeft: '20px',
  fontSize: '1.5rem',
  display: 'inline-block'
};

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            className="d-inline-block align-top"
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '40px'
            }}
          />
          <div style={titleStyle}>Course Recommendation</div>
        </Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default Header;
