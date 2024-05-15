import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PlayerVsAi from './PlayerVsAi/PlayerVsAi.jsx'; // Matches file name
import PlayerVsPlayer from './PlayerVsPlayer/PlayerVsPlayer.jsx';
import About from './About/About.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/PlayerVsAi', element: <PlayerVsAi /> }, // Matches file name
  { path: '/PlayerVsPlayer', element: <PlayerVsPlayer /> },
  { path: '/About', element: <About /> }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
