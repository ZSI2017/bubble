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
}
