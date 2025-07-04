/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint func-names: 0 */
/* eslint global-require: 0 */

module.exports = function (/* ctx */) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'firebase',
      'router-auth',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.sass',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: false,

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QCheckbox',
        'QDialog',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QSpace',
        'QInput',
        'QDate',
        'QPopupProxy',
        'QTime',
        'QForm',
        'QBanner',
        'QSelect',
        'QScrollArea',
        'QToggle',
        'QTabPanel',
        'QTabPanels',
        'QSeparator',
        'QSpinner',
      ],

      directives: [
        'Ripple',
        'ClosePopup',
        'TouchHold',
      ],

      // Quasar plugins
      plugins: [
        'LocalStorage',
        'Dialog',
        'Notify',
      ],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // FIXED: Commented out the problematic chainWebpack configuration
      // The issue was with how the sass-loader was being configured
      /*
      chainWebpack(chain) {
        // Configure sass-loader to avoid the 'nested' output style error
        chain.module
          .rule('scss')
          .use('sass-loader')
          .tap((options) => ({
            ...options,
            sassOptions: {
              ...(options && options.sassOptions),
              outputStyle: 'expanded',
            },
          }));
      },
      */

      // Comprehensive fix for sass-loader issues
      extendWebpack(cfg) {
        // Fix sass-loader configurations
        const updateSassLoader = (rule) => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach((use) => {
              if (use.loader && use.loader.includes('sass-loader')) {
                // Ensure options exist
                use.options = use.options || {};
                // Hdle different sass-loader versions
                if (use.options.sassOptions) {
                  use.options.sassOptions.outputStyle = 'expanded';
                } else {
                  use.options.sassOptions = { outputStyle: 'expanded' };
                }
                // Remove any nested outputStyle that might be set elsewhere
                if (use.options.outputStyle) {
                  delete use.options.outputStyle;
                }
              }
            });
          }

          // Handle oneOf rules (for different conditions)
          if (rule.oneOf && Array.isArray(rule.oneOf)) {
            rule.oneOf.forEach(updateSassLoader);
          }
        };

        // Apply to all rules
        cfg.module.rules.forEach(updateSassLoader);
      },

      // modern: true, // https://quasar.dev/quasar-cli/modern-build
      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations

    // or embedding only specific animations
    animations: [
      'zoomIn',
      'zoomOut',
    ],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Universal Task Manager App',
        short_name: 'Universal Task Manager App',
        description: 'Cross-platform task manager app for Web, Android, iOS, Mac & Windows based on Quasar Framework and Vue.js',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app',
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'
      nodeIntegration: true,
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // platform: 'win32',
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'universal-task-manager',
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
};
