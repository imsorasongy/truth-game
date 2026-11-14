// 오프라인 실행용 서비스 워커
// 앱(화면 파일)은 배포할 때마다 새 판으로 바꾸고, 그림(assets/)은 버전과 상관없는 따로 된 저장소에 둔다.
// 그래서 배포해도 이미 받은 그림은 다시 받지 않는다. 그림은 저장해 둔 것을 바로 보여 주고, 뒤에서 바뀌었는지만 확인한다.
// 같은 이름의 그림을 다시 그려 바꿨을 때도 다음 실행부터 새 그림이 보인다(뒤에서 확인한 결과).
const CACHE = "truth-v1795150000000";
const IMG = "truth-img-1";
const PRECACHE = ["./","./index.html","./story.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./assets/court-2.webp","./assets/end-close-f.jpg","./assets/end-close-m.jpg","./assets/end-top-f.jpg","./assets/end-top-m.jpg","./assets/frame-choice.png","./assets/frame-modal.webp","./assets/hero-f.webp","./assets/hero-m.webp","./assets/judge-close.webp","./assets/judge.webp","./assets/office-0-f.jpg","./assets/office-0-m.jpg","./assets/office-1-f.jpg","./assets/office-1-m.jpg","./assets/office-2-f.jpg","./assets/office-2-m.jpg","./assets/office-3-f.jpg","./assets/office-3-m.jpg","./assets/opp.webp","./assets/pros.webp","./assets/stamp-lose.png","./assets/stamp-win.png","./assets/title.jpg","./assets/cut/f-c1.webp","./assets/cut/f-c2.webp","./assets/cut/f-c3.webp","./assets/cut/f-c4.webp","./assets/cut/f-c5.webp","./assets/cut/f-c6.webp","./assets/cut/f-c7.webp","./assets/cut/f-c8.webp","./assets/cut/f-chef.webp","./assets/cut/f-exec.webp","./assets/cut/f-pd.webp","./assets/cut/f-ptf.webp","./assets/cut/f-ptm.webp","./assets/cut/f-pw.webp","./assets/cut/f-rep.webp","./assets/cut/f-vic.webp","./assets/cut/m01.webp","./assets/cut/m02.webp","./assets/cut/m03.webp","./assets/cut/m04.webp","./assets/cut/m05.webp","./assets/cut/m06.webp","./assets/cut/m07.webp","./assets/cut/m08.webp","./assets/cut/m09.webp","./assets/cut/m10.webp","./assets/cut/m11.webp","./assets/cut/m12.webp","./assets/cut/m13.webp","./assets/cut/m14.webp","./assets/cut/m15.webp","./assets/cut/m16.webp","./assets/cut/m18.webp","./assets/cut/m19.webp","./assets/cut/m20.webp","./assets/cut/m21.webp","./assets/cut/m22.webp","./assets/cut/m23.webp","./assets/cut/m24.webp","./assets/cut/m25.webp","./assets/cut/m26.webp","./assets/cut/m27.webp","./assets/cut/m28.webp","./assets/cut/m29.webp","./assets/cut/m30.webp","./assets/cut/n20f1.webp","./assets/cut/n20f2.webp","./assets/cut/n20f3.webp","./assets/cut/n20f4.webp","./assets/cut/n20m1.webp","./assets/cut/n20m2.webp","./assets/cut/n20m3.webp","./assets/cut/n20m4.webp","./assets/cut/n30f1.webp","./assets/cut/n30f2.webp","./assets/cut/n30f3.webp","./assets/cut/n30f4.webp","./assets/cut/n30m1.webp","./assets/cut/n30m2.webp","./assets/cut/n30m3.webp","./assets/cut/n30m4.webp","./assets/cut/n40f1.webp","./assets/cut/n40f2.webp","./assets/cut/n40f3.webp","./assets/cut/n40f4.webp","./assets/cut/n40m1.webp","./assets/cut/n40m2.webp","./assets/cut/n40m3.webp","./assets/cut/n40m4.webp","./assets/cut/n50f1.webp","./assets/cut/n50f2.webp","./assets/cut/n50f3.webp","./assets/cut/n50f4.webp","./assets/cut/n50m1.webp","./assets/cut/n50m2.webp","./assets/cut/n50m3.webp","./assets/cut/n50m4.webp","./assets/cut/n60f1.webp","./assets/cut/n60f2.webp","./assets/cut/n60f3.webp","./assets/cut/n60f4.webp","./assets/cut/n60m1.webp","./assets/cut/n60m2.webp","./assets/cut/n60m3.webp","./assets/cut/n60m4.webp","./assets/expr/hero-f_confident.webp","./assets/expr/hero-f_flustered.webp","./assets/expr/hero-f_neutral.webp","./assets/expr/hero-f_relieved.webp","./assets/expr/hero-f_serious.webp","./assets/expr/hero-m_confident.webp","./assets/expr/hero-m_flustered.webp","./assets/expr/hero-m_neutral.webp","./assets/expr/hero-m_relieved.webp","./assets/expr/hero-m_serious.webp","./assets/expr/opponent_confident.webp","./assets/expr/opponent_flustered.webp","./assets/expr/opponent_neutral.webp","./assets/expr/opponent_serious.webp","./assets/expr/prosecutor_confident.webp","./assets/expr/prosecutor_flustered.webp","./assets/expr/prosecutor_neutral.webp","./assets/expr/prosecutor_serious.webp","./assets/ops-end/grade-s-m.jpg","./assets/ops-end/grade-s-f.jpg","./assets/ops-end/grade-a-m.jpg","./assets/ops-end/grade-a-f.jpg","./assets/ops-end/grade-b-m.jpg","./assets/ops-end/grade-b-f.jpg","./assets/ops-end/grade-c-m.jpg","./assets/ops-end/grade-c-f.jpg","./assets/ops-end/grade-d-m.jpg","./assets/ops-end/grade-d-f.jpg","./assets/ops-end/newspaper.jpg","./assets/op/o1-f.webp","./assets/op/o1-m.webp","./assets/op/o2-f.webp","./assets/op/o2-m.webp","./assets/op/o3.webp","./assets/op/s1.webp","./assets/op/s2.webp","./assets/op/s3.webp","./assets/staff/investigator_female_20s.webp","./assets/staff/investigator_male_30s.webp","./assets/staff/investigator_male_40s.webp","./assets/staff/lawyer_female_20s.webp","./assets/staff/lawyer_female_30s.webp","./assets/staff/lawyer_female_30s_02.webp","./assets/staff/lawyer_female_30s_03.webp","./assets/staff/lawyer_female_30s_04.webp","./assets/staff/lawyer_male_20s_01.webp","./assets/staff/lawyer_male_30s.webp","./assets/staff/lawyer_male_30s_02.webp","./assets/staff/lawyer_male_30s_03.webp","./assets/staff/lawyer_male_30s_04.webp","./assets/staff/manager_female_40s.webp","./assets/staff/manager_male_30s.webp","./assets/staff/manager_male_50s.webp","./assets/staff/secretary_female_20s_01.webp","./assets/staff/secretary_female_20s_02.webp","./assets/staff/secretary_male_30s.webp"];
const isAsset = u => /\/assets\//.test(new URL(u, self.location.href).pathname);
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const shell = await caches.open(CACHE), img = await caches.open(IMG);
    await shell.addAll(PRECACHE.filter(u => !isAsset(u)).map(u => new Request(u, { cache: "reload" })));
    // 그림은 아직 없는 것만 받는다
    for (const u of PRECACHE.filter(isAsset)) { if (!(await img.match(u, { ignoreSearch: true }))) { try { await img.add(u); } catch (x) {} } }
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== IMG).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // 게임 화면은 인터넷이 되면 항상 최신 판을 받고, 안 되면 저장해 둔 판으로
  if (e.request.mode === "navigate") {
    const key = /story\.html$/.test(url.pathname) ? "./story.html" : "./";
    e.respondWith(fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); return res; }).catch(() => caches.match(key)));
    return;
  }
  // 그림: 저장해 둔 것을 바로 쓰고, 뒤에서 새로 받아 저장해 둔다
  if (url.origin === location.origin && isAsset(e.request.url)) {
    e.respondWith(caches.open(IMG).then(async c => {
      const hit = await c.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(res => { if (res.ok) c.put(e.request, res.clone()); return res; });
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    }));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && url.origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => hit)));
});
