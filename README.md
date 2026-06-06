# 🐾 MedBeastie — 你的吃藥小夥伴

> 一個以可愛動物為主題的個人健康管理網頁，幫助使用者建立按時服藥與好習慣的日常紀錄。  
> 符合 SDG 3：良好健康與福祉

---

## 📌 專案簡介

MedBeastie 是一款純前端的健康提醒網頁應用，使用者可以透過可愛的介面記錄每日服藥狀況、設定提醒時間、查詢藥物資訊，並追蹤個人好習慣。

---

## ✨ 主要功能

| 功能 | 說明 |
|------|------|
| 📅 月曆記錄 | 點選日期記錄吃藥狀況、好習慣與心情 emoji |
| 🎨 視覺回饋 | 格子以顏色（橘/紅/藍）及漸層顯示當日狀態 |
| 😊 心情記錄 | 每天可選擇一個心情 emoji（😊😢😠😨🤔） |
| 💊 打卡清單 | 可新增、編輯、刪除藥物，並打卡確認是否服用 |
| ⏰ 提醒通知 | 設定提醒時間，時間到自動跳出頁面橫幅通知 |
| 🔍 藥物管理 | 可自行新增、刪除藥物資訊（藥名、類別、說明） |
| 🌱 好習慣模式 | 切換至好習慣模式，追蹤運動、喝水等日常目標 |
| 📱 響應式設計 | 支援桌機與手機，手機版提供漢堡選單 |

---

## 🗂️ 檔案結構

```
MedBeastie/
├── index.html          # 主頁面（所有頁面 HTML 結構）
├── css/
│   ├── style.css       # 共用樣式：變數、navbar、footer、橫幅通知
│   ├── home.css        # 首頁樣式
│   ├── record.css      # 每日記錄頁樣式
│   └── info.css        # 藥物查詢頁樣式
├── js/
│   ├── nav.js          # 頁面切換、漢堡選單
│   ├── mode.js         # 吃藥／好習慣模式切換
│   ├── record.js       # 月曆、打卡清單邏輯
│   ├── notify.js       # 提醒通知功能
│   └── info.js         # 藥物查詢、新增、刪除
└── README.md
```

---

## 🛠️ 使用技術

- **HTML5** — 頁面結構
- **CSS3** — 樣式設計、響應式排版、CSS 變數、動畫
- **JavaScript (ES6)** — 互動邏輯、DOM 操作
- **Web Notifications API** — 瀏覽器通知
- **Google Fonts** — Nunito、Noto Sans TC 字型

> 本專案為純前端靜態網站，不依賴任何框架或後端服務。

---

## 🚀 如何執行

### 本地端
1. 下載或 clone 本專案
2. 直接用瀏覽器開啟 `index.html`，或使用 VS Code Live Server 插件

### 線上版本
🌐 [med-beastie.vercel.app](https://med-beastie.vercel.app)

---

## 👥 團隊分工

| 成員 | 負責項目 |
|------|---------|
| （填入姓名） | （填入負責項目） |
| （填入姓名） | （填入負責項目） |

---

## 🌍 SDGs 對應

**SDG 3 — 良好健康與福祉**  
MedBeastie 透過提醒功能與每日記錄，協助使用者養成按時服藥的習慣，降低因忘記服藥導致的健康風險，同時透過好習慣模式鼓勵健康的生活方式。

---

## 📎 參考資料

- [MDN Web Docs — Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Google Fonts](https://fonts.google.com)
- [Vercel 部署平台](https://vercel.com)
