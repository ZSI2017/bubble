/*
 *   渲染引擎， 简单的mvvm 框架
 */

Bubble.render = function(tpl) {


}

void function(){
  var fn = Bubble;
  fn.tokenize = tokenize;




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
        str = str.slice(idnex +openTag.length)
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
      }white(str.length)
      return ret
}




}()
