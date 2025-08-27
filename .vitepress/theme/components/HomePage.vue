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
  <div class="content profile-page">
    <div class="profile-wrap">
      <main class="profile-main">
        <img :src="avatar" alt="avatar" class="profile-avatar" />
        <h1 class="profile-name">{{ displayName }}</h1>
        <p class="profile-sub">{{ main.title || main.desc || '' }}</p>

        <div class="profile-github">
          <!--
          <a v-if="githubUsername" :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer" class="github-link">
            <img :src="`https://github.com/${githubUsername}.png`" alt="github avatar" class="github-mini" />
            <span class="github-handle">@{{ githubUsername }}</span>
          </a>
          -->
          <img v-if="githubUsername" :src="`https://ghchart.rshah.org/${githubUsername}`" alt="GitHub contributions" class="github-chart" />
        </div>

        <section class="papers">
          <h2>Selected publications</h2>
          <ul>
            <li v-for="(p, i) in papers" :key="i">
              <div class="paper-title">
                <a v-if="p.link" :href="p.link" target="_blank" rel="noopener noreferrer">{{ p.title }}</a>
                <span v-else>{{ p.title }}</span>
              </div>
              <div class="paper-meta">
                <span v-if="p.venue">{{ p.venue }}</span>
                <span v-if="p.year"> · {{ p.year }}</span>
                <span v-if="p.doi"> · DOI: <a :href="`https://doi.org/${p.doi}`" target="_blank" rel="noopener noreferrer">{{ p.doi }}</a></span>
              </div>

              <!-- Embedded viewer when embed flag is set -->
              <div v-if="p.embed" class="paper-embed-wrap">
                <div class="paper-embed-bar">
                  <span class="embed-label">
                    <template v-if="p.citationsLink">
                      <a :href="p.citationsLink" target="_blank" rel="noopener noreferrer">CITED BY · 1</a>
                    </template>
                    <template v-else>
                      Embedded preview
                    </template>
                  </span>
                  <a :href="p.link" target="_blank" rel="noopener noreferrer" class="open-link">Open in new tab</a>
                </div>
                <div class="paper-embed-outer">
                  <iframe :src="p.link" class="paper-embed" frameborder="0" />
                </div>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: calc(100vh - var(--vp-navbar-height, 56px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
}
.profile-wrap {
  width: 100%;
  max-width: 1000px;
}
.profile-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.profile-avatar {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(0,0,0,0.06);
}
.profile-name {
  margin-top: 20px;
  margin-bottom: 6px;
  font-size: 2rem;
}
.profile-sub {
  margin: 0 0 20px 0;
  color: var(--vp-c-emphasis);
}
.profile-github {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 32px;
}
.github-mini { width:40px;height:40px;border-radius:6px }
.github-handle { margin-left:6px;color:var(--vp-c-emphasis) }
.github-chart { height:140px; max-width:100%; object-fit:contain }
.papers { width:100%; text-align:left }
.papers h2 { margin-bottom:8px }
.papers ul { padding-left:1rem }
.papers li { margin:12px 0 }
.paper-title a { font-weight:600; color:var(--vp-c-emphasis) }
.paper-meta { color:var(--vp-c-muted); font-size:0.95rem; margin-top:4px }

/* Embedded PDF viewer styles */
.paper-embed-wrap { width:100%; margin-top:12px }
.paper-embed-bar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:8px }
.embed-label { color:var(--vp-c-muted); font-size:0.9rem }
.open-link { color:var(--vp-c-brand) }
.paper-embed-outer { width:100%; border-radius:8px; overflow:hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.35); }
.paper-embed { width:100%; height:640px; border:0; display:block }

@media (max-width:980px) {
  .paper-embed { height:520px }
}
@media (max-width:720px) {
  .paper-embed { height:420px }
}

@media (max-width:720px) {
  .profile-avatar { width:160px;height:160px }
  .github-chart { height:96px }
}
</style>
