import React from 'react';
import chroma from 'chroma-js';

// import { colourOptions } from '../data';
import Select from 'react-select';

const colourOptions = {
  SYM: { value: 'SYM', label: 'SYM', color: '#FF8B00' },
  MAC: { value: 'MAC', label: 'MAC', color: '#36B37E' },
  TAS: { value: 'TAS', label: 'TAS', color: '#253858' },
  KIR: { value: 'KIR', label: 'KIR', color: '#0052CC' },
  PRG: { value: 'PRG', label: 'PRG', color: '#FFC400' },
  THO: { value: 'THO', label: 'THO', color: '#FA8F8F' },
  MEM:{ value: 'MEM', label: 'MEM', color: '#ED5CB3' }
};

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

export default function SelectShop(props): React.FC {
  return (
    <Select
      defaultValue={colourOptions[props.initialValue]}
      label="Single select"
      options={Object.values(colourOptions)}
      styles={colourStyles}
    />
  );
}
