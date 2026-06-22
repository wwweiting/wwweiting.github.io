# 學術個人網頁 Academic Personal Page

現代化靜態學術個人網頁，支援 GitHub Pages 部署。

## 功能特色

- 響應式設計，支援手機、平板、桌機
- 導覽列含滾動高亮效果
- 個人簡介 + 社群連結
- 最新消息 (News)
- 研究興趣卡片
- 論文列表（含 Abstract 展開）
- 學術/工作經歷 Timeline
- 聯絡資訊

## 部署到 GitHub Pages（詳細步驟）

### 方法一：使用 `username.github.io` 網域（推薦）

1. **在 GitHub 建立新 repo**，名稱必須為：
   ```
   <你的GitHub帳號>.github.io
   ```
   例如：`johndoe.github.io`

2. **初始化並推送**：
   ```bash
   cd /Users/wei/Desktop/project/MyWeb
   git init
   git add .
   git commit -m "Initial commit: academic personal page"
   git branch -M main
   git remote add origin https://github.com/<你的GitHub帳號>/<你的GitHub帳號>.github.io.git
   git push -u origin main
   ```

3. **開啟 GitHub Pages**：
   - 進入 GitHub repo → Settings → Pages
   - Source 選 `Deploy from a branch`
   - Branch 選 `main`，資料夾選 `/ (root)`
   - 儲存後稍等 1–2 分鐘
   - 網址：`https://<你的GitHub帳號>.github.io`

### 方法二：使用自訂 repo 名稱

如果 repo 名稱不是 `username.github.io`，網址會是：
```
https://<你的GitHub帳號>.github.io/<repo名稱>
```

此時需要在 `index.html` 中將所有資源路徑加上 base path，
或在 repo Settings → Pages 選擇部署來源。

## 個人化設定

修改 `index.html` 中以下佔位符：

| 佔位符 | 說明 |
|--------|------|
| `Your Name` | 你的英文姓名 |
| `（中文姓名）` | 你的中文姓名 |
| `your@email.com` | 電子郵件 |
| `yourusername` | GitHub / Twitter / LinkedIn 帳號 |
| `Prof. [Advisor Name]` | 指導教授姓名 |
| `assets/images/profile.jpg` | 放入個人照片 |

## 資料夾結構

```
MyWeb/
├── index.html          # 主頁面
├── .nojekyll           # 停用 Jekyll（GitHub Pages 必要）
├── README.md
├── data/
│   └── CV.pdf          # 放入你的 CV
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── profile.jpg       # 個人照片（建議 400x400px）
        └── pub1-thumb.jpg    # 論文縮圖（可選）
```
