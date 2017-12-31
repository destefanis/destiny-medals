import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = () => (
  <nav className="nav">
    <Link to="/">
      <h1 className="h1">
        Destiny 
          <span className="logo-svg">
            <svg width='32' height='41' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
              <defs>
                <path id='a' d='M4.92307692 4.57142857h22.1538462v22.5054945H4.92307692z'/>
              </defs>
              <g fill='none' fillRule='evenodd'>
                <path stroke='#FFF' strokeWidth='2' opacity='.206' d='M16.12432643 10.7236533l14.2509213 14.2509213-14.4995742 14.4995742-14.2509213-14.2509213z'/>
                <path stroke='#FFF' strokeWidth='2' opacity='.546' d='M16.1243267 6.262115l14.25092133 14.25092132-14.49957422 14.4995742-14.2509213-14.2509213z'/>
                <g transform='rotate(45 16 15.824)'>
                  <use fill='#FFF' xlinkHref='#a' />
                  <path stroke='#FFF' strokeWidth='2' d='M5.92307692 5.57142857h20.1538462v20.5054945H5.92307692z'/>
                </g>
              </g>
            </svg>
          </span>
        Medals
      </h1>
    </Link>
  </nav>
);

export default Navigation;
