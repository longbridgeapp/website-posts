#!/bin/bash

# prepare vitepress workspace
mkdir -p locales/en locales/zh-HK locales/zh-CN

# diff feishu-pages export docs.json to locale feishu-pages directory witch markdown file if hidde
#bun ./scripts/normalize_missing_docs_markdown_fields.js

# cp feishu pages meta config to vitepress workspace
#cp -r feishu-pages/docs/en/* locales/en/docs/
#cp -r feishu-pages/docs/zh-HK/* locales/zh-HK/docs/
#cp -r feishu-pages/docs/zh-HK/* locales/zh-CN/docs/
#cp feishu-pages/docs.json locales/

# set docs/guides to /docs index page
#cp locales/en/docs/guides.md locales/en/docs/index.md
#cp locales/en/docs/guides.md locales/en/docs.md

#cp locales/zh-CN/docs/guides.md locales/zh-CN/docs/index.md
#cp locales/zh-CN/docs/guides.md locales/zh-CN/docs.md

#cp locales/zh-HK/docs/guides.md locales/zh-HK/docs/index.md
#cp locales/zh-HK/docs/guides.md locales/zh-HK/docs.md

# normalize docs slug to vitepress markdown files or docs.json
#bun ./scripts/normalize_slug.js

# translate HK to CN
bun ./scripts/setup.js

# autocorrect
bun run autocorrect --fix locales/



