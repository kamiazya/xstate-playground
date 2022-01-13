# xstate-playground

```bash
$ yarn start counter
active { count: 0 } [ 'INC', 'DEC' ]
INC
active { count: 1 } [ 'INC', 'DEC' ]
DEC
active { count: 0 } [ 'INC', 'DEC' ]
INC
active { count: 1 } [ 'INC', 'DEC' ]
INC
active { count: 2 } [ 'INC', 'DEC' ]
^C
$ yarn start promise
pending undefined [ 'RESOLVE', 'REJECT' ]
RESOLVE
resolved undefined []
<DONE>
```
