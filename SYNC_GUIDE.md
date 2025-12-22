# Content Sync Scripts

Scripts untuk sync content YouTube dan Instagram ke Firebase dengan mudah.

## 🎬 YouTube Sync

Otomatis fetch video terbaru dari YouTube channel via RSS feed.

### Cara Pakai:

```bash
npm run sync-youtube
```

**Yang dilakukan:**
- Fetch 15 video terbaru dari channel @Allyccc
- Parse title, thumbnail, video URL
- Auto-add ke Firebase (skip yang sudah ada)
- Tampilkan summary berapa video baru ditambahkan

**Output contoh:**
```
🎬 Fetching latest YouTube videos...
📺 Found 15 videos from RSS feed
✅ Added: VALORANT LIVE STREAM
✅ Added: NEW AGENT GAMEPLAY
🎉 Successfully added 2 new video(s)!
```

---

## 📸 Instagram Sync

Interactive tool untuk menambahkan Instagram posts dengan cepat.

### Cara Pakai:

```bash
npm run sync-instagram
```

**Langkah-langkah:**
1. Script akan tanya Image URL
2. Tanya Post URL (permalink)
3. Auto-add ke Firebase
4. Ulangi sampai selesai (ketik 'done')

**Cara dapat URL:**
1. Buka https://www.instagram.com/jasmine.allyc/
2. **Image URL**: Right-click post → "Copy image address"
3. **Permalink**: Click post → Copy URL dari browser

**Output contoh:**
```
📸 Instagram Post Sync Tool
💡 Tip: Go to https://www.instagram.com/jasmine.allyc/
📊 Currently have 12 posts in database

--- Add New Post ---
Image URL: https://scontent.cdninstagram.com/...
Post URL: https://www.instagram.com/p/ABC123/
✅ Post added successfully!

🎉 Sync complete! Added 1 new post(s).
```

---

## ⏰ Kapan Harus Sync?

### YouTube
- **Setelah upload video baru** - Run `npm run sync-youtube`
- **Atau 1x seminggu** untuk update otomatis

### Instagram
- **Setelah post baru** - Run `npm run sync-instagram`
- **Atau batch add** beberapa post sekaligus

---

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### YouTube: Channel ID salah
Edit `scripts/sync-youtube.js` line 26:
```javascript
const CHANNEL_ID = "YOUR_CHANNEL_ID";
```

Cara dapat Channel ID:
1. Buka channel YouTube
2. View page source
3. Cari "channelId"

### Instagram: Image URL tidak valid
Pastikan copy "image address" bukan "link address"

---

## 💡 Tips

1. **YouTube**: Script otomatis, tinggal run
2. **Instagram**: Siapkan dulu list post yang mau ditambah
3. **Cache**: Data akan ter-cache sesuai durasi di `cache.ts`
4. **Dashboard**: Bisa juga add manual via `/dashboard`

---

## 🚀 Quick Start

```bash
# Sync YouTube (otomatis)
npm run sync-youtube

# Sync Instagram (interactive)
npm run sync-instagram

# Atau via dashboard
# Login → /dashboard/youtube atau /dashboard/posts
```

Selamat sync content! 🎉
