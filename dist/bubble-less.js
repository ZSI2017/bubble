(function(global, factory) {

  "use strict";

  if( typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document?
       factory(global,true):function(w) {
         if(!w.document ) {
           throw new Error("bubble requires a window with document");
         }
         return factory( w );
       };
  } else {
    factory(global);
  }

}) (typeof window !== "undefined" ? window :this,function(window,noGlobal){

   "use strict";


/* Bubble main */

// Base function.
var Bubble = function() {
  // Add functionality here.
  // return true;
};


/*! Salt.js DOM Selector Lib. By @james2doyle */
/*  简单的都没选择器  */
"use strict";
Bubble.el= function(selector, context, undefined) {
  // an object containing the matching keys and native get commands
  var matches = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  }[selector[0]]; // you can treat a string as an array of characters
  // now pass the selector without the key/first character
  var el = (((context === undefined) ? document: context)[matches](selector.slice(1)));
  // if there is one element than return the 0 element
  return ((el.length < 2) ? el[0]: el);
};


// 渲染html 模板
// 第一个参数是   传入的字符串，后面的参数对应的{0-10}，分别表示传入的变量。
// var reg = /\{'+(i - 1)+'\\}/
function format(str,object) {
  var array = Array.prototype.slice.call(arguments,1);
  return str.replace(/\\?\#{([^{}]+)\}/gm,function(match,name){
    if(match.charAt(0) == '\\')
      return match.slice(1)
    var index = Number(name)
    if(index>=0) return array[index];
    if(object && object[name] !== void 0)
      return object[name];
    return '';
  })
}

Bubble.format = format;


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


// 判断 变量是否为数字。 可以是字符串，或者外形看上去象数字
// 鸭子类型：  鸭子测试-- 当看到一只鸟走起来像鸭子，叫起来也像鸭子，那么这只鸟就可以被称为鸭子。
Bubble.isNumeric = function(obj) {
  return obj - parseFloat(obj) >= 0 ;
};


Bubble.isNumber = function(o){
  return '[object Number]' == {}.toString.call(o);
};


// 数组精准匹配
Bubble.isArray= function(arr){
  return arr !== null && typeof arr === "object" && 'splice' in arr && 'join' in arr;
}


Bubble.isDate = function(o) {
  return {}.toString.call(0) === "[object Date]" && o.toString() !== 'Invalid Date';
};


/*
 *  兼容  自定义实现 Object.keys方法  方法，无法遍历名为 valueOf, toString 的属性名
 */
Bubble.keys = function(obj) {
  var a = [];
  for(a[a.length] in obj);
  return a;
}


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
        if(key === item.toString()){
          delete target[key]
        }
      }
    }
    return target;
  }
}


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


/*
 *  用于在生产环境下，清除 log
 */
void function clearLog(){
  var fn = Bubble;
  var emptyFunction = function(){};
  function clearlog(){
    console.clear();
    fn.keys(console).forEach(function(item){
      console[item] = emptyFunction;
    })
  }
  fn.clearLog = clearlog;
}()


/* 为一组 checkbox 动态绑定数组*/
"use strict";
Bubble.cModel = function(checkbox){
  var vModel = [], that = this;
  checkbox.forEach(function(item){
    that.addEvent(item,"change",function(e){
      if(that.isArray(vModel)){
        if(vModel.indexOf(e.target.value)<0){
          vModel.push(e.target.value);
        }
      }else {
        that.remove(vModel,e.target.value);
      }
    });
  });
};


/*
 *   渲染引擎， 简单的mvvm 框架
 *   <<JavaScript 框架设计>> 前端模板引擎
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


/* 事件绑定 ，删除  主动触发  */
void function event(){
   var fn = Bubble;
    /**
     *
     *  @method addEvent
     *  @param  {Node}   el            绑定的dom引用
     *  @param  {String}   type        点击的事件类型
     *  @param  {Function} callback   绑定的回调函数
     *  @param  {Boolean}   useCapture  是否在冒泡阶段捕获
     */
    function addEvent(el,type,callback,useCapture) {
      if(el.dispatchEvent) {
        el.addEventListener(type,callback,!!useCapture)
      }else {
        el.attachEvent("on"+type,callback,!!useCapture);
      }
    }
    /* 移除事件  */
    function removeEvent(el,type,callback,useCapture) {
      if(el.dispatchEvent) {
        el.removeEventListener(type,callback,!!useCapture)
      }else {
        el.deleteEvent(type,callback,!!useCapture)
      }
    }
    /* 主动触发事件 */
    function dispatchEvent(el,type,args,event) {
      args = args || {}
      if(el.dispatchEvent) {
        event = new CustomEvent(type,args)
        // 老式的创建方法。
        // event = document.createEvent('HTMLEvents');
        // event.initEvent(type,true,true);
      }else {
        event = document.createEventObject();
      }
      if(el.dispatchEvent) {
        try{
          el.dispatchEvent(event);
        }catch(e){
          console.log(e)
        }
      }else {
        el.fireEvent('on'+type,event);
      }
    }

    fn.bind = function(el,type,callback,useCapture){
      try{
        addEvent(el,type,callback,useCapture);
        return this;
      }catch(e) {
        console.error(e)
      }
    }

    fn.unbind = function(type,callback,useCapture) {
      try{
        removeEvent(el,type,callback,useCapture);
        return this;
      }catch(e) {
        console.error(e)
      }
    }

    fn.dispatch = function(el,type,args,event) {
      try{
        dispatchEvent(el,type,args,event)
        return this;
      }catch(e) {
        console.error(e);
      }
    }
}()


let internalAxios = Bubble.axios = {
    defaultAjaxConfig:{
        adapter: xhrAdatpter,
        timeout:0,
        maxContentLength:-1,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        transformResponse:[function transformResponse(data) {
          if(typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch(e){ }
          }
          return data;
        }]
    }
};
internalAxios.request =function request(config) {
  console.log("into request")
  // Allow for axios('example/url'[,config]) a la fetch API
  if(typeof config === 'string'){
    conifg = Bubble.merge({url:arguments[0]},arguments[1]);
  };
  config = Bubble.merge(internalAxios.defaultAjaxConfig,{methods:'get'},config);

  // var promise = Promise.resolve(config);
  // promise = promise.then(xhrAdatpter(config));
  return xhrAdatpter(config);
};

try{
  ['delete','get','head','options'].forEach(function(method){
    internalAxios[method] = function(url,config) {
      return internalAxios.request(Bubble.merge(config ||{},{
        method,
        url
      }));
    };
  });
}catch(e){
  console.log("init catch")
  console.log(e)
}

['post','put','patch'].forEach(function(method){
  internalAxios[method] = function(url,data,config) {
    return internalAxios.request(Bubble.merge(config || {},{
      method,
      url,
      data
    }))
  }
})

function xhrAdatpter(config){
  return new Promise(function dispatchXhrRequest(resolve,reject){
    config = Bubble.merge({},internalAxios.defaultAjaxConfig,config);
    var requestData = config.data;
    var requestHeaders = config.headers;
    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;
    request.open(config.method.toUpperCase(),buildURL(config.url,config.params,config.paramsSerizlizer),true);
    request.timeout = config.timeout;
    request.onload = function() {
      if(!request || (request.readyState !== 4&&!xDomain)){
        return;
      }
      if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)){
        return;
      }
      var responseData = !config.responseType || config.responseType === "test" ? request.responseText:request.response;
      var responseHeaders = null;
      var response = {
        data:responseData,
        status:request.status === 1223 ?204:request.status,
        statusText:request.status === 1223 ? 'No Content': request.statusText,
        headers:responseHeaders,
      }
      settle(resolve,reject,response);
      request = null
    }
    request.onerror = function handleError(){
       reject(createError(new Error("Network Error"),config,null,request,null))
       request = null;
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(new Error("timeout of " + config.timeout + "ms "),config,"ECONNABORTED",request))
      request = null;
    }
    if(config.withCredentials) {
      request.withCredentials = true;
    }
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if('setRequestHeader' in request) {
      for(var key in requestHeaders) {
        if(Object.prototype.hasOwnProperty.call(requestHeaders, key)){
          let val = requestHeaders[key];
          if(typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requesetHeaders[key];
          }else {
            request.setRequestHeader(key,val);
        }}
      }
     }
    if(config.responseType) {
      try {
        request.responseType = config.responseType;
      }catch(e) {
        if(config.responseType !== "json") {
          throw e;
        }
      }
    }
    request.send(requestData);
  })
}

function settle(resolve,reject,response){
  resolve(response);
  // var validateStatus = response.config.validateStatus;
  // if(!response.status || ! !validateStatus || validateStatus(response.status)) {
  //     resolve(response);
  // }else {
  //     reject(createError(new Error(response.status),response.config,null,response.request,response))
  // }
}

function buildURL(url,params,paramsSerizlizer){
  console.log("into build URL");
  if(!params) return url;
  var sericalizedParams;
  if(paramsSerizlizer) {
    sericalizedParams = paramsSerizlizer(params);
  }else {
    var parts = [];
    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
          // fn.call(null, obj[key], key, obj);
          let val = params[key]
          if(val === null || typeof val === "undefined"){
            return;
          }
          console.log(Bubble)
          if(Bubble.isArray(val)){
            key = key +'[]';
          }else {
            val = [val];
          }
          val.forEach(function(item,index){
            if(Bubble.isDate(item)){
              item = item.toISOString();
            }else if(typeof item === "object"&&item !== null){
              item = JSON.stringify(item)
            }
            parts.push(encode(key) + '='+encode(item))
          })

      }
   }
    sericalizedParams = parts.join("&")
  }
  if(sericalizedParams) {
    url += (url.indexOf('?') === -1?'?':'&') + sericalizedParams;
  }
  return url;
  console.log("url "+url)
}

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

function createError(error,config,code,request,response){
    error.config = config;
    if(code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
}



// Version.
Bubble.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
  if(!noGlobal) {
    window.Bubble = window.be = Bubble;
}
 return Bubble;
});
