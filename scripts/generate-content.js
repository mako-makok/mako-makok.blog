const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const getFileNames = (dir) => fs.readdirSync(dir)

const makeExcerpt = (text, length, textAtEnd = '') => {
  if (!text) return ''

  let sum = 0
  let result = ''
  for (const str of text.split('')) {
    const byte = Buffer.byteLength(str, 'utf8')
    sum += byte > 2 ? 2 : byte
    if (sum > length) break
    result += str
  }
  return result + textAtEnd
}

const getAllPost = () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = getFileNames(postsDirectory)
  const allPost = fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')

      const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf-8')
      const frontMatter = matter(fileContents, { excerpt_separator: '##' })
      const excerpt = makeExcerpt(frontMatter.excerpt, 140, '...')
      return {
        id,
        ...frontMatter.data,
        excerpt,
        content: frontMatter.content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return allPost.reduce((acc, post) => {
    const { id, title, date, tags, excerpt, content } = post
    return {
      ...acc,
      [id]: {
        title,
        date,
        tags,
        excerpt,
        content,
      },
    }
  }, {})
}

const getTagmap = (posts) => {
  const tagmap = {}

  Object.entries(posts).forEach(([id, post]) => {
    const { title, date, tags, excerpt } = post
    post.tags.forEach((tag) => {
      if (tag in tagmap) {
        tagmap[tag].push({ id, title, date, tags, excerpt })
      } else {
        tagmap[tag] = [{ id, title, date, tags, excerpt }]
      }
    })
  })

  return tagmap
}

const outputJson = (object, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(object))
}

function main() {
  const allPost = getAllPost()
  const tagmap = getTagmap(allPost)

  const outputDir = path.join(process.cwd(), 'generate')
  fs.mkdirSync(outputDir, { recursive: true })

  outputJson(allPost, path.join(outputDir, 'posts.json'))
  outputJson(tagmap, path.join(outputDir, 'tagmap.json'))
}

main()
