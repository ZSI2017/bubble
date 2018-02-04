var class2type = {
  "null":"null",
  "NaN":"NaN",
  "undefined":"undefined",
  "[object global]":"window",
  "[objectDOMWindow]":"window"
};

"Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList,Null".split(",").forEach(function(name,idx){
  class2type["[object "+name+"]"] = name.toLowerCase();
});

Bubble.type=function(obj) {
  return obj === void 0 ?
                "":obj === null?
                String(obj) :
                class2type[toString.call(obj)] || "object";
};
