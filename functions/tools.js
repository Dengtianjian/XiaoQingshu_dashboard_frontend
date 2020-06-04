export default {
  formatDate(date, format = "y-m-d h:i:s") {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let day = date.getDate();
    day=day>9?day:`0${day}`;
    let hours = date.getHours();
    hours = hours > 9 ? hours : `0${hours}`;
    let minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    let seconds = date.getSeconds();
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    format = format.replace(/y/, year);
    format = format.replace(/m/, month);
    format = format.replace(/d/, day);
    format = format.replace(/h/, hours);
    format = format.replace(/i/, minutes);
    format = format.replace(/s/, seconds);
    return format;
  }
}