const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withPWA = require("next-pwa");

const nextConfig = {
  publicRuntimeConfig: {
    BASE_URL: 'https://admin.theperfecthost.app',
  },
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: "CacheFirst",
        options: {
          cacheName: "assets-cache",
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/code\.getmdl\.io.*/,
        handler: "CacheFirst",
        options: {
          cacheName: "lib-cache"
        }
      },
      {
        urlPattern: /^http?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "http-cache",
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  }
};

module.exports = withPlugins(
  [
    [withOffline],
    [withImages],
    [withCSS],
    [withSass],
    [
      withPWA,
      {
        pwa: {
          dest: "public"
        }
      }
    ]
  ],
  nextConfig
);
