<template>
  <div>
    <div class="pan-btn small primary-btn"
         @click="handleClick">
      点击上传
    </div>
    <input @change="handleChange"
           class="upload-btn__inner"
           ref="input"
           type="file" />
    <el-progress :percentage="percentage"
                 :status="status"
                 v-show="showProgress"></el-progress>
    <div class="upload-list"
         v-show="showList">
      <i class="el-icon-document"></i>
      <span class="name">55558.png</span>
      <i class="success el-icon-circle-check"></i>
      <i class="close el-icon-close"
         @click="handleRemove"></i>
    </div>
  </div>
</template>

<script>
import { uploadVideo } from '@/api/video/upload'
export default {
  name: "VideoUpload",
  props: {
    disabled: Boolean,
    onSuccess: Function,
    onRemove: Function,
  },
  data () {
    return {
      status: '',
      percentage: 0,
      showProgress: false,
      showList: false
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleRemove () {
      this.onRemove && this.onRemove()
      this.showList = false
    },
    async handleChange (e) {
      const file = e.target.files[0]
      if (!file) {
        return void 0
      }
      const vm = this
      let name = file.name, //文件名
        size = file.size, //总大小
        succeed = 0, //当前上传数
        shardSize = 1 * 1024 * 1024,
        shardCount = Math.ceil(size / shardSize), key = '';

      function upload (item) {
        return new Promise((resolve, reject) => {
          var i = item;
          var start = i * shardSize,
            end = Math.min(size, start + shardSize);

          var form = new FormData();
          form.append("name", name);
          form.append("total", shardCount);
          form.append("index", i + 1);
          key && form.append("key", key);
          form.append("file", file.slice(start, end), name);

          uploadVideo(form).then(res => {
            succeed++;
            const { data } = res

            if (data.complate) {
              vm.onSuccess && vm.onSuccess(data)
            } else {
              key = data.key
            }
            vm.percentage = Math.round(succeed / shardCount * 100)
            resolve()
          }).catch(e => {

          })
        })
      }
      this.showProgress = true
      for (let item = 0; item < shardCount; ++item) {
        await upload(item);
      }
      this.showProgress = false
      this.showList = true
    },
  }
}
</script>

<style lang="css" scoped>
.upload-btn__inner {
    display: none !important;
}
.upload-list {
    position: relative;
    padding-right: 40px;

    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
}
.upload-list .name {
}
.upload-list:hover {
    color: #409eff;
    cursor: pointer;
    background-color: #f5f7fa;
}
.upload-list:hover .close {
    display: inline-block;
}
.upload-list:hover .success {
    display: none;
}
.upload-list .success {
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    color: #67c23a;
}
.upload-list .close {
    display: none;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
}
</style>