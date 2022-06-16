import { curry } from 'ramda';

const execute = async (config, str, context) => {
  // prepare data
  const [funcPart, paramPart] = str.split(':');
  const funcNames = funcPart.split(',').filter(i => i);
  const paramNames = (paramPart || '').split(',').filter(i => i);
  const params = paramNames.map(name => context[name]);
  const funcs = funcNames.map(name => config[name]);

  // runnable
  let cursor = 0;
  let result = params;

  while (funcs[cursor]){
    let nextCursor = cursor;
    let nextResult = params;

    let returnResult = await funcs[cursor](
      result, 
      (nextParams) => { nextCursor += 1, nextResult = nextParams },
      (backParams) => { nextCursor -= 1, nextResult = backParams });

    if (cursor === nextCursor){
      cursor += 1;
      result = returnResult;
    } else {
      cursor = nextCursor;
      result = nextResult;
    }
  }

  return result;
}

export const compile = curry(execute);