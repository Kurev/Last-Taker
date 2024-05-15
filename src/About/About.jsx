import React from 'react';
import './About.css';
import logo from '../assets/logo.png';
import step1 from '../assets/step1.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import 'animate.css';

const About = () => {
  return (
    <div className="About">
      <div className="lastTaker">
        <img src={logo} alt="Game Logo" />
        <h4>Welcome to the game where the goal is to avoid taking the last box. Players take turns removing one or more boxes, and the player who takes the last box loses. Enjoy strategizing to outmaneuver your opponents and avoid being the one left with the last box!</h4>
      </div>

      <div className="step step1">
        <img src={step1} alt="Step 1" />
        <h4>Choose the box or boxes you want to take, but remember: once you pick from one column, you cannot pick from another column in the same turn. Plan your moves carefully to avoid restrictions in future turns!</h4>
      </div>

      <div className="step step2">
        <img src={step2} alt="Step 2" />
        <h4>After deciding which box or boxes to take, click 'Grab' to remove them. Once you click, the selected boxes will be deleted from the game, and the next player will follow the same procedure.</h4>
      </div>

      <div className="step step3">
        <img src={step3} alt="Step 3" />
        <h4>To win the game, strategically force your opponent to take the last box. Analyze the number of boxes remaining and plan your moves to ensure that your opponent is left with no choice but to pick the last box. Use careful counting and foresight to stay ahead and outmaneuver your opponent, making each move count towards your victory.</h4>
      </div>

      <div className="fun">
        <h3>Enjoy the game and use your logic to win each round!</h3>
      </div>
        <div className="btn back">
            <Link to='/'>
                <button><IoMdArrowRoundBack /></button>
            </Link>
        </div>
      
    </div>
  );
};

export default About;
