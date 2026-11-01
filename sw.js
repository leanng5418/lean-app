// Keeps the app working offline; always tries the network first so updates show up.
const CACHE = "lean-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png", "photos/chickenPotSoup.jpg","photos/chickenSpBowl.jpg","photos/cornOmelette.jpg","photos/cornSteam.jpg","photos/eggSpYog.jpg","photos/garlicPrawnTofu.jpg","photos/omShake.jpg","photos/omYogurt.jpg","photos/prawnCornSoup.jpg","photos/proteinBowl.jpg","photos/sardinePotCake.jpg","photos/sardineSoup.jpg","photos/soupEggPrawn.jpg","photos/spEgg.jpg","photos/steamedEggTofuChicken.jpg","photos/tofuChickenGarlic.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
