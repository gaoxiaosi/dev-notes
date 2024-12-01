# Ajax

------

### 手写Ajax请求函数

- 语法：axios(options)
  - 参数options里包括：url、method、params、data
  - 返回值：promise
- axios.get(url, options)
- axios.post(url, data, options)
- axios.put(url, data, opitons)
- axios.delete(url, options)
- 思路：使用`XHR`对象发送ajax请求

```javascript
function axios({ url, method, params, data}) {
  return new Promise((resolve, reject) => {
    // 1. 创建xhr对象
    const xhr = XMLHttpRequest();
    // 设置相应类型为json
    xhr.responseType = 'json';
    // 监听事件处理相应
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 传递响应信息
        resolve({
          status: xhr.status,
          message: xhr.statusText,
          data: xhr.response
        })
      } else {
        // 请求失败
        reject(new Error('请求失败，status：' + xhr.status))
      }
    }
    // 处理方法名大小写
    method = method.toUpperCase();
    // 拼接params对象 a=1&b=2
    let str = "";
    for (let key in params) {
      str += `${key}=${params[key]}&`;
    }
    str = str.slice(0, -1);
    url += url.includes("?") ? "&" : "?";

    // 3.准备发送请求
    xhr.open(method, url + str, true);

    // 如果请求不为get则携带请求体参数
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send(null);
    }
  })
}

axios.get = function (url, options = {}) {
    const conifg = Object.assign(options, { method: "GET", url });
    return axios(conifg);
};

axios.post = function (url, options = {}) {
    const conifg = Object.assign(options, { method: "POST", url });
    return axios(conifg);
};

axios.put = function (url, options = {}) {
    const conifg = Object.assign(options, { method: "PUT", url });
    return axios(conifg);
};

axios.delete = function (url, options = {}) {
    const conifg = Object.assign(options, { method: "DELETE", url });
    return axios(conifg);
};
```

