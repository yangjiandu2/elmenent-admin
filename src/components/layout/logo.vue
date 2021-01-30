<!-- 
头部logo
 -->
<template>
    <div class="logo" @click="linkToPage" :style="{backgroundColor:backgroundColor,color:textColor}"><img class="logo_circle" :src="photo" alt=""> <span v-show="!collapse"> {{ slogan }} </span> <slot /></div>
</template>

<script>
import Event from "../../util/Event";
import variables from "@/style/variables.less";
export default {
  name: "logo",
  data() {
    return {
      collapse: false,
    };
  },
  computed:{
      variables() {
          return variables
      }
  },
  props: {
    slogan: {
      type: String,
      default: "杨同学",
    },
    photo:{
        type:String,
        default:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110723%2F8001366_104604606173_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614578767&t=0dfe09c52ce48f2c247f3cc36a724a8f'
    },
      backgroundColor:{
          type:String,
          default:'#fff'
      },
      textColor:{
          type:String,
          default:'#000'
      },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    Event.$on("collapse", (msg) => {
      this.collapse = msg;
    });

  },

  methods: {
      linkToPage(){
          this.$router.push('/home')
      },
  },
};
</script>
<style lang='less' scoped>
.logo {
//   width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content:flex-start;
  height:70px;
  padding:0 20px;
  cursor: pointer;
  .logo-pic {
    height: 100%;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    margin: auto;
  }
  .logo_circle {
    width: 40px;
    height: 40px;
    margin-right:10px;
    border-radius: 50%;
  }
}
</style>