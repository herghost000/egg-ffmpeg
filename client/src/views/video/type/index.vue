<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="form">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"
                  placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">添加</el-button>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData"
              v-loading="listLoading"
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column min-width="300px"
                       label="类型">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.name"
                      class="edit-input"
                      size="small" />
            <el-button class="cancel-btn"
                       size="small"
                       icon="el-icon-refresh"
                       type="warning"
                       @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit"
                     type="success"
                     size="small"
                     icon="el-icon-circle-check-outline"
                     @click="confirmEdit(scope.row)">确定</el-button>
          <el-button v-else
                     type="primary"
                     size="small"
                     icon="el-icon-edit"
                     @click="scope.row.edit=!scope.row.edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      listLoading: false,
      currentPage4: 4,
      listData: [],
      form: {
        name: '',
      },
      query: {
        offset: null,
        limit: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions({ queryType: 'QueryType', createType: 'CreateType', updateType: 'UpdateType' }),
    getList () {
      this.listLoading = true
      this.queryType({
        ...this.query,
        ...this.form
      }).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.listData = Object.deepClone(data)
          this.listData.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.originalName = v.name //  will be used when user click the cancel botton
            return v
          })
          this.listLoading = false
        }
      })
    },
    cancelEdit (row) {
      row.name = row.originalName
      row.edit = false
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
    },
    confirmEdit (row) {
      row.edit = false
      row.originalName = row.name
      this.updateType(row).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
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
    async onSubmit () {
      await this.createType(this.form)
      await this.getList()
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
  }
}
</script>

<style scoped>
.line {
    text-align: center;
}
.el-pagination {
    margin-top: 20px;
    text-align: right;
}
.edit-input {
    padding-right: 100px;
}
.cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
}
</style>

