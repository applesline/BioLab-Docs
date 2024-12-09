import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BioLab官方文档",
  description: "BioLab官方文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速入门', link: '/zh/quick-start' },
      { text: '案例分析', link: '/zh/cases' }
    ],

    sidebar: [
      {
        text: 'BioHubX社区',
        items: [
          { text: '在线支持', link: '/zh/support' },
          { text: '关于我们', link: '/zh/about' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BioHubx' }
    ]
  }
})
