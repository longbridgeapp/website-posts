/*
 * read feishu-pages/docs.json loop each children generate siderbar config
 * config example:
  sidebar: [
    {
      text: '简体中文',
      link: '/zh-CN/docs',
      items: [
        { text: 'Introduction', link: '/zh-CN/docs/introduction' },
        { text: 'Getting Started', link: '/zh-CN/docs/getting-started' },
        ...
      ]
    },
    {
      text: '繁体中文',
      link: '/zh-HK/docs',
      items: [
        { text: 'Introduction', link: '/zh-HK/docs/introduction' },
        { text: 'Getting Started', link: '/zh-HK/docs/getting-started' },
        ...
      ]
    }
  ]
 * */
const docsMeta = require("../feishu-pages/docs.json");
const hkMetadata = docsMeta[0].children.find(
  (doc) => doc.meta?.slug === "zh-HK"
) || { children: [] };
const cnMetadata = docsMeta[0].children.find(
  (doc) => doc.meta?.slug === "zh-CN"
) || { children: [] };
const enMetadata = docsMeta[0].children.find(
  (doc) => doc.meta?.slug === "en"
) || {
  children: [],
};

function generateSidebarConfig(metaData, locale = "zh-HK") {
  const sidebarConfig = [];

  metaData.forEach((doc) => {
    const slug = doc.slug.replace(/(\/zh-HK|\/zh-CN|\/en)/, "");
    const sidebarItem = {
      text: doc.title,
      link: `/${locale}/posts/${slug}`,
    };

    if (doc.has_child) {
      sidebarItem.items = generateSidebarConfig(doc.children, locale)
      // not collapsed if depth = 1
      sidebarItem.collapsed = doc.depth !== 1;
    }

    sidebarConfig.push(sidebarItem);
  });

  return sidebarConfig;
}

function hkSidebar() {
  return generateSidebarConfig(hkMetadata.children, "zh-HK");
}
function cnSidebar() {
  return generateSidebarConfig(cnMetadata.children, "zh-CN");
}
function enSidebar() {
  return generateSidebarConfig(enMetadata.children, "en");
}

function replaceHKLink2CN(item) {
  item.link = item.link.replace("zh-HK", "zh-CN");
  if (item.items) {
    item.items.forEach((item) => {
      replaceHKLink2CN(item);
    });
  }
}

function hkSidebar2CN() {
  const hkConfig = hkSidebar();
  // item hkConfig link attr replace zh-HK to zh-CN, if items exist loop items
  hkConfig.forEach((item) => {
    replaceHKLink2CN(item);
  });
  return hkConfig;
}

module.exports = {
  "zh-HK": hkSidebar(),
  "zh-CN": cnSidebar(),
  en: enSidebar(),
};
