import React from 'react';
import chroma from 'chroma-js';
import Select, { StylesConfig } from 'react-select';

export type IShop = {
  value: string;
  label: string;
  color: string;
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

const colourStyles: StylesConfig = {
  control: (styles: React.CSSProperties) => ({
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
  option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: any) => {
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
        ...(styles as any)[':active'],
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
  shopOptions: IShop[];
};

export default function SelectShop({ shopOptions, ...props }: SelectShopProps): JSX.Element {
  return <Select options={shopOptions} styles={colourStyles} {...props} />;
}
