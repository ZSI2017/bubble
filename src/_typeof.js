var class2type = {
  "null":"Null",
  "NaN":"NaN",
  "undefined":"Undefined",
  "[object global]":"Window",
  "[objectDOMWindow]":"Window"
};

"Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList".split(",").forEach(function(name,idx){
  class2type["[object "+name+"]"] = name.toLowerCase();
})

Bubble.type=function(obj) {
  return obj == void 0 ?
                "":obj == null?
                String(obj) :
                class2type[toString.call(obj)] || "object"
}
