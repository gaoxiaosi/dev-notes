import { defineConfig } from 'vitepress'

import { generateSidebar } from 'vitepress-sidebar';

// import.meta.env.MODE === 'production'? process.env.BASE_URL = '/your-production-base-url/' : process.env.BASE_URL = '/';
const base =  '/dev-notes/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "DEV NOTES",
  description: "开发笔记",
  head: [
    ['link', { rel: 'shortcut icon', href: 'favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: 'logo.png', width: 24, height: 24 },
    nav: [
      { text: '首页', link: '/' },
      { text: 'CSS', link: 'CSS/BFC' },
      { text: 'JS', link: 'JS/Ajax' },
      { text: 'VUE', link: 'VUE/Diff算法' },
      { text: '工程化', link: '工程化/module' },
      { text: '算法', link: '算法/小游戏' },
      { text: '其他', link: '其他/Chrome' }
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Gaoxiaosi'
    },
    search: {
      provider: 'local'
    },
    sidebar: generateSidebar({
      documentRootPath: '/docs',
      collapsed: true,
      manualSortFileNameByPriority: [
        'CSS', 'JS', 'VUE', '工程化', '算法', '其他'
      ]
    }),

    outline: {
      level: [2, 6],
      label: '目录'
    },

    socialLinks: [
      { icon: 'bilibili', link: 'https://space.bilibili.com/314584180'},
      { icon: 'juejin', link: 'https://juejin.cn/user/1679709495371512' },
      { icon: 'github', link: 'https://github.com/gaoxiaosi' }
    ]
  }
})
