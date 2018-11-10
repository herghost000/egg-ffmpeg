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
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
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
export default {
  data () {
    return {
      currentPage4: 4,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      form: {
        name: '',
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit () {
      this.$message('submit!')
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
</style>

