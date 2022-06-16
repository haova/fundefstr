# fundefstr

Function Definition String

## Usage

```js
import { compile } from 'fundefstr';

const exec = compile({
  func_1(params, next, back){
    return [params[0], params[1]]; // as same as: next([params[0], params[1]])
  },

  func_2([ value, counter ], next, back){
    if (counter < 10)
      back([value, counter + 1]);
    else
      next([value, counter]);
  },

  func_3(params, next, back){
    return params;
  }
});

const str = 'func_1,func_2,func_3:param_1,param_2';
const rel = await exec(str, { param_1: 'This is a param', param_2: 0 });

console.log(rel); // ['This is a param', 10]
```