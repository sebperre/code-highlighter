// Taken from https://dev.to/ndesmic/writing-a-tokenizer-1j85
export const END = Symbol("END");

export class Tokenizer {
    #tokenTypes;

    constructor(tokenTypes) {
        this.#tokenTypes = tokenTypes;
    }

    *tokenize(text) {
        let index = 0;
        while (index < text.length) {
            let hasMatch = false;

            for (const { matcher, type, valueExtractor } of this.#tokenTypes) {
                const currentMatcher = new RegExp(matcher.source, "y");
                currentMatcher.lastIndex = index;
                const matched = currentMatcher.exec(text);
                if (matched !== null) {
                    index += matched[0].length;
                    if(type != null) {
                        const token = { type, index };
                        if(valueExtractor){
                            token.value = valueExtractor(matched[0]);
                        }
                        yield token;
                    }
                    hasMatch = true;
                }
            }
            if (!hasMatch) {
                throw new Error(`Unexpected token at index ${index}`);
            }
        }
        yield { type: END };
    }
}

export const javascriptTokenizer = new Tokenizer([
    { matcher: /[ \t]+/, type: null },
    { matcher: /\r?\n/, type: "line-break" },
    { matcher: /\/\/(.*?)(?=\r?\n|$)/, type: "comment", valueExtractor: match => match.slice(2) },
    { matcher: /"[^"\r\n]+"/, type: "string-literal", valueExtractor: match => match.slice(1, -1) },
    { matcher: /'[^'\r\n]+'/, type: "string-literal", valueExtractor: match => match.slice(1, -1) },
    { matcher: /`[^`]+`/, type: "string-literal", valueExtractor: match => match.slice(1, -1) },
    { matcher: /-?[0-9]+\.?[0-9]*(?![a-zA-Z$_])/, type: "number-literal", valueExtractor: match => parseFloat(match) },
    { matcher: /{/, type: "{" },
    { matcher: /}/, type: "}" },
    { matcher: /\[/, type: "[" },
    { matcher: /\]/, type: "]" },
    { matcher: /\(/, type: "(" },
    { matcher: /\)/, type: ")" },
    { matcher: /;/, type: ";" },
    { matcher: /:/, type: ":" },
    { matcher: /,/, type: "," },
    { matcher: /\.\.\./, type: "..." },
    { matcher: /\./, type: "." },
    { matcher: /\*\*/, type: "**" },
    { matcher: /\*/, type: "*" },
    { matcher: /===/, type: "===" },
    { matcher: /==/, type: "==" },
    { matcher: /=>/, type: "=>" },
    { matcher: /=/, type: "=" },
    { matcher: /!==/, type: "!==" },
    { matcher: /!=/, type: "!=" },
    { matcher: /&&/, type: "&&" },
    { matcher: /&/, type: "&" },
    { matcher: /\^/, type: "^" },
    { matcher: /~/, type: "~" },
    { matcher: /!/, type: "!" },
    { matcher: /\|\|/, type: "||" },
    { matcher: /\|/, type: "|" },
    { matcher: /\+\+/, type: "++" },
    { matcher: /\+/, type: "+" },
    { matcher: /\-\-/, type: "--" },
    { matcher: /\-/, type: "-" },
    { matcher: /\\/, type: "\\" },
    { matcher: /%/, type: "%" },
    { matcher: /\?\?/, type: "??" },
    { matcher: /\?/, type: "?" },
    { matcher: />=/, type: ">=" },
    { matcher: /<=/, type: "<=" },
    { matcher: />>/, type: ">>" },
    { matcher: />/, type: ">" },
    { matcher: /<</, type: "<<" },
    { matcher: /</, type: "<" },
    { matcher: /null/, type: "null" },
    { matcher: /true/, type: "true", valueExtractor: x => x },
    { matcher: /false/, type: "false", valueExtractor: x => x },
    { matcher: /import/, type: "import" },
    { matcher: /export/, type: "export" },
    { matcher: / from /, type: "from" },
    { matcher: / as /, type: "as" },
    { matcher: /for/, type: "for" },
    { matcher: /while/, type: "while" },
    { matcher: / in /, type: "in" },
    { matcher: /of/, type: "of" },
    { matcher: /break/, type: "break" },
    { matcher: /continue/, type: "continue" },
    { matcher: /do/, type: "do" },
    { matcher: /if/, type: "if" },
    { matcher: /else/, type: "else" },
    { matcher: /switch/, type: "switch" },
    { matcher: /case/, type: "case" },
    { matcher: /default/, type: "default" },
    { matcher: /function/, type: "function" },
    { matcher: /return/, type: "return" },
    { matcher: /yield/, type: "yield" },
    { matcher: /await/, type: "await" },
    { matcher: /try/, type: "try" },
    { matcher: /catch/, type: "catch" },
    { matcher: /finally/, type: "finally" },
    { matcher: /throw/, type: "throw" },
    { matcher: /new/, type: "new" },
    { matcher: /class/, type: "class" },
    { matcher: /super/, type: "super" },
    { matcher: /let/, type: "let" },
    { matcher: /const/, type: "const" },
    { matcher: /this/, type: "this" },
    { matcher: /[a-zA-Z$_][a-zA-Z0-9$_]*/, type: "identifier", valueExtractor: x => x },
]);