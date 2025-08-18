<template>
    <div class="container">

        <!-- 顶部工具栏 -->
        <div class="toolbar">
            <h4>目录</h4>
            <el-button type="primary" @click="goUpLevel">上一级</el-button>
        </div>

        <!-- 代码高亮显示 -->
        <pre class="language-python"><code ref="codeBlock" class="language-python">{{ codeContent }}</code></pre>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism.css'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const dir = ref("")
const route = useRoute()
const codeContent = ref('')
dir.value = route.query.cdirs1 || '/'
codeContent.value = route.query.files || `# 无代码内容`
const router = useRouter()

const goUpLevel = () => {
  const parts = dir.value.split('/').filter(Boolean)
  parts.pop()
  dir.value = parts.join('/') + (parts.length ? '/' : '')
  router.push({ name: 'dir', query: { cdir: dir.value } })
}

// 高亮处理
const codeBlock = ref(null)
onMounted(() => {
    Prism.highlightElement(codeBlock.value)
})
watch(codeContent, (newVal) => {
  if (codeBlock.value) {
    // 先清空可能存在的旧高亮内容，再重新设置并高亮
    codeBlock.value.textContent = newVal; 
    Prism.highlightElement(codeBlock.value);
  }
});
</script>

<style scoped>
html, body, #app {
    height: 100%;
    margin: 0;
}

.container {
    display: flex;
    flex-direction: column; 
    width: 80vw;
    height: 80vh;
    padding: 0;
    box-sizing: border-box;
}

/* 顶部标题和按钮的布局 */
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}

pre[class*="language-"] {
    flex: 1;
    width: 100%;
    margin: 0;
    padding: 20px;
    overflow: auto;
    background: #ffffff;
    color: #000000;
    font-size: 1rem;
    border-radius: 6px;
    box-sizing: border-box;
    text-shadow: none;
}
</style>