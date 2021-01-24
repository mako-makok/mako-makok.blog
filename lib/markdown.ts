import html from 'remark-html'
import remark from 'remark'
import prism from 'remark-prism'

export async function convertHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).use(prism).process(markdown)
  const contentHtml = processedContent.toString()
  return contentHtml
}
