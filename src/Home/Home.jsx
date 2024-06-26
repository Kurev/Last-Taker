import React from 'react'
import './Home.css';
import logo from '../assets/logo.png'
import { MdFacebook } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { LuGamepad2 } from "react-icons/lu";
import { Link } from 'react-router-dom';
import 'animate.css';


const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <img src={logo} alt="" className='logo' />  
        <div className="button">
          <Link to='PlayerVsAi'><button>Player vs AI</button></Link>
          <Link to='PlayerVsPlayer'><button>Player vs Player</button></Link>
          
        </div>

        <Link to='About'><h2><LuGamepad2 className='about' /></h2></Link>
        <div className="icons">
          <a href=""><MdFacebook /></a>
          <a href=""><FaDiscord /></a>
          <a href=""><FaGithub /></a>
          <a href=""><AiFillTikTok /></a>
        </div>
        <div className="created">
          <p>Creater by: Kurev</p>
        </div>
      </div>
      
    </div>
  );
}

export default Home;