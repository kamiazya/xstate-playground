import { createInterface } from 'node:readline';
import { promises } from 'node:fs';

import { interpret } from 'xstate';
import type { StateMachine } from 'xstate';

process.stdin.setEncoding('utf8');

const reader = createInterface({
  input: process.stdin,
});

async function main(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const machine: StateMachine<any, any, any> = (await import(`./${name}`)).default;

  const service = interpret(machine)
    .onTransition((state) => console.log(state.value, state.context, state.nextEvents))
    .start();
  reader.on('line', (input) => {
    const state = service.send(input);
    if (state.done) {
      console.log('<DONE>');
      reader.close();
    }
  });
}

const cmd = process.argv[2];
if (cmd) {
  main(cmd);
} else {
  promises.readdir(__dirname).then((files) => console.log(files));
}
