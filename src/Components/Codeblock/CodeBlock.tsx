import { useState } from 'react'
import { javascriptTokenizer, END } from './Tokenizers/test';

import './CodeBlock.css'

interface CodeBlockProps {
    language: String;
    children: any;
}

function CodeBlock({ language, children }) {
  console.log(children)
  let output = ""
  const text = children;
  for (const token of javascriptTokenizer.tokenize(text)) {
      console.log(token)
      if (token.type !== END) {
        output += token.value + " "
      }
  }

  return (
    <>
      {children}
      {output}
    </>
  )
}

export default CodeBlock
