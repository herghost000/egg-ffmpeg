<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="form"
             size="small">
      <el-form-item label="用户名称">
        <el-input v-model="form.name"
                  placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-search"
                   @click="onSearch">查询</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-plus"
                   @click="onUserCreate">创建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData"
              v-loading="listLoading"
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID">
      </el-table-column>
      <el-table-column label="用户">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户组">
        <template slot-scope="scope">
          <template v-if="scope.row.user_groups && scope.row.user_groups.length">
            <el-tag v-for="group in scope.row.user_groups"
                    :key="group.id">{{group.name}}</el-tag>
          </template>
          <template v-else>
            <el-tag type="warning">未分配</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="直属角色">
        <template slot-scope="scope">
          <template v-if="scope.row.user_roles && scope.row.user_roles.length">
            <el-tag v-for="role in scope.row.user_roles"
                    :key="role.id"
                    type="warning">{{role.name}}</el-tag>
          </template>
          <template v-else>
            <el-tag type="success">未分配</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="直属权限">
        <template slot-scope="scope">
          <template v-if="scope.row.user_auths && scope.row.user_auths.length">
            <el-tag v-for="auth in scope.row.user_auths"
                    :key="auth.id"
                    type="danger">{{auth.name}}</el-tag>
          </template>
          <template v-else>
            <el-tag type="success">未分配</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="注册时间"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.created_at">
            {{scope.row.created_at | formatTime}}
          </template>
          <template v-else>
            未操作
          </template>
        </template>
      </el-table-column>

      <el-table-column label="更新时间"
                       align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.updated_at">
            {{scope.row.updated_at | formatTime}}
          </template>
          <template v-else>
            未操作
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     icon="el-icon-edit-outline"
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { deepClone } from '@/utils/index'

export default {
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
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions({ queryUser: 'QueryUser', createUser: 'CreateUser', updateUser: 'UpdateUser', destoryUser: 'DestoryUser' }),
    getList () {
      this.listLoading = true
      this.queryUser({
        ...this.query,
        ...this.form
      }).then(res => {
        const { data } = res
        if (Object.isNotEmpty(data)) {
          this.listData = Object.deepClone(data.rows)
          this.query.total = data.count
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
    confirmEdit (row) {
      this.$router.push('/user/edit/' + row.id)
    },
    handleDelete (index, row) {

      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listData.splice(index, 1)
        this.destoryUser(row)
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
    onUserCreate () {
      this.$router.push({ name: 'UserCreate' })
    }
  }
}
</script>
<style scoped>
</style>
