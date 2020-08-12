let url = "https://www.runoob.com/try/ajax/jsonp.php"; // ?jsoncallback=callback

function jsonp(url, callbackName, cb) {
  const script = document.createElement("script");
  script.src = url + "?jsoncallback=" + callbackName;
  script.async = true;
  //监听callback
  window[callbackName] = function (data) {
    cb && cb(data);
  };
  document.body.appendChild(script);
}

jsonp(url, "callback", function (data) {
  console.log(data);
});
