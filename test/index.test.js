/* eslint-disable */

import { expect } from "chai";
import { compile } from "../src/index.js";

describe('Fundefstr test', () => {
  it('should be normal test', async () => {
    const exec = compile({
      named([name]){
        return [`${name} is `, 0];
      },
      placeholder: params => params,
      async count([str, counter], next, back){
        if (counter < 10)
          back([str, counter + 1])
        else
          next(str + counter)
      }
    });

    const str = 'named,placeholder,count:name';
    const result = await exec(str, { name: 'Foo' });
    expect(result).to.be.eq('Foo is 10');
  });

  it('should be get with empty param', async () => {
    const result = await compile({
      id: () => Math.random().toString()
    }, 'id', {});

    expect(result).to.be.not.eq(null);
  });
});