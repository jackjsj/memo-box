function jsonp(url, cb) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  window.callback = function(data) {
    cb && cb(data);
  };
  document.body.append(script);
}
jsonp(
  'https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callback',
  function(data) {
    document.getElementById('text').innerHTML = data;
  }
);
