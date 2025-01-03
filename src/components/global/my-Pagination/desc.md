# 组件封装说明

### 首先模板还是模板,只不过需要判断那些是传递的值,那些是不用传递的

### 第二,值的作用明确一下

+ 注意,这里的值是我们组件自身的值,名字必须和组件库的一致
+ size-change 条数变化处理函数
+ current-change 页码变化的处理函数
+ :current-page 当前的页码
+ :page-sizes 我们的展示条数选择器
+ :page-size 展示的条数
+ layout 布局和样式
+ :total 总条数

### 第三,我们判断那些值需要传递过来的

+ 两个函数,我们需要重写
+ :current-page 当前的页码
+ :page-sizes 选择器
+ :page-size 展示的条数
+ layout 可有可无
+ :total 必须的

### 第四,我们在子组件中,写props的处理并给他们的值本地化处理(起个名字),并作对应

+ :current-page 当前页 ==> pageNum
+ :page-sizes 选择器 ==>seleSizes
+ :page-size 默认条数 ==>item
+ layout 依旧是layout
+ :total 一致

### 第五,我们写值和传值的时候就发现了,有的值是我们需要对于父组件的值进行修改的,所以需要使用.sync修饰符

+ 当前的页码 :current-page.sync
+ 展示的条数 :page-size.sync
+ 两个需要做分别处理,都加上sync
+ 拿着两个的值,就需要做$emit处理了