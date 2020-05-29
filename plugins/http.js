import Vue from "vue";

Vue.prototype.$http = {
  request(url, method = "GET", params = {}) {
    return new Promise((resolve, reject) => {
      Object.assign(params, {
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        method
      });

      fetch(url, params)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode == 200) {
            resolve(res["data"]);
          } else {
            reject(res);
          }
        });
    });
  },
  post(module, method, data, params = {}) {
    params = Object.assign(params, {
      body: data
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
