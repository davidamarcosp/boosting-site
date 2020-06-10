import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const getDesiredTier = (tier, division) => {
  if (tier === 1) {
    if (division === 1) {
      return [
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={1}>Iron</MenuItem>,
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 2) {
    if (division === 1) {
      return [
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 3) {
    if (division === 1) {
      return [
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 4) {
    if (division === 1) {
      return [
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 5) {
    return [
      <MenuItem value={5}>Diamond</MenuItem>
    ];
  }
};

const getDesiredDivision = (tier, finalTier, division) => {
  if (tier === finalTier) {
    if (division === 2) {
      return [
        <MenuItem value={1}>I</MenuItem>
      ];
    } else if (division === 3) {
      return [
        <MenuItem value={1}>I</MenuItem>,
        <MenuItem value={2}>II</MenuItem>
      ];
    } else if (division === 4) {
      return [
        <MenuItem value={1}>I</MenuItem>,
        <MenuItem value={2}>II</MenuItem>,
        <MenuItem value={3}>III</MenuItem>
      ];
    };
  } else {
    return [
      <MenuItem value={1}>I</MenuItem>,
      <MenuItem value={2}>II</MenuItem>,
      <MenuItem value={3}>III</MenuItem>,
      <MenuItem value={4}>IV</MenuItem>
    ];
  };
};

export {getDesiredTier, getDesiredDivision};
