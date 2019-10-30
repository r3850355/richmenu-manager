<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Line Richmenu Manager
        </q-toolbar-title>

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>功能</q-item-label>
        <q-item clickable :to="'/search'">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>
            <q-item-label>搜尋</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="'/create'">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>新增 RichMenu</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header>教學連結</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://ithelp.ithome.com.tw/articles/10224700">
          <q-item-section avatar>
            <q-icon name="ondemand_video" />
          </q-item-section>
          <q-item-section>
            <q-item-label>#18 為Chatbot添加更多玩法 RichMenu（上）</q-item-label>
            <q-item-label caption>ithelp.ithome.com.tw</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://ithelp.ithome.com.tw/articles/10225064">
          <q-item-section avatar>
            <q-icon name="ondemand_video" />
          </q-item-section>
          <q-item-section>
            <q-item-label>#19 為Chatbot添加更多玩法 RichMenu（中）</q-item-label>
            <q-item-label caption>ithelp.ithome.com.tw</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://ithelp.ithome.com.tw/articles/10225502">
          <q-item-section avatar>
            <q-icon name="ondemand_video" />
          </q-item-section>
          <q-item-section>
            <q-item-label>#20 為Chatbot添加更多玩法 RichMenu（下）</q-item-label>
            <q-item-label caption>ithelp.ithome.com.tw</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>官方連結</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://developers.line.biz/en/services/bot-designer/">
          <q-item-section avatar>
            <q-icon name="insert_link" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LINE Bot Designer</q-item-label>
            <q-item-label caption>developers.line.biz</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://developers.line.biz/en/docs/messaging-api/using-rich-menus/">
          <q-item-section avatar>
            <q-icon name="insert_link" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LINE 官方 說明 文件</q-item-label>
            <q-item-label caption>developers.line.biz</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://developers.line.biz/en/reference/messaging-api/#create-rich-menu">
          <q-item-section avatar>
            <q-icon name="insert_link" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LINE 官方 API 文件</q-item-label>
            <q-item-label caption>developers.line.biz</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://static.line-scdn.net/biz-app/16bd9ea9e03/manager/static/LINE_rich_menu_design_template.zip">
          <q-item-section avatar>
            <q-icon name="cloud_download" />
          </q-item-section>
          <q-item-section>
            <q-item-label>下載 LINE 設計規範樣版</q-item-label>
            <q-item-label caption>developers.line.biz</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      version: process.env.WEB_VERSION
    }
  }
}
</script>
