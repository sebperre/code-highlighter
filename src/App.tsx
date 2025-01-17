import { useState } from 'react'
import './App.css'
import CodeBlock from './Components/Codeblock/CodeBlock.tsx'

function App() {
  // const [count, setCount] = useState(0)
  const test = `
  while (index < text.length) {
            let hasMatch = false;
  }        
  `

  return (
    <>
      <CodeBlock language="javascript">
        {test}
      </CodeBlock>
    </>
  )
}

export default App
