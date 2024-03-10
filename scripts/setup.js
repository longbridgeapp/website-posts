/*
 * 1. read feishu-pages/docs.json file find first level meta slug equal zh-HK
 * 2. find the slug file in feishu-pages/docs/:slug.md copy it to locales/zh-HK/docs/:slug.md
 * 3. convert feishu-pagers/docs/:slug.md zh-CN then new file to locales/zh-CN/docs/:slug.md
 * 4. generate zh-HK, zh-CN siderbar config
 * */

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const OpenCC = require("opencc-js");
const converter = OpenCC.Converter({ from: "hk", to: "cn" });
// const converter = OpenCC.Converter({ from: " hk", to: "cn" });

function convertToMd() {
  const docsPath = path.resolve(__dirname, "../feishu-pages/docs");
  const docs = glob.sync(`${docsPath}/**/*.md`);
  console.log("🚀 ~ convertHK2CN ~ docsPath:", docsPath, docs);
  const regex1 = /(zh-HK|zh-CN|en)\/(\w+)/g;
  const regex = /\/([^\/]+)\/(zh-HK|zh-CN|en)\.md$/;
  docs.forEach((doc) => {
    const docContent = fs.readFileSync(doc, "utf-8");
    const matches1 = doc.match(regex1) || [""];
    const matches = doc.match(regex) || [];

    const locale = matches[2] || matches1[0].split("/")[0];
    const fileName = matches[1] || matches1[0].split("/")[1];

    if (locale && fileName) {
      const filePath =
        doc.split("feishu-pages")[0] +
        `/locales/${locale}/posts/${fileName}.md`;
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      fs.writeFileSync(filePath, docContent);
    }
  });
}
// Copy feishu-pages/assets/*.png to locales/assets
function setupAssets() {
  const assetsPath = path.resolve(__dirname, "../feishu-pages/docs/assets");
  // find png or jpg or jpeg gif file
  const assets = glob.sync(`${assetsPath}/*.{png,jpg,jpeg,gif}`);

  assets.forEach((asset) => {
    const targetAssetsPath = asset.replace("feishu-pages/docs/", "locales/");

    if (!fs.existsSync(path.dirname(targetAssetsPath))) {
      fs.mkdirSync(path.dirname(targetAssetsPath));
    }

    if (!fs.existsSync(targetAssetsPath)) {
      fs.copyFileSync(asset, targetAssetsPath);
      console.log("copy assets file: ", targetAssetsPath);
    }
  });
}
const docsMeta = require("../feishu-pages/docs.json");

// read feishu-pages/docs.json file, find slug equal lang key one of zh-CN , zh-HK ,en. then copy it to locales/{lang key}/docs/index.md
// for Nginx directory to index.html
function setIndex() {
  // loop first level children find meta.slug = 多语言标识
  const langSlug = ["zh-HK", "zh-CN", "en"];
  langSlug.forEach((lang) => {
    const langMetadata = docsMeta[0].children.find(
      (doc) => doc.meta?.slug === lang
    );
    if (langMetadata) {
      const guidesFilePath = path.resolve(
        __dirname,
        `../feishu-pages/docs/${langMetadata.slug}/${lang}.md`
      );
      let guidesContent = fs.readFileSync(guidesFilePath, "utf-8");
      const slugReg = new RegExp(`/${langMetadata.slug}/${lang}`, "g");
      guidesContent = guidesContent.replace(slugReg, `/${lang}/posts`);

      const guidesTargetFilePath = path.resolve(
        __dirname,
        `../locales/${lang}/posts/index.md`
      );
      fs.writeFileSync(guidesTargetFilePath, guidesContent);
      console.log(
        `copy ${lang} ${langMetadata.slug}/${lang} to index file: `,
        guidesTargetFilePath
      );
    }
  });
}

// 按创建时间排序，最新的在前面
function sortFeishuDocs(docsJson) {
  const key = "obj_create_time";
  docsJson[0].children.map((child) =>
    child.children.sort((a, b) => b[key] - a[key])
  );

  docsJson[0].children = docsJson[0].children.sort((a, b) => {
    return b[key] - a[key];
  });
  return docsJson;
}

function transferFeishuDocsJson() {
  const sortedDocs = sortFeishuDocs(docsMeta);
  const newJson = sortedDocs[0].children.map((json) => {
    const localeSlug = json.meta?.slug || "";
    const children = (json?.children || []).map((c) => {
      if (localeSlug && c.slug.includes(localeSlug)) {
        c.slug = c.slug.split(`${localeSlug}/`)[1];
        c.filename = c.filename.split(`${localeSlug}/`)[1];
      }
      return c;
    });

    json.children = children;
    if (json.slug.includes(localeSlug)) {
      json.slug = json.slug.replace(`/${localeSlug}`, "");
      json.filename = json.filename.replace(`/${localeSlug}`, "");
    }
    return json;
  });
  const feishuJson = path.resolve(
    __dirname,
    "../feishu-pages/docs.json"
  );
  sortedDocs[0].children = newJson;
  fs.writeFileSync(feishuJson, JSON.stringify(sortedDocs));
}
function run() {
  transferFeishuDocsJson()

  convertToMd()
  setupAssets();

  setIndex()
}

run();
