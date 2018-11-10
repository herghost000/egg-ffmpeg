<template>
  <div class="app-container">
    <el-form label-width="100px"
             :model="form">
      <el-form-item label="绑定域名">
        <el-input v-model="form.domain"></el-input>
      </el-form-item>
      <el-form-item label="视频分辨率">
        <el-radio-group v-model="form.px">
          <el-radio label="480p"></el-radio>
          <el-radio label="720p"></el-radio>
          <el-radio label="1080p"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="秒切">
        <el-switch v-model="form.q">
        </el-switch>
      </el-form-item>
      <el-form-item label="盗链白名单">
        <el-input type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="form.f1">
        </el-input>
      </el-form-item>
      <el-form-item label="盗链跳转">
        <el-input placeholder="请输入盗链跳转网址"
                  v-model="form.jump">
        </el-input>
      </el-form-item>
      <el-form-item label="防盗链key">
        <el-input placeholder="请输入防盗链key"
                  v-model="form.jump">
        </el-input>
      </el-form-item>
      <el-form-item label="截图数">
        <el-input-number v-model="form.jt"
                         size="mini"
                         :min="1"
                         :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="ts加密">
        <el-switch v-model="form.q">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启api">
        <el-switch v-model="form.q">
        </el-switch>
      </el-form-item>
      <el-form-item label="水印">
        <el-upload :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :before-remove="beforeRemove"
                   :on-exceed="handleExceed"
                   :limit="1"
                   :file-list="fileList"
                   class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>

          <div class="pan-btn small primary-btn">点击上传</div>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div class="pan-btn primary-btn"
             @click="onSubmit">保存</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        domain: '',
        px: '480p',
        q: '',
        f1: '',
        jump: '',
        jt: 0
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSubmit () {
      this.$message('submit!')
    }
  }
}
</script>
<style scoped>
</style>
