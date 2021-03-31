<!-- 
注释区域
 -->
<template>
  <div>
      项目首页
      <p></p>
      <el-button type="primary" icon="el-icon-upload"  @click="imagecropperShow=true">
      选择头像
    </el-button>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper/index'
export default {
  components: { ImageCropper },
  data () {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    };
  },
  mounted(){},

  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}

</script>
<style lang='scss' scoped>
</style>