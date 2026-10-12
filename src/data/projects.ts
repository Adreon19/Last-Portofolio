export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  github_link: string
  demo_link: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'My Latest Portofolio',
    description: 'Hi all, this is my latest portofolio that i just made, hope you enjoy:)',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    github_link: 'https://github.com/Adreon19/Last-Portofolio',
    demo_link: 'https://sachio-portofolio.vercel.app/',
  },
  {
    id: 2,
    title: 'UMKM-GO',
    description:
      'I helped my friend to make their idea alive for their Business Idea Campus Competition.',
    tags: ['Vue.js', 'Tailwind CSS'],
    github_link: 'https://github.com/Adreon19/',
    demo_link: 'https://umkm-go-prototype.netlify.app/',
  },
  {
    id: 3,
    title: 'Cashier Website',
    description: 'This is my final project for High School.',
    tags: ['Vue.js', 'Tailwind CSS', 'Supabase'],
    github_link: 'https://github.com/Adreon19/kasir-abs',
    demo_link: 'https://stay-high.netlify.app/',
  },
  {
    id: 4,
    title: 'Metschoo Library',
    description: 'Another School Project',
    tags: ['Nuxt.js', 'Vue.js', 'Tailwind CSS', 'Supabase'],
    github_link: 'https://github.com/pplg-smk-metland/metschoo-library',
    demo_link: 'https://metschoo-lib-preview.netlify.app/',
  },
]
