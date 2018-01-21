Bubble.isDate = function(o) {
  return {}.toString.call(0) === "[object Date]" && o.toString() !== 'Invalid Date'
}
