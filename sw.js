// 오프라인 실행용 서비스 워커 (빌드 v1793782441253)
const CACHE = "truth-v1793782441253";
const PRECACHE = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./assets/bg-court.webp","./assets/end-close-f.jpg","./assets/end-close-m.jpg","./assets/end-top-f.jpg","./assets/end-top-m.jpg","./assets/frame-choice.png","./assets/frame-modal.webp","./assets/hero-f.webp","./assets/hero-m.webp","./assets/judge.webp","./assets/office-0-f.jpg","./assets/office-0-m.jpg","./assets/office-1-f.jpg","./assets/office-1-m.jpg","./assets/office-2-f.jpg","./assets/office-2-m.jpg","./assets/office-3-f.jpg","./assets/office-3-m.jpg","./assets/opp.webp","./assets/pros.webp","./assets/stamp-lose.png","./assets/stamp-win.png","./assets/title.jpg","./assets/cut/f-c1.webp","./assets/cut/f-c2.webp","./assets/cut/f-c3.webp","./assets/cut/f-c4.webp","./assets/cut/f-c5.webp","./assets/cut/f-c6.webp","./assets/cut/f-c7.webp","./assets/cut/f-c8.webp","./assets/cut/f-chef.webp","./assets/cut/f-exec.webp","./assets/cut/f-pd.webp","./assets/cut/f-ptf.webp","./assets/cut/f-ptm.webp","./assets/cut/f-pw.webp","./assets/cut/f-rep.webp","./assets/cut/f-vic.webp","./assets/cut/m01.webp","./assets/cut/m02.webp","./assets/cut/m03.webp","./assets/cut/m04.webp","./assets/cut/m05.webp","./assets/cut/m06.webp","./assets/cut/m07.webp","./assets/cut/m08.webp","./assets/cut/m09.webp","./assets/cut/m10.webp","./assets/cut/m11.webp","./assets/cut/m12.webp","./assets/cut/m13.webp","./assets/cut/m14.webp","./assets/cut/m15.webp","./assets/cut/m16.webp","./assets/cut/m18.webp","./assets/cut/m19.webp","./assets/cut/m20.webp","./assets/cut/m21.webp","./assets/cut/m22.webp","./assets/cut/m23.webp","./assets/cut/m24.webp","./assets/cut/m25.webp","./assets/cut/m26.webp","./assets/cut/m27.webp","./assets/cut/m28.webp","./assets/cut/m29.webp","./assets/cut/m30.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // 게임 화면은 인터넷이 되면 항상 최신 판을 받고, 안 되면 저장해 둔 판으로
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./", copy)); return res; }).catch(() => caches.match("./")));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => hit)));
});
