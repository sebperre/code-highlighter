import "./App.css";
import CodeBlock from "./Components/Codeblock/CodeBlock";

function App() {
  const test = `
  // Using require
  const hljs = require('highlight.js/lib/core');

  // Load any languages you need
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript')); 
  `;

  return (
    <>
      <CodeBlock language="javascript">{test}</CodeBlock>
    </>
  );
}

export default App;
