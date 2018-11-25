<template>
  <div class="app-container">
    <el-form :model="form"
             label-width="100px">
      <el-form-item label="绑定域名">
        <el-input v-model="form.host"></el-input>
      </el-form-item>
      <el-form-item label="视频分辨率">
        <el-radio-group v-model="form.ratio">
          <el-radio label="480p"></el-radio>
          <el-radio label="720p"></el-radio>
          <el-radio label="1080p"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="秒切">
        <el-switch v-model="form.miaoqie">
        </el-switch>
      </el-form-item>
      <el-form-item label="盗链白名单">
        <el-input v-model="form.antiwhite"
                  type="textarea"
                  autosize
                  placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item label="盗链跳转">
        <el-input v-model="form.antiurl"
                  placeholder="请输入盗链跳转网址">
        </el-input>
      </el-form-item>
      <el-form-item label="防盗链key">
        <el-input v-model="form.antikey"
                  placeholder="请输入防盗链key">
        </el-input>
      </el-form-item>
      <el-form-item label="截图数">
        <el-input-number v-model="form.screenshots"
                         :min="1"
                         :max="10"
                         size="mini"></el-input-number>
      </el-form-item>
      <el-form-item label="ts加密">
        <el-switch v-model="form.tsencry">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启api">
        <el-switch v-model="form.openapi">
        </el-switch>
      </el-form-item>
      <el-form-item label="水印">
        <img v-show="form.watermark"
             :src="form.watermark"
             @error="handleImgError"
             class="watermark"
             alt="">
        <el-upload :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :before-remove="beforeRemove"
                   :on-exceed="handleExceed"
                   :on-success="handleSuccess"
                   :limit="1"
                   :file-list="fileList"
                   action="/api/v2/upload/uploadPic">

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
import { mapActions } from 'vuex'
import { deepClone } from '@/utils/index'

export default {
  data () {
    return {
      initDB: false,
      fileList: [],
      form: {
        antikey: null,
        antiurl: null,
        antiwhite: null,
        created_at: null,
        host: null,
        miaoqie: null,
        openapi: null,
        ratio: null,
        screenshots: null,
        tsencry: null,
        updated_at: null,
        watermark: null
      }
    }
  },
  created () {
    this.querySetting().then(res => {
      if (Object.isEmpty(res.data)) {
        this.initDB = true
      }
      this.form = {
        ...this.form,
        ...deepClone(res.data)
      }
      if (this.form.watermark) {
        var str = this.form.watermark
        var sps = str.split('/')
        var fileName = sps[sps.length - 1]
        this.fileList.push({
          name: fileName,
          url: this.form.watermark
        })
      }
    })
  },
  methods: {
    ...mapActions({ querySetting: 'QuerySetting', createSetting: 'CreateSetting', updateSetting: 'UpdateSetting' }),
    handleRemove (file, fileList) {
      this.form.watermark = null
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleSuccess (response, file, fileList) {
      this.form.watermark = response.data.url
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleImgError () {
      this.form.watermark = null
      this.fileList = []
    },
    onSubmit () {
      if (this.initDB) {
        this.createSetting(this.form).then(res => {
          const { code, message } = res
          if (200 === code) {
            this.$message({
              message: message,
              type: 'success'
            });
          } else {
            this.$message(message)
          }

        })
      } else {
        this.updateSetting(this.form).then(res => {
          const { message } = res
          this.form = res.data
          this.$message({
            message: message,
            type: 'success'
          });
        })
      }
    }
  }
}
</script>
<style scoped>
.watermark {
    max-width: 300px;
}
</style>
