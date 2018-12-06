function add0(m) {
    return m < 10 ? '0' + m : m
  }
function  getTime(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var theTime = year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
    return theTime
}


export default function dateFormat(time){
  return  getTime(time)
}
