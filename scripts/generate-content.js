const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const getFileNames = (dir) => fs.readdirSync(dir)

const getAllPost = () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = getFileNames(postsDirectory)
  const allPost = fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')

      const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf-8')
      const frontMatter = matter(fileContents)
      return {
        id,
        ...frontMatter.data,
        content: frontMatter.content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return allPost.reduce((acc, post) => {
    const { id, title, date, tags, content } = post
    return {
      ...acc,
      [id]: {
        title,
        date,
        tags,
        content,
      },
    }
  }, {})
}

const getTagmap = (posts) => {
  const tagmap = {}

  Object.entries(posts).forEach(([id, post]) => {
    const { title, date, tags } = post
    post.tags.forEach((tag) => {
      if (tag in tagmap) {
        tagmap[tag].push({ id, title, date, tags })
      } else {
        tagmap[tag] = [{ id, title, date, tags }]
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
