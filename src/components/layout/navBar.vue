<template>
  <div class="navBar">
    <head-logo :backgroundColor="backgroundColor" :textColor="textColor" />
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.children">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i
              ><span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children"
                :index="subItem.path"
                :key="subItem.path"
              >
                <template slot="title">
                  <i :class="subItem.icon"></i
                  ><span slot="title">{{ subItem.name }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.children"
                  :key="i"
                  :index="threeItem.path"
                >
                  <template slot="title">
                    <i :class="threeItem.icon"></i
                    ><span slot="title">{{ threeItem.name }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.path">
                <template slot="title">
                  <i :class="subItem.icon"></i
                  ><span slot="title">{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="setTheme" @click="toggleTheme">
      <svg
        t="1611990931303"
        v-if="highlighTheme"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="23403"
        width="30"
        height="30"
      >
        <path
          d="M754.816 968.96H258.688c-112.64 0-203.904-91.264-203.904-203.904V269.056c0-112.64 91.264-203.904 203.904-203.904h496c112.64 0 203.904 91.264 203.904 203.904v496c0.128 112.64-91.264 203.904-203.776 203.904z"
          fill="#5855CE"
          p-id="23404"
        ></path>
        <path
          d="M718.848 579.712c8.192-5.888 19.584 2.56 16 12.032-33.28 89.472-119.68 153.344-221.184 153.344-130.048 0-235.776-105.472-235.776-235.776 0-99.456 61.696-184.704 148.864-219.264 9.856-3.84 19.072 6.912 13.056 15.488-26.24 37.888-39.936 85.248-34.304 135.936 9.6 86.784 77.44 158.976 163.712 173.056 55.936 9.216 108.672-5.248 149.632-34.816z"
          fill="#FFFFFF"
          p-id="23405"
        ></path>
      </svg>
      <svg
        t="1611991019692"
        class="icon"
        v-else
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="24015"
        width="30"
        height="30"
      >
        <path
          d="M728.064 573.44a164.864 164.864 0 1 0-164.864 164.864 164.864 164.864 0 0 0 164.864-164.864z"
          fill="#F4CA1C"
          p-id="24016"
        ></path>
        <path
          d="M512.5632 771.584a258.43712 258.43712 0 1 1 258.43712-258.43712A258.72896 258.72896 0 0 1 512.5632 771.584z m0-448.86016a190.42816 190.42816 0 1 0 190.4128 190.40256 190.63808 190.63808 0 0 0-190.4128-190.42304z m1.13664-128.67584a34.00192 34.00192 0 0 1-34.00192-34.00704V95.44704a34.00704 34.00704 0 0 1 68.00896 0V160.0512a34.00704 34.00704 0 0 1-34.00704 33.9968z m0 768.512a34.00192 34.00192 0 0 1-34.00192-34.00192V863.9488a34.00704 34.00704 0 1 1 68.00896 0v64.60928a34.00192 34.00192 0 0 1-34.00704 34.00192z m414.85824-416.55296H863.9488a34.00704 34.00704 0 1 1 0-68.00896h64.60928a34.00704 34.00704 0 0 1 0 68.00896z m-768.512 0H95.44704a34.00704 34.00704 0 0 1 0-68.00896H160.0512a34.00704 34.00704 0 0 1 0 68.00896z m600.81664-248.86784a34.00192 34.00192 0 0 1-24.064-58.04544l45.69088-45.68576a34.00192 34.00192 0 0 1 48.08192 48.08704L784.896 287.1808a33.88416 33.88416 0 0 1-24.03328 9.9584zM217.45152 840.5504a34.00704 34.00704 0 0 1-24.064-58.05568l45.68576-45.68064a34.00704 34.00704 0 1 1 48.10752 48.08192l-45.68576 45.68064a33.91488 33.91488 0 0 1-24.04352 9.97376z m589.10208 0a33.90976 33.90976 0 0 1-24.0384-9.9584l-45.696-45.696a34.00704 34.00704 0 1 1 48.08704-48.09728l45.68576 45.68064a34.00704 34.00704 0 0 1-24.04352 58.07104zM263.13728 297.1392a33.88416 33.88416 0 0 1-24.064-9.96352l-45.68576-45.68576a34.00192 34.00192 0 1 1 48.08704-48.08192L287.1808 239.104a34.00192 34.00192 0 0 1-24.04352 58.0352z"
          fill="#595BB3"
          p-id="24017"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Event from "@/util/Event";
import router from "@/router/index";
export default {
  // 组建的名称
  title: "",
  name: "navBar",
  computed: {
    onRoutes() {
      return this.$route.path;
    },
  },
  props: {
      backgroundColor:{
          type:String,
          default:'#fff'
      },
      textColor:{
          type:String,
          default:'#000'
      },
      activeTextColor:{
          type:String,
          default:'#409EFF'
      }
  },
  components: {
    HeadLogo: () => import("./logo"),
  },
  // 组建刷新
  inject: ["reload"],
  data() {
    return {
      collapse: false,
      highlighTheme: true,
      items: [],
    };
  },
  // 初始化记载
  created() {
    this.items = router.options.asyncRoute;
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    Event.$on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
  // 事件处理
  methods: {
    //   切换主题
    toggleTheme() {
        this.highlighTheme = !this.highlighTheme
        Event.$emit("setTheme", this.highlighTheme);
    },
  },
  // 离开路由的操作
  destroyed() {},
};
</script>

<style scoped lang='less'>
.navBar {
  position: relative;
  .setTheme {
    position: absolute;
    bottom: 20px;
    left: 10px;
    svg {
      cursor: pointer;
    }
  }
  ul {
    height: calc(100% - 70px);
  }
  /deep/ .el-menu-item:hover,
  /deep/ .el-submenu__title:hover {
    background-color: rgba(24, 144, 255, 0.1) !important;
    color: #409eff !important;
    i {
      color: #409eff !important;
    }
  }
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar > ul {
    height: 100%;
  }
}
</style>
