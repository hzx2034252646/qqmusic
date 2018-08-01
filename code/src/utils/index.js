export const formatTime = function (t) {
  var min = Math.floor(parseFloat(t) / 60)
  var s = Math.floor(parseFloat(t)) - min * 60
  min = isNaN(min) ? 0 : min
  s = isNaN(s) ? 0 : s
  var min_str, s_str
  min_str = min < 10 ? '0' + min : '' + min
  s_str = s < 10 ? '0' + s : '' + s
  return min_str + ':' + s_str
}
