if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const t=e=>a(e,c),o={module:{uri:c},exports:r,require:t};s[c]=Promise.all(i.map((e=>o[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/141-9f72e4dced326db1.js",revision:"9f72e4dced326db1"},{url:"/_next/static/chunks/165-286ea062ad67e9a9.js",revision:"286ea062ad67e9a9"},{url:"/_next/static/chunks/191-372818f2815b3830.js",revision:"372818f2815b3830"},{url:"/_next/static/chunks/512-ff38ac4c597337b5.js",revision:"ff38ac4c597337b5"},{url:"/_next/static/chunks/61-30b36970a2c3f31d.js",revision:"30b36970a2c3f31d"},{url:"/_next/static/chunks/674a26a7-56f86b520a860f93.js",revision:"56f86b520a860f93"},{url:"/_next/static/chunks/75fc9c18-e61c2e0d9c9a0957.js",revision:"e61c2e0d9c9a0957"},{url:"/_next/static/chunks/771-7049f9915d431201.js",revision:"7049f9915d431201"},{url:"/_next/static/chunks/775-5dd00ec00a9a3b8c.js",revision:"5dd00ec00a9a3b8c"},{url:"/_next/static/chunks/881-e48c234134c0377a.js",revision:"e48c234134c0377a"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-de19382865b6a2ff.js",revision:"de19382865b6a2ff"},{url:"/_next/static/chunks/pages/_app-e65fecfda6f8a55f.js",revision:"e65fecfda6f8a55f"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/dashboard-6df2d803e96b5477.js",revision:"6df2d803e96b5477"},{url:"/_next/static/chunks/pages/forget-password-8ad898a0b43d6f6d.js",revision:"8ad898a0b43d6f6d"},{url:"/_next/static/chunks/pages/index-078c63301afc40f7.js",revision:"078c63301afc40f7"},{url:"/_next/static/chunks/pages/lead-management-a9288a348d8808b7.js",revision:"a9288a348d8808b7"},{url:"/_next/static/chunks/pages/lead-management/%5Bid%5D-784e382d081be847.js",revision:"784e382d081be847"},{url:"/_next/static/chunks/pages/login-175740624760e9d1.js",revision:"175740624760e9d1"},{url:"/_next/static/chunks/pages/promo-3809d5a897c4f65a.js",revision:"3809d5a897c4f65a"},{url:"/_next/static/chunks/pages/schedule-reports-bd1ab4070f158778.js",revision:"bd1ab4070f158778"},{url:"/_next/static/chunks/pages/setting-9828b6817e6a5e96.js",revision:"9828b6817e6a5e96"},{url:"/_next/static/chunks/pages/setting/change-password-2e29531bec0cd768.js",revision:"2e29531bec0cd768"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-42cdea76c8170223.js",revision:"42cdea76c8170223"},{url:"/_next/static/css/a22e99ab5f1b6de7.css",revision:"a22e99ab5f1b6de7"},{url:"/_next/static/css/b44e452a9b15cc82.css",revision:"b44e452a9b15cc82"},{url:"/_next/static/xIhHcxtcGjwD6V1XKCXIr/_buildManifest.js",revision:"4f918c80573d5e0b6dae71bf23fb21e5"},{url:"/_next/static/xIhHcxtcGjwD6V1XKCXIr/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/xIhHcxtcGjwD6V1XKCXIr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/actions-bookmark-desktop-jld6gct-svgrepo-com.svg",revision:"d9e4170d433fb2c9b70cf93eea39763a"},{url:"/android-launchericon-144-144.png",revision:"d0f6cd641551346101e201df4597e56f"},{url:"/android-launchericon-192-192.png",revision:"d43fc2f053dc27b7e0834d905296a0c9"},{url:"/android-launchericon-48-48.png",revision:"71f2709051bf5cfb7e28cfa34ad166fb"},{url:"/android-launchericon-512-512.png",revision:"500afec45c503ff9d14b43a37d5c4794"},{url:"/android-launchericon-72-72.png",revision:"4e43bc0966d9d08b80c1b86473e7e375"},{url:"/android-launchericon-96-96.png",revision:"31d2317fdb47edb0361d8308118f0883"},{url:"/award-favorite-rating-star-svgrepo-com.svg",revision:"5496b9038d36dbd1fe09ffd802b08ba9"},{url:"/bintaro-jaya-logo.svg",revision:"3df56225b296b0e306a697e1ced5ed9a"},{url:"/favicon.ico",revision:"51456e138a3dcbfb76e636b96ff2e113"},{url:"/favorite-svgrepo-com (1).svg",revision:"49c62b08b2a6bf5eb522dade1e836a88"},{url:"/favorite-svgrepo-com (2).svg",revision:"af5f54f4afc0df99fd831965fd24925f"},{url:"/favorite-svgrepo-com.svg",revision:"fbe3406246fe4d2e51b031554921ad73"},{url:"/firebase/firebase-messaging-sw.js",revision:"110453a31b4ec3b840115965e2d133e3"},{url:"/images/arrow-btn.png",revision:"e0467a8c61971f6973259422e2c012b6"},{url:"/images/background-min.jpg",revision:"98d7da18cb4c60b484be5bce11934391"},{url:"/images/background.jpg",revision:"5a56d2912196c9ff83a6f8a0ec3dfb3e"},{url:"/images/background_desktop.jpg-min.jpg",revision:"7e095befcc38cc1186cbc5f62d02c597"},{url:"/images/background_mobile-min.jpg",revision:"d8df0eb2207b5b56542693c2ff4b22e0"},{url:"/images/binatrojaya.png",revision:"2739aea2d61aafac9a6a006becaa9338"},{url:"/images/bintaro-jaya-logo-color.svg",revision:"3df56225b296b0e306a697e1ced5ed9a"},{url:"/images/email.png",revision:"613a90506f0c577acd177514e67a424e"},{url:"/images/ex.jpeg",revision:"0bc146fa4913ad95366130220ff6bf77"},{url:"/images/exclamation-mark.png",revision:"f35a493d081c402ea881ebb0f5c64666"},{url:"/images/fast-forward-double-right-arrows-symbol (2).png",revision:"ac484bd6c9fe172d5b82d36056e7be0c"},{url:"/images/fast-forward-double-right-arrows-symbol.png",revision:"1213161fc13f2e9c40b30949e8c5bd7b"},{url:"/images/filter.png",revision:"72b7241a2a07b10f07380abd6b122d62"},{url:"/images/mobile.jpg",revision:"da9871d788601a10af39e15d2b676969"},{url:"/images/next.png",revision:"2accb92a5b50cfa1f8061da13b638269"},{url:"/images/settings.png",revision:"af1470bbe7e82321ce9be9b4d751bc3b"},{url:"/images/sort.png",revision:"a0f48f21c018a80b138d4b960f1bd29c"},{url:"/images/telephone.png",revision:"d4d67c9545f27632481689400aa691bd"},{url:"/images/three-dots.png",revision:"cba10aaaee72d86ac049d232c0a43783"},{url:"/images/whatsapp.png",revision:"7827311c1f3817aa385d35228c040bca"},{url:"/manifest.json",revision:"493bc958962dfbeba7d3cbbd3131df7e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
