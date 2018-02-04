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
