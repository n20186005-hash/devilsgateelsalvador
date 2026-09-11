import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

// `npm run build` 本身就是 `opennextjs-cloudflare build`（CI 直接执行它），
// 而 opennextjs-cloudflare build 默认内部会再调用 `npm run build`，从而自我递归。
// 这里显式把内部构建命令指向 `build:next`（即 next build），打断递归。
export default {
  ...defineCloudflareConfig({
    incrementalCache: r2IncrementalCache,
  }),
  buildCommand: 'npm run build:next',
};
