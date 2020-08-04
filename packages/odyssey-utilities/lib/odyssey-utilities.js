const tailwindPlugin = require('tailwindcss/plugin')
const svgToDataUri = require('mini-svg-data-uri');

const theme = {
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      000: '#f5f5f6',
      200: '#d7d7dc',
      300: '#c1c1c8',
      600: '#6e6e78'
    },
    blue: {
      300: '#a7b5ec',
      500: '#1662dd',
      900: '#00297a',
    },
    red: {
      300: '#f88c90',
      500: '#da372c',
      900: '#640019',
    },
  }
}

const plugin = (rootFontSize = 14) => {
  const relativeSize = (size) => `${size / rootFontSize}rem`;
  return tailwindPlugin(function({ addUtilities, addComponents, e, prefix, config }) {
    const buttons = {
      '.ouc-checkbox': {
        appearance: 'none',
        colorAdjust: 'exact',
        '&::-ms-check': {
          '@media not print': {
            color: 'transparent', // Hide the check
            background: 'inherit',
            borderColor: 'inherit',
            borderRadius: 'inherit',
          }
        },
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundOrigin: 'border-box',
        userSelect: 'none',
        flexShrink: 0,
        outline: 'none',
        height: relativeSize(16),
        width: relativeSize(16),
        color: theme.colors.blue[500],
        border: 'solid',
        borderColor: theme.colors.gray[300],
        borderWidth: relativeSize(2),
        borderRadius: relativeSize(4),
        '&:focus': {
          boxShadow: `0 0 0 ${relativeSize(2)} ${theme.colors.blue[300]}`,
          borderColor: theme.colors.blue[500],
        },
        transitionDuration: '100ms',
        transitionProperty: 'background-color',
        '&:disabled': {
          backgroundColor: theme.colors.gray[000],
          borderColor: theme.colors.gray[200],
        },
        '&[data-invalid]&:disabled': {
          borderColor: theme.colors.red[300],
        },
        '&[data-invalid]': {
          borderColor: theme.colors.red[500],
        },
        '&[data-invalid]&.border-red-900': {
          borderColor: theme.colors.red[900],
        },
        '&[data-invalid]&:focus': {
          boxShadow: `0 0 0 ${relativeSize(2)} ${theme.colors.red[300]}`,
          borderColor: theme.colors.red[500],
        },
        // checked
        '&:checked': {
          borderWidth: relativeSize(3),
          backgroundOrigin: 'content-box',
          backgroundImage: `url("${svgToDataUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="#ffffff" d="M0 5.6L1.6 4l3.2 3.3 5.6-5.7L12 3.1l-7.2 7.4L0 5.6z"/></svg>')}")`,
          borderColor: 'transparent',
          backgroundColor: 'currentColor',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          transitionDuration: '100ms',
          transitionProperty: 'background-color',
        },
        '&:checked&:disabled': {
          backgroundColor: theme.colors.blue[300],
          borderColor: theme.colors.blue[300],
        },
        '&[data-invalid]&:checked': {
          color: theme.colors.red[500],
        },
        '&[data-invalid]&:checked&:disabled': {
          backgroundColor: theme.colors.red[300],
          borderColor: theme.colors.red[300],
        },
        // indeterminate
        '&:indeterminate': {
          borderWidth: relativeSize(3),
          backgroundOrigin: 'content-box',
          backgroundImage: `url("${svgToDataUri('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 2"><path fill="#ffffff" d="M0 0h10v2H0z"/></svg>')}")`,
          borderColor: 'transparent',
          backgroundColor: 'currentColor',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        },
        '&:indeterminate&:disabled': {
          color: theme.colors.blue[300],
        },
        '&[data-invalid]&:indeterminate': {
          color: theme.colors.red[500],
        },
        '&[data-invalid]&:indeterminate:disabled': {
          color: theme.colors.red[300],
        },
      },
    }

    addComponents(buttons);
  })
}

module.exports = {
  plugin,
  theme,
};
