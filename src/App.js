import React from 'react';
import ColorPicker from './components/color_picker/ColorPicker.jsx';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  return (
    <div
      className='App'
      style={{ background: 'linear-gradient(to right, #8dd9c2 , #d7fa80)' }}>
      <div className='App-header'>
        <img className='header-image' src={logo} alt='iDropr' />
      </div>
      <div className='App-body'>
        <ColorPicker />
      </div>
      <div className='App-footer'>
        <span className='link_container'>
          <a href='/'>Donate</a>
          <a href='/' className='github_link'>
            Github
          </a>
          <a href='/'>Twitter</a>
        </span>
      </div>
    </div>
  );
}

export default App;
