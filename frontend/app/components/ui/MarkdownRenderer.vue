<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

const props = withDefaults(
  defineProps<{
    content?: string | null
    className?: string
  }>(),
  {
    content: '',
    className: '',
  }
)

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
})

const renderedHtml = computed(() => {
  if (!props.content) return ''

  try {
    const rawHtml = marked.parse(props.content) as string
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'a', 'b', 'i', 'strong', 'em', 'strike', 's', 'del',
        'code', 'pre', 'blockquote',
        'ul', 'ol', 'li', 'hr',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'img', 'span', 'br',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'id', 'dir', 'width', 'height'],
    })

    // Automatically enforce target="_blank" and rel="noopener noreferrer" on external links
    return cleanHtml.replace(
      /<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>/gi,
      (match, href, rest) => {
        if (href.startsWith('#') || href.startsWith('/')) {
          return match
        }
        return `<a href="${href}" target="_blank" rel="noopener noreferrer"${rest}>`
      }
    )
  } catch {
    return props.content
  }
})
</script>

<template>
  <div
    dir="rtl"
    :class="[
      'markdown-renderer text-foreground font-normal leading-relaxed',
      className
    ]"
    v-html="renderedHtml"
  />
</template>

<style scoped>
:deep(.markdown-renderer) {
  direction: rtl;
  text-align: right;
  font-family: inherit;
}

:deep(h1) {
  font-size: 1.875rem;
  line-height: 2.375rem;
  font-weight: 800;
  color: var(--primary-900, #0f3032);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--primary-900, #0f3032);
  margin-top: 1.75rem;
  margin-bottom: 0.875rem;
  border-bottom: 1px solid var(--border, #e2e8f0);
  padding-bottom: 0.5rem;
}

:deep(h3) {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--primary-800, #16484a);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(h4), :deep(h5), :deep(h6) {
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 600;
  color: var(--primary-800, #16484a);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

:deep(p) {
  font-size: 1.0625rem;
  line-height: 2.25rem;
  color: var(--muted-foreground, #4b5563);
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: justify;
}

:deep(ul) {
  list-style-type: disc;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-right: 1.5rem;
  color: var(--muted-foreground, #4b5563);
}

:deep(ol) {
  list-style-type: decimal;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-right: 1.5rem;
  color: var(--muted-foreground, #4b5563);
}

:deep(li) {
  font-size: 1.0625rem;
  line-height: 2.125rem;
  margin-top: 0.375rem;
  margin-bottom: 0.375rem;
}

:deep(blockquote) {
  border-right: 4px solid var(--primary, #16484a);
  background-color: var(--secondary, #f0fdf4);
  padding: 0.875rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 0.75rem 0.75rem 0;
  color: var(--foreground, #1f2937);
  font-style: italic;
  line-height: 2.125rem;
}

:deep(code) {
  background-color: var(--secondary, #f1f5f9);
  color: var(--primary-900, #0f3032);
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: monospace;
  direction: ltr;
  display: inline-block;
}

:deep(pre) {
  background-color: var(--card, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
  overflow-x: auto;
  direction: ltr;
  text-align: left;
}

:deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: inherit;
  display: block;
}

:deep(a) {
  color: var(--primary, #16484a);
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 500;
  transition: color 0.15s ease;
}

:deep(a:hover) {
  color: var(--primary-700, #133e40);
}

:deep(strong), :deep(b) {
  font-weight: 700;
  color: var(--primary-900, #0f3032);
}

:deep(hr) {
  border: 0;
  border-top: 1px solid var(--border, #e2e8f0);
  margin: 2rem 0;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 1.5rem auto;
  display: block;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid var(--border, #e2e8f0);
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.75rem;
  overflow: hidden;
  font-size: 0.9375rem;
}

:deep(th) {
  background-color: var(--secondary, #f8fafc);
  border: 1px solid var(--border, #e2e8f0);
  padding: 0.75rem 1rem;
  font-weight: 700;
  color: var(--primary-900, #0f3032);
  text-align: right;
}

:deep(td) {
  border: 1px solid var(--border, #e2e8f0);
  padding: 0.75rem 1rem;
  color: var(--muted-foreground, #4b5563);
  text-align: right;
}
</style>

