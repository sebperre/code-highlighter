// Credit for this tokenizer to https://dev.to/ndesmic/writing-a-tokenizer-1j85
export const END = Symbol("END");

export class Tokenizer {
  #tokenTypes;

  constructor(tokenTypes) {
    this.#tokenTypes = tokenTypes;
  }
  // Optimize making tokenizer use a dcitionary to only check for the token types that are needed
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
          if (type != null) {
            const token = { type, index };
            if (valueExtractor) {
              token.value = valueExtractor(matched[0]);
            }
            yield token;
          }
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        console.log(text[index]);
        console.log(`Unexpected token at index ${index}`);
        throw new Error(`Unexpected token at index ${index}`);
      }
    }
    yield { type: END };
  }
}
