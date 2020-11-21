import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import html  from 'remark-html'
import remark from 'remark'

export type PostData = {
  id: string,
  contentHtml: string
  title: string,
  date: string
}

export type Params = {
  params: {
    id: string
  }
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map(fileName => {
    // idを取得するためにファイル名から".md"を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    // データをidと合わせる
    return {
      id,
      ...matterResult.data as Pick<PostData, 'title' | 'date'>
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date > b.date) return 1

    return -1
  })
}

export function getAllPostIds(): Params[] {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data as Pick<PostData, 'title' | 'date'>
  }
}