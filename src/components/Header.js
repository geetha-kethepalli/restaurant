import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">Food Finder</div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Login / Register</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;