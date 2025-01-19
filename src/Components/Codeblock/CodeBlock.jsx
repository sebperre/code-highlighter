import { END } from "./Tokenizers/Tokenizer";
import { javascriptTokenizer } from "./Tokenizers/javascriptTokenizer";

import "./CodeBlock.css";

const jsKeywords = new Set([
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
]);

// interface CodeBlockProps {
//     language: String;
//     children: any;
// }

function CodeBlock({ language, children }) {
  console.log(children);
  let output = [];

  const text = children;
  for (const token of javascriptTokenizer.tokenize(text)) {
    if (token.type === "identifier") {
      console.log(token.value);
      console.log(text[token.index + 1]);
      if (jsKeywords.has(token.value)) {
        output.push(<span className="keyword">{token.value}</span>);
      } else if (token.index < text.length && text[token.index] === "(") {
        output.push(<span className="function">{token.value}</span>);
      } else {
        output.push(<span className="default">{token.value}</span>);
      }
    } else if (token.type === "white-space") {
      output.push(<span>{token.value}</span>);
    } else if (token.type === "line-break") {
      output.push(<span>{"\n"}</span>);
    } else if (token.type === "string-literal") {
      output.push(<span className="string-literal">{token.value}</span>);
    } else if (token.type === "comment") {
      output.push(<span className="comment">{token.value}</span>);
    } else {
      output.push(<span>{token.value}</span>);
    }
  }

  // type Token = { type: String, value: String, index: Number };
  // for (const token of javascriptTokenizer.tokenize(text)) {
  //   if (token.type !== END) {
  //     if (token.type == "line-break") {
  //       output.push(<span>{"\n"}</span>);
  //     } else if (token.value == null) {
  //       output.push(<span>{token.type}</span>);
  //     } else if (token.type == ".") {
  //       output.push(<span>.</span>);
  //     } else if (token.type == "white-space") {
  //       output.push(<span>{token.value}</span>);
  //     } else if (token.type == "string-literal") {
  //       output.push(<span className="string-literal">{token.value}</span>);
  //     } else if (token.type == "comment") {
  //       output.push(<span className="comment">{token.value}</span>);
  //     } else if (token.type == "identifier") {
  //       output.push(<span className="identifier">{token.value}</span>);
  //     } else if (token.type == "keyword") {
  //       output.push(<span className="keyword">{token.value}</span>);
  //     } else {
  //       output.push(<span>{token.value}</span>);
  //     }
  //   }
  // }
  return (
    <>
      <div>{children}</div>
      <div>
        {output.map((el) => {
          el;
        })}
      </div>
      <div>{output}</div>
    </>
  );
}

export default CodeBlock;
