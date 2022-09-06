import React from 'react';
import './ColorPicker.css';

const ColorPicker = () => {
  return (
    <div className='color_picker_container'>
      <input className='picker color_one' type='color'></input>
      <div className='hex_value'>HEX: 000000</div>
    </div>
  );
};

export default ColorPicker;
