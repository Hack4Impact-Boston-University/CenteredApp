
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
  module: {
    rules: [
      {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader/url'},
              {loader: 'file-loader'},
          ],
        },
      {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "file-loader?name=/public/img/[name].[ext]",
          options: {},
          },
        ],
      },
    ]
},
plugins: [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })
]
}