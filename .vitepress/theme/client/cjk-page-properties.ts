import type { App } from 'vue'

// Simple CJK-aware character counter and reading time estimator.
// This script runs on client only and updates the DOM values for page-properties
// when the page is mounted. It avoids changing plugin typings and simply
// writes computed values into the rendered elements.

function countCJKCharacters(text: string) {
  // Count visible characters. Use Unicode property escapes to include CJK
  // scripts; fall back to counting non-whitespace characters.
  try {
    const cjkRegex = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]|\S/gu
    const matches = text.match(cjkRegex)
    return matches ? matches.length : 0
  } catch (e) {
    // If browser doesn't support Unicode property escapes, use a fallback:
    const fallback = text.replace(/\s+/g, '')
    return fallback.length
  }
}

function estimateReadingMinutes(chars: number) {
  // Conservative chars-per-minute for CJK reading: 300 cpm
  // Fallback for whitespace languages is words-per-minute ~ 200 wpm,
  // but we only use characters here for a safe estimate.
  const CPM = 300
  return Math.max(1, Math.ceil(chars / CPM))
}

export default function register(app: App) {
  if (typeof window === 'undefined') return

  // Wait for DOMContentLoaded to ensure page content is present.
  // For SPA navigation, also listen to VitePress route change via a mutation observer.
  function updateCounts() {
    try {
      // Try several selectors to locate the article content reliably across
      // themes and versions. Prefer the main markdown/article container.
      const selectors = [
        '.vp-doc',
        'main',
        'article',
        '.theme-default-content',
        '.markdown',
        '#main',
      ]
      let content: Element | null = null
      for (const s of selectors) {
        content = document.querySelector(s)
        if (content && content.textContent && content.textContent.trim().length > 0) break
      }
      if (!content) return
      const text = content.textContent || ''
      const charCount = countCJKCharacters(text)
      const minutes = estimateReadingMinutes(charCount)

      // Update dynamic page-property elements that represent wordsCount/readingTime
      // They are rendered with data-page-property-type="dynamic" and dynamic-type attribute.
      const els = Array.from(document.querySelectorAll('[data-page-property-type="dynamic"]'))
      els.forEach((el) => {
        const dynType = (el as HTMLElement).getAttribute('data-page-property-dynamic-type') || ''
        if (/word-?count/i.test(dynType) || /wordsCount/i.test(dynType) || /wordcount/i.test(dynType)) {
          ;(el as HTMLElement).textContent = `${charCount} 字`
        }
        if (/reading-?time/i.test(dynType) || /readingtime/i.test(dynType)) {
          ;(el as HTMLElement).textContent = `${minutes} 分钟`
        }
      })
    } catch (e) {
      // ignore
      // console.error('CJK page-properties update failed', e)
    }
  }

  // Run initially
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updateCounts()
  } else {
    window.addEventListener('DOMContentLoaded', updateCounts, { once: true })
  }

  // For SPA navigation (client-side), observe changes to main content and update.
  // Also schedule repeated retries for a short period to handle routing timing.
  const observeTargets = () => {
    const t = document.querySelector('.vp-doc') || document.querySelector('main') || document.querySelector('article')
    if (t) {
      const mo = new MutationObserver(() => {
        updateCounts()
      })
      mo.observe(t, { childList: true, subtree: true })
      ;(window as any).__cjkPagePropertiesMO = mo
    }
  }

  observeTargets()

  // Retry a few times (every 500ms) to catch navigations where the content
  // container is replaced asynchronously.
  let tries = 0
  const maxTries = 8
  const interval = setInterval(() => {
    try {
      updateCounts()
      observeTargets()
    } catch {}
    tries += 1
    if (tries >= maxTries) clearInterval(interval)
  }, 500)
}
