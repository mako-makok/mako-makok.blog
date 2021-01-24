import html from 'remark-html'
import remark from 'remark'
import prism from 'remark-prism'

export const convertHtml = async (markdown: string) => {
  const processedContent = await remark().use(html).use(prism).process(markdown)
  const contentHtml = processedContent.toString()
  return contentHtml
}
