<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryblokApi } from '@storyblok/vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

interface ProjectBlock {
  _uid: string
  title?: string
  description?: string
  tags?: string
  github_link?: string | { url?: string; cached_url?: string }
  demo_link?: string | { url?: string; cached_url?: string }
  [key: string]: unknown
}

interface StoryData {
  content: {
    header_title?: string
    header_description?: string
    body?: ProjectBlock[]
  }
  [key: string]: unknown
}

const story = ref<StoryData | null>(null)
const storyblokApi = useStoryblokApi()
const currentTime = ref('')
const router = useRouter()

// Loading & Error States
const isLoading = ref(true)
const isError = ref(false)
const progress = ref(0)
const loadingText = ref('Connecting to Storyblok...')

const messages = [
  'Accessing /projects_v3 directory...',
  'Decrypting project metadata...',
  'Syncing database assets...',
  'Archive ready.',
]

const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
    .toUpperCase()
}

let timer: ReturnType<typeof setInterval> | undefined

onMounted(async () => {
  updateTime()
  timer = setInterval(updateTime, 1000)

  // Start Progress Animation
  const loadInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.floor(Math.random() * 10) + 2
      if (progress.value > 20) loadingText.value = messages[0] || 'Accessing directory...'
      if (progress.value > 45) loadingText.value = messages[1] || 'Decrypting data...'
      if (progress.value > 70) loadingText.value = messages[2] || 'Syncing assets...'
    }
  }, 100)

  try {
    const { data } = await storyblokApi.get('cdn/stories/projects', {
      version: 'draft',
    })
    story.value = data.story

    // Data siap, tembak ke 100%
    progress.value = 100
    loadingText.value = messages[3] || 'Archive ready.'

    setTimeout(() => {
      clearInterval(loadInterval)
      isLoading.value = false
    }, 500)
  } catch (error) {
    console.error('System Sync Failed:', error)
    clearInterval(loadInterval)
    isError.value = true
    loadingText.value = '[FATAL] CONNECTION_TERMINATED'
  }
})

onUnmounted(() => {
  clearInterval(timer)
})

const openLink = (linkObj: unknown) => {
  const link = linkObj as { url?: string; cached_url?: string } | string

  const actualUrl = typeof link === 'string' ? link : link?.url || link?.cached_url || ''

  if (!actualUrl || actualUrl === '#' || actualUrl.trim() === '') {
    router.push('/404-empty')
  } else {
    const finalUrl = actualUrl.startsWith('http') ? actualUrl : `https://${actualUrl}`
    window.open(finalUrl, '_blank')
  }
}
</script>

<template>
  <main
    @mousemove="handleMouseMove"
    class="relative min-h-screen bg-[#020202] text-slate-400 p-6 md:p-20 font-sans selection:bg-blue-500/30 overflow-x-hidden"
  >
    <div
      class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden md:block"
      :style="{
        background: `radial-gradient(800px at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.06), transparent 80%)`,
      }"
    ></div>

    <transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-100 bg-[#020202] flex items-center justify-center p-6"
      >
        <div class="w-full max-w-70">
          <div v-if="isError" class="text-left font-mono">
            <div class="flex items-center gap-2 mb-4 text-red-500 animate-pulse">
              <i class="pi pi-exclamation-triangle"></i>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">System Failure</span>
            </div>
            <h2 class="text-white text-lg font-black leading-tight mb-2 uppercase italic">
              Archive Uplink Lost<span class="text-red-500">_</span>
            </h2>
            <p class="text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest mb-6">
              Unable to sync with Storyblok Cloud. Check your network protocols or internal firewall
              settings.
            </p>
            <Button
              @click="$router.push('/')"
              label="Reboot System"
              class="w-full! py-3! bg-white/5! border! border-white/10! text-[9px]! font-black! text-white! uppercase! tracking-[0.3em]! hover:bg-red-500/10! hover:border-red-500/50! transition-all"
            />
          </div>

          <div v-else class="font-mono">
            <div class="flex justify-between items-end mb-2">
              <span class="text-blue-500 text-[9px] font-black uppercase tracking-[0.3em]"
                >Accessing Archive</span
              >
              <span class="text-white text-xs font-black">{{ progress }}%</span>
            </div>
            <div class="h-px bg-white/5 w-full relative overflow-hidden">
              <div
                class="absolute inset-0 bg-blue-600 transition-all duration-300"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <p class="mt-4 text-[8px] text-slate-500 uppercase tracking-[0.4em] animate-pulse">
              {{ loadingText }}
            </p>
          </div>
        </div>
      </div>
    </transition>

    <div class="fixed inset-0 bg-noise pointer-events-none z-50"></div>
    <div
      class="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"
    ></div>

    <div
      v-if="story && !isLoading"
      class="max-w-6xl mx-auto relative z-10 transition-opacity duration-700"
    >
      <nav
        @click="$router.push('/')"
        class="flex items-center gap-4 mb-16 group cursor-pointer w-fit animate-slide-down"
      >
        <div
          class="h-12 w-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 group-hover:bg-blue-600/10 transition-all duration-500"
          style="view-transition-name: main-logo"
        >
          <i
            class="pi pi-arrow-left text-sm text-white group-hover:text-blue-400 transition-colors"
          ></i>
        </div>
        <div class="flex flex-col text-left">
          <span
            class="font-black uppercase tracking-[0.3em] text-[10px] text-slate-500 group-hover:text-white transition-colors"
            >Exit Archive</span
          >
          <span class="text-[9px] font-bold text-blue-500/50 uppercase italic"
            >Back to System Dashboard</span
          >
        </div>
      </nav>

      <header class="mb-20 text-left">
        <div
          class="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"
        >
          <p class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">
            Directory: /projects_v3
          </p>
        </div>
        <h1
          class="text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-8"
        >
          {{ story.content.header_title || 'The Archive'
          }}<span class="text-blue-600 not-italic">.</span>
        </h1>
        <p
          class="text-slate-500 max-w-xl text-lg leading-relaxed italic border-l-2 border-white/5 pl-6"
        >
          {{ story.content.header_description || 'Loading documentation...' }}
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card v-for="project in story.content.body" :key="project._uid" class="project-card group">
          <template #title>
            <div class="flex items-center gap-3 mb-2">
              <div
                class="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
              ></div>
              <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest"
                >Project Unit</span
              >
            </div>
            <h3
              class="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-blue-500 transition-colors"
            >
              {{ project.title }}
            </h3>
          </template>
          <template #subtitle>
            <div class="flex flex-wrap gap-2 mt-4 text-left">
              <span
                v-for="tag in project.tags?.split(',')"
                :key="tag"
                class="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5"
              >
                {{ tag.trim() }}
              </span>
            </div>
          </template>
          <template #content>
            <p class="text-slate-500 text-sm leading-relaxed mt-4 line-clamp-4 min-h-20 text-left">
              {{ project.description }}
            </p>
          </template>
          <template #footer>
            <div class="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
              <div class="flex gap-4 text-lg">
                <i
                  class="pi pi-github text-slate-500 hover:text-white cursor-pointer transition-colors"
                  @click="openLink(project.github_link)"
                ></i>
              </div>
              <Button
                @click="openLink(project.demo_link)"
                label="Explore"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="px-5! py-2.5! rounded-xl! bg-blue-600! border-none! text-[10px]! font-black! uppercase! tracking-widest! hover:bg-blue-500! active:scale-95! transition-all"
              />
            </div>
          </template>
        </Card>
      </div>

      <footer
        class="mt-32 pt-10 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5"
      >
        <div class="flex flex-col items-center md:items-start text-left">
          <p class="text-[10px] font-black text-white uppercase tracking-tighter italic">
            Archive Access Logged<span class="text-blue-600">.</span>
          </p>
          <p class="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">
            Chio.Dev // Secure Connection Established
          </p>
        </div>
        <div class="flex gap-8">
          <div class="flex flex-col items-end">
            <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">
              Access Time
            </p>
            <p class="text-xs text-white font-mono uppercase tracking-tighter">
              Jakarta // {{ currentTime }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Protocol</p>
            <p class="text-xs text-blue-500 font-mono uppercase tracking-tighter">Read-Only Mode</p>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

:deep(.project-card) {
  background: #080808 !important;
  border: 1px solid rgba(255, 255, 255, 0.03) !important;
  border-radius: 2.5rem !important;
  overflow: hidden !important;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

:deep(.project-card:hover) {
  transform: translateY(-10px) !important;
  border-color: rgba(37, 99, 235, 0.4) !important;
  background: #0a0a0a !important;
  box-shadow: 0 20px 40px -20px rgba(37, 99, 235, 0.2) !important;
}

.z-30 {
  pointer-events: none;
}

:deep(.p-card-body) {
  padding: 2.5rem !important;
}

@keyframes slide-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-down {
  animation: slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
