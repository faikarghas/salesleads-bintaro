if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/8STjSj7Js7dgL2kEy2Ij0/_buildManifest.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/8STjSj7Js7dgL2kEy2Ij0/_middlewareManifest.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/8STjSj7Js7dgL2kEy2Ij0/_ssgManifest.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/141-9ad054c4c8c506f8.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/165-48259fd89830abd3.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/189-55c9d2380a877b35.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/191-39d618eede61ae45.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/226-9b2bf4ee53e13a93.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/537-01a811340bb893ad.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/765-a6d21757aa9f9ce1.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/881-af5777afa2885227.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/cdbff3de-a1c11f9042ec5bec.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/main-50770868367ef490.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/_app-99e43747130cf57d.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/dashboard-5c0b537236dff533.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/index-ee4db2360e60248b.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/lead-management-a882eaca84dfe7ca.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/lead-management/%5Bid%5D-75eed2fd7b829611.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/login-af6ee40a454a1dec.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/promo-6ea42d8f23b994ef.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/schedule-reports-14c97650ddb63cf9.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/setting-ee4ba89b5403065e.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/pages/setting/new-password-39cf6a9a31df3eb4.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/chunks/webpack-9b0e45c24ba97727.js",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/_next/static/css/b1fc0d895d708d49.css",revision:"8STjSj7Js7dgL2kEy2Ij0"},{url:"/actions-bookmark-desktop-jld6gct-svgrepo-com.svg",revision:"d9e4170d433fb2c9b70cf93eea39763a"},{url:"/award-favorite-rating-star-svgrepo-com.svg",revision:"5496b9038d36dbd1fe09ffd802b08ba9"},{url:"/bintaro-jaya-logo.svg",revision:"3df56225b296b0e306a697e1ced5ed9a"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/favorite-svgrepo-com (1).svg",revision:"49c62b08b2a6bf5eb522dade1e836a88"},{url:"/favorite-svgrepo-com (2).svg",revision:"af5f54f4afc0df99fd831965fd24925f"},{url:"/favorite-svgrepo-com.svg",revision:"fbe3406246fe4d2e51b031554921ad73"},{url:"/firebase/firebase-messaging-sw.js",revision:"110453a31b4ec3b840115965e2d133e3"},{url:"/icon-192x192.png",revision:"57a02e6b85d3768b1678e4f05799a152"},{url:"/icon-256x256.png",revision:"010eb45c56dc61e844e5bf9dc0e1bfb1"},{url:"/icon-384x384.png",revision:"584ac4664d127805057cc77df2022d21"},{url:"/icon-512x512.png",revision:"9295b4f2e92665f9dd8adf2360d21a35"},{url:"/images/background-min.jpg",revision:"98d7da18cb4c60b484be5bce11934391"},{url:"/images/background.jpg",revision:"5a56d2912196c9ff83a6f8a0ec3dfb3e"},{url:"/images/background_desktop.jpg-min.jpg",revision:"7e095befcc38cc1186cbc5f62d02c597"},{url:"/images/background_mobile-min.jpg",revision:"d8df0eb2207b5b56542693c2ff4b22e0"},{url:"/images/binatrojaya.png",revision:"2739aea2d61aafac9a6a006becaa9338"},{url:"/images/bintaro-jaya-logo-color.svg",revision:"3df56225b296b0e306a697e1ced5ed9a"},{url:"/images/email.png",revision:"613a90506f0c577acd177514e67a424e"},{url:"/images/ex.jpeg",revision:"0bc146fa4913ad95366130220ff6bf77"},{url:"/images/exclamation-mark.png",revision:"f35a493d081c402ea881ebb0f5c64666"},{url:"/images/fast-forward-double-right-arrows-symbol (2).png",revision:"ac484bd6c9fe172d5b82d36056e7be0c"},{url:"/images/fast-forward-double-right-arrows-symbol.png",revision:"1213161fc13f2e9c40b30949e8c5bd7b"},{url:"/images/filter.png",revision:"72b7241a2a07b10f07380abd6b122d62"},{url:"/images/mobile.jpg",revision:"da9871d788601a10af39e15d2b676969"},{url:"/images/next.png",revision:"2accb92a5b50cfa1f8061da13b638269"},{url:"/images/settings.png",revision:"af1470bbe7e82321ce9be9b4d751bc3b"},{url:"/images/sort.png",revision:"a0f48f21c018a80b138d4b960f1bd29c"},{url:"/images/telephone.png",revision:"d4d67c9545f27632481689400aa691bd"},{url:"/images/three-dots.png",revision:"cba10aaaee72d86ac049d232c0a43783"},{url:"/images/whatsapp.png",revision:"7827311c1f3817aa385d35228c040bca"},{url:"/manifest.json",revision:"30b061e87f0ff7f05aadd84a1ecc276f"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));