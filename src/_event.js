/* 事件绑定 ，删除  主动触发  */

/**
 *
 *  @method addEvent
 *  @param  {[type]}   el         [description]
 *  @param  {[type]}   type       [description]
 *  @param  {Function} callback   [description]
 *  @param  {[type]}   useCapture [description]
 */
function addEvent(el,type,callback,useCapture) {
  if(el.dispatchEvent) {
    el.addEventListener(type,callback,!!useCapture)
  }else {
    el.attachEvent("on"+type,callback,!!useCapture);
  }
}
/* 移除事件  */
funcion removeEvent(el,type,callback,useCapture) {
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
