// 원형 마스킹된 투명 PNG 파비콘을 생성한다.
// 소스: public/avatar.png (확장자와 달리 JPEG, 736x736), 출력: app/icon.png (512x512 RGBA)
const sharp = require('sharp')
const path = require('path')

const SRC = path.join(__dirname, '..', 'public', 'avatar.png')
const OUT = path.join(__dirname, '..', 'app', 'icon.png')
const SIZE = 512
const r = SIZE / 2
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
)

sharp(SRC)
  .resize(SIZE, SIZE, { fit: 'cover' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toFile(OUT)
  .then((info) => console.log(`wrote ${OUT} ${info.width}x${info.height} channels=${info.channels}`))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
