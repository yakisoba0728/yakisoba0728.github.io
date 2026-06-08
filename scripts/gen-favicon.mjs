// 둥근 정사각형(스퀘어클) 마스킹된 투명 PNG 파비콘을 생성한다.
// 소스: public/avatar.png (확장자와 달리 JPEG, 736x736), 출력: app/icon.png (512x512 RGBA)
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'public', 'avatar.png')
const OUT = path.join(__dirname, '..', 'app', 'icon.png')
const SIZE = 512
const RADIUS = Math.round(SIZE * 0.22) // iOS 앱 아이콘 같은 둥근 정사각형 비율
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" ry="${RADIUS}" fill="#fff"/></svg>`,
)

try {
  const info = await sharp(SRC)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(OUT)
  console.log(`wrote ${OUT} ${info.width}x${info.height} channels=${info.channels}`)
} catch (err) {
  console.error(err)
  process.exit(1)
}
