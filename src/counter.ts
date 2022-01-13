import { createMachine, interpret, assign } from 'xstate';

namespace events {
  export type INC = { type: 'INC' };
  export type DEC = { type: 'DEC' };
}

type CounterEvent = events.INC | events.DEC;

interface CounterContext {
  count: number;
}

const counterMachine = createMachine<CounterContext, CounterEvent>({
  initial: 'active',
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: {
          actions: assign<CounterContext, events.INC>({
            count: (context) => context.count + 1,
          }),
        },
        DEC: {
          actions: assign<CounterContext, events.DEC>({
            count: (context) => context.count - 1,
          }),
        },
      },
    },
  },
});

const counterService = interpret(counterMachine)
  .onTransition((state) => console.log(state.context.count))
  .start();
// => 0

counterService.send('INC');
// => 1

counterService.send('INC');
// => 2

counterService.send('DEC');
// => 1
