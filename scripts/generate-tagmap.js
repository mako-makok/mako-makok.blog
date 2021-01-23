const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const getFileNames = (dir) => fs.readdirSync(dir)

const getTagmap = () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = getFileNames(postsDirectory)
  const tagmap = {}

  fileNames.forEach((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf-8')
    const frontMatter = matter(fileContents)
    const { title, date, tags } = frontMatter.data

    const data = { id, title, date, tags }

    tags.forEach((tag) => {
      if (tag in tagmap) {
        tagmap[tag].push({ ...data })
      } else {
        tagmap[tag] = [{ ...data }]
      }
    })
  })

  return tagmap
}

const outputJson = (object, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(object))
}

function main() {
  const tagmap = getTagmap()
  const outputDir = path.join(process.cwd(), 'generate')
  fs.mkdirSync(outputDir, { recursive: true })
  outputJson(tagmap, path.join(outputDir, 'tagmap.json'))
}

main()
