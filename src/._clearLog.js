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
