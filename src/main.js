/* Bubble main */

// Base function.
var Bubble = function() {
  // Add functionality here.
  return true;
};


// Version.
Bubble.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
if(!noGlobal) {
  window.Bubble = window.be = Bubble;
}
return Bubble;
