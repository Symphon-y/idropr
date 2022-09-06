import React from 'react';
import './ColorPicker.css';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const buttonSx = {
  color: '#234650',
  border: 'none',
  'font-size': 12,
  '&:hover': {
    border: 'none',
  },
};

const ColorPicker = () => {
  return (
    <div className='color_picker_container'>
      <input className='picker color_one' type='color'></input>
      <ButtonGroup variant='outlined' aria-label='split button'>
        <Button
          variant='outlined'
          sx={buttonSx}
          onClick={() => {
            console.log('clicked');
            //navigator.clipboard.writeText(localStorage.getItem(item));
          }}>
          HEX: 000000
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
