/** @type {import('tailwindcss').Config} */

module.exports = {
   content: ['./*.html', './js/*.js', './node_modules/preline/dist/*.js', './js/funcs/*.js'],
   theme: {
      extend: {
         colors: {
            primaryColor: '#2bce56',
            darkColor: '#464749',
            instagram1: '#f9ce34',
            instagram2: '#ee2a7b',
            instagram3: '#6228d7',
            telegram: '#2AABEE',
         },
         fontFamily: {
            IRANSans: ['IRANSans'],
         },
         padding: {
            4.5: '1.125rem',
         },
         gradientColorStops: {
            blogGradient: 'linear-gradient(180deg,#fff0,#fffc 74.19%,#fff)',
         },
      },
   },
   plugins: [require('preline/plugin')],
};
