import WebPack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import fs from 'fs';
import PageInfo from './config.json';

const srcDir = 'src';
const isProduction = process.env.NODE_ENV === 'production';

// Get slides/logos and insert them into an array to inject later

const slidesLogosDirs = ['assets/logos', 'assets/slides'];
const dirs = {};

slidesLogosDirs.forEach((dir) => {
  const key = dir.replace('assets/', '');
  dirs[key] = [];
  fs.readdirSync(dir, { encoding: 'utf8' }).forEach((file) => {
    if (!fs.statSync(`./${dir}/${file}`).isDirectory()) {
      dirs[key].push(file);
    }
  });
});

module.exports = {
  entry: `./${srcDir}/App/index.js`,
  output: {
    path: __dirname,
    publicPath: PageInfo.path,
    filename: 'js/bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: '> 5%'
                  })
                ]
              }
            },
            'sass-loader',
            {
              loader: '@epegzz/sass-vars-loader',
              options: {
                vars: {
                  theme: PageInfo.color
                }
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]'
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: true
              },
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['css', 'js', 'img', 'fonts'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle.[hash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: `${srcDir}/index.html`,
      page: PageInfo
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: /bundle\.([0-9a-zA-Z])+\.js/
    }),
    new WebPack.optimize.UglifyJsPlugin({
      minimize: isProduction,
      compress: {
        warnings: false
      },
    }),
    new WebPack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      vars: JSON.stringify({
        logos: dirs.logos,
        slides: dirs.slides
      })
    })
  ]
};
