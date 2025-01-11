# vue2zxerp

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 技术栈

+ Vue2 语法
    + data
    + methods
    + components
    + props
+ Vue Cli @3 脚手架
+ Vue router 路由库
    + router-view
    + Recursive
+ Element UI 组件库
+ Sass CSS的预处理器
    + Sass-loader 加载器
+ axios 网络请求库

# dev log及技术流总结

## 截止到12.30日

+ 项目的搭建 vue-cli
+ 登录的完成 axios,md5
+ route 搭建 路由的数据处理(递归路由)
+ axios 的封装与http Type的处理封装
+ 面包屑
+ 企业首页 =栅栏布局+echarts图表+count to数字滚动插件

## 12.30日任务

+ 企业首页完成(echarts组件的封装)
+ map的使用
+ 办公审批页完成 (表单+axios)
+ 办公管理页 + table动态数据筛选器!! (重点:使用了过滤器+Map+slot.scope)
+ 实现的部分功能的( 局部的过滤器+ 全局过滤器 )的封装
+ 分页器封装 (注意子组件修改父组件数据的.sync修饰符+$emit)
+ 表格上的搜索(请求参数的变化)

## 1.3日任务

+ .sync实现分页器组件的同步
+ 办公管理页面
    + 提交 (直接提交请求,更新数据列表)
    + 删除 (封装dialog对话框,点击确定删除后发送请求,删除数据)
    + 编辑 (需要封装对话表单和确认编辑行) --搁置

## 1.7日任务

+ 一审页面的完善(对于dialog的type复用)

## 1.8日任务

+ 档案管理页面处理
+ 生成凭证逻辑处理
+ 下载凭证逻辑处理
    + 第一个请求拿数据和path,download方法用oath发送AJAX请求,拿到bolb文件流
    + 第二个请求,执行下载逻辑[包含一个动态a标签方法,并触发下载])
+ 定义env环境变量
    + .env.development
    + .env.production
    + 内容必须以VUE_APP开头,并不能包含任何特殊字符
+ 实现文件上传功能
    + 更新了restfulAPI的一种新格式
+ 省市区的次级联动器

## 1.11日任务

+ 差旅审批页面
    + 发票文件显示
+ 创建员工页面
  + 