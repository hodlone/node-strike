# node-strike

A wrapper client for [Strike's public API](https://docs.strike.me/api/).

## Usage

Import the wrapper and instantiate a client.

```
import { NodeStrike } from 'node-strike'; // or const { NodeStrike } = require('node-strike');


(async () => {
  const client = new NodeStrike('<API_KEY>')
  
  const response = await client.getInvoices();

  console.log(response);
})()
```

## Typings

This wrapper provides typings that correspond 1:1 to the expeceted requests and responses in the specification, making this a transparent wrapper.

## TODO

- Add support for testnet.
- Add support for OData operators for fetching events and invoices.
- Add custom API error type.
- Add unit tests.
