<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="form">
      <el-form-item label="用户名称">
        <el-input v-model="form.name"
                  placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSearch">查询</el-button>
        <el-button type="primary"
                   @click="onCreate">创建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData"
              v-loading="listLoading"
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID">
      </el-table-column>
      <el-table-column label="分组">
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
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     icon="el-icon-setting"
                     class="operate-btn"
                     @click="confirmEdit(scope.row)"></el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     class="operate-btn"
                     @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5,10, 20, 30, 40]"
                   :page-size="query.limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="query.total">
    </el-pagination>
    <group-detail v-model="visible" :is-edit="false"></group-detail>
    <group-detail v-model="visibleEdit" :is-edit="true" :source="sourceEdit"></group-detail>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { deepClone } from '@/utils/index'
import GroupDetail from './components/GroupDetail'

export default {
  components: { GroupDetail },
  data () {
    return {
      listLoading: false,
      currentPage: 1,
      listData: [],
      form: {
        name: '',
      },
      query: {
        offset: 0,
        limit: 5,
        total: 0
      },
      visible: false,
      visibleEdit: false,
      sourceEdit: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions({ queryUserGroup: 'QueryUserGroup', createUserGroup: 'CreateUserGroup', updateUserGroup: 'UpdateUserGroup', destoryUserGroup: 'DestoryUserGroup' }),
    getList () {
      this.listLoading = true
      this.queryUserGroup({
        ...this.query,
        ...this.form
      }).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.listData = Object.deepClone(data.rows)
          this.query.total = data.count
          this.listData.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.originalName = v.name //  will be used when user click the cancel botton
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
    cancelEdit (row) {
      row.name = row.originalName
      row.edit = false
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
    },
    confirmEdit (row) {
      this.sourceEdit = row
      this.visibleEdit = true
    },
    handleDelete (index, row) {

      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listData.splice(index, 1)
        this.destoryUserGroup(row)
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
    async onSubmit () {

    },
    onSearch () {
      this.getList()
    },
    onCreate() {
      this.visible = true
    }
  }
}
</script>
<style scoped>
</style>
