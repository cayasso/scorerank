'use strict'

const Redis = require('ioredis')

const createScoreRank = ({ prefix = 'scores', ...options }) => {
  const client = new Redis({ keyPrefix: prefix, lazyConnect: true, ...options })

  const DEFAULT_RANGE = [0, 100]

  client.on('error', err => {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err)
  })

  const key = ns => {
    return ns ? `:${ns}` : ''
  }

  const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  const add = (id, score, ns) => {
    return client.zadd(key(ns), score, id)
  }

  const score = async (id, ns) => {
    const s = await client.zscore(key(ns), id)
    return isNumber(s) ? parseInt(s, 10) : undefined
  }

  const top = async (range = DEFAULT_RANGE, ns) => {
    if (!Array.isArray(range)) {
      ns = range
      range = DEFAULT_RANGE
    }

    const [start, end] = range.map(String)
    const res = await client.zrevrange(key(ns), start, end, 'WITHSCORES')
    const ranks = []

    for (let i = 0; i < res.length; i += 2) {
      ranks.push([res[i], parseInt(res[i + 1], 10)])
    }

    return ranks
  }

  const rank = (id, ns) => {
    return client.zrevrank(key(ns), id)
  }

  const remove = (id, ns) => {
    return client.zrem(key(ns), id)
  }

  return { add, score, top, rank, remove, client }
}

module.exports = createScoreRank
