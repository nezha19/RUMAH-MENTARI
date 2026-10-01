/* =====================================================================
   RUMAH MENTARI — app logic
   Sections: 1) Cover & navigation  2) Materi content  3) Simulation
   physics + charts  4) Latihan Soal (Indonesian) quiz engine
===================================================================== */

/* ---------------------------------------------------------------------
   1. COVER & NAVIGATION
--------------------------------------------------------------------- */
const coverForm = document.getElementById('cover-form');
coverForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('owner-name').value.trim() || 'Pengguna';
  const cls = document.getElementById('owner-class').value.trim() || '-';
  document.getElementById('owner-name-display').textContent = name;
  document.getElementById('owner-class-display').textContent = cls;
  document.getElementById('hero-owner-name').textContent = name;
  document.getElementById('cover').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  goToTab('beranda');
});

function goToTab(tabId){
  const panel = document.getElementById('tab-' + tabId);
  if (!panel) return;
  document.querySelectorAll('.tab-btn').forEach(b => {
    const active = b.dataset.tab === tabId;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tabId));
  window.scrollTo({top:0, behavior:'smooth'});
}

// Navigasi dibuat dengan event delegation agar seluruh tombol tetap bekerja
// meskipun isi halaman dirender ulang oleh JavaScript.
const tabsNav = document.getElementById('tabs');
if (tabsNav) {
  tabsNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (btn) goToTab(btn.dataset.tab);
  });
}
document.addEventListener('click', (e) => {
  const card = e.target.closest('.nav-card');
  if (card) goToTab(card.dataset.goto);
});

/* ---------------------------------------------------------------------
   2. KONTEN MATERI — BAHASA INDONESIA
--------------------------------------------------------------------- */
const materiSections = [
  {
    id:'intro', title:'Apa itu panel surya?', body:`
      <p>Panel surya adalah perangkat yang menangkap energi radiasi Matahari dan mengubahnya menjadi bentuk energi yang dapat dimanfaatkan. Pada rumah, teknologi yang umum digunakan adalah sel fotovoltaik (PV) yang mengubah radiasi Matahari secara langsung menjadi energi listrik.</p>
      <div class="diagram">☀ Matahari → Radiasi → Panel surya → Listrik → Peralatan rumah</div>
      <p>Dari sudut pandang fisika, proses ini menarik karena energi yang masuk tidak seluruhnya menjadi listrik. Sebagian energi menjadi panas dan sebagian lainnya mengalami berbagai rugi-rugi. Di sinilah konsep energi, temperatur, efisiensi, dan perpindahan kalor dalam termodinamika saling terhubung.</p>`
  },
  {
    id:'keseimbangan-energi', title:'Mengapa panel surya berkaitan dengan termodinamika?', body:`
      <p>Efek fotovoltaik menjelaskan bagaimana sel semikonduktor menghasilkan listrik. Namun, ketika panel dipandang sebagai sebuah sistem, kita juga harus memperhatikan energi yang masuk, energi yang berubah menjadi listrik, energi yang berubah menjadi panas, dan energi yang hilang ke lingkungan.</p>
      <div class="formula">Energi masuk = Energi berguna + Energi yang hilang</div>
      <p>Untuk panel surya, neraca energinya dapat dituliskan sebagai:</p>
      <div class="formula">E<sub>solar</sub> = E<sub>electric</sub> + E<sub>heat</sub> + E<sub>loss</sub></div>
      <p>Neraca energi tersebut merupakan salah satu gagasan utama termodinamika dan menjadi dasar hubungan antara Matahari, panel, rumah, dan konsumsi energi pada simulasi ini.</p>`
  },
  {
    id:'irradiance', title:'Energi surya dan irradiansi', body:`
      <p>Energi radiasi yang diterima panel dapat diperkirakan dari irradiansi, luas panel, dan waktu penerimaan radiasi.</p>
      <div class="formula">E<sub>solar</sub> = G · A · t</div>
      <p>G adalah irradiansi dalam W/m², A adalah luas panel dalam m², dan t adalah waktu dalam sekon. Karena 1 W = 1 J/s, hasil akhirnya berupa joule.</p>
      <p><strong>Contoh:</strong> jika G = 800 W/m², A = 10 m², dan t = 1 jam = 3600 s:</p>
      <div class="formula">E<sub>solar</sub> = 800 × 10 × 3600 = 28.800.000 J ≈ 28,8 MJ</div>
      <p>Irradiansi berubah sepanjang hari. Nilainya rendah saat Matahari terbit, meningkat menuju tengah hari, kemudian turun kembali menjelang Matahari terbenam.</p>
      <table><thead><tr><th>Kondisi</th><th>Irradiansi tipikal</th></tr></thead><tbody><tr><td>Awan sangat tebal</td><td>Rendah</td></tr><tr><td>Mendung</td><td>≈ 200–500 W/m²</td></tr><tr><td>Cerah</td><td>≈ 600–1000 W/m²</td></tr><tr><td>Kondisi uji standar</td><td>1000 W/m²</td></tr></tbody></table>`
  },
  {
    id:'pv-effect', title:'Bagaimana panel mengubah cahaya menjadi listrik?', body:`
      <p>Sel PV tersusun dari material semikonduktor, umumnya berbasis silikon. Ketika foton dari Matahari mengenai semikonduktor, energinya dapat membuat elektron bergerak sehingga terbentuk pembawa muatan dan arus listrik ketika rangkaian dihubungkan.</p>
      <div class="diagram">Foton cahaya → Pergerakan elektron → Arus listrik</div>
      <p>Proses tersebut disebut <strong>efek fotovoltaik</strong>. Panel PV tidak menghasilkan listrik dengan cara membakar sesuatu. Teknologi yang sengaja memanfaatkan panas Matahari untuk menghasilkan panas berguna disebut sistem surya termal.</p>
      <h4>Fotovoltaik dan surya termal</h4>
      <table><thead><tr><th>Teknologi</th><th>Perubahan energi</th><th>Contoh penggunaan</th></tr></thead><tbody><tr><td>Fotovoltaik (PV)</td><td>Radiasi → Listrik</td><td>Lampu, televisi, komputer, pompa, AC</td></tr><tr><td>Surya termal</td><td>Radiasi → Kalor</td><td>Pemanas air dan pemanasan ruang</td></tr></tbody></table>`
  },
  {
    id:'first-law', title:'Hukum I Termodinamika pada panel surya', body:`
      <p>Hukum I Termodinamika menyatakan bahwa energi tidak dapat diciptakan atau dimusnahkan, tetapi dapat berubah dari satu bentuk ke bentuk lainnya.</p>
      <div class="formula">ΔE = E<sub>in</sub> − E<sub>out</sub></div>
      <p>Jika panel dipandang sebagai sistem, energi Matahari dapat dibagi menjadi energi listrik, panas, dan rugi-rugi:</p>
      <div class="formula">E<sub>solar</sub> = E<sub>electric</sub> + E<sub>heat</sub> + E<sub>loss</sub></div>
      <p>Dalam bentuk laju energi atau daya:</p>
      <div class="formula">P<sub>solar</sub> = P<sub>electric</sub> + P<sub>heat</sub> + P<sub>loss</sub></div>
      <p><strong>Contoh:</strong> jika panel menerima P<sub>solar</sub> = 1000 W dan menghasilkan P<sub>electric</sub> = 200 W, maka 800 W sisanya tidak otomatis seluruhnya menjadi panas yang dapat dimanfaatkan. Sebagian dapat menjadi panas pada panel dan sebagian lainnya hilang melalui refleksi, rugi optik, rekombinasi, serta rugi resistif.</p>`
  },
  {
    id:'efficiency', title:'Efisiensi panel surya', body:`
      <p>Efisiensi membandingkan daya listrik yang dihasilkan dengan daya radiasi Matahari yang diterima panel.</p>
      <div class="formula">η<sub>PV</sub> = P<sub>electric</sub> / P<sub>solar</sub> × 100%</div>
      <p>Karena daya radiasi yang diterima adalah G · A, maka:</p>
      <div class="formula">η<sub>PV</sub> = P<sub>electric</sub> / (G · A) × 100%</div>
      <p><strong>Contoh:</strong> A = 10 m², G = 800 W/m², sehingga P<sub>solar</sub> = 8000 W. Jika daya listrik yang dihasilkan 1600 W:</p>
      <div class="formula">η<sub>PV</sub> = 1600 / 8000 × 100% = 20%</div>`
  },
  {
    id:'temperature', title:'Temperatur panel dan termodinamika', body:`
      <p>Panel tidak hanya menerima radiasi, tetapi juga mengalami kenaikan temperatur. Ketika temperatur sel meningkat, efisiensi listrik panel pada umumnya menurun.</p>
      <div class="formula">T<sub>panel</sub> ↑ ⇒ η<sub>PV</sub> ↓</div>
      <p>Dalam pendekatan sederhana, energi yang tertahan sebagai panas dapat ditulis:</p>
      <div class="formula">Q<sub>heat</sub> ≈ E<sub>solar</sub> − E<sub>electric</sub></div>
      <p>Hubungan kalor dengan perubahan temperatur diberikan oleh:</p>
      <div class="formula">Q = m · c · ΔT ⇒ ΔT = Q / (m · c)</div>
      <p>m adalah massa panel dan c adalah kalor jenis material panel. Pada kondisi nyata, temperatur panel juga dipengaruhi oleh perpindahan kalor terus-menerus ke lingkungan.</p>`
  },
  {
    id:'heat-transfer', title:'Mekanisme perpindahan kalor pada panel', body:`
      <p>Panas dari panel dapat berpindah ke lingkungan melalui konduksi, konveksi, dan radiasi.</p>
      <h4>1. Konduksi</h4><p>Perpindahan kalor melalui material panel mengikuti hukum Fourier:</p>
      <div class="formula">Q̇ = −k · A · (dT/dx)</div>
      <h4>2. Konveksi</h4><p>Kalor berpindah dari permukaan panel ke udara. Angin dapat meningkatkan proses ini:</p>
      <div class="formula">Q̇ = h · A · (T<sub>panel</sub> − T<sub>air</sub>)</div>
      <h4>3. Radiasi</h4><p>Panel juga memancarkan energi termal ke lingkungan:</p>
      <div class="formula">Q̇<sub>rad</sub> = ε · σ · A · (T<sub>panel</sub><sup>4</sup> − T<sub>surrounding</sub><sup>4</sup>)</div>
      <p>Secara sederhana, neraca energi panel dapat dituliskan:</p>
      <div class="formula">G · A = P<sub>electric</sub> + Q̇<sub>conv</sub> + Q̇<sub>rad</sub> + P<sub>other</sub></div>`
  },
  {
    id:'system-view', title:'Panel dan rumah sebagai satu sistem termodinamika', body:`
      <div class="diagram">☀ MATAHARI
          │ radiasi
          ▼
      ┌──────────────┐
      │  PANEL SURYA │
      └──────────────┘
          │       │
          ▼       ▼
       LISTRIK   PANAS
          │       │
          ▼       ▼
      Peralatan  Udara sekitar</div>
      <p>Jika sistem diperluas, rumah juga menerima kalor melalui dinding, jendela, atap, radiasi Matahari, penghuni, dan peralatan. AC kemudian mengeluarkan sebagian kalor tersebut dari ruangan.</p>
      <div class="diagram">☀ Matahari
       ├──► Panel surya ──► Listrik ──► AC & peralatan
       └──► Rumah ───────► Kalor masuk ──► Beban pendinginan ──► AC</div>`
  },
  {
    id:'pv-power', title:'Daya panel dan energi harian', body:`
      <p>Persamaan utama yang digunakan untuk menghitung daya panel dalam simulasi adalah:</p>
      <div class="formula">P<sub>PV</sub> = η · G · A</div>
      <p><strong>Contoh:</strong> η = 20%, G = 800 W/m², A = 10 m²:</p>
      <div class="formula">P<sub>PV</sub> = 0,20 × 800 × 10 = 1600 W</div>
      <p>Jika daya dianggap relatif tetap selama waktu tertentu, energi yang dihasilkan dapat dihitung dengan:</p>
      <div class="formula">E<sub>PV</sub> = P<sub>PV</sub> × t</div>
      <p>Untuk P<sub>PV</sub> = 1600 W selama 5 jam efektif:</p>
      <div class="formula">E<sub>PV</sub> = 1600 × 5 = 8000 Wh = 8 kWh</div>
      <p>Dalam simulasi harian, irradiansi berubah terhadap waktu sehingga produksi panel juga berubah sepanjang hari.</p>`
  },
  {
    id:'weather-temp-effect', title:'Pengaruh cuaca dan temperatur terhadap keluaran panel', body:`
      <p>Cuaca pada simulasi direpresentasikan sebagai faktor pengali terhadap irradiansi kondisi cerah.</p>
      <div class="formula">G<sub>effective</sub> = f<sub>weather</sub> × G<sub>clear</sub></div>
      <table><thead><tr><th>Cuaca</th><th>Faktor simulasi</th></tr></thead><tbody><tr><td>☀ Cerah</td><td>1,00</td></tr><tr><td>⛅ Berawan sebagian</td><td>0,70</td></tr><tr><td>☁ Mendung</td><td>0,40</td></tr><tr><td>🌧 Hujan</td><td>0,20</td></tr></tbody></table>
      <p>Efisiensi juga disesuaikan dengan temperatur panel:</p>
      <div class="formula">η<sub>PV</sub>(T) = η<sub>ref</sub> [1 − β(T<sub>cell</sub> − T<sub>ref</sub>)]</div>
      <div class="formula">P<sub>PV</sub> = η<sub>PV</sub>(T) · G · A</div>
      <p>β adalah koefisien temperatur. Semakin besar pengaruh temperatur, semakin besar penurunan efisiensi ketika panel memanas.</p>`
  },
  {
    id:'ac-house', title:'Hubungan energi surya dengan beban AC rumah', body:`
      <p>Rumah memperoleh kalor dari perbedaan temperatur luar-dalam, jendela, atap, radiasi Matahari, penghuni, dan peralatan listrik.</p>
      <div class="formula">Q<sub>house</sub> = Q<sub>wall</sub> + Q<sub>window</sub> + Q<sub>roof</sub> + Q<sub>solar</sub> + Q<sub>internal</sub></div>
      <p>AC bertugas memindahkan kalor dari ruangan ke lingkungan. Kemampuan AC dijelaskan melalui koefisien kinerja atau COP:</p>
      <div class="formula">COP = Q<sub>L</sub> / W</div>
      <p>Misalnya COP = 3 berarti setiap 1 W daya listrik dapat digunakan untuk memindahkan sekitar 3 W kalor dari ruang yang didinginkan. Karena itu, beban kalor dan daya listrik AC bukan besaran yang sama.</p>`
  },
  {
    id:'energy-coverage', title:'Seberapa besar kebutuhan rumah dapat dipenuhi panel surya?', body:`
      <p>Kontribusi energi surya terhadap kebutuhan rumah dihitung dari perbandingan energi yang dihasilkan panel dengan energi yang digunakan rumah.</p>
      <div class="formula">Coverage = E<sub>PV</sub> / E<sub>house</sub> × 100%</div>
      <p><strong>Contoh:</strong> jika E<sub>PV</sub> = 8 kWh dan E<sub>house</sub> = 12 kWh:</p>
      <div class="formula">Coverage = 8 / 12 × 100% ≈ 66,7%</div>
      <p>Jika baterai dan jaringan listrik dimasukkan, neraca energi sederhananya menjadi:</p>
      <div class="formula">E<sub>PV</sub> + E<sub>grid</sub> = E<sub>house</sub> + E<sub>battery</sub></div>`
  },
  {
    id:'second-law', title:'Hukum II Termodinamika dan keterbatasan efisiensi', body:`
      <p>Hukum I menjelaskan kekekalan energi, tetapi tidak berarti semua energi dapat diubah menjadi keluaran berguna dengan efisiensi 100%. Proses nyata memiliki keterbatasan dan sebagian energi mengalami degradasi.</p>
      <div class="formula">η<sub>PV</sub> &lt; 100%</div>
      <p>Pada sel PV, batas efisiensi juga dipengaruhi material semikonduktor, spektrum cahaya Matahari, temperatur, rekombinasi, dan rugi resistif.</p>`
  },
  {
    id:'plts-components', title:'Komponen utama PLTS atap', body:`
      <p>PLTS atap bukan hanya kumpulan panel. Komponen utamanya meliputi:</p>
      <ul><li><strong>Modul PV</strong> — mengubah radiasi Matahari menjadi listrik arus searah.</li><li><strong>Inverter</strong> — mengubah arus searah menjadi arus bolak-balik yang sesuai dengan sistem rumah.</li><li><strong>Struktur dudukan</strong> — menjaga panel tetap kokoh dan memiliki kemiringan yang sesuai.</li><li><strong>Kabel dan pengaman</strong> — menghubungkan rangkaian panel serta melindunginya dari gangguan listrik.</li><li><strong>Meter energi</strong> — mengukur energi yang diproduksi dan digunakan.</li><li><strong>Baterai</strong> — menyimpan energi berlebih untuk digunakan kemudian, jika sistem dilengkapi penyimpanan.</li></ul>`
  },
  {
    id:'plts-schemes', title:'Jenis konfigurasi sistem PLTS', body:`
      <ul><li><strong>Terhubung jaringan:</strong> panel terhubung ke jaringan listrik. Ketika produksi kurang, jaringan membantu memenuhi kebutuhan.</li><li><strong>Mandiri:</strong> sistem tidak bergantung pada jaringan dan membutuhkan penyimpanan energi yang memadai.</li><li><strong>Hibrida:</strong> menggabungkan jaringan dan baterai. Baterai dapat digunakan ketika produksi panel tidak mencukupi.</li></ul>
      <p>Logika baterai pada simulasi RUMAH MENTARI mengikuti pendekatan hibrida sederhana: ketika produksi surya kurang, baterai dapat membantu terlebih dahulu sebelum energi dari jaringan digunakan.</p>`
  },
  {
    id:'pv-physics-thermo', title:'Prinsip kerja sel fotovoltaik dan hubungannya dengan termodinamika', body:`
      <p>Sel PV merupakan sambungan semikonduktor yang dirancang agar foton dapat memberikan energi kepada elektron. Ketika rangkaian terhubung, pergerakan muatan menghasilkan arus listrik.</p>
      <p>Lapisan termodinamika muncul ketika kita memperhatikan neraca energi: energi yang masuk ke sistem tidak seluruhnya menjadi kerja listrik. Sebagian menjadi panas dan harus dipindahkan melalui konduksi, konveksi, dan radiasi. Karena itu, keluaran listrik, temperatur panel, dan perpindahan kalor merupakan bagian dari satu persoalan energi yang saling terhubung.</p>`
  },
  {
    id:'plts-installation', title:'Tahapan umum pemasangan PLTS atap', body:`
      <ol><li><strong>Survei lokasi dan audit energi:</strong> memeriksa arah atap, kemiringan, bayangan, kekuatan struktur, dan konsumsi listrik.</li><li><strong>Penentuan ukuran sistem:</strong> menentukan jumlah panel, kapasitas inverter, dan baterai bila diperlukan.</li><li><strong>Perizinan dan koordinasi jaringan:</strong> menyesuaikan pemasangan dengan ketentuan yang berlaku.</li><li><strong>Pemasangan dudukan:</strong> memasang struktur dengan kuat dan menjaga ketahanan terhadap air.</li><li><strong>Pemasangan panel dan kabel:</strong> memasang modul serta rangkaian kelistrikan.</li><li><strong>Pemasangan inverter dan meter:</strong> menghubungkan perangkat sesuai standar kelistrikan.</li><li><strong>Pengujian:</strong> memeriksa tegangan, arus, dan sistem pengaman.</li><li><strong>Pemantauan dan perawatan:</strong> memantau produksi, membersihkan panel secara berkala, dan memeriksa sambungan.</li></ol>`
  }
];

function renderMateri(){
  const toc = document.getElementById('materi-toc');
  const content = document.getElementById('materi-content');
  toc.innerHTML = materiSections.map(s => `<a href="#materi-${s.id}" data-id="${s.id}">${s.title}</a>`).join('');
  content.innerHTML = materiSections.map(s => `<section id="materi-${s.id}"><h3>${s.title}</h3>${s.body}</section>`).join('');

  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    document.getElementById('materi-' + a.dataset.id).scrollIntoView({behavior:'smooth', block:'start'});
  });

  const sections = content.querySelectorAll('section');
  const links = toc.querySelectorAll('a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        links.forEach(l => l.classList.toggle('active', l.dataset.id === entry.target.id.replace('materi-','')));
      }
    });
  }, {rootMargin:'-20% 0px -70% 0px'});
  sections.forEach(s => observer.observe(s));
}
renderMateri();

/* ---------------------------------------------------------------------
   3. SIMULATION — physics, appliances, charts
--------------------------------------------------------------------- */

// -- peralatan rumah: tabel dinamis --
let applianceRows = [
  {id:'app-1', name:'Lampu', power:10, qty:1, hours:6, on:true},
  {id:'app-2', name:'TV', power:100, qty:1, hours:5, on:true},
  {id:'app-3', name:'Kulkas', power:150, qty:1, hours:9.6, on:true},
  {id:'app-4', name:'Laptop', power:60, qty:1, hours:6, on:true},
  {id:'app-5', name:'Mesin cuci', power:400, qty:1, hours:1, on:false},
  {id:'app-6', name:'Pompa air', power:250, qty:1, hours:2, on:false},
];

function makeApplianceId(){
  return 'app-' + Date.now() + '-' + Math.random().toString(36).slice(2,7);
}

function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  }[ch]));
}

function syncApplianceRows(){
  document.querySelectorAll('#appliance-body .appliance-row').forEach(row => {
    const item = applianceRows.find(a => a.id === row.dataset.app);
    if (!item) return;
    item.name = row.querySelector('[data-field="name"]').value.trim() || 'Peralatan';
    item.power = Math.max(0, Number(row.querySelector('[data-field="power"]').value) || 0);
    item.qty = Math.max(1, Number(row.querySelector('[data-field="qty"]').value) || 1);
    item.hours = Math.min(24, Math.max(0, Number(row.querySelector('[data-field="hours"]').value) || 0));
    item.on = row.querySelector('[data-field="on"]').checked;
  });
}

function renderAppliances(){
  const body = document.getElementById('appliance-body');
  if (!body) return;

  body.innerHTML = `
    <div class="appliance-table-wrap">
      <table class="appliance-table">
        <thead>
          <tr>
            <th>Aktif</th>
            <th>Jenis</th>
            <th>Spesifikasi (W)</th>
            <th>Jumlah</th>
            <th>Jam/hari</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${applianceRows.map(a => `
            <tr class="appliance-row" data-app="${a.id}">
              <td class="app-check">
                <input type="checkbox" data-field="on" ${a.on ? 'checked' : ''} aria-label="Aktifkan ${escapeHtml(a.name)}">
              </td>
              <td>
                <input type="text" data-field="name" value="${escapeHtml(a.name)}" placeholder="Contoh: Lampu">
              </td>
              <td>
                <input type="number" data-field="power" value="${a.power}" min="0" step="1" placeholder="10">
              </td>
              <td>
                <input type="number" data-field="qty" value="${a.qty}" min="1" step="1" placeholder="1">
              </td>
              <td>
                <input type="number" data-field="hours" value="${a.hours}" min="0" max="24" step="0.5" placeholder="6">
              </td>
              <td>
                <button type="button" class="appliance-delete" data-action="delete-appliance" title="Hapus peralatan" aria-label="Hapus ${escapeHtml(a.name)}">×</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <button type="button" class="btn btn-secondary appliance-add" id="btn-add-appliance">＋ Tambah Peralatan</button>
    <p class="appliance-note">Isi jenis peralatan, daya/spesifikasi dalam watt, jumlah unit, dan lama pemakaian per hari.</p>
  `;

  body.querySelectorAll('.appliance-row input').forEach(input => {
    input.addEventListener('input', syncApplianceRows);
    input.addEventListener('change', syncApplianceRows);
  });

  const addButton = document.getElementById('btn-add-appliance');
  if (addButton) addButton.addEventListener('click', () => {
    syncApplianceRows();
    applianceRows.push({id:makeApplianceId(), name:'Peralatan baru', power:100, qty:1, hours:1, on:true});
    renderAppliances();
    runSimulation();
  });

  body.querySelectorAll('[data-action="delete-appliance"]').forEach(button => {
    button.addEventListener('click', () => {
      syncApplianceRows();
      const row = button.closest('.appliance-row');
      if (!row) return;
      applianceRows = applianceRows.filter(a => a.id !== row.dataset.app);
      renderAppliances();
      runSimulation();
    });
  });
}

renderAppliances();

// -- sync range inputs with their <output> --
function bindOutput(inputId, outputId, decimals = 0){
  const input = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  const update = () => { output.textContent = Number(input.value).toFixed(decimals); };
  input.addEventListener('input', update);
  update();
}
bindOutput('in-tout','out-tout');
bindOutput('in-tin','out-tin');
bindOutput('in-irr','out-irr');
bindOutput('in-sunhours','out-sunhours');
bindOutput('in-wind','out-wind');
bindOutput('in-panelcount','out-panelcount');
bindOutput('in-eff','out-eff');
bindOutput('in-beta','out-beta',2);
bindOutput('in-cop','out-cop',1);
bindOutput('in-achours','out-achours');
bindOutput('in-battcap','out-battcap');
bindOutput('in-soc','out-soc');
bindOutput('in-degrad','out-degrad',1);

// -- core physics --
function readApplianceLoads(){
  syncApplianceRows();
  return applianceRows.map(a => ({...a}));
}

function readInputs(){
  return {
    floorArea: Number(document.getElementById('in-floorarea').value),
    height: Number(document.getElementById('in-height').value),
    people: Number(document.getElementById('in-people').value),
    tout: Number(document.getElementById('in-tout').value),
    tin: Number(document.getElementById('in-tin').value),
    wallK: Number(document.getElementById('in-wallmat').value),
    wallArea: Number(document.getElementById('in-wallarea').value),
    wallThick: Number(document.getElementById('in-wallthick').value),
    glass: document.getElementById('in-glass').value.split('|').map(Number), // [U, SHGC]
    winArea: Number(document.getElementById('in-winarea').value),
    roofArea: Number(document.getElementById('in-roofarea').value),
    insulation: Number(document.getElementById('in-insulation').value),
    irr: Number(document.getElementById('in-irr').value),
    weather: Number(document.getElementById('in-weather').value),
    sunHours: Number(document.getElementById('in-sunhours').value),
    wind: Number(document.getElementById('in-wind').value),
    panelCount: Number(document.getElementById('in-panelcount').value),
    panelArea: Number(document.getElementById('in-panelarea').value),
    effRef: Number(document.getElementById('in-eff').value) / 100,
    beta: Number(document.getElementById('in-beta').value) / 100,
    cop: Number(document.getElementById('in-cop').value),
    acHours: Number(document.getElementById('in-achours').value),
    battCap: Number(document.getElementById('in-battcap').value),
    soc: Number(document.getElementById('in-soc').value) / 100,
    tariff: Number(document.getElementById('in-tariff').value),
    panelPrice: Number(document.getElementById('in-panelprice').value),
    inverter: Number(document.getElementById('in-inverter').value),
    battPrice: Number(document.getElementById('in-battprice').value),
    install: Number(document.getElementById('in-install').value),
    degrad: Number(document.getElementById('in-degrad').value) / 100,
    appliances: readApplianceLoads(),
  };
}

const TREF = 25;      // reference temperature for PV efficiency, °C
const K_TEMP = 0.03;  // panel-temperature rise per W/m2 of irradiance
const Q_PERSON = 100; // W of sensible heat per occupant (simulation assumption)
const Q_EQUIP_BASE = 150; // W baseline equipment heat gain

function computeHeatLoads(inp, Geff){
  const dT = Math.max(0, inp.tout - inp.tin);
  const Qwall = (inp.wallK * inp.wallArea * dT / inp.wallThick) * inp.insulation;
  const [U, shgc] = inp.glass;
  const Qwindow = U * inp.winArea * dT;
  const Qroof = (inp.wallK * inp.roofArea * dT / inp.wallThick) * inp.insulation * 0.6; // roof gets extra sun, partly offset by insulation
  const Qsolar = shgc * Geff * inp.winArea * 0.12; // fraction of solar gain through glazing
  const Qpeople = inp.people * Q_PERSON;
  const Qequip = Q_EQUIP_BASE + inp.appliances.filter(a => a.on).reduce((s,a)=> s + a.power * a.qty, 0) * 0.3;
  const Qtotal = Qwall + Qwindow + Qroof + Qsolar + Qpeople + Qequip;
  return {Qwall, Qwindow, Qroof, Qsolar, Qpeople, Qequip, Qtotal};
}

function computeSolar(inp){
  const Geff = inp.irr * inp.weather;
  const Atotal = inp.panelCount * inp.panelArea;
  const windCooling = Math.max(0, 1 - inp.wind * 0.02);
  const Tpanel = inp.tout + K_TEMP * Geff * windCooling;
  const eta = Math.max(0.02, inp.effRef * (1 - inp.beta * (Tpanel - TREF)));
  const Ppv = eta * Geff * Atotal;   // W
  const Epv = Ppv * inp.sunHours / 1000; // kWh/day
  return {Geff, Atotal, Tpanel, eta, Ppv, Epv};
}

let lastResult = null; // shared with the quiz for dynamic questions

function updateWeatherScene(){
  const weather = document.getElementById('in-weather').value;
  const scene = document.getElementById('weather-scene');
  const status = document.getElementById('weather-status');
  const caption = document.getElementById('scene-caption');
  if (!scene || !status || !caption) return;

  scene.classList.remove('weather-clear','weather-partly','weather-overcast','weather-rain');
  const map = {
    '1': {cls:'weather-clear', label:'☀ Cerah', text:'Cerah — sinar Matahari kuat dan panel menerima radiasi tinggi.'},
    '0.7': {cls:'weather-partly', label:'⛅ Berawan sebagian', text:'Berawan sebagian — sinar Matahari masih masuk, tetapi sebagian tertutup awan.'},
    '0.4': {cls:'weather-overcast', label:'☁ Mendung', text:'Mendung — cahaya Matahari lebih redup sehingga produksi panel menurun.'},
    '0.2': {cls:'weather-rain', label:'🌧 Hujan', text:'Hujan — langit lebih gelap dan radiasi yang diterima panel jauh lebih rendah.'}
  };
  const item = map[weather] || map['1'];
  scene.classList.add(item.cls);
  scene.dataset.weatherFactor = weather;
  status.textContent = item.label;
  caption.textContent = item.text;
}

document.getElementById('in-weather').addEventListener('change', () => {
  updateWeatherScene();
  runSimulation();
});
updateWeatherScene();

function runSimulation(){
  const inp = readInputs();
  const solar = computeSolar(inp);
  const heat = computeHeatLoads(inp, solar.Geff);

  const Qcooling = heat.Qtotal;
  const Pac = Qcooling / inp.cop; // W
  const Eac = Pac * inp.acHours / 1000; // kWh/day

  const Eappliances = inp.appliances.filter(a => a.on).reduce((s,a) => s + a.power * a.qty * a.hours / 1000, 0);
  const Ehouse = Eac + Eappliances;

  const Estored = inp.soc * inp.battCap; // kWh available now
  let fromBattery = 0, Egrid = 0, fromPV = Math.min(solar.Epv, Ehouse);
  const deficit = Math.max(0, Ehouse - solar.Epv);
  if (deficit > 0){
    fromBattery = Math.min(deficit, Estored);
    Egrid = deficit - fromBattery;
  }
  const coverage = Ehouse > 0 ? Math.min(100, (solar.Epv / Ehouse) * 100) : 0;

  const costWithout = Ehouse * inp.tariff;
  const costWith = Egrid * inp.tariff;
  const savingDay = costWithout - costWith;
  const savingMonth = savingDay * 30;
  const savingYear = savingDay * 365;

  const investment = inp.panelCount * inp.panelPrice + inp.inverter + inp.battPrice + inp.install;
  const payback = savingYear > 0 ? investment / savingYear : Infinity;

  lastResult = {inp, solar, heat, Qcooling, Pac, Eac, Eappliances, Ehouse, fromPV, fromBattery, Egrid,
                coverage, costWithout, costWith, savingDay, savingMonth, savingYear, investment, payback};

  renderResults(lastResult);
  renderCharts(lastResult);
  updateWeatherScene();
  evaluateChallenge(lastResult);
  return lastResult;
}

function fmtRp(n){ return 'Rp ' + Math.round(n).toLocaleString('id-ID'); }
function fmtKwh(n){ return n.toFixed(2) + ' kWh'; }

function renderThermalIndicator(r){
  const dt = Math.max(0, r.inp.tout - r.inp.tin);
  const envelope = r.heat.Qwall + r.heat.Qwindow + r.heat.Qroof;
  const gains = r.heat.Qsolar + r.heat.Qpeople + r.heat.Qequip;
  const level = dt >= 10 ? 'Panas tinggi' : dt >= 6 ? 'Panas sedang' : dt >= 3 ? 'Hangat' : 'Rendah';
  const meter = Math.min(100, Math.max(0, dt / 15 * 100));

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  set('thermal-tout', r.inp.tout.toFixed(0) + '°C');
  set('thermal-tin', r.inp.tin.toFixed(0) + '°C');
  set('thermal-dt', dt.toFixed(0) + '°C');
  set('thermal-qenvelope', envelope.toFixed(0) + ' W');
  set('thermal-qgain', gains.toFixed(0) + ' W');
  set('thermal-qcool', r.Qcooling.toFixed(0) + ' W');

  const levelEl = document.getElementById('thermal-level');
  if (levelEl) {
    levelEl.textContent = level;
    levelEl.dataset.level = dt >= 10 ? 'high' : dt >= 6 ? 'medium' : 'low';
  }
  const fill = document.getElementById('thermal-meter-fill');
  if (fill) fill.style.width = meter + '%';
}

function renderResults(r){
  renderThermalIndicator(r);
  document.getElementById('r-epv').textContent = fmtKwh(r.solar.Epv) + '/hari';
  document.getElementById('r-eta').textContent = (r.solar.eta*100).toFixed(1) + '%';
  document.getElementById('r-tpanel').textContent = r.solar.Tpanel.toFixed(1) + '°C';

  document.getElementById('r-qtotal').textContent = r.heat.Qtotal.toFixed(0) + ' W';
  document.getElementById('r-qcool').textContent = r.Qcooling.toFixed(0) + ' W';
  document.getElementById('r-ehouse').textContent = fmtKwh(r.Ehouse) + '/hari';

  document.getElementById('r-frompv').textContent = fmtKwh(r.fromPV);
  document.getElementById('r-fromgrid').textContent = fmtKwh(r.Egrid);
  document.getElementById('r-coverage').textContent = r.coverage.toFixed(1) + '%';

  document.getElementById('r-costwithout').textContent = fmtRp(r.costWithout) + '/hari';
  document.getElementById('r-costwith').textContent = fmtRp(r.costWith) + '/hari';
  document.getElementById('r-payback').textContent = isFinite(r.payback) ? r.payback.toFixed(1) + ' tahun' : '—';
}

// -- grafik hasil simulasi --
let charts = {};
const dayProfile = [
  {h:6,f:0.05},{h:8,f:0.35},{h:10,f:0.75},{h:12,f:1.0},{h:14,f:0.82},{h:16,f:0.4},{h:18,f:0.03}
];

function makeOrUpdate(id, config){
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (typeof Chart === 'undefined') return;
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart(canvas.getContext('2d'), config);
}

function renderCharts(r){
  if (typeof Chart === 'undefined') {
    document.querySelectorAll('.chart-card').forEach(card => {
      const wrap = card.querySelector('.chart-wrap');
      if (wrap) wrap.innerHTML = '<div class="chart-empty">Grafik membutuhkan pustaka grafik yang sedang dimuat. Silakan segarkan halaman jika grafik belum muncul.</div>';
    });
    return;
  }

  Chart.defaults.color = '#6e4b32';
  Chart.defaults.borderColor = 'rgba(232,137,58,.16)';
  Chart.defaults.font.family = 'DM Sans, sans-serif';

  const labels = dayProfile.map(p => p.h + ':00');
  const irrSeries = dayProfile.map(p => Math.round(p.f * r.inp.irr * r.inp.weather));
  const pvSeries = dayProfile.map((p,i) => {
    const G = irrSeries[i];
    const Tp = r.inp.tout + K_TEMP * G * Math.max(0,1-r.inp.wind*0.02);
    const eta = Math.max(0.02, r.inp.effRef*(1 - r.inp.beta*(Tp-TREF)));
    return +(eta * G * r.solar.Atotal).toFixed(0);
  });

  const common = {responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(232,137,58,.12)'},beginAtZero:true}}};
  makeOrUpdate('chart-irr',{type:'line',data:{labels,datasets:[{data:irrSeries,borderColor:'#e8893a',backgroundColor:'rgba(244,201,93,.22)',fill:true,tension:.35,pointRadius:3,pointBackgroundColor:'#f4c95d'}]},options:common});
  makeOrUpdate('chart-pv',{type:'line',data:{labels,datasets:[{data:pvSeries,borderColor:'#d47a2f',backgroundColor:'rgba(232,137,58,.16)',fill:true,tension:.35,pointRadius:3,pointBackgroundColor:'#e8893a'}]},options:common});
  makeOrUpdate('chart-heat',{type:'bar',data:{labels:['Dinding','Jendela','Atap','Surya','Penghuni','Peralatan'],datasets:[{data:[r.heat.Qwall,r.heat.Qwindow,r.heat.Qroof,r.heat.Qsolar,r.heat.Qpeople,r.heat.Qequip].map(v=>+v.toFixed(0)),backgroundColor:'#f4c95d',borderRadius:7}]},options:common});
  makeOrUpdate('chart-balance',{type:'bar',data:{labels:['Produksi PV','Pemakaian rumah','Dari jaringan'],datasets:[{data:[r.solar.Epv,r.Ehouse,r.Egrid].map(v=>+v.toFixed(2)),backgroundColor:['#f4c95d','#e8893a','#d47a2f'],borderRadius:7}]},options:common});
  makeOrUpdate('chart-cost',{type:'bar',data:{labels:['Tanpa PV','Dengan PV'],datasets:[{data:[r.costWithout,r.costWith].map(v=>Math.round(v)),backgroundColor:['#f4c95d','#e8893a'],borderRadius:7}]},options:common});

  const years = Array.from({length:10},(_,i)=>i+1); let cum=0;
  const cumSeries = years.map(y=>{const yearlyProd=r.solar.Epv*365*Math.pow(1-r.inp.degrad,y-1);const yearlySaving=Math.min(yearlyProd,r.Ehouse*365)*r.inp.tariff;cum+=yearlySaving;return Math.round(cum);});
  makeOrUpdate('chart-projection',{type:'line',data:{labels:years.map(y=>'Tahun '+y),datasets:[{data:cumSeries,borderColor:'#e8893a',backgroundColor:'rgba(244,201,93,.20)',fill:true,tension:.2,pointRadius:2,pointBackgroundColor:'#f4c95d'}]},options:common});
}

document.getElementById('btn-simulate').addEventListener('click', runSimulation);

// -- experiment mode --
const experimentState = {
  runs: Number(localStorage.getItem('rm_experiment_runs') || 0)
};

function saveLearningState(key, value){
  try { localStorage.setItem(key, String(value)); } catch(e) {}
}

function getLearningState(key, fallback='0'){
  try { return localStorage.getItem(key) ?? fallback; } catch(e) { return fallback; }
}

function updateLearningProgress(){
  const experiments = Number(getLearningState('rm_experiment_runs','0'));
  const bestQuiz = Number(getLearningState('rm_best_quiz','0'));
  const challenge = getLearningState('rm_challenge','0') === '1';
  const expPart = Math.min(25, experiments * 5);
  const quizPart = bestQuiz > 0 ? 50 : 0;
  const challengePart = challenge ? 25 : 0;
  const total = Math.min(100, expPart + quizPart + challengePart);

  const set = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
  set('experiment-count-badge', `${experiments} eksperimen`);
  set('progress-experiments', experiments);
  set('progress-quiz', bestQuiz > 0 ? `${bestQuiz}%` : 'Belum');
  set('progress-challenge', challenge ? 'Berhasil' : 'Belum');
  set('learning-progress-percent', `${total}%`);
  const fill=document.getElementById('learning-progress-fill');
  if(fill) fill.style.width=`${total}%`;
}

function experimentValues(mode, base){
  if(mode === 'panelarea') return [5,10,15,20,25].map(v => ({label:`${v} m²`, value:v}));
  if(mode === 'insulation') return [
    {label:'Tidak ada', value:1}, {label:'Rendah', value:.8},
    {label:'Sedang', value:.6}, {label:'Tinggi', value:.35}
  ];
  if(mode === 'weather') return [
    {label:'☀ Cerah', value:1}, {label:'⛅ Berawan', value:.7},
    {label:'☁ Mendung', value:.4}, {label:'🌧 Hujan', value:.2}
  ];
  if(mode === 'paneltemp') return [25,35,45,55,65].map(v => ({label:`${v} °C`, value:v}));
  return [2,4,6,8,10].map(v => ({label:`ΔT ${v} °C`, value:v}));
}

function runExperiment(mode){
  const base = readInputs();
  const values = experimentValues(mode, base);
  let rows=[], headers=[], title='', explanation='';

  values.forEach(item => {
    const inp = {...base};
    if(mode === 'panelarea'){ inp.panelCount=1; inp.panelArea=item.value; }
    if(mode === 'insulation'){ inp.insulation=item.value; }
    if(mode === 'weather'){ inp.weather=item.value; }
    if(mode === 'dt'){ inp.tout=inp.tin+item.value; }

    const solar=computeSolar(inp);
    const heat=computeHeatLoads(inp, solar.Geff);
    const Eac=(heat.Qtotal/inp.cop)*inp.acHours/1000;
    const Eapp=inp.appliances.filter(a=>a.on).reduce((s,a)=>s+a.power*a.qty*a.hours/1000,0);
    const Ehouse=Eac+Eapp;
    const Egrid=Math.max(0,Ehouse-solar.Epv);

    if(mode==='panelarea') rows.push([item.label, solar.Epv.toFixed(2), Math.round(Egrid*inp.tariff).toLocaleString('id-ID')]);
    if(mode==='insulation') rows.push([item.label, heat.Qtotal.toFixed(0)]);
    if(mode==='weather') rows.push([item.label, solar.Epv.toFixed(2), Math.round(Egrid*inp.tariff).toLocaleString('id-ID')]);
    if(mode==='paneltemp'){
      const eta=Math.max(.02,base.effRef*(1-base.beta*(item.value-TREF)))*100;
      rows.push([item.label,eta.toFixed(1)]);
    }
    if(mode==='dt') rows.push([item.label,heat.Qtotal.toFixed(0),(heat.Qtotal/inp.cop).toFixed(0)]);
  });

  if(mode==='panelarea'){headers=['Luas panel','Produksi PV (kWh)','Biaya (Rp/hari)']; title='Semakin luas panel, produksi surya cenderung naik dan kebutuhan energi dari jaringan dapat turun.'; explanation='Jika kebutuhan rumah tetap, tambahan produksi PV dapat mengurangi energi yang perlu dibeli dari jaringan.';}
  if(mode==='insulation'){headers=['Isolasi','Beban kalor (W)']; title='Isolasi yang lebih baik menurunkan beban kalor rumah pada model ini.'; explanation='Faktor isolasi dibuat lebih kecil saat isolasi semakin baik, sehingga perpindahan kalor melalui dinding dan atap berkurang.';}
  if(mode==='weather'){headers=['Cuaca','Produksi PV (kWh)','Biaya (Rp/hari)']; title='Cuaca mengubah radiasi efektif yang diterima panel.'; explanation='Pada model ini, cuaca direpresentasikan sebagai faktor pengali irradiansi: cerah 1,00; berawan 0,70; mendung 0,40; hujan 0,20.';}
  if(mode==='paneltemp'){headers=['Temperatur panel','Efisiensi (%)']; title='Ketika temperatur panel meningkat, efisiensi PV pada model ini menurun.'; explanation='Hubungan mengikuti persamaan efisiensi temperatur yang digunakan dalam simulasi.';}
  if(mode==='dt'){headers=['Perbedaan suhu','Beban kalor (W)','Daya AC (W)']; title='ΔT yang lebih besar meningkatkan beban kalor dan kebutuhan daya AC.'; explanation='Pada kondisi lain tetap, kenaikan ΔT memperbesar perpindahan kalor melalui dinding, jendela, dan atap.';}

  const valuesNumeric=rows.map(r=>Number(String(r[1]).replace(',','.')));
  const max=Math.max(...valuesNumeric,1);
  const preview=values.map((item,i)=>{
    const val=valuesNumeric[i];
    return `<div class="experiment-bar-row"><span>${item.label}</span><div class="experiment-bar"><i style="width:${Math.max(6,val/max*100)}%"></i></div><strong>${val}</strong></div>`;
  }).join('');
  document.getElementById('experiment-preview').innerHTML=`
    <div class="experiment-mini-head"><strong>Grafik cepat</strong><span>Nilai kedua</span></div>${preview}`;

  const table=`<div class="experiment-table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  document.getElementById('experiment-output').innerHTML=table;
  const conclusion=document.getElementById('experiment-conclusion');
  conclusion.innerHTML=`<strong>💡 Kesimpulan eksperimen:</strong> ${title}<br><span>${explanation}</span>`;
  conclusion.classList.remove('hidden');

  experimentState.runs++;
  saveLearningState('rm_experiment_runs',experimentState.runs);
  updateLearningProgress();
}

const experimentSelect=document.getElementById('experiment-select');
const experimentQuestion=document.getElementById('experiment-question');
const experimentQuestions={
  panelarea:'Jika luas panel diperbesar sementara kondisi lain tetap, bagaimana perubahan produksi PV dan biaya listrik?',
  insulation:'Jika isolasi dibuat semakin baik, apakah beban kalor rumah akan naik atau turun?',
  weather:'Jika cuaca berubah dari cerah menjadi hujan, apa yang terjadi pada produksi PV?',
  paneltemp:'Jika temperatur panel naik, apakah efisiensi PV ikut naik atau turun?',
  dt:'Jika ΔT luar-dalam diperbesar, bagaimana perubahan beban kalor dan daya AC?'
};
if(experimentSelect){
  experimentSelect.addEventListener('change',()=>{
    experimentQuestion.innerHTML=`🔎 <strong>Prediksi dulu:</strong> ${experimentQuestions[experimentSelect.value]}`;
    document.getElementById('experiment-output').innerHTML='';
    document.getElementById('experiment-preview').innerHTML='';
    document.getElementById('experiment-conclusion').classList.add('hidden');
  });
}
document.getElementById('btn-experiment').addEventListener('click',()=>{
  runExperiment(experimentSelect.value);
});

// run one simulation on load so charts aren't empty when the tab is first opened
runSimulation();



/* ---------------------------------------------------------------------
   4. LATIHAN SOAL — Indonesian quiz engine
--------------------------------------------------------------------- */

function buildQuizBank(){
  const dyn = lastResult; // may be null if user never opened Simulasi
  const dynEpv = dyn ? dyn.solar.Epv.toFixed(1) : '9.8';
  const dynEhouse = dyn ? dyn.Ehouse.toFixed(1) : '12.0';
  const dynCoverage = dyn ? dyn.coverage.toFixed(0) : Math.round((Number(dynEpv)/Number(dynEhouse))*100);

  return [
    // Level 1 - Konsep dasar
    {level:'Level 1 · Konsep Dasar', q:'Panel surya fotovoltaik pada rumah terutama berfungsi untuk mengubah...',
      options:['Energi listrik menjadi energi cahaya','Energi radiasi Matahari menjadi energi listrik','Energi listrik menjadi energi kalor','Energi kalor menjadi energi mekanik'],
      correct:1, explain:'Panel PV mengubah energi radiasi Matahari menjadi energi listrik melalui efek fotovoltaik.'},
    {level:'Level 1 · Konsep Dasar', q:'Satuan SI untuk irradiance Matahari adalah...',
      options:['Joule','Watt','Watt/m²','Joule/kg'],
      correct:2, explain:'Irradiance adalah daya radiasi per satuan luas, satuannya W/m².'},
    {level:'Level 1 · Konsep Dasar', q:'Penerapan Hukum I Termodinamika pada sistem panel surya menunjukkan bahwa...',
      options:['Energi dapat diciptakan','Energi dapat dimusnahkan','Energi dapat berubah bentuk tetapi total energi dikonservasi','Semua energi Matahari harus berubah menjadi listrik'],
      correct:2, explain:'Hukum I Termodinamika: energi tidak diciptakan atau dimusnahkan, hanya berubah bentuk.'},
    {level:'Level 1 · Konsep Dasar', q:'Jika temperatur panel PV meningkat terlalu tinggi, secara umum efisiensi listrik panel akan...',
      options:['Meningkat terus','Menurun','Selalu tetap','Menjadi 100%'],
      correct:1, explain:'Kenaikan temperatur sel PV umumnya menurunkan efisiensi konversi listrik.'},

    // Level 2 - Hitungan dasar
    {level:'Level 2 · Hitungan Dasar', q:'Panel memiliki luas 10 m², efisiensi 20%, dan irradiance 800 W/m². Berapa daya listrik yang dihasilkan? (P = η·G·A)',
      options:['800 W','1200 W','1600 W','2000 W'],
      correct:2, explain:'P = 0,2 × 800 × 10 = 1600 W.'},
    {level:'Level 2 · Hitungan Dasar', q:'Panel menghasilkan daya 1600 W selama 5 jam. Berapa energi listrik yang dihasilkan?',
      options:['1,6 kWh','5 kWh','8 kWh','16 kWh'],
      correct:2, explain:'E = P × t = 1600 W × 5 jam = 8000 Wh = 8 kWh.'},
    {level:'Level 2 · Hitungan Dasar', q:'Sebuah panel menerima daya radiasi 5000 W dan menghasilkan listrik 1000 W. Berapa efisiensinya?',
      options:['10%','15%','20%','25%'],
      correct:2, explain:'η = 1000/5000 × 100% = 20%.'},

    // Level 3 - Termodinamika rumah
    {level:'Level 3 · Termodinamika Rumah', q:'Sebuah dinding memiliki k = 0,8 W/(m·K), A = 20 m², L = 0,2 m, dengan ΔT = 8°C. Berapa laju kalor melalui dinding? (Q̇ = kAΔT/L)',
      options:['320 W','480 W','640 W','800 W'],
      correct:2, explain:'Q̇ = 0,8 × 20 × 8 / 0,2 = 640 W.'},
    {level:'Level 3 · Termodinamika Rumah', q:'Dua rumah punya dinding dengan material sama. Rumah A tebal dindingnya 10 cm, Rumah B 20 cm. Rumah mana yang perpindahan kalornya lebih kecil?',
      options:['Rumah A','Rumah B','Sama saja','Tidak bisa ditentukan'],
      correct:1, explain:'Q̇ berbanding terbalik dengan ketebalan (L), sehingga dinding lebih tebal → kalor yang masuk lebih kecil.'},
    {level:'Level 3 · Termodinamika Rumah', q:'Beban kalor rumah tanpa isolasi 6000 W, setelah memakai isolasi turun menjadi 4200 W. Berapa persen pengurangannya?',
      options:['20%','25%','30%','35%'],
      correct:2, explain:'(6000−4200)/6000 × 100% = 30%.'},

    // Level 4 - AC & listrik
    {level:'Level 4 · AC & Listrik', q:'Beban pendinginan rumah 6000 W, AC memiliki COP = 3. Berapa daya listrik yang dibutuhkan AC? (P = Q/COP)',
      options:['1000 W','1500 W','2000 W','3000 W'],
      correct:2, explain:'P = 6000/3 = 2000 W.'},
    {level:'Level 4 · AC & Listrik', q:'AC berdaya 2000 W digunakan selama 8 jam. Berapa energi listrik yang digunakan?',
      options:['8 kWh','12 kWh','16 kWh','20 kWh'],
      correct:2, explain:'E = 2000 W × 8 jam = 16.000 Wh = 16 kWh.'},

    // Level 5 - PV + rumah
    {level:'Level 5 · PV + Rumah', q:'Rumah membutuhkan 20 kWh/hari, panel menghasilkan 15 kWh/hari. Berapa kontribusi energi surya (coverage)?',
      options:['50%','65%','75%','80%'],
      correct:2, explain:'Coverage = 15/20 × 100% = 75%.'},
    {level:'Level 5 · PV + Rumah', q:'Panel menghasilkan 20 kWh/hari, rumah menggunakan 15 kWh/hari. Berapa energi surplus?',
      options:['3 kWh','5 kWh','8 kWh','10 kWh'],
      correct:1, explain:'Surplus = 20−15 = 5 kWh/hari, dapat diarahkan ke baterai jika tersedia.'},

    // Level 6 - Ekonomi
    {level:'Level 6 · Ekonomi', q:'Rumah memakai 18 kWh/hari dengan tarif Rp1.500/kWh. Berapa biaya listrik tanpa panel surya?',
      options:['Rp18.000','Rp22.500','Rp27.000','Rp30.000'],
      correct:2, explain:'Biaya = 18 × 1.500 = Rp27.000/hari.'},
    {level:'Level 6 · Ekonomi', q:'Investasi panel Rp29.000.000, penghematan Rp6.480.000/tahun. Berapa perkiraan payback period?',
      options:['2,9 tahun','3,5 tahun','4,48 tahun','5,2 tahun'],
      correct:2, explain:'Payback = 29.000.000/6.480.000 ≈ 4,48 tahun.'},

    // Level 7 - Analisis
    {level:'Level 7 · Analisis', q:'Panel A bertemperatur 35°C, Panel B bertemperatur 60°C, dengan irradiance sama. Panel mana yang efisiensinya lebih rendah?',
      options:['Panel A','Panel B','Sama saja','Tergantung warna panel'],
      correct:1, explain:'Semakin tinggi temperatur sel PV, semakin rendah efisiensinya (η turun seiring T naik).'},
    {level:'Level 7 · Analisis', q:'Saat cerah G = 900 W/m², saat mendung G = 400 W/m². Dengan luas & efisiensi sama, berapa persen daya panel saat mendung dibanding cerah?',
      options:['33,3%','40%','44,4%','50%'],
      correct:2, explain:'Karena P ∝ G, maka 400/900 × 100% ≈ 44,4%.'},

    // Dynamic question using the last simulation the user ran
    {level:'Level 8 · Dari Simulasimu', q:`Berdasarkan simulasi terakhirmu, panel menghasilkan sekitar ${dynEpv} kWh/hari dan rumah membutuhkan sekitar ${dynEhouse} kWh/hari. Berapa perkiraan kontribusi energi surya (coverage)?`,
      options: buildCoverageOptions(Number(dynCoverage)),
      correct: 0, explain:`Coverage ≈ E_{\\text{PV}}/E_{\\text{house}} × 100% ≈ ${dynCoverage}% berdasarkan angka simulasimu. Coba ubah parameter di tab Simulasi dan kerjakan ulang soal ini!`},
  ];
}

// build 4 answer options around the true coverage value, correct one shuffled to a random spot
function buildCoverageOptions(trueVal){
  const raw = [trueVal, Math.max(0,trueVal-15), Math.min(100,trueVal+15), Math.max(0,trueVal-30)];
  const unique = [...new Set(raw.map(v => Math.round(Math.max(0, Math.min(100, v)))) )];
  for (let step = 10; unique.length < 4 && step <= 100; step += 10) {
    const candidate = Math.round(Math.max(0, Math.min(100, trueVal + step)));
    if (!unique.includes(candidate)) unique.push(candidate);
  }
  return unique.slice(0,4).map(v => v + '%');
}

let quizBank = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let quizLevelScores = {}; // level -> {correct, total}

function startQuiz(){
  quizBank = buildQuizBank();
  // Acak urutan soal agar latihan terasa seperti sesi baru.
  quizBank = [...quizBank].sort(() => Math.random() - 0.5);
  quizBank.forEach(q => {
    const correctText=q.options[q.correct];
    const shuffled=[...q.options].sort(() => Math.random()-0.5);
    q.options=shuffled;
    q.correct=shuffled.indexOf(correctText);
  });

  quizIndex = 0;
  quizScore = 0;
  quizLevelScores = {};
  document.getElementById('quiz-intro').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-play').classList.remove('hidden');
  renderQuizQuestion();
}

function renderQuizQuestion(){
  quizAnswered = false;
  const q = quizBank[quizIndex];
  document.getElementById('quiz-position').textContent = `Soal ${quizIndex+1} / ${quizBank.length}`;
  document.getElementById('quiz-progressfill').style.width = `${(quizIndex/quizBank.length)*100}%`;
  document.getElementById('quiz-level').textContent = q.level;
  document.getElementById('quiz-question').textContent = q.q;
  const simulationHint = document.getElementById('quiz-simulation-hint');
  if(simulationHint){
    if(lastResult){
      simulationHint.innerHTML = `📊 <strong>Data simulasimu:</strong> PV ${lastResult.solar.Epv.toFixed(2)} kWh/hari · Beban rumah ${lastResult.Ehouse.toFixed(2)} kWh/hari · ΔT ${Math.max(0,lastResult.inp.tout-lastResult.inp.tin).toFixed(0)}°C`;
      simulationHint.classList.remove('hidden');
    } else {
      simulationHint.classList.add('hidden');
    }
  }
  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('btn-answer').disabled = true;
  document.getElementById('btn-answer').classList.remove('hidden');
  document.getElementById('btn-next').classList.add('hidden');

  const optionsWrap = document.getElementById('quiz-options');
  optionsWrap.innerHTML = '';
  let selected = null;
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.type = 'button';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      optionsWrap.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
      selected = i;
      document.getElementById('btn-answer').disabled = false;
    });
    optionsWrap.appendChild(btn);
  });

  document.getElementById('btn-answer').onclick = () => {
    if (selected === null || quizAnswered) return;
    quizAnswered = true;
    const correct = selected === q.correct;
    if (!quizLevelScores[q.level]) quizLevelScores[q.level] = {correct:0, total:0};
    quizLevelScores[q.level].total++;
    if (correct){ quizScore++; quizLevelScores[q.level].correct++; }

    optionsWrap.querySelectorAll('.quiz-option').forEach((o,i) => {
      o.disabled = true;
      if (i === q.correct) o.classList.add('correct');
      else if (i === selected) o.classList.add('incorrect');
    });

    document.getElementById('quiz-verdict').textContent = correct ? '✅ Benar!' : `❌ Belum tepat. Jawaban: ${q.options[q.correct]}`;
    document.getElementById('quiz-explanation').textContent = q.explain;
    document.getElementById('quiz-feedback').classList.remove('hidden');
    document.getElementById('btn-answer').classList.add('hidden');
    document.getElementById('btn-next').classList.remove('hidden');
  };

  document.getElementById('btn-next').onclick = () => {
    quizIndex++;
    if (quizIndex >= quizBank.length){
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  };
}

function finishQuiz(){
  document.getElementById('quiz-play').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  document.getElementById('quiz-progressfill').style.width = '100%';
  const pct = Math.round((quizScore / quizBank.length) * 100);
  const bestQuiz = Math.max(Number(getLearningState('rm_best_quiz','0')), pct);
  saveLearningState('rm_best_quiz', bestQuiz);
  document.getElementById('quiz-score-text').textContent = `${quizScore} / ${quizBank.length}  (${pct}%)`;
  const starCount = Math.max(1, Math.round(pct/20));
  document.getElementById('quiz-stars').textContent = '⭐'.repeat(starCount) + '☆'.repeat(5-starCount);

  const breakdown = document.getElementById('quiz-breakdown');
  breakdown.innerHTML = Object.entries(quizLevelScores).map(([level, s]) => {
    const p = Math.round((s.correct/s.total)*100);
    return `<div class="quiz-breakdown-row"><span class="label">${level}</span><div class="bar"><div class="bar-fill" style="width:${p}%"></div></div><span>${p}%</span></div>`;
  }).join('');

  let badge = 'Pemula Energi Surya';
  if (pct >= 90) badge = '🏆 Kategori: ENERGY ENGINEER';
  else if (pct >= 75) badge = '🥇 Kategori: SOLAR ANALYST';
  else if (pct >= 50) badge = '🥈 Kategori: HOUSE THERMODYNAMICIST';
  else badge = '🥉 Kategori: PEMULA ENERGI SURYA';
  document.getElementById('quiz-badge').textContent = badge;
  updateLearningProgress();
}

function evaluateChallenge(r){
  if(!r) return false;
  const coverageOk = r.coverage >= 80;
  const coolingOk = r.Qcooling <= 3000;
  const costOk = r.costWith < r.costWithout;
  const success = coverageOk && coolingOk && costOk;
  saveLearningState('rm_challenge', success ? '1' : '0');
  updateLearningProgress();
  return success;
}

const challengeButton=document.getElementById('btn-go-challenge');
if(challengeButton) challengeButton.addEventListener('click',()=>goToTab('simulasi'));

const startQuizButton = document.getElementById('btn-start-quiz');
if (startQuizButton) startQuizButton.addEventListener('click', startQuiz);
document.getElementById('btn-retry-quiz').addEventListener('click', () => {
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-intro').classList.remove('hidden');
  document.getElementById('quiz-play').classList.add('hidden');
  goToTab('latihan');
});
updateLearningProgress();
