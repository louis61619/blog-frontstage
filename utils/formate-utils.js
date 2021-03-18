export const formatJsonStr = (str) => {
  if (str === null || str === "{}" || str === undefined) {
    return str;
  }
  try {
    let json = JSON.parse(str);
    for (let k in json) {
      let kv = json[k];
      try {
        //數組
        if (Array.isArray(kv)) {
          try {
            //json字符串處理
            let sub = kv.toString().replace("[", "").replace("]", "").split(",");
            for (let i = 0; i < sub.length; i++) {
              if (typeof (JSON.parse(sub[i])) == "object") {
                sub[i] = this.formatJsonStr(sub[i]);
              }
            }
            json[k] = sub;
          } catch (e) {

          }
          continue;
        }
        if (typeof (JSON.parse(kv)) == "object") {
          json[k] = this.formatJsonStr(kv);
        }
      } catch (e2) {

      }
    }
    return json;
  } catch (e) {

  }
  return str;
}