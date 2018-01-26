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
        removeEvent(this,type,callback,useCapture);
        return this;
      }catch(e) {
        console.error(e)
      }
    }

    fn.dispatch = function(el,type,args,event) {
      try{
        dispatchEvent(this,type,args,event)
        return this;
      }catch(e) {
        console.error(e);
      }
    }
}()
