##脚手架使用说明( Intro )

###安装步骤( Installation steps )

使用yeoman安装(Using Yeman to install)

首先安装yeoman()

```javascript
npm install -g yo
```

通过npm直接安装脚手架

```javascript
npm install -g generator-reactpackage-kit
```

新建项目文件夹，在文件夹下运行：（mkdir dirname cd dirname）

```javascript
yo reactpackage-kit
```

不出意外的话，会生成如下目录，Bazinga!!! (project category)

* app

  +components        组件库，存放公用组件和模块

  +images                需要自己添加

  +templates            html模板，如果无特殊需求，只需要默认模板即可

  +utils		      引用的第三方插件或者自己编写的插件，如ajax.js等

  +view	              视图页面

  ​    +index               文件夹可自由命名，默认仅供参考

  ​	-index.jsx       页面逻辑用jsx编写

  ​	-style.less      页面样式

  ​    -about

* build                       项目最终生成的文件，页面会自动引入相关资源，棒棒哒

  +js

  +css

  home.html

  about.html

* .babelrc                  配置babel文件，编译es6

* webpack.config.js       webpack开发环境配置

* webpack.production.config.js           webpack生产环境配置

* Readme.md          别说话，读我

### 运行命令

首次使用如下命令安装所有依赖包：

```javascript
npm install 
```

默认安装了ant design框架，如无需要可在package.json先删去再安装 :)

开发时只有两个命令，坦率的讲，只需要这两个就够了： 

```
npm start  //启动服务，改变代码，实时刷新哟
npm run build   //开发完成之后的打包，就是这么简单dei si
```
