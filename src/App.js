import React, { useState, useContext, useEffect } from 'react';
import ColorPicker from './components/color_picker/ColorPicker.jsx';
import './App.css';
import logo from './assets/logo.svg';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MainContext } from './context/MainContext.js';
const buttonSx = {
  color: '#234650',
  border: 'none',
  fontSize: 12,
  '&:hover': {
    border: 'none',
  },
};
function App() {
  const [pickerList, setpickerList] = useState([]);
  const { currentColors } = useContext(MainContext);
  let backgroundColors = Object.values(currentColors).join(', ');
  let bgStyleString =
    pickerList.length === 1
      ? `${backgroundColors}`
      : `linear-gradient(to right, ${backgroundColors})`;
  const bgStyle = {
    background: bgStyleString,
  };

  useEffect(() => {
    console.log('hello from useEffect');
    console.log(currentColors);
  });

  const onAddBtnClick = (event) => {
    //TODO create random id and so forth here > give them as props
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setpickerList([
      ...pickerList,
      <ColorPicker key={pickerList.length} randomColor={randomColor} />,
    ]);
  };

  console.log(backgroundColors);
  return (
    <div className='App' style={bgStyle}>
      <div className='App-header'>
        <img className='header-image' src={logo} alt='iDropr' />
      </div>
      <div className='App-body'>{pickerList}</div>
      <Button variant='outlined' sx={buttonSx} onClick={onAddBtnClick}>
        <AddIcon />
      </Button>
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
