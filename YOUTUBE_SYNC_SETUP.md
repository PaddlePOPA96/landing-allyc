# YouTube Auto-Sync Setup Guide

## 🎯 Cara Setup Auto-Sync YouTube

Untuk enable auto-sync dari YouTube, Anda perlu YouTube API Key (GRATIS!).

---

## 📝 Step 1: Dapatkan YouTube API Key

### 1. Buka Google Cloud Console
- Go to: https://console.cloud.google.com/

### 2. Create Project Baru (atau pakai yang ada)
- Click "Select a project" → "New Project"
- Nama: "Landing Page" (atau terserah)
- Click "Create"

### 3. Enable YouTube Data API v3
- Go to: https://console.cloud.google.com/apis/library
- Search: "YouTube Data API v3"
- Click → Enable

### 4. Create API Key
- Go to: https://console.cloud.google.com/apis/credentials
- Click "Create Credentials" → "API Key"
- Copy API Key yang muncul

### 5. (Optional) Restrict API Key
- Click API Key yang baru dibuat
- Application restrictions: "None" (atau "HTTP referrers" untuk production)
- API restrictions: Pilih "YouTube Data API v3"
- Save

---

## 📝 Step 2: Dapatkan Channel ID

### Cara 1: Dari URL Channel
Jika URL channel Anda: `https://www.youtube.com/@Allyccc`

1. Buka channel di browser
2. View page source (Cmd+Option+U / Ctrl+U)
3. Search: "channelId"
4. Copy ID yang muncul (format: UC...)

### Cara 2: Pakai Tool Online
- Go to: https://commentpicker.com/youtube-channel-id.php
- Paste channel URL
- Get Channel ID

---

## 📝 Step 3: Tambahkan ke Environment Variables

Edit file `.env.local`:

```bash
# YouTube API Configuration
YOUTUBE_API_KEY=AIzaSy...your-api-key-here
YOUTUBE_CHANNEL_ID=UCxvJZITRthNHAf8Vo_RbPpQ
```

**IMPORTANT:** 
- Jangan commit `.env.local` ke Git!
- File ini sudah ada di `.gitignore`

---

## 📝 Step 4: Deploy ke Vercel

### 1. Tambahkan Environment Variables di Vercel
- Go to: https://vercel.com/dashboard
- Select project → Settings → Environment Variables
- Add:
  - `YOUTUBE_API_KEY` = your API key
  - `YOUTUBE_CHANNEL_ID` = your channel ID

### 2. Redeploy
- Vercel akan auto-redeploy
- Atau manual: Deployments → Redeploy

---

## 🚀 Cara Pakai

### Di Dashboard
1. Login ke `/dashboard/youtube`
2. Click tombol **"Sync from YouTube"**
3. Script akan:
   - Fetch 10 video terbaru dari channel
   - Skip video yang sudah ada
   - Add video baru ke Firebase
   - Clear cache otomatis
   - Tampilkan berapa video ditambahkan

### Output Contoh
```
✅ Synced! Added 3 new video(s).
```

---

## 💰 Quota & Limits

### YouTube API Quota
- **Free tier**: 10,000 units/day
- **Search request**: 100 units
- **Jadi**: ~100 sync requests per hari (lebih dari cukup!)

### Tips Hemat Quota
- Sync manual saat ada video baru
- Jangan spam tombol sync
- 1-2x sync per hari sudah cukup

---

## 🔧 Troubleshooting

### Error: "YouTube API key not configured"
**Solusi:** Tambahkan `YOUTUBE_API_KEY` di `.env.local` dan Vercel

### Error: "Failed to fetch from YouTube API"
**Solusi:** 
- Check API key valid
- Check YouTube Data API v3 sudah enabled
- Check quota belum habis

### Error: "Channel ID not found"
**Solusi:** Pastikan `YOUTUBE_CHANNEL_ID` benar (format: UC...)

### Sync berhasil tapi video tidak muncul
**Solusi:** 
- Hard refresh browser (Cmd+Shift+R)
- Cache akan auto-clear setelah sync

---

## ✨ Summary

Setelah setup:
1. ✅ Tombol "Sync from YouTube" muncul di dashboard
2. ✅ Click sekali → auto-fetch 10 video terbaru
3. ✅ Skip duplikat otomatis
4. ✅ Cache auto-clear
5. ✅ Video langsung muncul di landing page

**Gratis, mudah, otomatis!** 🎉
