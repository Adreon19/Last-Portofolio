<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoaded = ref(false)
const isLoading = ref(true)
const progress = ref(0)
const loadingText = ref('Fetching Repository...')
const currentTime = ref('')

// --- GLITCH TYPING LOGIC (FIXED FOR MOBILE) ---
const displayHeader = ref('')
const fullHeader = 'Digital Logic.'
const mouseX = ref(0)
const mouseY = ref(0)
const showContact = ref(false)

const logs = ref<string[]>([
  '[INFO] System Booting...',
  '[INFO] Checking Interface...',
  '[INFO] Connection: STABLE',
])

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const startGlitchTyping = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullHeader.length) {
      const randomChars = '!@#$%^&*()_+'
      const randomChar = randomChars[Math.floor(Math.random() * randomChars.length)]

      // Efek glitch: tampilin karakter acak dulu sebentar
      displayHeader.value = fullHeader.substring(0, i) + randomChar

      setTimeout(() => {
        displayHeader.value = fullHeader.substring(0, i + 1)
        i++
      }, 40)
    } else {
      clearInterval(interval)
    }
  }, 80)
}

const messages = [
  'Establishing Secure Link...',
  'Syncing Automation Modules...',
  'Loading Chio.Dev Interface...',
  'System Ready.',
]

const goToProjects = () => router.push('/projects')

const openLink = (url: string) => {
  if (url !== '#' && url !== '') window.open(url, '_blank')
}

const socials = [
  { icon: 'github', link: 'https://github.com/sachioramzy' },
  { icon: 'linkedin', link: 'https://linkedin.com/in/sachioramzy' },
  { icon: 'instagram', link: 'https://instagram.com/sachioramzy' },
]

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

let timer: any
let logInterval: any

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)

  // LOGIC LOADING BAR
  const loadInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.floor(Math.random() * 15) + 5
      if (progress.value > 100) progress.value = 100
      if (progress.value > 25) loadingText.value = messages[0]
      if (progress.value > 50) loadingText.value = messages[1]
      if (progress.value > 75) loadingText.value = messages[2]
      if (progress.value === 100) loadingText.value = messages[3]
    } else {
      clearInterval(loadInterval)
      setTimeout(() => {
        isLoading.value = false
        setTimeout(() => {
          isLoaded.value = true
          startGlitchTyping() // Start glitch typing setelah loading selesai
        }, 100)
      }, 600)
    }
  }, 150)

  // Interval for System Logs
  logInterval = setInterval(() => {
    const newLogs = [
      `[UDP] Packet from ${Math.floor(Math.random() * 255)}.0.1`,
      `[SYS] Memory optimization active...`,
      `[ID] Identity: CHIO_RAMZY verified.`,
      `[GUI] Rendering v3.0 interface...`,
      `[STB] Storyblok Sync: OK`,
    ]
    logs.value.push(newLogs[Math.floor(Math.random() * newLogs.length)])
    if (logs.value.length > 3) logs.value.shift()
  }, 4000)
})

onUnmounted(() => {
  clearInterval(timer)
  clearInterval(logInterval)
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-100 bg-[#020202] flex items-center justify-center p-6"
    >
      <div class="w-full max-w-60">
        <div class="flex gap-2 mb-6 opacity-40">
          <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
        <div class="font-mono text-left">
          <div class="flex justify-between items-end mb-2">
            <span class="text-blue-500 text-[9px] font-black uppercase tracking-[0.3em]"
              >Booting Core</span
            >
            <span class="text-white text-xs font-black">{{ progress }}%</span>
          </div>
          <div class="h-px bg-white/5 w-full relative overflow-hidden">
            <div
              class="absolute inset-0 bg-blue-600 transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <p class="mt-4 text-[8px] text-slate-500 uppercase tracking-[0.4em] animate-pulse italic">
            {{ loadingText }}
          </p>
        </div>
      </div>
    </div>
  </transition>

  <main
    v-if="!isLoading"
    @mousemove="handleMouseMove"
    :class="[isLoaded ? 'opacity-100' : 'opacity-0']"
    class="relative min-h-screen bg-[#020202] text-slate-400 p-6 md:p-20 font-sans transition-opacity duration-1000 overflow-x-hidden"
  >
    <div
      class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.04), transparent 80%)`,
      }"
    ></div>
    <div class="fixed inset-0 bg-noise pointer-events-none z-50"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <nav class="flex justify-between items-center mb-16 animate-slide-down">
        <div class="group cursor-pointer flex items-center gap-3">
          <div
            class="h-11 w-11 bg-white rounded-2xl flex items-center justify-center shadow-white/10 shadow-xl group-hover:rotate-10 transition-all duration-500"
            style="view-transition-name: main-logo"
          >
            <span class="text-black font-black text-2xl italic uppercase">C</span>
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-white font-black leading-none text-lg uppercase tracking-tighter">
              Chio.Dev
            </p>
            <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">
              V.3 Build 2026
            </p>
          </div>
        </div>
        <div
          class="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl"
        >
          <span class="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span class="text-[10px] font-black text-slate-200 uppercase tracking-[0.2em]"
            >System Online</span
          >
        </div>
      </nav>

      <header class="mb-20 text-left">
        <div class="min-h-35 md:min-h-50 flex items-center mb-6">
          <h1
            class="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl"
          >
            {{ displayHeader }}<span class="animate-pulse text-blue-600">_</span>
          </h1>
        </div>

        <div
          class="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-l-2 border-blue-600/30 pl-6 py-2 animate-header-reveal"
        >
          <p class="max-w-md text-xl text-slate-400 font-medium leading-tight italic">
            Engineering <span class="text-white">High-Performance Automation</span> and
            <span class="text-white">Seamless Digital Experiences</span>.
          </p>
          <p class="max-w-xl text-lg text-slate-400 font-medium leading-relaxed mt-6">
            Based in Indonesia, I specialize in
            <span class="text-white">full-stack automation</span> and
            <span class="text-white">data-driven infrastructure</span>.
          </p>
          <div class="flex gap-2">
            <span
              class="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest"
              >Jakarta // IDN</span
            >
          </div>
        </div>
      </header>

      <div
        class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-full md:min-h-150 text-left"
      >
        <div
          @click="goToProjects"
          class="md:col-span-2 md:row-span-2 group relative bg-[#080808] border border-white/5 rounded-[3.5rem] p-12 overflow-hidden cursor-pointer hover:border-blue-500/40 transition-all duration-700"
        >
          <div class="relative z-20 flex flex-col h-full">
            <div class="flex items-center gap-2 mb-6">
              <div class="h-2 w-2 rounded-full bg-blue-600"></div>
              <p class="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">
                Core Projects
              </p>
            </div>
            <h3 class="text-6xl font-black text-white mb-6 italic tracking-tighter leading-[0.85]">
              ARCHIVE<br />01.
            </h3>
            <p class="text-slate-500 text-lg max-w-60 mb-auto font-medium">
              Node.js automation, API scaling, and modern web architecture.
            </p>
            <div
              class="mt-8 flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest group-hover:gap-6 transition-all"
            >
              <span>View Systems</span>
              <div
                class="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center shadow-blue-600/20 shadow-xl"
              >
                <i class="pi pi-arrow-right"></i>
              </div>
            </div>
          </div>
          <i
            class="pi pi-code absolute -bottom-12 -right-12 text-[22rem] text-white/1.5 group-hover:text-blue-600/5 transition-all duration-1000 animate-float pointer-events-none"
          ></i>
        </div>

        <div
          @click="showContact = true"
          class="md:col-span-2 bg-blue-600 rounded-[3.5rem] p-12 text-white flex flex-col justify-between hover:bg-blue-500 transition-all cursor-pointer shadow-2xl shadow-blue-900/20 relative overflow-hidden group"
        >
          <div class="relative z-10 flex justify-between">
            <h3 class="text-5xl font-black uppercase italic leading-none tracking-tighter">
              Direct<br />Inquiry
            </h3>
            <div
              class="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:rotate-12 transition-transform"
            >
              <i class="pi pi-phone text-3xl"></i>
            </div>
          </div>
          <p class="relative z-10 text-blue-50 font-medium text-lg italic">
            Build a connection for technical collaborations or business automation.
          </p>
          <div
            class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"
          ></div>
        </div>

        <div
          class="bg-slate-900/20 border border-white/5 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center group hover:bg-slate-900/40 transition-all backdrop-blur-sm"
        >
          <p
            class="text-white font-black text-3xl italic mb-1 uppercase tracking-tighter leading-none"
          >
            Gap Year
          </p>
          <div class="h-1 w-10 bg-blue-600 rounded-full my-3"></div>
          <p class="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Full-time Learning
          </p>
        </div>

        <div class="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-4">
          <div class="grid grid-cols-3 gap-3 h-full">
            <a
              v-for="social in socials"
              :key="social.icon"
              @click.stop="openLink(social.link)"
              href="javascript:void(0)"
              class="rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 active:scale-90 aspect-square"
            >
              <i :class="'pi pi-' + social.icon" class="text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <footer
        class="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5"
      >
        <div class="flex flex-col items-center md:items-start text-left">
          <p class="text-[10px] font-black text-white uppercase tracking-tighter italic">
            Designed & Encoded by Chio<span class="text-blue-600">.</span>
          </p>
          <p class="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">
            Built with Precision // © 2026
          </p>
        </div>

        <div
          class="hidden lg:flex flex-col items-start font-mono text-[7px] text-blue-500/30 uppercase tracking-[0.2em] bg-white/1 p-3 rounded-xl border border-white/5 min-w-50"
        >
          <p v-for="(log, index) in logs" :key="index" class="leading-relaxed">{{ log }}</p>
        </div>

        <div class="flex gap-8">
          <div class="flex flex-col items-end">
            <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Local Time</p>
            <p class="text-xs text-white font-mono uppercase tracking-tighter">
              Jakarta // {{ currentTime }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Status</p>
            <p class="text-xs text-emerald-500 font-mono uppercase tracking-tighter">
              Available for Work
            </p>
          </div>
        </div>
      </footer>
    </div>

    <Dialog
      v-model:visible="showContact"
      modal
      :style="{ width: '90vw', maxWidth: '450px' }"
      :pt="{
        root: {
          class: 'rounded-[3rem] bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden',
        },
        mask: { class: 'backdrop-blur-xl bg-black/40' },
        header: { class: 'bg-[#0d0d0d] p-8 pb-0 border-none' },
        content: { class: 'bg-[#0d0d0d] p-8 pt-4' },
        closeButton: { class: 'text-white/50 hover:text-white hover:bg-white/10 transition-all' },
      }"
    >
      <template #header>
        <div class="flex flex-col gap-1 text-left">
          <p class="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Protocol 01</p>
          <h4 class="text-white font-black text-3xl uppercase italic tracking-tighter">
            Establish Connection
          </h4>
        </div>
      </template>
      <div class="space-y-4 text-left">
        <p class="text-slate-500 text-sm font-medium mb-6">
          Pick a channel to discuss your project or ask about automation.
        </p>
        <div class="flex flex-col gap-3">
          <Button
            @click="openLink('https://wa.me/6287875325304')"
            class="group rounded-2xl! py-5! bg-emerald-600! border-none! hover:bg-emerald-500! transition-all shadow-lg shadow-emerald-900/20"
          >
            <div class="flex items-center justify-between w-full px-4">
              <div class="flex items-center gap-3">
                <i class="pi pi-whatsapp text-xl text-white"></i>
                <span class="text-white font-black uppercase tracking-widest text-xs"
                  >WhatsApp Direct</span
                >
              </div>
              <i
                class="pi pi-arrow-right text-xs text-white/50 group-hover:translate-x-1 transition-transform"
              ></i>
            </div>
          </Button>
          <Button
            @click="openLink('mailto:sachioramzy12@gmail.com')"
            variant="outlined"
            class="group rounded-2xl! py-5! border-white/10! hover:bg-white/5! transition-all"
          >
            <div class="flex items-center justify-between w-full px-4">
              <div class="flex items-center gap-3">
                <i class="pi pi-envelope text-xl text-white"></i>
                <span class="text-white font-black uppercase tracking-widest text-xs"
                  >Secure Email</span
                >
              </div>
              <i
                class="pi pi-arrow-right text-xs text-white/50 group-hover:translate-x-1 transition-transform"
              ></i>
            </div>
          </Button>
        </div>
        <p class="text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] mt-8">
          Encryption Enabled // 2026 Build
        </p>
      </div>
    </Dialog>
  </main>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-leave-to {
  opacity: 0;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(-5deg);
  }
  50% {
    transform: translate(-10px, -20px) rotate(5deg);
  }
}
.animate-float {
  animation: float 10s ease-in-out infinite;
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

@keyframes header-reveal {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-header-reveal {
  animation: header-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (min-width: 768px) {
  .grid > div:hover {
    transform: scale(1.015) translateY(-5px);
    z-index: 30;
  }
}
</style>
