import React from 'react';
import chroma from 'chroma-js';

// import { colourOptions } from '../data';
import Select from 'react-select';

const colourOptions = [
  { value: 'SYM', label: 'SYM', color: '#FF8B00' },
  { value: 'MAC', label: 'MAC', color: '#36B37E' },
  { value: 'TAS', label: 'TAS', color: '#253858' },
  { value: 'KIR', label: 'KIR', color: '#0052CC' },
  { value: 'PRG', label: 'PRG', color: '#FFC400' },
  { value: 'THO', label: 'THO', color: '#0052CC' },
  { value: 'KIR', label: 'KIR', color: '#FF5630' },
  { value: 'MEM', label: 'MEM', color: '#ED5CB3' }
];

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    height: 40,
    // border: '1px solid #D8D8D8',
    borderColor: '#D8D8D8',
    borderRadius: 2,
    width: 160,
    boxShadow: 'none',
    paddingLeft: 10
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
      }
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
    fontSize: 14,
    fontWeight: 400,
    color: '#5D6E7F'
  }),
  indicatorSeparator: () => ({ display: 'none' })
};

export default function SelectShop(): React.FC {
  return (
    <Select
      // defaultValue={colourOptions[2]}
      label="Single select"
      options={colourOptions}
      styles={colourStyles}
    />
  );
}
