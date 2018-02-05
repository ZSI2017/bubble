// 渲染html 模板
// 第一个参数是   传入的字符串，后面的参数对应的{0-10}，分别表示传入的变量。
Bubble.format = function() {
 if (arguments.length === 0) {
   return "";
 }
 var str = arguments[0];
 for (var i = 1, len = arguments.length; i < len; i++) {
   var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
   str = str.replace(re, arguments[i]);
 }
 return str;
};
// var reg = /\{'+(i - 1)+'\\}/
function format(str,object) {
  var array = Array.prototype.slice.call(arguments,1);
  return str.replace(/\\?\#{([^{}]+)\}/gm,function(match,name){
    if(match.charAt(0) == '\\')
      return match.slice(1);
    var index = Number(name)
    if(index>=0)
      return array[index];
    if(object && object[name] !== void 0)
      return object[name];
    return '';
  })

}
