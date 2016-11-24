//author:'qi'

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');
var path = require('path');

var root_path = path.resolve(__dirname);
var app_path = path.resolve(root_path,'app');
var build_path = path.resolve(root_path,'build');
var view_path = path.resolve(app_path,'view');

var entries = getEntries('app/view/**/*.jsx');
var chunks = Object.keys(entries);

var extractCSS = new ExtractTextPlugin("./css/[name].min.css");
var extractLESS = new ExtractTextPlugin('./css/[name].min.css.less');

var config = {
  entry: entries,
  output:{
    path: build_path,
    filename:"./js/[name].js",
    publicPath:""
  },
  module:{
    loaders:[ //loader
      {test:/\.json$/,loader:"json"},
      {test: /\.scss$/,loader: 'style-loader!css-loader!sass-loader' },
      {test : /\.less$/,loader: ExtractTextPlugin.extract('style', 'css!less')},
      {test:/\.js[x]?$/,exclude:/node_modules/,loader:'babel-loader',query:{presets:['react','es2015']}},
      {test:/\.css$/,loader:extractCSS.extract('css-loader')},
      {test:/\.(png|jpg|gif|woff|ttf)$/,loader:'url-loader?limit=10000&name=/images/[name][hash].[ext]'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss:[
    require('autoprefixer')
  ],
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({ //提取公共模块
      name:'vendors',
      chunk:chunks,
      minChunks:chunks.length
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载，实时刷新
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      },
      except:['$super','$','exports','require']
    }), //压缩插件
    extractCSS, //缓存css
    extractLESS,
    new webpack.ProvidePlugin({ //将jquery加入全局变量
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    }),
    new webpack.DefinePlugin({ //生成生产环境命令
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    })
  ]
};

var pages = Object.keys(entries);

pages.forEach(function(name){
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
     config.entry[name] = entries[name];

     // 每个页面生成一个html
     var plugin = new HtmlWebpackPlugin({
         // 生成出来的html文件名
         filename: name + '.html',
         // 每个html的模版，这里多个页面使用同一个模版
         template: './app/templates/index.html',
         // 自动将引用插入html
         inject: true,
         title:name,
         // 每个html引用的js模块，也可以在这里加上vendor等公用模块
         chunks: [name,'vendors']
     });
     config.plugins.push(plugin);
});

// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath),
       entries = {};

     files.forEach(function(filepath) {
         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];

         entries[name] = './' + filepath;
     });

     return entries;
}


module.exports = config;
