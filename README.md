# @eggjs/ip

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/eggjs/node-ip/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eggjs/node-ip/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@eggjs/ip.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eggjs/ip
[codecov-image]: https://codecov.io/gh/eggjs/node-ip/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/node-ip
[snyk-image]: https://snyk.io/test/npm/@eggjs/ip/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@eggjs/ip
[download-image]: https://img.shields.io/npm/dm/@eggjs/ip.svg?style=flat-square
[download-url]: https://npmjs.org/package/@eggjs/ip

IP address utilities for node.js

Security fix fork, merge https://github.com/indutny/node-ip/pull/144

## Installation

### npm

```shell
npm install @eggjs/ip
```
  
## Usage

Get your ip address, compare ip addresses, validate ip addresses, etc.

```js
var ip = require('@eggjs/ip');

ip.address() // my ip address
ip.isEqual('::1', '::0:1'); // true
ip.toBuffer('127.0.0.1') // Buffer([127, 0, 0, 1])
ip.toString(new Buffer([127, 0, 0, 1])) // 127.0.0.1
ip.fromPrefixLen(24) // 255.255.255.0
ip.mask('192.168.1.134', '255.255.255.0') // 192.168.1.0
ip.cidr('192.168.1.134/26') // 192.168.1.128
ip.not('255.255.255.0') // 0.0.0.255
ip.or('192.168.1.134', '0.0.0.255') // 192.168.1.255
ip.isPrivate('127.0.0.1') // true
ip.isV4Format('127.0.0.1'); // true
ip.isV6Format('::ffff:127.0.0.1'); // true
ip.isValid('127.0.0.1'); // true

// operate on buffers in-place
var buf = new Buffer(128);
var offset = 64;
ip.toBuffer('127.0.0.1', buf, offset);  // [127, 0, 0, 1] at offset 64
ip.toString(buf, offset, 4);            // '127.0.0.1'

// subnet information
ip.subnet('192.168.1.134', '255.255.255.192')
// { networkAddress: '192.168.1.128',
//   firstAddress: '192.168.1.129',
//   lastAddress: '192.168.1.190',
//   broadcastAddress: '192.168.1.191',
//   subnetMask: '255.255.255.192',
//   subnetMaskLength: 26,
//   numHosts: 62,
//   length: 64,
//   contains: function(addr){...} }
ip.cidrSubnet('192.168.1.134/26')
// Same as previous.

// range checking
ip.cidrSubnet('192.168.1.134/26').contains('192.168.1.190') // true

// ipv4 long conversion
ip.toLong('127.0.0.1'); // 2130706433
ip.fromLong(2130706433); // '127.0.0.1'

// malformed addresses and normalization
ip.normalizeStrict('0::01'); // '::1'
ip.isPrivate('0x7f.1'); // throw error
ip.isValidAndPrivate('0x7f.1'); // false
ip.normalizeStrict('0x7f.1'); // throw error
var normalized = ip.normalizeLax('0x7f.1'); // 127.0.0.1
ip.isPrivate(normalized); // true
```

### License

```txt
This software is licensed under the MIT License.

Copyright (c) 2024-present eggjs and other contributors.
Copyright Fedor Indutny, 2012.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
```
