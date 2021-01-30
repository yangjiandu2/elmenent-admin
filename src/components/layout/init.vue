<template>
  <div class="init">
    <NavBar
      :backgroundColor="variables.menuBg"
      :textColor="variables.menuText"
    ></NavBar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <HeaderBar></HeaderBar>
      <!-- 面包屑导航栏 -->
      <TagBar></TagBar>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "./headerBar";
import NavBar from "./navBar";
import TagBar from "./tagBar";
import Event from "../../util/Event";
import variables from "@/style/variables.less";
import { mapState } from "vuex";
export default {
  // 组建的名称
  title: "",
  name: "init",
  props: {},
  // 组建刷新
  inject: ["reload"],
  computed: {
    key() {
      return this.$route.path;
    },
  },
  components: { HeaderBar, TagBar, NavBar },
  data() {
    return {
      tagsList: [],
      collapse: false,
      variables,
    };
  },
  // 初始化记载
  created() {
    let vue = this;
    Event.$on("collapse", (msg) => {
      this.collapse = msg;
    });
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    Event.$on("tags", (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
    Event.$on("setTheme", (res) => {
      if (!res) {
        variables.menuBg = "#fff";
        variables.menuText = "#000";
        this.$notify({
          title: "提示",
          message: "进入白天模式！",
          type: "success",
        });
      } else {
        variables.menuBg = "#304156";
        variables.menuText = "#bfcbd9";
        this.$notify({
          title: "提示",
          message: "进入黑暗模式！",
          type: "success",
        });
      }
    });
  },
  // DOM加载完毕执行操作
  mounted() {},
  // 事件处理
  methods: {},
  // 离开路由的操作
  destroyed() {},
};
</script>

<style scoped lang='less'>
.init {
  height: 100%;
  display: flex;
}
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}
.content-collapse {
  left: 65px;
}
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
