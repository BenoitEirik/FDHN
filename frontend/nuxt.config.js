export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fonds de dotation de L\'Homme Nouveau',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Madame, Mademoiselle, Monsieur, au fil des grandes étapes de notre existence, nous travaillons, réalisons des projets, prenons des engagements ; nous tissons des liens et surtout, nous vivons, jour après jour, l’Église a reçu de Notre Seigneur et qu’Elle nous transmet... Et, plus le temps passe, plus nous avons à cœur de voir ce nous avons nous-mêmes reçu porter du fruit. Nous voudrions transmettre ce qui a été le moteur de notre vie, la Foi, l’Espérance et la Charité.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' },
      { rel: 'manifest', href: 'favicon/site.webmanifest' }
    ]
  },

  // to load env var in Nuxt component template
  publicRuntimeConfig: {
    STRIPE_PK: process.env.STRIPE_PK,
    COCKPIT: {
      URL: 'https://admin.fdhn.fr',
      ASSETS: 'https://admin.fdhn.fr/storage/uploads',
      PK: 'API-3c47b03055ec7ccd975fa5858669fdb95746f55c'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // color1: FFDE01
  // color2: FFB200
  // color3: 303030
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-stripe.js', mode: 'client' },
    { src: '@/plugins/vue-stepper.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'nuxt-protected-mailto',
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://fdhn.fr',
    exclude: [
      '/payment-success'
    ]
  },

  robots: {
    UserAgent: '*',
    Disallow: '/payment-success',
    Sitemap: 'https://fdhn.fr/sitemap.xml'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  serverMiddleware: {
    '/api/one-time': '~/api/one-time.js',
    '/api/subscription': '~/api/subscription.js'
  },

  image: {
    domains: ['fdhn.fr'],
    dir: 'assets/images',
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      // Need for build vue-stepper
      'vue-stepper'
    ],
    loaders: {
      vue: {
        prettify: false
      }
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    html: {
      // Necessary for nuxt-protected-mailto
      minify: {
        decodeEntities: false
      }
    }
  }
}
