import assert from 'node:assert/strict'
import test from 'node:test'
import { createApp } from './server.mjs'

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

test('GET / returns the fil-rouge payload', async () => {
  const { server, port } = await listen(createApp())
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`)
    const body = await res.json()
    assert.equal(res.status, 200)
    assert.equal(body.app, 'fil-rouge-api')
    assert.equal(body.status, undefined)
  } finally {
    server.close()
  }
})

test('GET /health returns ok', async () => {
  const { server, port } = await listen(createApp())
  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`)
    const body = await res.json()
    assert.equal(res.status, 200)
    assert.equal(body.status, 'ok')
  } finally {
    server.close()
  }
})
