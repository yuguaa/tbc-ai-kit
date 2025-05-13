# tbc-ai-app

```vue
<!-- App.vue -->
<template>
  <div class="y-h-screen y-p-4">
    <!-- 控制按钮 -->
    <div class="y-mb-4 y-space-x-2">
      <button class="y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600" @click="togglePage">
        Toggle Page
      </button>
      <button class="y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600" @click="toggleModal">
        Toggle Modal
      </button>
      <button class="y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600" @click="toggleDrawer">
        Toggle Drawer
      </button>
    </div>

    <!-- page 模式 -->
    <ai-app :config="{ mode: 'page', size: 'large' }" :visible.sync="showPage">
      <h2 class="y-mb-2 y-text-2xl">Page Content</h2>
      <p>This is rendered directly in the DOM.</p>
    </ai-app>

    <!-- modal 模式 -->
    <ai-app :config="{ mode: 'modal', size: 'medium' }" :visible.sync="showModal">
      <h2 class="y-mb-2 y-text-2xl">Modal Content</h2>
      <p>This is a modal dialog with fade animation.</p>
    </ai-app>

    <!-- drawer 模式 -->
    <ai-app :config="{ mode: 'drawer', size: '50%' }" :visible.sync="showDrawer">
      <h2 class="y-mb-2 y-text-2xl">Drawer Content</h2>
      <p>This is a drawer with slide animation.</p>
    </ai-app>
  </div>
</template>

<script>
import AIApp from './components/AIApp.vue'

export default {
  components: {
    'ai-app': AIApp,
  },
  data: function () {
    return {
      showPage: true,
      showModal: false,
      showDrawer: false,
    }
  },
  methods: {
    togglePage: function () {
      this.showPage = !this.showPage
    },
    toggleModal: function () {
      this.showModal = !this.showModal
    },
    toggleDrawer: function () {
      this.showDrawer = !this.showDrawer
    },
  },
}
</script>
```
