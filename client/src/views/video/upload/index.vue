<template>
  <div class="app-container">
    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="视频名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="视频分类">
        <el-select v-model="form.region"
                   placeholder="视频分类">
          <el-option label="Zone one"
                     value="shanghai" />
          <el-option label="Zone two"
                     value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面上传">
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
      <el-form-item label="视频上传">
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
               class="el-upload__tip">只能上传视频后缀文件，且不超过1G</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频描述">
        <el-input v-model="form.desc"
                  type="textarea" />
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
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

