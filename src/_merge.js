// 多个对象 的合并方法
Bubble.merge =  function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if(typeof value === "object" ){
          target[prop] = Bubble.merge(target[prop]||{},value)
        }else {
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
  }
  return target;
};
