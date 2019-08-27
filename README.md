# scorerank

[![Build Status](https://travis-ci.org/cayasso/scorerank.png?branch=master)](https://travis-ci.org/cayasso/scorerank)
[![NPM version](https://badge.fury.io/js/scorerank.png)](http://badge.fury.io/js/scorerank)

Simple score ranking with redis.

## Installation

```bash
$ npm install scorerank
```

## Usage

```javascript
const scorerank = require('scorerank')

const options = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  prefix: 'scores'
}

const score = scorerank(options)

// Add scores
score.add('user1', 20)
score.add('user2', 21)
score.add('user3', 22)

// Get top 10 ranking
const tops = await score.top([0, 10])
console.log(tops) // => ['user3', 'user2', 'user1']

// Get user specific ranking
const rank = await score.rank('user2')
console.log(rank) // => 1

// Get user specific score
const sc = await score.score('user2')
console.log(sc) // => 21

// Remove user specific score
const sc = await score.remove('user2')
```

## API

### scorerank([options])

Get an instance of scorerank. `options` is an object that besides `prefix` it can have any option property supported by `ioredis`.

```javascript
const options = {
  prefix: 'scores',
  port: 6379,
  host: '127.0.0.1',
  password: ''
}

const score = scorerank(options)
```

### scorerank.add(id, score, [ns])

Add scores by id.

```javascript
scorerank.add('5d48a5e9b06120387b7587dc', 7)
```

### scorerank.score(id, [ns])

Get score by user id.

```javascript
scorerank.score('5d48a5e9b06120387b7587dc')
```

### scorerank.rank(id, [ns])

Get ranking of an specific id.

```javascript
scorerank.rank('5d48a5e9b06120387b7587dc')
```

### scorerank.top([range, [ns]])

Get top 100 ranking.

```javascript
scorerank.top()
```

Or get specific range ranking.

```javascript
// get top 10 ranking
scorerank.top([0, 10])

// get ranking between the range of 10 to 20
scorerank.top([10, 20])
```

### scorerank.remove(id, [ns])

Remove score by id.

```javascript
scorerank.remove('5d48a5e9b06120387b7587dc')
```

## Run tests

```bash
$ yarn test
```

## License

(The MIT License)

Copyright (c) 2019 Jonathan Brumley &lt;cayasso@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
