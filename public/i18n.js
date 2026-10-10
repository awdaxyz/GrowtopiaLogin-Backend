// ═══════════════════════════════════════════════
// SVPS i18n — switch bahasa English / Bahasa Indonesia
// ═══════════════════════════════════════════════
// Cara pakai di HTML:
//   <span data-i18n="hero.desc">Teks English di sini</span>
//   <button data-i18n-title="x.key" data-i18n-aria="x.key">
//   <div data-lang-switch></div>   <- tempat tombol EN | ID dirender
//
// Teks English diambil langsung dari HTML, jadi kalau mau ganti teks English
// cukup edit HTML-nya. Kamus `id` di bawah = terjemahan Indonesianya.
// Kamus `en` cuma buat teks yang dibuat lewat JS (gak ada di HTML).
(function () {
    var STORAGE_KEY = 'svps-lang';
    var LANGS = ['en', 'id'];

    var dict = {
        en: {
            'hero.online': 'Server Online',
            'hero.offline': 'Server Offline',
            'hero.connecting': 'Connecting...',
            'common.copied': 'Copied!',
            'common.copyClipboard': 'Copy to Clipboard',
            'ios.copyConfig': 'Copy Configuration',
            'lang.label': 'Language'
        },
        id: {
            // ── Umum ──
            'lang.label': 'Bahasa',
            'common.toast': 'Berhasil disalin!',
            'common.copied': 'Tersalin!',
            'common.copyClipboard': 'Salin ke Clipboard',
            'common.back': 'Kembali ke Beranda',
            'common.chooseConnect': 'Pilih cara kamu mau terhubung',
            'common.autoSetup': 'Otomatis',
            'common.easy': 'Mudah',
            'common.manual': 'Manual',
            'common.howToUse': 'Cara Pakai',
            'common.howToSetup': 'Cara Setup',

            // ── Halaman utama ──
            'main.pageTitle': 'SV-Private-Server (SVPS): Growtopia Private Server (GTPS) Terbaik!',
            'nav.features': 'Fitur',
            'nav.download': 'Unduh',
            'nav.community': 'Komunitas',
            'hero.online': 'Server Online',
            'hero.offline': 'Server Offline',
            'hero.connecting': 'Menghubungkan...',
            'hero.since': '<span class="year">Sejak 2022</span> · Masih Bertahan',
            'hero.desc': 'Growtopia Private Server terbaik dengan fitur eksklusif, gameplay seru, dan komunitas yang aktif. Gabung sekarang!',
            'hero.downloadNow': 'Unduh Sekarang',
            'hero.joinDiscord': 'Gabung Discord',
            'hero.joinWa': 'Gabung WhatsApp',
            'hero.playersOnline': 'Pemain Online',

            'features.label': 'Fitur',
            'features.title': 'Apa yang Bikin Kami Beda',
            'features.desc': 'Fitur buatan sendiri yang dirancang untuk pengalaman Growtopia terbaik.',
            'features.fast.title': 'Super Cepat',
            'features.fast.desc': 'Server yang dioptimalkan dengan latensi minimal untuk gameplay yang lancar.',
            'features.anticheat.title': 'Anti-Cheat',
            'features.anticheat.desc': 'Deteksi canggih yang menjaga setiap world tetap adil dan bebas cheat.',
            'features.events.title': 'Event Harian',
            'features.events.desc': 'Giveaway akhir pekan, gem event, dan hadiah eksklusif setiap hari.',
            'features.items.title': 'Item Kustom',
            'features.items.desc': 'Item dan block eksklusif yang nggak bakal kamu temukan di tempat lain.',
            'features.market.title': 'Pasar Pemain',
            'features.market.desc': 'Sistem trading bawaan untuk transaksi yang aman dan mudah.',
            'features.support.title': 'Support Aktif',
            'features.support.desc': 'Tim staf siap membantu 24/7 di Discord.',

            'download.label': 'Unduh',
            'download.title': 'Main di Perangkat Apa Pun',
            'download.desc': 'Tersedia di semua platform utama. Pilih punyamu dan mulai main.',
            'download.btn': 'Unduh',

            'community.label': 'Komunitas',
            'community.title': 'Gabung Komunitas Kami',
            'community.desc': 'Terhubung dengan pemain lain, dapatkan update terbaru, dan jangan sampai ketinggalan event.',
            'community.discord.title': 'Server Discord',
            'community.discord.desc': 'Ngobrol bareng pemain, minta bantuan, ikut giveaway, dan pantau pengumuman terbaru.',
            'community.discord.members': '4.000+ Member',
            'community.wa.title': 'Grup WhatsApp',
            'community.wa.desc': 'Update cepat, notifikasi event, dan ngobrol langsung dengan komunitas di WhatsApp.',
            'community.wa.active': 'Grup Aktif',

            'footer.rights': '&copy; 2022-2026 <span>SV-Private-Server</span>. Hak cipta dilindungi.',
            'footer.disclaimer': 'Tidak berafiliasi dengan Growtopia atau Ubisoft.',

            // ── Android ──
            'android.pageTitle': 'SVPS - Setup Android',
            'android.apkTitle': 'APK Growtopia',
            'android.apkBadge': 'Wajib',
            'android.apkInfo': 'Kamu <strong>wajib memakai APK ini</strong> untuk bisa masuk ke SVPS. APK Growtopia dari Play Store tidak akan terhubung. Uninstall Growtopia lama dulu sebelum memasang APK ini.',
            'android.downloadMainApk': 'Unduh SVPS_5.59.apk',
            'android.title': 'Setup Android',
            'android.autoInfo': 'Unduh <strong>SVPSConnect</strong> lalu install. Aplikasi ini otomatis mengarahkan Growtopia asli ke SVPS cukup dengan sekali tap — tanpa perlu edit hosts.',
            'android.downloadApk': 'Unduh SVPSConnect.apk',
            'android.auto1': '<strong>Unduh</strong> file <code class="inline-code">SVPSConnect.apk</code> dari MediaFire',
            'android.auto2': '<strong>Buka</strong> file APK lalu install. Kalau diminta, izinkan <strong>Instal dari sumber tidak dikenal</strong>',
            'android.auto3': '<strong>Buka SVPSConnect</strong> lalu tap <strong>Connect</strong> (setujui permintaan VPN kalau muncul)',
            'android.auto4': 'Setelah terhubung, <strong>buka Growtopia</strong> dan mainkan!',
            'android.manualInfo': 'Nggak mau pakai aplikasi? Terapkan entri ini pakai aplikasi hosts seperti <strong>PowerTunnel</strong> atau <strong>Hosts Go</strong> untuk mengarahkan Growtopia ke SVPS.',
            'android.hostsFile': 'File Hosts',
            'android.downloadTxt': 'Unduh svps-new.txt',
            'android.orCopy': 'Atau Salin Manual',
            'android.subUrl': 'URL Subscription',
            'android.copyUrl': 'Salin URL',
            'android.copyUrlAria': 'Salin URL subscription',
            'android.manual1': 'Install <strong>PowerTunnel</strong> atau <strong>Hosts Go</strong> dari Play Store',
            'android.manual2': '<strong>Unduh</strong> file hosts di atas, atau salin entrinya / import URL subscription',
            'android.manual3': '<strong>Import / tempel</strong> entri ke daftar hosts di aplikasi',
            'android.manual4': '<strong>Aktifkan</strong> tunnel, lalu buka <strong>Growtopia</strong> dan mainkan!',

            // ── iOS ──
            'ios.pageTitle': 'SVPS - Setup iOS',
            'ios.title': 'Setup iOS',
            'ios.subtitle': 'Terhubung menggunakan Surge 5',
            'ios.config': 'Konfigurasi Surge 5',
            'ios.copyConfig': 'Salin Konfigurasi',
            'ios.step1': 'Unduh <strong>Surge 5</strong> dari App Store',
            'ios.step2': 'Buka Surge, masuk ke <strong>Profile</strong> lalu buat config baru',
            'ios.step3': '<strong>Tempel</strong> konfigurasi di atas ke file config',
            'ios.step4': 'Aktifkan profile-nya, lalu buka <strong>Growtopia</strong> dan mainkan!',

            // ── iOS: tab Sertifikat ──
            'ios.tabCert': 'Sertifikat',
            'ios.tabConfig': 'Config Surge',
            'ios.certDownload': 'Unduh Sertifikat',
            'ios.certMeta': 'Wajib untuk login. Cukup diinstal sekali per perangkat.',
            'ios.certButton': 'Unduh Sertifikat',
            'ios.certInstall': 'Cara Instal',
            'ios.certStep1': 'Tap <strong>Unduh Sertifikat</strong> lewat <strong>Safari</strong>. Kalau MediaFire menampilkan halaman, tap tombol Download-nya',
            'ios.certStep2': 'Saat iOS meminta izin mengunduh profil konfigurasi, tap <strong>Allow</strong>',
            'ios.certStep3': 'Buka <strong>Settings → General → VPN &amp; Device Management</strong>, tap <strong>vFact\'s SkyValley</strong> di bawah Downloaded Profile, tap <strong>Install</strong>, masukkan passcode, lalu tap <strong>Install</strong> sekali lagi',
            'ios.certStep4': 'Buka <strong>Settings → General → About → Certificate Trust Settings</strong> lalu aktifkan <strong>vFact\'s SkyValley</strong>',
            'ios.certStep4Note': 'Jangan dilewati. Tanpa ini, login tetap gagal.',
            'ios.certStep5': 'Lanjut ke tab <strong>Config Surge</strong> untuk menyelesaikan setup',
            'ios.goConfig': 'Lanjut ke Config Surge',
            'ios.goCert': 'Sertifikat belum terpasang?',

            // ── Windows ──
            'windows.pageTitle': 'SVPS - Setup Windows',
            'windows.title': 'Setup Windows',
            'windows.autoInfo': 'Unduh <strong>SVPS Auto-Setup.bat</strong> lalu jalankan sebagai Administrator. Script ini otomatis menambahkan entri yang dibutuhkan ke file hosts kamu — tanpa perlu edit manual.',
            'windows.downloadBat': 'Unduh Auto-Setup.bat',
            'windows.auto1': '<strong>Unduh</strong> file <code class="inline-code">SVPS Auto-Setup.bat</code> dari MediaFire',
            'windows.auto2': '<strong>Klik kanan</strong> file tersebut lalu pilih <strong>Run as Administrator</strong>',
            'windows.auto3': 'Kalau muncul Windows SmartScreen, klik <strong>More Info → Run Anyway</strong>',
            'windows.auto4': 'Tunggu sampai script selesai, lalu <strong>buka Growtopia</strong> dan mainkan!',
            'windows.hostsContent': 'Isi File Hosts',
            'windows.fileLocation': 'Lokasi File',
            'windows.manual1': 'Buka <strong>Notepad</strong> sebagai Administrator',
            'windows.manual2': 'Klik <strong>File → Open</strong>, lalu buka lokasi di atas',
            'windows.manual3': 'Ubah filter file ke <strong>All Files (*.*)</strong> supaya file hosts kelihatan',
            'windows.manual4': '<strong>Tempel</strong> isi hosts di baris paling bawah file',
            'windows.manual5': '<strong>Simpan</strong> file-nya, buka Growtopia, dan mainkan!',

            // ── Windows: tab Sertifikat ──
            'windows.tabCert': 'Sertifikat',
            'windows.certNotice': 'Login juga butuh sertifikat.',
            'windows.certNoticeLink': 'Instal di tab Sertifikat',
            'windows.certDownload': 'Unduh Sertifikat',
            'windows.certMeta': 'Wajib untuk login. Cukup diinstal sekali per komputer.',
            'windows.certButton': 'Unduh Sertifikat',
            'windows.certInstall': 'Cara Instal',
            'windows.certStep1': '<strong>Unduh</strong> sertifikatnya dan simpan, misalnya di folder <strong>Downloads</strong>',
            'windows.certStep2': '<strong>Klik dua kali</strong> file-nya, lalu klik <strong>Install Certificate</strong>. Kalau muncul peringatan keamanan, klik <strong>Open</strong>',
            'windows.certStep3': 'Pilih <strong>Local Machine</strong>, klik <strong>Next</strong>, lalu izinkan permission administrator',
            'windows.certStep4': 'Pilih <strong>Place all certificates in the following store</strong>, klik <strong>Browse</strong>, pilih <strong>Trusted Root Certification Authorities</strong>, lalu klik <strong>OK</strong> dan <strong>Next</strong>',
            'windows.certStep4Note': 'Jangan biarkan di "Automatically". Sertifikat harus masuk ke Trusted Root.',
            'windows.certStep5': 'Klik <strong>Finish</strong>, lalu <strong>Yes</strong> di peringatan keamanan. Akan muncul "The import was successful"',
            'windows.certStep6': '<strong>Tutup Growtopia sepenuhnya</strong> (cek Task Manager), lalu buka lagi dan mainkan!',
            'windows.quickMethod': 'Cara Cepat',
            'windows.quickInfo': 'Mau cukup satu perintah? Buka <strong>Command Prompt sebagai Administrator</strong> lalu jalankan ini. Ubah path-nya kalau file kamu simpan di tempat lain.'
        }
    };

    // Teks asli (English) dari HTML, disimpan per key sebelum ditimpa.
    var original = {};
    var ATTRS = [
        ['data-i18n', null],
        ['data-i18n-title', 'title'],
        ['data-i18n-aria', 'aria-label']
    ];

    function readSaved() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            if (LANGS.indexOf(v) !== -1) return v;
        } catch (e) {}
        return null;
    }

    function detectLang() {
        var saved = readSaved();
        if (saved) return saved;
        var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
        return /^(id|in)\b/i.test(list[0] || '') ? 'id' : 'en';
    }

    var lang = detectLang();

    function t(key) {
        var table = dict[lang] || {};
        if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
        if (Object.prototype.hasOwnProperty.call(dict.en, key)) return dict.en[key];
        if (Object.prototype.hasOwnProperty.call(original, key)) return original[key];
        return key;
    }

    function apply(root) {
        ATTRS.forEach(function (pair) {
            var dataAttr = pair[0], target = pair[1];
            (root || document).querySelectorAll('[' + dataAttr + ']').forEach(function (el) {
                var key = el.getAttribute(dataAttr);
                if (!(key in original)) {
                    original[key] = target ? el.getAttribute(target) : el.innerHTML;
                }
                var value = t(key);
                if (target) el.setAttribute(target, value);
                else if (el.innerHTML !== value) el.innerHTML = value;
            });
        });
        document.documentElement.lang = lang;
        renderSwitches();
    }

    function renderSwitches() {
        document.querySelectorAll('[data-lang-switch]').forEach(function (slot) {
            if (!slot.firstChild) {
                slot.innerHTML =
                    '<div class="lang-switch" role="group">' +
                        '<i class="fas fa-globe lang-globe" aria-hidden="true"></i>' +
                        '<button type="button" data-lang="en" lang="en">EN</button>' +
                        '<button type="button" data-lang="id" lang="id">ID</button>' +
                    '</div>';
                slot.querySelectorAll('button[data-lang]').forEach(function (btn) {
                    btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
                });
            }
            var group = slot.querySelector('.lang-switch');
            group.setAttribute('aria-label', t('lang.label'));
            group.title = t('lang.label');
            slot.querySelectorAll('button[data-lang]').forEach(function (btn) {
                var active = btn.getAttribute('data-lang') === lang;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        });
    }

    function setLang(next) {
        if (LANGS.indexOf(next) === -1 || next === lang) return;
        lang = next;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        apply();
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }

    // Style tombol switch (dipakai semua halaman)
    var style = document.createElement('style');
    style.textContent =
        '.lang-switch{display:inline-flex;align-items:center;gap:2px;padding:3px;' +
            'background:rgba(8,8,10,.6);border:1px solid rgba(16,185,129,.12);border-radius:9px;' +
            'font-family:"Outfit",sans-serif;-webkit-user-select:none;user-select:none}' +
        '.lang-switch .lang-globe{font-size:12px;color:#475569;padding:0 5px 0 7px}' +
        '.lang-switch button{padding:6px 10px;border:none;border-radius:6px;background:transparent;' +
            'color:#94a3b8;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.8px;' +
            'cursor:pointer;transition:all .25s;-webkit-tap-highlight-color:transparent}' +
        '.lang-switch button:hover:not(.active){color:#f1f5f9}' +
        '.lang-switch button.active{background:rgba(16,185,129,.12);color:#34d399;' +
            'box-shadow:0 0 0 1px rgba(16,185,129,.2)}' +
        '.lang-switch button:focus-visible{outline:2px solid #10b981;outline-offset:1px}' +
        '@media (max-width:420px){.lang-switch .lang-globe{display:none}.lang-switch button{padding:6px 8px}}';
    document.head.appendChild(style);

    window.i18n = { t: t, setLang: setLang, getLang: function () { return lang; } };

    // Script ini dipasang di akhir <body>, jadi elemen halaman sudah ada.
    apply();
})();
