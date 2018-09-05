function goodOlAjaxPromise(url) {
  const promiseObj = new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const responseText = xmlhttp.responseText.trim();
          const obj = JSON.parse(responseText);
          resolve(obj);
        } else {
          reject(xmlhttp.status);
          console.log('xmlhttp failed');
        }
      }
    };
  });
  return promiseObj;
}

export default goodOlAjaxPromise;

