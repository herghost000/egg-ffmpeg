<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="form"
             class="demo-form-inline">
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
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="ID"
                       width="180"
                       prop="id">
      </el-table-column>
      <el-table-column label="日期"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名"
                       width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapActions } from 'vuex'

export default {
  directives: {
    waves
  },
  data () {
    return {
      types: [],
      currentPage4: 1,
      form: {
        name: '',
        type_id: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      query: {
        offset: 0,
        limit: 5,
        total: 0
      },
      listData: [],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 1,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 1,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.queryType().then(res => {
      this.types = res.data.rows
    })
    this.getList()
  },
  methods: {
    ...mapActions({ queryType: 'QueryType', queryVideoList: 'QueryVideoList' }),
    getList () {
      this.listLoading = true
      console.log(this.form)
      this.queryVideoList({
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
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
</style>
