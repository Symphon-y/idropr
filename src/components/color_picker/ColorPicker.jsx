import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../context/MainContext.js';

import './ColorPicker.css';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const buttonSx = {
  color: '#234650',
  border: 'none',
  fontSize: 12,
  '&:hover': {
    border: 'none',
  },
};

const ColorPicker = ({ pickerList, randomColor }) => {
  // initial render of color picker over-rites default values
  //let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const [hex, setHex] = useState(randomColor);
  const { setCurrentColors, currentColors } = useContext(MainContext);
  // mainContext.currentColors[colorKey] = randomColor;

  const handleChange = (e) => {
    // updates color values while holding on to other color values
    let colorKey = e.target.id;
    let color = e.target.value;
    setCurrentColors({ ...currentColors, [colorKey]: color });
    setHex(color);
  };

  useEffect(() => {
    setCurrentColors({ ...currentColors, [randomColor]: randomColor });
    setHex(randomColor);
  }, []);

  return (
    <div className='color_picker_container'>
      <input
        className='picker color_one'
        type='color'
        id={randomColor}
        value={hex}
        onChange={handleChange}></input>
      <ButtonGroup variant='outlined' aria-label='split button'>
        <Button
          variant='outlined'
          sx={buttonSx}
          onClick={() => {
            //TODO save value to clipboard
          }}>
          HEX: {hex}
        </Button>
        <Button
          size='small'
          variant='outlined'
          sx={buttonSx}
          onClick={(e) => {
            // dropdown
          }}>
          <ExpandMoreIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ColorPicker;
