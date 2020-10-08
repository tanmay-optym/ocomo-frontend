import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

export const shopOptions = {
  SYM: { value: 'SYM', label: 'SYM', color: '#FF8B00' }, // y
  BTR: { value: 'BTR', label: 'BTR', color: '#36B37E' }, // n: MAC => BTR
  FDL: { value: 'FDL', label: 'FDL', color: '#253858' }, // n TAS => FDL
  KIR: { value: 'KIR', label: 'KIR', color: '#0052CC' }, // y
  STP: { value: 'STP', label: 'STP', color: '#FFC400' } // n PRG => STP
  // THO: { value: 'THO', label: 'THO', color: '#FA8F8F' }, // n
  // MEM: { value: 'MEM', label: 'MEM', color: '#ED5CB3' } // n
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

type SelectShopProps = {
  initialValue?: string;
};

export default function SelectShop({ initialValue, ...props }: SelectShopProps): JSX.Element {
  return (
    <Select
      defaultValue={initialValue ? shopOptions[initialValue] : undefined}
      options={Object.values(shopOptions)}
      styles={colourStyles}
      {...props}
    />
  );
}
