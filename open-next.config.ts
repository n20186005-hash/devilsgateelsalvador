import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// 说明：
// 1. `npm run build` 在 CI 里直接执行 `opennextjs-cloudflare build`，而该命令内部默认会再调用
//    `npm run build`，会造成自我递归。这里显式把内部构建命令指向 `build:next`（即 next build）来打断递归。
// 2. 站点为纯 SSG 静态内容，使用只读的「静态资源增量缓存」，随构建产物一起上传，
//    无需开通 R2、也无需在部署时通过 API 建桶。
export default {
  ...defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
  }),
  buildCommand: 'npm run build:next',
};
