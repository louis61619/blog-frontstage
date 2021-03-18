import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  langPrefix: "hljs language-",
  highlight: function(code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  }
});

export default marked