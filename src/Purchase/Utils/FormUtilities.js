import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const getDesiredTier = (currentTier, currentDivision) => {
  if (currentTier === 0) {
    if (currentDivision === 3) {
      return [
        <MenuItem key={1} value={1}>Bronze</MenuItem>,
        <MenuItem key={2} value={2}>Silver</MenuItem>,
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem key={0} value={0}>Iron</MenuItem>,
        <MenuItem key={1} value={1}>Bronze</MenuItem>,
        <MenuItem key={2} value={2}>Silver</MenuItem>,
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    }
  } else if (currentTier === 1) {
    if (currentDivision === 3) {
      return [
        <MenuItem key={2} value={2}>Silver</MenuItem>,
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem key={1} value={1}>Bronze</MenuItem>,
        <MenuItem key={2} value={2}>Silver</MenuItem>,
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    }
  } else if (currentTier === 2) {
    if (currentDivision === 3) {
      return [
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem key={2} value={2}>Silver</MenuItem>,
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    }
  } else if (currentTier === 3) {
    if (currentDivision === 3) {
      return [
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem key={3} value={3}>Gold</MenuItem>,
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    }
  } else if (currentTier === 4) {
    if (currentDivision === 3) {
      return [
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem key={4} value={4}>Platinum</MenuItem>,
        <MenuItem key={5} value={5}>Diamond</MenuItem>
      ];
    }
  } else if (currentTier === 5) {
    return [
      <MenuItem key={5} value={5}>Diamond</MenuItem>
    ];
  };
};

const getDesiredDivision = (currentTier, desiredTier, currentDivision) => {
  if (currentTier === desiredTier) {
    if (currentDivision === 2) {
      return [
        <MenuItem key={3} value={3}>I</MenuItem>
      ];
    } else if (currentDivision === 1) {
      return [
        <MenuItem key={3} value={3}>I</MenuItem>,
        <MenuItem key={2} value={2}>II</MenuItem>
      ];
    } else if (currentDivision === 0) {
      return [
        <MenuItem key={3} value={3}>I</MenuItem>,
        <MenuItem key={2} value={2}>II</MenuItem>,
        <MenuItem key={1} value={1}>III</MenuItem>
      ];
    };
  } else {
    return [
      <MenuItem key={3} value={3}>I</MenuItem>,
      <MenuItem key={2} value={2}>II</MenuItem>,
      <MenuItem key={1} value={1}>III</MenuItem>,
      <MenuItem key={0} value={0}>IV</MenuItem>
    ];
  };
};

export { getDesiredTier, getDesiredDivision };
