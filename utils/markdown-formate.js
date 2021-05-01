import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-dark.css";
import { initializeStore } from '~/store'
import { changeMarkNav } from '~/store/detail/actionCreaters'

const store = initializeStore()

function checkURL(URL) {
  var str = URL;
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) === true) {
    return true;
  } else {
    return false;
  }
}

const renderer = new marked.Renderer();

renderer.image = function (src, title, alt) {
  const newSrc = checkURL(src) ? src : process.env.NEXT_PUBLIC_STATIC + src;
  // console.log(newSrc)
  return `<img src="${newSrc}">`;
};

var toc = [];

renderer.heading = function (text, level, raw) {
  var anchor =
    this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-");
  toc.push({
    anchor: anchor,
    level: level,
    text: text,
  });
  return "<h" + level + ' id="' + anchor + '">' + text + "</h" + level + ">\n";
};

store.dispatch(changeMarkNav(toc))

// 置入設定

marked.setOptions({
  renderer: renderer,
});

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  },
});

export default marked;
