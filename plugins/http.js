import Vue from "vue";

Vue.prototype.$http = {
  request(url, method = "GET", params = {}) {
    return new Promise((resolve, reject) => {
      Object.assign(params, {
        mode: "cors",
        method
      });

      fetch(url, params)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode == 200) {
            if(res.token){
              let localToken=localStorage.token;
              if(!localToken||localToken&&res.token!=localToken){
                localStorage.token=res.token;
              }
            }
            resolve(res["data"]);
          } else {
            reject(res);
          }
        });
    });
  },
  post(module, method, data, params = {}) {
    let headers=new Headers();
    // headers.append("content-type","multipart/formdata");
    let body=new FormData();
    for(let key in data){
      body.append(key,data[key]);
    }
    params = Object.assign(params, {
      headers,
      body
    });
    return this.request(
      `${process.env.BACKEND_URL}?module=${module}&method=${method}`,
      "POST",
      params
    );
  },
  get(module, method, data, params) {
    let str="";
    for(let key in data){
      str+=`&${key}=${data[key]}`;
    }
    return this.request(
      `${process.env.BACKEND_URL}?module=${module}&method=${method}${str}`,
      "GET",
      params
    );
  }
};
