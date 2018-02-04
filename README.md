# Bubble


[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()
[![npm (scoped)](https://img.shields.io/npm/v/@cycle/core.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
>a simple JavaScript Framework


![气泡](./bubble.jpg)
## About

A JavaScript library by liqi.

See the [project homepage](http://ZSI2017.github.io/Bubble).

## Usage (用法)

#### 字符串模板
```
Bubble.format(
   `字符串拼接的时候使用{0}，\
     {1}自定义拼接字符串`,
     "format",
     "就可以"
  )

运行结果：
    // 字符串拼接的时候使用format，就可以自定义拼接字符串`

```

#### 类数字判断
```
  Bubble.isNumeric("22")  // true；
  Bubble.isNumeric(22)   // true;

```

#### 数字判断
```
   Bubble.isNumber(22)    // true
   Bubble.isNumber("22")  // false
```

#### 日期类型判断
```
  Bubble.isDate()

```

#### 类型判断
```
  Bubble.type(22) === "number"  // true
  Bubble.type("22") === "string"   // true
  Bubble.type([])  === "array"     // true
  Bubble.type(null)  === "null"    //true
  ...
```

### [dom 选择器](./src/_dom.js)
```
Bubble.el('#h1-id')
Bubblebe.el('.title')
Bubble.el('=h1')

/*
   # -- id
   . --- class
   @ --- name
   = ---- TagName
   * ----- querySelectorAll
  */
```

### [event 事件操作](./src/_event.js)
 ```
  // 绑定事件
   Bubble.bind(Bubble.el("#btn-test"),"click",function(){
         console.log("i am clicked")
     })

  // 主动触发事件
  Bubble.dispatch(Bubble.el("#btn-test"),"click",{args:"1111"})

  // 接触事件（不能传入匿名函数，后面改进）
  Bubble.removeEvent(Bubble.el("#btn-test"),"click",fun)

 ```

 ### [自定义的keys方法](./src/_key.js)
```
   //自定义的遍历对象属性的方法，利用 for..in..  返回包含所有可枚举属性([[Enumerable]]特性设置为true)的字符串数组

   Bubble.keys(obj)
```

### [ 删除属性](./src/_remove.js)
```
   var arr = [1,2,3],
       obj = {1:'1',2:"2"};
  Bubble.remove(arr,2); //返回删除项
  Bubble.remove(obj,1)  // 返回最后的结果

```



## to do list
  - 移除grunt，选择其他打包工具
  - 常用javascript 方法封装
  - css 动画技巧 (待定...)
  - DOM 操作简单处理
  - Events 事件封装
  - virtual  dom
  - router 跳转
  - 加入单元测试


## Installation

Using Bower:

  <script src= "./dist/Bubble.js"></script>

Or grab the [source](https://github.com/ZSI2017/Bubble/dist/Bubble.js) ([minified](https://github.com/ZSI2017/Bubble/dist/Bubble.min.js)).

## Usage

Basic usage is as follows:

    Bubble();

For advanced usage, see the documentation.

## Documentation

Start with `docs/MAIN.md`.

## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
