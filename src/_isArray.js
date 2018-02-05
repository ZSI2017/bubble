// 数组精准匹配
Bubble.isArray= function(arr){
  return arr !== null && typeof arr === "object" && 'splice' in arr && 'join' in arr;
}
