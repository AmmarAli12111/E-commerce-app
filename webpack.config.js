// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const config = {
    mode: mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "bundle.min.js" : "bundle.js",
      assetModuleFilename: "assets/images/[hash][ext][query]",
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false, // remove comments
            },
          },
          extractComments: false, // do not extract comments to a separate file
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },

        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // This is required for asset imports in CSS, such as url()
              options: { publicPath: "" },
            },
            ,
            "css-loader",
          ],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
  };
  if (!isProduction) {
    // Development-specific configurations
    config.devServer = {
      static: {
        directory: path.join(__dirname, "dist"), // Set your public directory path
      },
      port: 3000,
      open: true,
      historyApiFallback: true,
    };
  }
  return config;
};
