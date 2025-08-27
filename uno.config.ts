import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      scale: 1.2, // size: 1.2 rem
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'min-width': '1.2rem',
      },
      // Explicitly register collections from @iconify-json so presetIcons can
      // locate icons like "icon-park-outline:book-open" or "carbon:help-filled".
      // This prevents "failed to load icon" warnings when Unocss can't auto-resolve.
      collections: {
        'icon-park-outline': async () => {
          const mod = await import('@iconify-json/icon-park-outline/icons.json')
          const data = mod.default
          // duplicate keys so icons referenced as "icon-book-open" also resolve
          // icons has a generated type; cast to any for safe iteration/mutation here
          const icons = (data.icons || {}) as any
          const merged: Record<string, any> = {}
          for (const k of Object.keys(icons)) {
            merged[k] = (icons as any)[k]
            merged[`icon-${k}`] = (icons as any)[k]
          }
          return {
            ...data,
            icons: merged,
          }
        },
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
      warn: true,
    }),
  ],
})
