import React, { useState, useContext, useRef } from 'react';
import { MainContext } from '../../context/MainContext.js';

import './ColorPicker.css';
import {
  Button,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const buttonSx = {
  color: '#234650',
  border: 'none',
  fontSize: 12,
  '&:hover': {
    border: 'none',
  },
};

const ColorPicker = ({ randomColor, id }) => {
  const [hex, setHex] = useState(randomColor);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { setCurrentColors, currentColors } = useContext(MainContext);
  const options = ['Copy To Clipboard', 'Save To Pallet', 'Delete'];

  const handleMenuItemClick = (event, index) => {
    let selection = options[index];
    const colors = currentColors;
    if (selection === options[0]) {
      navigator.clipboard.writeText(hex);
    } else if (selection === options[1]) {
      //TODO Create a pallet and save it to localstorage
    } else if (selection === options[2]) {
      delete colors[id];
      setCurrentColors({ ...colors });
    }
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleChange = (e) => {
    let colorKey = e.target.id;
    let color = e.target.value;
    setCurrentColors({ ...currentColors, [colorKey]: color });
    setHex(color);
  };

  return (
    <div className='color_picker_container'>
      <input
        className='picker color_one'
        type='color'
        id={randomColor}
        value={hex}
        onChange={handleChange}></input>
      <ButtonGroup variant='outlined' ref={anchorRef} aria-label='split button'>
        <Button
          variant='outlined'
          sx={buttonSx}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={() => {
            navigator.clipboard.writeText(hex);
          }}>
          HEX: {hex}
        </Button>
        <Button
          size='small'
          variant='outlined'
          sx={buttonSx}
          onClick={(e) => {
            handleToggle();
          }}>
          <ExpandMoreIcon />
        </Button>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id='split-button-menu' autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
    </div>
  );
};

export default ColorPicker;
