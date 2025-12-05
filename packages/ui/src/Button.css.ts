import { style } from '@vanilla-extract/css';

export const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'colors',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(0, 0, 0, 0.2)',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

// Variant styles
export const variantDefault = style({
  backgroundColor: 'black',
  color: 'white',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});

export const variantOutline = style({
  border: '1px solid #d1d5db',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
});

export const variantGhost = style({
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
});

// Size styles
export const sizeDefault = style({
  height: '2.5rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
});

export const sizeSm = style({
  height: '2rem',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
});

export const sizeLg = style({
  height: '3rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
});
