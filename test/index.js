const test = require('ava')
const createScoreRank = require('../src/scorerank')

const options = {
  prefix: 'test'
}

const score = createScoreRank(options)

test.beforeEach(() => score.client.flushall())

test('should export function', t => {
  t.is(typeof createScoreRank, 'function')
})

test('should add scores', async t => {
  await score.add('u1', 20)
  await score.add('u2', 21)
  await score.add('u3', 22)

  const s1 = await score.score('u1')
  const s2 = await score.score('u2')
  const s3 = await score.score('u3')

  t.is(s1, 20)
  t.is(s2, 21)
  t.is(s3, 22)
})

test('should remove scores', async t => {
  await score.add('u1', 20)
  await score.add('u2', 21)
  await score.add('u3', 22)

  await score.remove('u1')
  await score.remove('u2')
  await score.remove('u3')

  const s1 = await score.score('u1')
  const s2 = await score.score('u2')
  const s3 = await score.score('u3')

  t.is(s1, undefined)
  t.is(s2, undefined)
  t.is(s3, undefined)
})

test('should get rank', async t => {
  await score.add('u1', 20)
  await score.add('u2', 21)
  await score.add('u3', 22)

  const res = await score.rank('u2')

  t.deepEqual(res, 1)
})

test('should get top ranks', async t => {
  await score.add('u1', 20)
  await score.add('u2', 21)
  await score.add('u3', 22)

  const res = await score.top()

  t.deepEqual(res, ['u3', 'u2', 'u1'])
})

test('should get top ranks in range', async t => {
  await score.add('u1', 20)
  await score.add('u2', 21)
  await score.add('u3', 22)
  await score.add('u4', 23)
  await score.add('u5', 24)

  const res = await score.top([2, 3])

  t.deepEqual(res, ['u3', 'u2'])
})

test('should add scores with namespace', async t => {
  await score.add('u1', 20, 'abc')
  await score.add('u2', 21, 'abc')
  await score.add('u3', 22, 'abc')

  const s1 = await score.score('u1', 'abc')
  const s2 = await score.score('u2', 'abc')
  const s3 = await score.score('u3', 'abc')

  t.is(s1, 20)
  t.is(s2, 21)
  t.is(s3, 22)
})

test('should remove scores with namespace', async t => {
  await score.add('u1', 20, 'abc')
  await score.add('u2', 21, 'abc')
  await score.add('u3', 22, 'abc')

  await score.remove('u1', 'abc')
  await score.remove('u2', 'abc')
  await score.remove('u3', 'abc')

  const s1 = await score.score('u1', 'abc')
  const s2 = await score.score('u2', 'abc')
  const s3 = await score.score('u3', 'abc')

  t.is(s1, undefined)
  t.is(s2, undefined)
  t.is(s3, undefined)
})

test('should get rank with namespace', async t => {
  await score.add('u1', 20, 'abc')
  await score.add('u2', 21, 'abc')
  await score.add('u3', 22, 'abc')

  const res = await score.rank('u2', 'abc')

  t.deepEqual(res, 1)
})

test('should get top ranks with namespace', async t => {
  await score.add('u1', 20, 'abc')
  await score.add('u2', 21, 'abc')
  await score.add('u3', 22, 'abc')

  const res = await score.top('abc')

  t.deepEqual(res, ['u3', 'u2', 'u1'])
})

test('should get top ranks in range with namespace', async t => {
  await score.add('u1', 20, 'abc')
  await score.add('u2', 21, 'abc')
  await score.add('u3', 22, 'abc')
  await score.add('u4', 23, 'abc')
  await score.add('u5', 24, 'abc')

  const res = await score.top([2, 3], 'abc')

  t.deepEqual(res, ['u3', 'u2'])
})
