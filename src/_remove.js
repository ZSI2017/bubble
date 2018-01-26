/* 移除 数组 或对象中的某个值。中对应的项 */

Bubble.remove = function(target,item){
  if(target === null || typeof target === "undefined") return
  if(typeof target !== "object") {
    target = [target];
  }
  if(this.isArray(target)){
    var index = Array.prototype.indexOf.call(target,item);
    if(index > -1) {
      // 该删除操作，改变了原数组，返回被删除的项。
      return target.splice(index,1);
    }
  }else{
    for(var key in target) {
      if(Object.prototype.hasOwnProperty.call(target,key)){
        if(key === item){
          delete target[key]
        }
      }
    }
    return target;
  }
}
