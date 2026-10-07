import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import './styles.css';

// HashRouter keeps routes working on any static host without server rewrites.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><HashRouter><AuthProvider><DataProvider><App /></DataProvider></AuthProvider></HashRouter></React.StrictMode>
);
