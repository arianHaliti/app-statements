export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatDate(date){
  return date.getFullYear() +'/' + ('0' + (date.getMonth()+1)).slice(-2)+'/'+ ('0' + date.getDate()).slice(-2) ;
}
export function isDate(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}