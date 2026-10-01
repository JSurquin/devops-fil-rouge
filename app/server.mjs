import express from 'express'

export function createApp() {
  const app = express()

  app.get('/', (_req, res) => {
    res.json({
      app: 'fil-rouge-api',
      message: 'Hello from the DevOps fil rouge',
      stack: 'Node 24 + Docker + GitHub Actions',
      formation: 'Introduction au DevOps - 3 jours',
    })
  })

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  return app
}

const port = Number(process.env.PORT ?? 3000)
const isMain = process.argv[1] && process.argv[1].endsWith('server.mjs')

if (isMain) {
  createApp().listen(port, () => {
    console.log(`fil-rouge-api listening on :${port}`)
  })
}
