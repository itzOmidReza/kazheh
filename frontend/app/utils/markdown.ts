/**
 * Strips Markdown syntax from a text string, returning clean plain text.
 * Ideal for article summaries, excerpt cards, and meta descriptions.
 */
export const stripMarkdown = (text?: string | null): string => {
  if (!text) return ''
  return text
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
    .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '$1') // Remove inline code / code blocks
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/^\s*[-*+]\s+/gm, '') // Remove unordered list bullets
    .replace(/^\s*\d+\.\s+/gm, '') // Remove ordered list numbers
    .replace(/^\s*>\s+/gm, '') // Remove blockquotes
    .replace(/_{3,}|-{3,}|\*{3,}/g, '') // Remove horizontal rules
    .replace(/\s+/g, ' ') // Collapse multiple whitespace
    .trim()
}

