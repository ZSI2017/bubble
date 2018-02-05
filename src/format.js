// 渲染html 模板
// 第一个参数是   传入的字符串，后面的参数对应的{0-10}，分别表示传入的变量。
// var reg = /\{'+(i - 1)+'\\}/
function format(str,object) {
  var array = Array.prototype.slice.call(arguments,1);
  return str.replace(/\\?\#{([^{}]+)\}/gm,function(match,name){
    console.log(match);
    if(match.charAt(0) == '\\')
      return match.slice(1)
    var index = Number(name)
    if(index>=0)
      return array[index];
    if(object && object[name] !== void 0)
      return object[name];
    return '';
  })
}

Bubble.format = format;
