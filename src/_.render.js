/*
 *   渲染引擎， 简单的mvvm 框架
 *   <<JavaScript 框架设计>> 前端模板引擎
 *   02-15 
 */

Bubble.render = function (tpl) {


}

void function () {
	var fn = Bubble;
	fn.tokenize = tokenize
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
			index = index === -1 ? str.length : index
			var value = str.slice(0, index)
			// 抽取{{ 前面的静态内容
			ret.push({
				expr: value,
				type: "text"
			})
			// 改变str字符串本身
			str = str.slice(index + openTag.length)
			if (str) {
				index = str.indexOf(closeTag)
				var value = str.slice(0, index)
				// 抽取 {{与}} 中间的动态内容
				// 添加判断 for 或者 if 循环语句
				value = value.trim();
				if (/^(if|for|})/.test(value)) {
					ret.push({
						expr: value,
						type: 'logic'
					})
				} else {
					ret.push({
						expr: value,
						type: "js"
					})
				}
				// 改变 str 字符串本身
				str = str.slice(index + closeTag.length)
			}
		} while (str.length)
		return ret
	}


	// function render(str) {
	// 	var tokens = tokenize(str)
	// 	var ret = []
	// 	for (var i = 0, token; token = tokens[i++];) {
	// 		if (token.type === "text") {
	// 			ret.push('"' + token.expr + '"')
	// 		} else {
	// 			ret.push(token.expr)
	// 		}
	// 	}
	// 	console.log("return " + ret.join('+'));
	// }

  // function addPrefix(str) {
  //   var rident = /[$a-zA-Z][$a-zA-Z0-9_]*/g
  //   var rproperty = /\.\s*[\w\.\$]/g
  //   var rfill = /\?\?\d+/g
  //   var number = 1
  //   var stringPool = {}
  //   // 通过dig 和 fill仿佛 ，将子级属性变成 ？？12 这样的字符串
  //   // stringPool 不保留子级改变前的值
  //   function dig(a) {
  //     var key = "??"+number++
  //     stringPool[key] = a
  //     return key
  //   }
  //   function fill(a) {
  //     return stringPool[a]
  //   }
  //   var js = str.replace(rproperty,dig)  // 转换子级属性
  //   js = js.replace(rident,function(a){
  //     return 'data.'+a
  //   })
  //   return js.replace(rfill,fill);
  // }

  function addPrefix(str) {
    var rguide = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[\$\w])/g
    return str.replace(rguide,'$1data.')
  }
// taking
  function render(str) {
		var quote = JSON.stringify
    var stringPool = {}
    var tokens = tokenize(str)
    var ret = ['var _data_= [];']
    for(var i = 0,token;token = tokens[i++];) {
      if(token.type === "text") {
        ret.push(addView(quote(token.expr)))
      }else if(token.type === 'logic') {
        ret.push(addPrefix(token.expr))
      }else {
        ret.push(addView(addPrefix(token.expr)))
      }
    }
    ret.push('return _data_.join("")')
    return new Function("data",ret.join('\n'))
  }

  function addView(s) {
    return '_data_.push('+s+')'
  }

  // function render(str) {
  //   // stringPool = {}
  //   var quote = JSON.stringify;
  //   var tokens = tokenize(str)
  //   var ret = ['var _data_ = []']
  //   tokens.forEach(function(token){
  //     if(token.type === 'text') {
  //       ret.push(addView(quote(token.expr)))
  //     }else if(token.type === 'logic') {
  //       //  添加 对象名前缀
  //       ret.push(addPrefix(token.expr))
  //     }else {
  //       ret.push(addView(addPrefix(token.expr)))
  //     }
  //   })
  //   ret.push("return _data_.join('')")
  //   console.log(ret.join('\n'))
  // }
}()
