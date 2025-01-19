import { Tokenizer } from "./Tokenizer";

export const javascriptTokenizer = new Tokenizer([
  { matcher: /[ \t]+/, type: "white-space", valueExtractor: (x) => x },
  { matcher: /\r?\n/, type: "line-break" },
  {
    matcher: /\/\/(.*?)(?=\r?\n|$)/,
    type: "comment",
    valueExtractor: (match) => match,
  },
  {
    matcher: /"[^"\r\n]+"/,
    type: "string-literal",
    valueExtractor: (match) => match,
  },
  {
    matcher: /'[^'\r\n]+'/,
    type: "string-literal",
    valueExtractor: (match) => match,
  },
  {
    matcher: /`[^`]+`/,
    type: "string-literal",
    valueExtractor: (match) => match,
  },
  {
    matcher: /-?[0-9]+\.?[0-9]*(?![a-zA-Z$_])/,
    type: "number-literal",
    valueExtractor: (match) => parseFloat(match),
  },
  {
    matcher:
      /(?:\.\.\.|===|!==|!=|<=|>=|>>|<<|\|\||\?\?|&&|\+\+|\-\-|==|=>|\*\*|[{}\[\]();:,.*=!&^~|+\-\\%<>?])/,
    type: "lexical-tokens",
    valueExtractor: (match) => match,
  },
  {
    matcher: /[a-zA-Z$_][a-zA-Z0-9$_]*/,
    type: "identifier",
    valueExtractor: (match) => match,
  },
]);
