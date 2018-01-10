var path = require('path');

module.exports = {
  entry: "./script/input.js",
  output: {
    filename: "src/resources/js/script.js"
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};