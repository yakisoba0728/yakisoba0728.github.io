import { createServer } from 'node:http'
import { readFileSync, realpathSync, statSync } from 'node:fs'
import { extname, join, resolve, sep } from 'node:path'

const root = realpathSync('out')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

// Test-only preview: prefer exported HTML over the RSC directory with the same name.
createServer((request, response) => {
  response.setHeader('Cache-Control', 'no-store')
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname)
    if (pathname.includes('\0')) throw new URIError('Invalid path')
    const target = resolve(root, `.${pathname}`)
    const file = [target, `${target}.html`, join(target, 'index.html')].find((candidate) =>
      candidate.startsWith(root + sep) && statSync(candidate, { throwIfNoEntry: false })?.isFile(),
    )
    const actual = realpathSync(file ?? join(root, '404.html'))
    if (!actual.startsWith(root + sep)) {
      response.writeHead(404).end()
      return
    }
    const body = readFileSync(actual)
    response.writeHead(file ? 200 : 404, {
      'Content-Type': types[extname(actual)] ?? 'application/octet-stream',
    })
    response.end(body)
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 500).end()
  }
}).listen(3100, '127.0.0.1')
