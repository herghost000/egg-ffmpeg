<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name"
                  placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type_id"
                   placeholder="请选择类型">
          <el-option v-for="item in types"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData"
              size="mini"
              v-loading="listLoading"
              style="width: 100%">
      <el-table-column label="ID"
                       align="center"
                       width="80px"
                       prop="id">
      </el-table-column>
      <el-table-column label="封面"
                       align="center">
        <template slot-scope="scope">
          <img class="surface_plot"
               :src="scope.row.surface_plot"
               alt="">
        </template>
      </el-table-column>
      <el-table-column label="类型"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.type_id && scope.row.video_type">
            {{scope.row.video_type.name}}
          </template>
          <template v-else>
            未选择
          </template>
        </template>
      </el-table-column>
      <el-table-column label="视频"
                       align="center"
                       prop="name">
      </el-table-column>
      <el-table-column label="描述"
                       align="center"
                       prop="dsc">
      </el-table-column>
      <el-table-column label="转码路径"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.decode_id && scope.row.video_decode.trans_path">
            <el-popover placement="top-start"
                        title="转码路径"
                        trigger="hover"
                        :content="scope.row.video_decode.trans_path">
              <el-button slot="reference"
                         v-clipboard:copy="scope.row.video_decode.trans_path"
                         v-clipboard:success="clipboardSuccess"
                         size="mini"
                         icon="el-icon-view"
                         class="operate-btn">复制</el-button>
            </el-popover>
          </template>
          <template v-else>
            未转码
          </template>
        </template>
      </el-table-column>
      <el-table-column label="切片路径"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.decode_id && scope.row.video_decode.chunk_path">
            <el-popover placement="top-start"
                        title="切片路径"
                        trigger="hover"
                        :content="scope.row.video_decode.chunk_path">
              <el-button slot="reference"
                         v-clipboard:copy="scope.row.video_decode.chunk_path"
                         v-clipboard:success="clipboardSuccess"
                         size="mini"
                         icon="el-icon-view"
                         class="operate-btn">复制</el-button>
            </el-popover>
          </template>
          <template v-else>
            未转码
          </template>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.decode_id && scope.row.video_decode.status_id">
            {{scope.row.video_decode.video_decode_statu.name}}
          </template>
          <template v-else>
            等待
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="100px">
        <template slot-scope="scope">
          <el-button size="mini"
                     class="operate-btn"
                     icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     class="operate-btn"
                     icon="el-icon-refresh"
                     @click="handleTransAndChunk(scope.$index, scope.row)">转切</el-button>
          <el-button size="mini"
                     class="operate-btn"
                     icon="el-icon-share"
                     @click="handleShare(scope.$index, scope.row)">分享</el-button>
          <el-button size="mini"
                     type="danger"
                     class="operate-btn"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="query.currentPage"
                   :page-sizes="[5,10, 20, 30, 40]"
                   :page-size="query.limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="query.total">
    </el-pagination>
    <el-dialog title="分享链接"
               :visible.sync="dialogShareVisible">
      <el-form ref="form"
               label-position="top"
               size="mini"
               :model="formShare"
               label-width="120px">
        <el-form-item label="封面链接">

          <el-alert :closable="false"
                    :title="`${videoSettingData.host}${formShare.surface_plot}`"
                    type="info">
          </el-alert>
        </el-form-item>
        <el-form-item label="合图链接">

          <el-alert :closable="false"
                    :title="`${videoSettingData.host}/video/thumb/${formShare.id}`"
                    type="info">
          </el-alert>
        </el-form-item>
        <el-form-item label="视频链接">

          <el-alert :closable="false"
                    :title="`${videoSettingData.host}/video/play/${formShare.chunk_path}`"
                    type="info">
          </el-alert>
        </el-form-item>
        <el-form-item label="分享链接">

          <el-alert :closable="false"
                    :title="`${videoSettingData.host}/video/share/${formShare.id}`"
                    type="info">
          </el-alert>
        </el-form-item>
        <el-form-item label="iframe链接">
          <el-alert :closable="false"
                    :title='`<iframe src="
                    ${videoSettingData.host}/video/share/${formShare.id}"
                    height="500"
                    width="600"
                    frameborder="0"
                    allowfullscreen></iframe>`'
                    type="info">
          </el-alert>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { encrypt } from '@/utils/rsa'
import { aesEncrypt } from '@/utils'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapActions, mapGetters } from 'vuex'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  name: 'VideoMovies',
  directives: {
    clipboard,
    waves
  },
  data () {
    return {
      listLoading: false,
      types: [],
      currentPage4: 1,
      form: {
        name: '',
        type_id: ''
      },
      query: {
        offset: 0,
        limit: 5,
        total: 0,
        currentPage: 1,
      },
      listData: [],
      searchInterval: null,
      dialogShareVisible: false,
      formShare: {}
    }
  },
  computed: {
    ...mapGetters(['videoSettingData'])
  },
  created () {
    this.querySetting()
    this.queryType().then(res => {
      this.types = res.data.rows
    })
    this.getList()
    this.searchInterval = setInterval(() => {
      this.handleQueryVideoList()
    }, 5000);
  },
  destroyed () {
    clearInterval(this.searchInterval)
  },
  methods: {
    ...mapActions(['destroy']),
    ...mapActions({ querySetting: 'QuerySetting', queryType: 'QueryType', queryVideoList: 'QueryVideoList', transcode: 'Transcode' }),
    getList () {
      this.listLoading = true
      this.handleQueryVideoList()
    },
    handleQueryVideoList () {
      this.queryVideoList({
        ...this.query,
        ...this.form
      }).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.listData = Object.deepClone(data.rows)
          this.query.total = data.count
          this.listData.map(v => {
            this.$set(v, 'edit', false)
            v.originalName = v.name
            return v
          })
        }
        this.listLoading = false
      })
    },
    handleSizeChange (val) {
      this.query.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.query.offset = (val - 1) * this.query.limit
      this.getList()
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listData.splice(index, 1)
        this.destroy(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleTransAndChunk (index, row) {
      this.transcode({
        id: row.id
      }).then(res => {
        const { data, message } = res
        console.log(data)
        if (data) {
          this.$message({
            message,
            type: 'success',
          })
        } else {
          this.$message({
            message,
            type: 'error',
          })
        }
      })
    },
    handleShare (index, row) {
      this.dialogShareVisible = true
      let chunk_path = ''
      let path = ''
      if (row.video_decode) {
        chunk_path = row.video_decode.chunk_path || ''
        path = chunk_path.split('/').splice(2).join('/')
      }

      this.formShare = { ...row, id: aesEncrypt(encrypt(`${row.id}`), 'id') }
      this.formShare.chunk_path = path
    },
    clipboardSuccess () {
      this.$message({
        message: '视频地址复制成功',
        type: 'success',
      })
    },
    onSubmit () {
      console.log('submit!');
    },
    onSearch () {
      this.getList()
    }
  }
}
</script>
<style scoped>
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.surface_plot {
  width: 100px;
  transition: all 0.2s linear;
}
.surface_plot:hover {
  /* transform: scale(1.5, 1.5);
    filter: contrast(150%); */
}
.el-alert {
  word-break: break-all;
}
</style>
