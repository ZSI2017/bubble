/* 移除 数组中对应的项 */
Bubble.remove = function(target,item){
  if(target === null || typeof target === "undefined") return
  if(typeof target !== "object") {
    target = [target];
  }
  if(this.isArray(target)){
    var index = Array.indexOf.call(target,item);
    if(index > -1) {
      return target.splice(index,1);
    }
  }else{
    for(var key in target) {
      if(Object.prototype.hasOwnProperty.call(target,key)){

      }
    }
  }
}
// def(arrayProto, '$remove', function $remove(item) {
//   /* istanbul ignore if */
//   if (!this.length) return;
//   var index = indexOf(this, item);
//   if (index > -1) {
//     return this.splice(index, 1);
//   }
// });
