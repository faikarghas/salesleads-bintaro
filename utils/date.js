import moment from 'moment';

export function getCurrentDate(_time){
    let newDate = new Date(_time)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let H = newDate.getHours()
    let M = newDate.getMinutes()
    let S = newDate.getMinutes()
    let ampm = H >= 12 ? 'PM' : 'AM';
    let minutes = M.toString().split('').length == 1 ? `0${M}` : M

    // return `${year}-${month<10?`0${month}`:`${month}`}-${date}  ${H}:${minutes} ${ampm}`
    return moment(_time).isValid() ? moment(_time).format('L LT') : _time
}

export function getDate(_time){

    let newDate = new Date(_time)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month}-${date}`
}
