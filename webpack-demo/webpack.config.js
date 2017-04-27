
const webpack = require('webpack');
const path = require('path');

let config = {
    // TODO: Add common Configuration
    module: {},
};

var serverConfig = Object.assign({}, config, {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {modules: false}]
          ]
        }
      }]
    }]
  }
});

var clientConfig = Object.assign({}, config, {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'client.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {modules: false}]
          ]
        }
      }]
    }]
  }
});

// Return Array of Configurations
module.exports = [
    serverConfig, clientConfig,
];
