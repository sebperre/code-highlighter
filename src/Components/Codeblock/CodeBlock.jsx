import { END } from "./Tokenizers/Tokenizer";
import { javascriptTokenizer } from "./Tokenizers/javascriptTokenizer";

import "./CodeBlock.css";

// interface CodeBlockProps {
//     language: String;
//     children: any;
// }

function CodeBlock({ language, children }) {
  console.log(children);
  let output = [];

  const text = children;
  // type Token = { type: String, value: String, index: Number };
  for (const token of javascriptTokenizer.tokenize(text)) {
    // console.log(token)
    if (token.type !== END) {
      if (token.type == "line-break") {
        output.push(<span>{"\n"}</span>);
      } else if (token.value == null) {
        output.push(<span>{token.type}</span>);
      } else if (token.type == ".") {
        output.push(<span>.</span>);
        console.log(token.type);
      } else if (token.type == "white-space") {
        output.push(<span>{token.value}</span>);
      } else if (token.value == "while") {
        output.push(<span className="while">while</span>);
      } else if (token.type == "string-literal") {
        output.push(<span className="string-literal">{token.value}</span>);
      } else if (token.type == "comment") {
        output.push(<span className="comment">{token.value}</span>);
      } else if (token.type == "identifier") {
        output.push(<span className="identifier">{token.value}</span>);
      } else if (token.type == "keyword") {
        output.push(<span className="keyword">{token.value}</span>);
      } else {
        output.push(<span>{token.value}</span>);
      }
    }
  }
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
