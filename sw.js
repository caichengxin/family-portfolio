const CACHE='family-portfolio-v13a-shell-20261125';
const SHELL=['./index.html','./app.js','./robinhood.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('family-portfolio-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const u=new URL(e.request.url);if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));return}if(!SHELL.some(s=>new URL(s,self.location).href===u.href))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
