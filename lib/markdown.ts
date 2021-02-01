import * as shiki from 'shiki'
import markdownIt from 'markdown-it'

export async function convertHtml(markdown: string): Promise<string> {
  const highlighter = await shiki.getHighlighter({ theme: 'nord' })
  if (!highlighter.codeToHtml) return markdown

  const codeToHtml = highlighter.codeToHtml
  const md = markdownIt({
    html: true,
    linkify: true,
    highlight: (code: string, lang: string) => codeToHtml(code, lang),
  })

  return md.render(markdown)
}
