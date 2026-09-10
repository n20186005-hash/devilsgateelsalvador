'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // 仅在 HTTPS / localhost 环境注册，避免沙盒或开发代理报错
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* 忽略注册失败 */
      });
    }
  }, []);

  return null;
}
