Bubble.isNumber = function(o){
  return '[object Number]' == {}.toString.call(o);
};
