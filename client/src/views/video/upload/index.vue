<template>
  <div class="app-container">
    <el-carousel :interval="4000"
                 type="card"
                 height="200px">
      <el-carousel-item v-for="item in banners"
                        :key="item.id">
        <img class="banner"
             :src="item.surface_plot"
             alt="">
      </el-carousel-item>
    </el-carousel>
    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="视频名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="视频分类">
        <el-select v-model="form.type_id"
                   placeholder="请选择类型">
          <el-option v-for="item in types"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面上传">
        <img v-show="form.surface_plot"
             :src="form.surface_plot"
             @error="handleImgError"
             class="upload_pic"
             alt="">
        <el-upload :on-preview="handlePicPreview"
                   :on-remove="handlePicRemove"
                   :on-exceed="handleExceed"
                   :on-success="handlePicSuccess"
                   :limit="1"
                   :file-list="picFileList"
                   action="/api/v2/upload/uploadPic">

          <div class="pan-btn small primary-btn">点击上传</div>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频上传">
        <el-upload :on-remove="handleVideoRemove"
                   :on-exceed="handleExceed"
                   :on-success="handleVideoSuccess"
                   :limit="1"
                   :file-list="videoFileList"
                   action="/api/v2/upload/uploadVideo">

          <div class="pan-btn small primary-btn">点击上传</div>
          <div slot="tip"
               class="el-upload__tip">只能上传视频后缀文件，且不超过1G</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频描述">
        <el-input v-model="form.dsc"
                  type="textarea" />
      </el-form-item>
      <el-form-item>
        <div class="pan-btn primary-btn"
             @click="onSubmit">创建</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const defaultData = {
  picFileList: [],
  videoFileList: [],
  types: [],
  form: {
    name: '',
    type_id: '',
    surface_plot: '',
    video_url: '',
    dsc: '',
  },
  *[Symbol.iterator] () {
    for (let key in this) {
      yield [key, Object.deepClone(this[key])];
    }
  }
}

export default {
  data () {
    return {
      picFileList: [],
      videoFileList: [],
      types: [],
      banners: [],
      form: {
        name: '',
        type_id: '',
        surface_plot: '',
        video_url: '',
        dsc: '',
      }
    }
  },
  created () {
    this.queryType().then(res => {
      this.types = res.data.rows
    })
    this.getBanners()
  },
  methods: {
    ...mapActions({ queryType: 'QueryType', createVideoList: 'CreateVideoList', queryVideoList: 'QueryVideoList' }),
    getBanners () {
      this.queryVideoList({
        offset: 0,
        limit: 6,
      }).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.banners = Object.deepClone(data.rows)
        }
      })
    },
    handlePicRemove (file, fileList) {
      this.form.surface_plot = null
    },
    handleVideoRemove (file, fileList) {
      this.form.video_url = null
    },
    handlePicPreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handlePicSuccess (response, file, fileList) {
      this.form.surface_plot = file.response
    },
    handleVideoSuccess (response, file, fileList) {
      this.form.video_url = file.response
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleImgError () {
      this.form.surface_plot = null
      this.fileList = []
    },
    clear (exclude = []) {
      const objs = Object.deepClone(defaultData)
      for (let [k, v] of objs) {
        if (exclude.indexOf(k) === -1) {
          this.$set(this.$data, k, v)
        }
      }
    },
    onSubmit () {
      console.log(this.form)
      this.createVideoList(this.form).then(res => {
        const { code, message, data } = res
        if (Object.isNotEmpty(data)) {
          this.$message({
            message: message,
            type: 'success'
          });
          this.clear(['types'])
        }
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.upload_pic {
  max-width: 300px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}
.el-form {
  margin-top: 10px;
}
.el-carousel__item {
  text-align: center;
}
.banner {
  height: 100%;
}
</style>

