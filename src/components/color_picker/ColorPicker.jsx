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

  const { setCurrentColors, currentColors } = useContext(MainContext);
  const options = {
    0: 'Copy To Clipboard',
    1: 'Delete',
  };

  const handleMenuItemClick = (event, selection) => {
    const colors = currentColors;
    if (selection === 'Copy To Clipboard') {
      navigator.clipboard.writeText(hex);
    } else if (selection === 'Save To Pallet') {
      //TODO Create a pallet and save it to localstorage
    } else if (selection === 'Delete') {
      delete colors[id];
      setCurrentColors({ ...colors });
    }
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
                    {Object.values(options).map((option) => (
                      <MenuItem
                        key={option}
                        onClick={(event) => handleMenuItemClick(event, option)}>
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
