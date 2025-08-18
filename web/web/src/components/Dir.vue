<template>
  <div class="container">
    <div class="ledcontain">
      <div
        class="led"
        :class="status ? 'led-green' : 'led-red'"
      >
      
    </div>
    <h3>{{ status ? 'nas在线' : 'nas离线' }}</h3>
    </div>
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <h4>目录</h4>
      <el-button type="primary" @click="goUpLevel">上一级</el-button>
    </div>

    <!-- 无限滚动列表 -->
    <ul v-infinite-scroll="load" class="infinite-list">
      <li v-for="(isdir, name) in count" :key="name" class="infinite-list-item" @click="updatecount(name)">
        <el-icon v-if="isdir" color="#409EFF" size="20"><FolderOpened /></el-icon>
        <el-icon v-else color="#409EFF" size="20"><Tickets /></el-icon>
        {{ name }}
      </li>
    </ul>

  </div>
</template>

<script setup>
import { onMounted, ref,onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import {FolderOpened,Tickets} from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()  
const count = ref({})
const dir = ref("")
const load = () => {
}
const status = ref(false);
let timer = null;

const fetchStatus = async () => {
  try {
    const res = await axios.get(`http://${window.location.hostname}:8888/islive`);
    status.value = res.data.status;
  } catch (err) {
    console.error("获取状态失败:", err);
    status.value = false; // 失败时默认红色
  }
};
// 监听路由参数变化，动态更新cdir0并获取目录

const getroot =(cdir)=>{
  const url = `${API_BASE}/getdirs/`+cdir
  axios.post(url, { cookie: localStorage.getItem('cookie') }).then((response) => {
    if(response.data.isdir){
      count.value=response.data.dirs;
    }else{
      router.push({ name: 'file', query: {
      files: response.data.file,
      cdirs1: cdir
  } })
    }

  }).catch((error) => {
    console.error('Error fetching data:', error);
  });
}
onMounted(()=>{
  dir.value = route.query.cdir || ''
  const API_BASE = `${window.location.protocol}//${window.location.hostname}:8888`
  getroot(dir.value)
  fetchStatus();
  timer = setInterval(fetchStatus, 5000);
})

const API_BASE = `${window.location.protocol}//${window.location.hostname}:8888`


onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const updatecount = (cdir) => {
  if(count.value[cdir]){
  dir.value += `${cdir}/`
}else{
  dir.value += `${cdir}`
}
  getroot(dir.value)
}
const goUpLevel = () => {
  const parts = dir.value.split('/').filter(Boolean)
  parts.pop()
  dir.value = parts.join('/') + (parts.length ? '/' : '')
  getroot(dir.value)
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}
.ledcontain{
  align-items: center;
  justify-content: space-between;
  display:flex;
  width: 100%;
  margin: 1%;
}
.led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0,0,0,0.5) inset;
  transition: background 0.3s, box-shadow 0.3s;
}

/* 绿色 LED */
.led-green {
  /* 调整为20px大小的圆形灯珠 */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  
  /* 适配小尺寸的绿色渐变发光核心 */
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(120, 255, 120, 0.8) 20%,
    #44ff44 50%,
    #00cc00 80%,
    #008800 100%
  );
  
  /* 适配小尺寸的光影效果（强度相应降低） */
  box-shadow: 
    0 0 2px rgba(255, 255, 255, 0.8),
    0 0 5px rgba(0, 255, 0, 0.8),
    0 0 10px rgba(0, 255, 0, 0.5),
    inset 0 0 2px rgba(255, 255, 255, 0.5),
    inset 0 0 4px rgba(0, 150, 0, 0.6);
  
  /* 细边框适配小尺寸 */
  border: 0.5px solid rgba(80, 255, 80, 0.3);
  
  position: relative;
  
  /* 呼吸动画（保持3秒周期，幅度适配小尺寸） */
  animation: breathing 3s ease-in-out infinite;
}

/* 小尺寸反光点（按比例缩小） */
.led-green::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 15%;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  animation: highlightPulse 3s ease-in-out infinite;
}

/* 呼吸动画关键帧（适配小尺寸的光影变化） */
@keyframes breathing {
  0%, 100% {
    box-shadow: 
      0 0 2px rgba(255, 255, 255, 0.6),
      0 0 5px rgba(0, 255, 0, 0.6),
      0 0 10px rgba(0, 255, 0, 0.3),
      inset 0 0 2px rgba(255, 255, 255, 0.4),
      inset 0 0 4px rgba(0, 150, 0, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 
      0 0 3px rgba(255, 255, 255, 0.9),
      0 0 8px rgba(0, 255, 0, 0.9),
      0 0 15px rgba(0, 255, 0, 0.6),
      inset 0 0 3px rgba(255, 255, 255, 0.6),
      inset 0 0 6px rgba(0, 150, 0, 0.7);
    transform: scale(1.05); /* 小幅度缩放，避免变形 */
  }
}

/* 反光点呼吸同步变化 */
@keyframes highlightPulse {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  }
  50% {
    opacity: 0.9;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
  }
}

/* 红色 LED */
.led-red {
  /* LED灯珠基础形态：正圆形 */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  
  /* 发光核心效果：中心高亮向边缘过渡 */
  background: radial-gradient(
    circle at 40% 40%,  /* 轻微偏移的光源点 */
    rgba(255, 255, 255, 0.9) 0%,  /* 中心最亮的光点 */
    rgba(255, 120, 120, 0.9) 20%, /* 过渡光 */
    #ff4444 50%,        /* 主色 */
    #cc0000 80%,        /* 边缘深色 */
    #880000 100%        /* 最外层暗部 */
  );
  
  /* 玻璃罩质感与发光效果 */
  box-shadow: 
    0 0 5px rgba(255, 255, 255, 0.8),  /* 最内层高光 */
    0 0 15px rgba(255, 0, 0, 0.8),     /* 主发光层 */
    0 0 30px rgba(255, 0, 0, 0.5),     /* 扩散光 */
    inset 0 0 8px rgba(255, 255, 255, 0.5),  /* 玻璃内侧反光 */
    inset 0 0 15px rgba(150, 0, 0, 0.6);     /* 内部深色边缘 */
  
  /* 模拟LED灯珠的金属边缘 */
  border: 1px solid rgba(255, 80, 80, 0.3);
  
  position: relative;
}

/* 灯珠表面的细微反光点，增强玻璃质感 */
.led-red::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 15%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
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
  align-items: center;        /* 垂直居中 */
  justify-content: space-between; /* 两端对齐，标题左，按钮右 */
  width: 100%;
  padding: 10px 20px;         /* 内边距，让内容不贴边 */
  box-sizing: border-box;
  background-color: #83a4ff;  /* 可选：加个浅背景区分顶部 */
  border-bottom: 1px solid #ddd;
}

.infinite-list {
  flex: 1;                    /* 占满剩余空间 */
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: auto;
  border: 1px solid #c2ff9c;
  box-sizing: border-box;
}

.infinite-list-item {
  display: flex;
  padding: 10px 80px; 
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #dffadf;
  margin: 10px;
  color: var(--el-color-primary);
}
</style>
