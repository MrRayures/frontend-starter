/** @type {import('tailwindcss').Config} */
module.exports = {
    content: {
        relative: true,
        files: [
            'src/components/**/*.html',
        ],
    },
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
          'blue': '#1fb6ff',
          'pink': '#ff49db',
          'orange': '#ff7849',
          'green': '#13ce66',
          'gray-dark': '#273444',
          'gray': '#8492a6',
          'gray-light': '#d3dce6',
        },
        fontFamily: {
            'primary': ['Arial', 'sans-serif'],
            'secondary': ['Verdana', 'Geneva', 'sans-serif'],
        },
        fontSize: {
            xs: '1.4rem',
            sm: '1.4rem',
            base: '1.6rem',
            lg: '1.8rem',
            xl: '2rem',
        }
    },
    plugins: [],
}