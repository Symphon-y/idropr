import React, { useContext, useEffect } from 'react';
import ColorPicker from './components/color_picker/ColorPicker.jsx';
import './App.css';
import logo from './assets/logo.svg';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MainContext } from './context/MainContext.js';
import uuid from 'react-uuid';
const buttonSx = {
  color: '#234650',
  border: 'none',
  fontSize: 12,
  '&:hover': {
    border: 'none',
  },
};
function App() {
  const { setCurrentColors, currentColors } = useContext(MainContext);
  let backgroundColors = Object.values(currentColors).join(', ');

  let bgStyleString;
  if (Object.entries(currentColors).length === 0) {
    bgStyleString = 'white';
  } else if (Object.entries(currentColors).length === 1) {
    bgStyleString = `${backgroundColors}`;
  } else {
    bgStyleString = `linear-gradient(to right, ${backgroundColors})`;
  }

  const bgStyle = {
    background: bgStyleString,
  };

  useEffect(() => {}, []);

  const onAddBtnClick = (event) => {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let id = uuid();
    setCurrentColors({ ...currentColors, [id]: randomColor });
    event.preventDefault();
  };
  return (
    <div className='App' style={bgStyle}>
      <div className='App-header'>
        <img className='header-image' src={logo} alt='iDropr' />
      </div>
      <div className='App-body'>
        {Object.entries(currentColors).map(([id, color]) => {
          return <ColorPicker id={id} key={id} randomColor={color} />;
        })}
      </div>
      <Button variant='outlined' sx={buttonSx} onClick={onAddBtnClick}>
        <AddIcon />
      </Button>
      <div className='App-footer'>
        <span className='link_container'>
          <a
            href='https://www.buymeacoffee.com/RhysCreates'
            className='link'
            target='_blank'
            rel='noopener noreferrer'>
            Donate
          </a>
          <a
            href='https://github.com/Symphon-y/idropr'
            className='link github_link'
            target='_blank'
            rel='noopener noreferrer'>
            Github
          </a>
          <a
            href='https://twitter.com/travis_redden'
            className='link'
            target='_blank'
            rel='noopener noreferrer'>
            Twitter
          </a>
        </span>
      </div>
    </div>
  );
}

export default App;
