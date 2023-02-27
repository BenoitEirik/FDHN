/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#eab308',
          secondary: '#F9D72F',
          accent: '#523124',
          neutral: '#523124',
          'base-100': '#ffffff'
        }
      }
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ]
}
