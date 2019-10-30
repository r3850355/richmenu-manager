# Line Richmenu Manager

LINE 圖文選單管理器

## 使用方式

### 設置

填上你的 Channel Access Token

```
cp .env.exmaple .env

```

### 安裝

```
npm install
```

### 啟動

```
npm start
```

### 網頁運行網址

```
http://localhost:3030/app
```

---
## 編輯客戶端頁面

如果你有要修改客戶端頁面的需求，因為是用 Quasar 寫的

所以要先安裝 Quasar

```
cd client/
npm install
npm install -g @quasar/cli
```

### 運行

```
quasar dev
```

### 封裝
	
```
quasar build
```