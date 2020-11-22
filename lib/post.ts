import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import html from 'remark-html'
import remark from 'remark'
import { GetStaticPathsResult } from 'next'

export type PostData = {
  id: string
  contentHtml: string
  title: string
  date: string
}

export type PostPath = {
  id: string
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
      ...(matterResult.data as Pick<PostData, 'title' | 'date' | 'contentHtml'>),
    }
  })

  return allPostsData.sort((a, b) => (a.date > b.date ? 1 : -1))
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

export async function getPostDataById(id: string): Promise<PostData> {
  const fullPath: string = path.join(postsDirectory, `${id}.md`)
  const fileContents: string = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml: string = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as Pick<PostData, 'title' | 'date'>),
  }
}
