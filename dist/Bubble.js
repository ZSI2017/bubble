(function(global, factory) {

  "use strict";

  if( typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document?
       factory(global,true):function(w) {
         if(!w.document ) {
           throw new Error("bubble requires a window with document");
         }
         return factory( w );
       };
  } else {
    factory(global);
  }

}) (typeof window !== "undefined" ? window :this,function(window,noGlobal){

   "use strict";


/* Bubble main */

// Base function.
var Bubble = function() {
  // Add functionality here.
  // return true;
};


// 渲染html 模板
// 第一个参数是   传入的字符串，后面的参数对应的{0-10}，分别表示传入的变量。
Bubble.format = function() {
   if (arguments.length == 0) {
     return "";
   }
   var str = arguments[0];
   for (var i = 1, len = arguments.length; i < len; i++) {
     var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
     str = str.replace(re, arguments[i]);
   }
   return str;
};


var class2type = {
  "null":"null",
  "NaN":"NaN",
  "undefined":"undefined",
  "[object global]":"window",
  "[objectDOMWindow]":"window"
};

"Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList".split(",").forEach(function(name,idx){
  class2type["[object "+name+"]"] = name.toLowerCase();
});

Bubble.type=function(obj) {
  return obj == void 0 ?
                "":obj == null?
                String(obj) :
                class2type[toString.call(obj)] || "object"
};


// 判断 变量是否为数字。 可以是字符串，或者外形看上去象数字
// 鸭子类型：  鸭子测试-- 当看到一只鸟走起来像鸭子，叫起来也像鸭子，那么这只鸟就可以被称为鸭子。
Bubble.isNumeric = function(obj) {
  return obj - parseFloat(obj) >= 0 ;
};


Bubble.isNumber = function(o){
  return '[object Number]' == {}.toString.call(o)
};


Bubble.isDate = function(o) {
  return {}.toString.call(0) === "[object Date]" && o.toString() !== 'Invalid Date'
};



// Version.
Bubble.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
  if(!noGlobal) {
    window.Bubble = window.be = Bubble;
}
 return Bubble;
});
