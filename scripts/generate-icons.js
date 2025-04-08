import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = [16, 32, 48, 72, 96, 144, 168, 192, 512]
const inputFile = path.join(__dirname, '../public/icon.png')
const outputDir = path.join(__dirname, '../public/icons')

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Generate icons for each size
for (const size of sizes) {
  const outputFile = path.join(outputDir, `icon-${size}x${size}.png`)

  await sharp(inputFile).resize(size, size).toFile(outputFile)

  console.log(`Generated ${size}x${size} icon`)
}

console.log('Icon generation complete!')
