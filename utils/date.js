export function getCurrentDate(_time){

    let newDate = new Date(_time)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let H = newDate.getHours()
    let M = newDate.getMinutes()
    let S = newDate.getMinutes()
    var ampm = H >= 12 ? 'PM' : 'AM';

    return `${year}-${month<10?`0${month}`:`${month}`}-${date}  ${H}:${M} ${ampm}`
}

export function getTime(_time){

    let newDate = new Date(_time)
    let H = newDate.getHours()
    let M = newDate.getMinutes()
    var ampm = H >= 12 ? 'PM' : 'AM';

    return `${H}:${M} ${ampm}`
}