<script setup lang="ts">
import { creators } from '../../creators'
import { siteName } from '../../../metadata'
import papers from '../../../metadata/papers'

// Use the first creator as the main profile; adjust if you want a different one.
const main = creators[0]
const githubUsername = main.username || ''
const avatar = main.avatar
const displayName = main.name || siteName
</script>

<template>
  <div class="content" style="display:flex;justify-content:center;">
    <div class="content-container" style="max-width:760px; width:100%; padding: 48px 16px;">
      <main class="main" style="display:flex;flex-direction:column;align-items:center;text-align:center;">
        <img :src="avatar" alt="avatar" style="width:160px;height:160px;border-radius:50%;object-fit:cover;border:2px solid rgba(0,0,0,0.06);" />
        <h1 style="margin-top:16px;margin-bottom:8px;">{{ displayName }}</h1>
        <p style="margin:0 0 20px 0;color:var(--vp-c-emphasis);">{{ main.title || main.desc || '' }}</p>

        <!-- GitHub profile / contribution chart links -->
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:32px;">
          <a v-if="githubUsername" :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer" class="github-link">
            <img :src="`https://github.com/${githubUsername}.png`" alt="github avatar" style="width:36px;height:36px;border-radius:6px;" />
            <span style="margin-left:8px;color:var(--vp-c-emphasis);">@{{ githubUsername }}</span>
          </a>
          <img v-if="githubUsername" :src="`https://ghchart.rshah.org/${githubUsername}`" alt="GitHub contributions" style="height:104px;" />
        </div>

        <section style="width:100%;text-align:left;">
          <h2>Selected publications</h2>
          <ul style="padding-left:1rem;">
            <li v-for="(p, i) in papers" :key="i" style="margin:12px 0;">
              <div>
                <a v-if="p.link" :href="p.link" target="_blank" rel="noopener noreferrer" style="font-weight:600;color:var(--vp-c-emphasis);">{{ p.title }}</a>
                <span v-else style="font-weight:600;color:var(--vp-c-emphasis);">{{ p.title }}</span>
              </div>
              <div style="color:var(--vp-c-muted);font-size:0.95rem;margin-top:4px;">
                <span v-if="p.venue">{{ p.venue }}</span>
                <span v-if="p.year"> · {{ p.year }}</span>
                <span v-if="p.doi"> · DOI: <a :href="`https://doi.org/${p.doi}`" target="_blank" rel="noopener noreferrer">{{ p.doi }}</a></span>
                <span v-if="p.notes"> · {{ p.notes }}</span>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>
