/*
 *   渲染引擎， 简单的mvvm 框架
 *   <<JavaScript 框架设计>> 前端模板引擎
 */

Bubble.render = function(tpl) {


}

void function(){
  var fn = Bubble;
  fn.tokenize = tokeniz
  fn.render = render
/**
 *  拆分模板字符串
 */
function tokenize(str) {
  var openTag = "<%",
      closeTag = "%>",
      ret = [];
      do {
        var index = str.indexOf(openTag)
        index = index === -1?str.length :index
        var value = str.slice(0,index)
        // 抽取{{ 前面的静态内容
        ret.push({
          expr:value,
          type:"text"
        })
        // 改变str字符串本身
        str = str.slice(index +openTag.length)
        if(str) {
          index = str.indexOf(closeTag)
          var value = str.slice(0,index)
          // 抽取 {{与}} 中间的动态内容
          ret.push({
            expr:value.trim(),
            type:"js"
          })
          // 改变 str 字符串本身
          str = str.slice(index+closeTag.length)
        }
      }while(str.length)
      return ret
}

function render(str) {
  var tokens = tokenize(str)
  var ret = []
  for(var i =0,token;token = tokens[i++];){
    if(token.type === "text") {
      ret.push('"'+token.expr + '"')
    }else {
      ret.push(token.expr)
    }
  }
  console.log("return "+ret.join('+'));
}


}()
