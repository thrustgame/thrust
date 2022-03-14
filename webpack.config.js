const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build/thrust.js',
    path: `${__dirname}`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(ogg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'build/[path][hash][ext]'
        }
      },
    ]
  },
  resolve: {
    alias: {
      '@app': `${__dirname}/src`,
      '@assets': `${__dirname}/assets`,
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: `${__dirname}/assets/index.html` })
  ]
};
