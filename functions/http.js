export default {
  request(url,method,params){
    Object.assign(params,{
      mode:"cors",
      headers:{
        "content-type":"multipart/form-data"
      },
      method
    });
    console.log(params);
    fetch(url,params)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
  }
}