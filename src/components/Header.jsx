import React from 'react';
import './Header.css';

export default ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" alt="Logo Netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://i.pinimg.com/564x/c3/3b/32/c33b322b61b8f30f0df1d0b3de690734.jpg" alt="Usuário" />
        </a>
      </div>
    </header>
  );
}