/*
 *  兼容  自定义实现 Object.keys方法  方法，无法遍历名为 valueOf, toString 的属性名
 */
Bubble.keys = function(obj) {
  var a = [];
  for(a[a.length] in obj);
  return a;
}
