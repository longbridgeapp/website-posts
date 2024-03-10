import { defineConfig } from 'vitepress';
// @ts-ignore
import { siteMetadata } from './site-meta';
const siderbarConfig = require('./../scripts/siderbar');
console.log("🚀 ~ siderbarConfig:", siderbarConfig)


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Media Report",
  base: "/",
  description:
    "長橋證券（香港）是來自新加坡的新一代社交型券商，持有香港證監會第 1、4、9 類牌照，提供極速交易體驗，港美股終生免傭。",
  ignoreDeadLinks: true,
  appearance: false,
  lang: "en",
  cleanUrls: true,
  srcExclude: ["SUMMARY.md", "zh-HK.md", "zh-CN.md", "en.md"],
  srcDir: "locales",
  lastUpdated: true,

  head: [
    [
      "link",
      {
        type: "image/x-icon",
        rel: "icon",
        href: "https://pub.lbkrs.com/files/202107/35tULHe3n4Pp4EtA/logo.png",
      },
    ],
    ...siteMetadata,
  ],
  locales: {
    en: {
      label: "English",
      lang: "en",
      link: "/en/posts",
      themeConfig: {
        // nav: [{ text: "Whale Home", link: "https://longbridgewhale.com" }],
        // siteTitle: "Whale docs",
        // editLink: {
        //   pattern: editLinkPattern,
        // },
      },
    },
    "zh-CN": {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh-CN/posts",
      themeConfig: {
        // siteTitle: "帮助中心",
        outline: "deep",
        // nav: [
        //   { text: "Whale 首页", link: "/", target: "_self" },

        //   {
        //     text: "OpenAPI",
        //     link: "https://open.longportapp.com",
        //   },
        //   { text: "关于我们", link: "/zh-CN/about", target: "_self" },
        // ],
        // editLink: {
        //   pattern: editLinkPattern,
        //   text: '编辑此页',
        // },
        lastUpdated: {
          text: "最后更新时间",
        },
        docFooter: {
          prev: "上一篇",
          next: "下一篇",
        },
      },
    },
    "zh-HK": {
      label: "繁体中文",
      lang: "zh-HK",
      link: "/zh-HK/posts",
      themeConfig: {
        // siteTitle: "幫助中心",
        // nav: [
        //   { text: "Whale 首頁", link: "/", target: "_self" },
        //   {
        //     text: "OpenAPI",
        //     link: "https://open.longportapp.com/zh-HK",
        //   },
        //   { text: "關於我們", link: "/zh-HK/about", target: "_self" },
        // ],
        // editLink: {
        //   pattern: editLinkPattern,
        //   text: '编辑此页',
        // },
        lastUpdated: {
          text: "最後更新時間",
        },
        docFooter: {
          prev: "上一篇",
          next: "下一篇",
        },
      },
    },
  },

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "https://assets.lbkrs.com/uploads/12886da6-a40a-4e44-a74c-8ce15a1dedcc/logo.png",
    // search: {
    //   provider: "local",
    //   options: {
    //     locales: {
    //       "zh-CN": {
    //         translations: {
    //           button: {
    //             buttonText: "搜索文档",
    //             buttonAriaLabel: "搜索文档",
    //           },
    //           modal: {
    //             noResultsText: "无法找到相关结果",
    //             resetButtonTitle: "清除查询条件",
    //             footer: {
    //               selectText: "选择",
    //               navigateText: "切换",
    //               closeText: "关闭",
    //             },
    //           },
    //         },
    //       },
    //       "zh-HK": {
    //         translations: {
    //           button: {
    //             buttonText: "搜尋文件",
    //             buttonAriaLabel: "搜尋文件",
    //           },
    //           modal: {
    //             noResultsText: "無法找到相關結果",
    //             resetButtonTitle: "清除查詢條件",
    //             footer: {
    //               selectText: "選擇",
    //               navigateText: "切換",
    //               closeText: "關閉",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    sidebar: {
      en: siderbarConfig["en"],
      "zh-CN": siderbarConfig["zh-CN"],
      "zh-HK": siderbarConfig["zh-HK"],
    },
    outline: [2, 3],
    socialLinks: [],
  },
});
