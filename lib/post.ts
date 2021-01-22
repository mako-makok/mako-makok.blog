import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import html from 'remark-html'
import remark from 'remark'
import prism from 'remark-prism'
import { GetStaticPathsResult } from 'next'

export type PostData = {
  id: string
  contentHtml: string
  title: string
  date: string
  tags: string[]
}

export type PostsByTag = {
  posts: PostData[]
  tag: string
}

export type PostPath = {
  id: string
}

export type TagPath = {
  tag: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData(): PostData[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as Omit<PostData, 'id'>),
    }
  })

  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getSortedPostsByTag(tag: string): PostData[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const posts: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf-8')

    const frontMatter = matter(fileContents).data as Omit<PostData, 'id'>

    return {
      id,
      ...frontMatter,
    }
  })

  return posts.filter((post) => post.tags.includes(tag)).sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getAllPostIds(): GetStaticPathsResult<PostPath>['paths'] {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export function getAllTags(): GetStaticPathsResult<TagPath>['paths'] {
  const fileNames = fs.readdirSync(postsDirectory)

  const tags: string[] = fileNames
    .map((fileName) => {
      const fullPath: string = path.join(postsDirectory, fileName)
      const fileContents: string = fs.readFileSync(fullPath, 'utf-8')

      const frontMatter = matter(fileContents).data as Omit<PostData, 'id'>

      return frontMatter.tags
    })
    .flatMap((tag) => tag)

  return Array.from(new Set(tags)).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    }
  })
}

export async function getPostDataById(id: string): Promise<PostData> {
  const fullPath: string = path.join(postsDirectory, `${id}.md`)
  const fileContents: string = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).use(prism).process(matterResult.content)
  const contentHtml: string = processedContent.toString()
  const { title, date, tags } = matterResult.data as PostData

  return {
    id,
    contentHtml,
    title,
    date,
    tags,
  }
}
