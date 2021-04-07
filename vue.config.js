// var fs = require('fs');

module.exports = {
  transpileDependencies: ["vuetify"],

  // devServer: {
  //   open: process.platform === 'darwin',
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: {
  //     key: fs.readFileSync('../backend/.certs/key.pem'),
  //     cert: fs.readFileSync('../backend/.certs/cert.pem'),
  //   },
  //   hotOnly: false,
  // },
  // lintOnSave: false,
  pwa: {
    themeColor: '#2396F3'
  },

  lintOnSave: false
};
