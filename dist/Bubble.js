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


// 渲染html 模板
// 第一个参数是   传入的字符串，后面的参数对应的{0-10}，分别表示传入的变量。
Bubble.format = function() {
 if (arguments.length == 0) {
   return "";
 }
 var str = arguments[0];
 for (var i = 1, len = arguments.length; i < len; i++) {
   var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
   str = str.replace(re, arguments[i]);
 }
 return str;
}


var class2type = {
  "null":"null",
  "NaN":"NaN",
  "undefined":"undefined",
  "[object global]":"window",
  "[objectDOMWindow]":"window"
};

"Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList,Null".split(",").forEach(function(name,idx){
  class2type["[object "+name+"]"] = name.toLowerCase();
})

Bubble.type=function(obj) {
  return obj === void 0 ?
                "":obj == null?
                String(obj) :
                class2type[toString.call(obj)] || "object"
}


// 判断 变量是否为数字。 可以是字符串，或者外形看上去象数字
// 鸭子类型：  鸭子测试-- 当看到一只鸟走起来像鸭子，叫起来也像鸭子，那么这只鸟就可以被称为鸭子。
Bubble.isNumeric = function(obj) {
  return obj - parseFloat(obj) >= 0 ;
}


Bubble.isNumber = function(o){
  return '[object Number]' == {}.toString.call(o)
}


Bubble.isDate = function(o) {
  return {}.toString.call(0) === "[object Date]" && o.toString() !== 'Invalid Date'
}


// 多个对象 的合并方法
Bubble.merge =  function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};


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
  // Allow for axios('example/url'[,config]) a la fetch API
  if(typeof config === 'string'){
    conifg = Bubble.merge({url:arguments[0]},arguments[1]);
  };
  config = Bubble.merge(this.defaultAjaxConfig,{methods:'get'},config);
  var promise = Promise.resolve(config);
  promise = promise.then()
  return promise;

}

['delete','get','head','options'].forEach(function(methods){
  internalAxios.prototype[methods] = function(url,config) {
    return this.request(Bubble.merge(config ||{},{
      method,
      url
    }));
  };
});

['post','put','patch'].forEach(function(method){
  internalAxios.prototype[method] = function(url,data,config) {
    return this.request(Bubble.merge(config || {},{
      method,
      url,
      data
    }))
  }
})

function xhrAdatpter(config){
  return new Promise(function dispatchXhrRequest(resolve,reject){
    config = Bubble.merge({},defaultAjaxConfig,config);
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
  var validateStatus = response.config.validateStatus;
  if(!response.status || ! !validateStatus || validateStatus(response.status)) {
    resolve(response);
  }else {
      reject(createError(new Error(response.status),response.config,null,response.request,response))
  }
}

function buildURL(url,params,paramsSerizlizer){
  if(!params) return;
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
          if(Bubble.isArray(val)){
            key = key +'[]';
          }else {
            val = [val];
          }
          val.forEach(function(item,index){
            if(Bubble.isDate(item)){
              item = item.toISOString();
            }else if(typeof item ==== "object"&&item !== null){
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
