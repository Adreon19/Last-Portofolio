<template>
  <main
    :class="[isLoaded ? 'opacity-100' : 'opacity-0']"
    class="relative min-h-screen bg-[#020202] text-slate-400 p-6 flex items-center justify-center font-sans transition-opacity duration-1000 overflow-hidden selection:bg-blue-500/30"
  >
    <div class="fixed inset-0 bg-noise pointer-events-none z-50"></div>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px]"
      ></div>
    </div>

    <div class="scanline"></div>

    <div class="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
      <div
        class="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-16 animate-slide-down"
        style="animation-delay: 0.1s"
      >
        <span class="relative flex h-1.5 w-1.5 shrink-0">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          ></span>
        </span>

        <p class="text-[7.5px] font-black text-red-500 uppercase tracking-[0.5em] leading-none">
          Signal Lost: 404_VOID
        </p>
      </div>

      <h1
        class="text-7xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-16 group cursor-default animate-slide-down"
        style="animation-delay: 0.2s"
      >
        Empty<br />
        <span class="text-blue-600 not-italic relative">
          Sector
          <span
            class="absolute -inset-1 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
          ></span>
        </span>
        <span class="text-white">.</span>
      </h1>

      <div class="relative mb-20 animate-slide-down" style="animation-delay: 0.3s">
        <p
          class="text-slate-500 text-xs md:text-sm leading-relaxed italic border-l-2 border-blue-600/50 pl-6 text-left max-w-70 mx-auto"
        >
          The requested documentation has been
          <span class="text-white font-medium text-[11px]">purged</span> or moved to an encrypted
          directory by the administrator.
        </p>
      </div>

      <div
        class="w-full flex flex-col items-center gap-6 animate-slide-down"
        style="animation-delay: 0.4s"
      >
        <Button
          @click="$router.back()"
          label="Return to Terminal"
          icon="pi pi-arrow-left"
          class="px-6! py-3! rounded-full! bg-white/5! border! border-white/10! text-[9px]! font-black! uppercase! tracking-[0.3em]! hover:bg-blue-600! hover:border-blue-500! hover:text-white! hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-500 active:scale-95"
        />

        <footer class="mt-20 pt-10 border-t border-white/5 w-full">
          <p
            class="text-center text-[8px] text-slate-700 font-bold uppercase tracking-[0.4em] font-mono leading-relaxed"
          >
            Error Code: NULL_LINK_EXCEPTION<br />
            Secure Connection Established // Protocol 0x00404
          </p>
        </footer>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<style scoped>
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(37, 99, 235, 0.1), transparent);
  animation: scan 6s linear infinite;
  z-index: 20;
  pointer-events: none;
}

@keyframes scan {
  0% {
    transform: translateY(-10vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation-fill-mode: forwards;
}

:deep(.pi) {
  font-size: 0.7rem !important;
}
</style>
