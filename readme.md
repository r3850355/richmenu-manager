# Line Richmenu Manager

LINE 圖文選單管理器

[DEMO](https://richmenu.renzhou.dev)

## 使用方式

### 設置



```
// 在設置檔填上你的 Channel Access Token
cp .env.exmaple .env

// 建立上傳用資料夾
mkdir public
mkdir public/images
mkidr public/upload

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
http://localhost:3030
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
### 設定檔位置

`/client/quasar.conf.js`

可設定參數：

#### GET_TOKEN

- true :  一進頁面就會帶token進來



### 運行

```
quasar dev
```

### 封裝
	
```
quasar build
```

---

## 更新日誌

#### 1.0.4

- 修正部分頁面RWD
- 取消右鍵選單功能，由下方按鈕取代之
- 新增 取消預設 功能