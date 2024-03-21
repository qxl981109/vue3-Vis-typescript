<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Network } from 'vis'
let network = ref();
onMounted(() => {
  init()
});
const from = ref({
  name: '',
  id: 0,
  state: '',
  type: '',
})
// 节点
var nodes = [
  { id: 1, label: 'SHELL', state: '成功', type: '禁用' },
  { id: 2, label: 'MYSQL', state: '成功', type: '禁用' },
  { id: 3, label: 'SPARK_SQL', state: '失败', type: '禁用' },
  { id: 4, label: 'SERVER', state: '失败', type: '启用' },
  { id: 5, label: 'LINGRUI', state: '失败', type: '启用' },
]
//  边
var edges = [
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 2 },
]
function init() {
  // create a network
  var container = document.getElementById('mynetwork')
  var data = {
    nodes: nodes,
    edges: edges,
  }

  var options = {

    autoResize: true,
    height: '100%',
    width: '100%',
    clickToUse: false,
    configure: {
      enabled: false,
      filter: 'nodes,edges',
      container: undefined,
      showButton: false
    },    // 详细配置请查看'配置'模块，
    edges: {
      arrows: {
        to: {
          enabled: true, // 打开关闭箭头
          imageHeight: 10,  //图像箭头的高度。如果为undefined，则使用图像的高度。
          imageWidth: 2, //图像箭头的宽度。如果为undefined，则使用图像的宽度。
          scaleFactor: 0.5, // 箭头缩放的比例因子
          src: "https://visjs.org/images/visjs_logo.png",
          type: "image"
          // src: undefined, //图像箭头的URL
          // type: "arrow" // 'arrow', 'bar', 'circle', 'box', 'crow', 'curve', 'inv_curve', 'diamond', 'triangle', 'inv_triangle', 'vee'
        },
        middle: {
          enabled: false,
          imageHeight: 32,
          imageWidth: 32,
          scaleFactor: 1,
          src: "https://visjs.org/images/visjs_logo.png",
          type: "image"
        },
        from: {
          enabled: false,
          imageHeight: undefined,
          imageWidth: undefined,
          scaleFactor: 1,
          src: undefined,
          type: "arrow"
        }
      },
      arrowStrikethrough: true, //如果为false，则边将在箭头处停止。中间箭头不受此影响。
      color: {
        color: '#848484',
        highlight: 'black',
        hover: 'black',
        inherit: 'from',
        opacity: 1.0,

      },
      dashes: false, // 设置虚线
      font: {
        color: '#343434',
        size: 16, // px
        face: 'arial',
        background: 'none',
        strokeWidth: 2, // px
        strokeColor: 'black',
        align: 'horizontal',
        multi: false,
        vadjust: 0,
        bold: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold'
        },
        ital: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'italic',
        },
        boldital: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold italic'
        },
        mono: {
          color: '#343434',
          size: 15, // px
          face: 'courier new',
          vadjust: 2,
          mod: ''
        }
      },
      hoverWidth: 1.5,
      label: undefined,
      labelHighlightBold: true,
      length: undefined,
    }
  }
  if (container) {
    network.value = new Network(container, data, options)
    // 点击节点触发
    network.value.on('click', (properties) => {
      if (properties.nodes.length > 0) {
        let node = getNode(properties.nodes[0]);
        from.value.name = node.label;
        from.value.type = node.type;
        from.value.id = node.id;
        from.value.state = node.state;
        toggleRight();
      }
    })
  }
}
// 获取节点内容
const getNode = (id: any) => {
  for (var i = 0; i < nodes.length; i++) {
    if (id == nodes[i].id) {
      return nodes[i];
    }
  }
}
const hideRight = ref(false); // 控制右侧栏显示
// 打开右侧栏
const toggleRight = () => {
  hideRight.value = true;
};
const close = () => {
  hideRight.value = false;
}
</script>
<template>
  <div id="mynetwork" class="mynetwork"></div>
  <transition name="slide">
    <div v-if="hideRight" class='right-box'>
      <div class="right-title">
        <span>{{ '节点详情' }}</span>
        <el-button @click="close">X</el-button>
      </div>
      <div class="right-content">
        <div class="right-item">
          <div>任务名称：</div>
          <span>{{ from.name }}</span>
        </div>
        <div class="right-item">
          <div>任务id：</div>
          <span>{{ from.id }}</span>
        </div>
        <div class="right-item">
          <div>任务状态：</div>
          <span>{{ from.type }}</span>
        </div>
        <div class="right-item">
          <div>任务类型：</div>
          <span>{{ from.state }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
.outBox {
  overflow: hidden;
}

.mynetwork {
  width: 100%;
  height: 90vh;
}

.right-box {
  position: fixed;
  top: 0;
  right: 0;
  /* 初始状态在右侧隐藏 */
  width: 385px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #ebebeb;

  .right-title {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
    color: #333333;
  }

  .right-content {
    position: absolute;
    top: 48px;
    width: 100%;
    height: calc(100% - 48px);
    overflow-y: auto;
    line-height: 14px;

    .right-item {
      display: flex;
      padding: 10px 0;
      font-size: 12px;

      div {
        flex: 1;
        text-align: right;
        color: #999999;

      }

      span {
        color: #595959;
        flex: 3;
        word-break: break-all;
      }
    }
  }
}

.slide-enter-active {
  animation: rightOpen 0.3s ease;
}

.slide-leave-active {
  animation: rightClose 0.3s ease;
}

@keyframes rightOpen {
  0% {
    transform: translateX(385px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes rightClose {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(385px);
  }
}
</style>
