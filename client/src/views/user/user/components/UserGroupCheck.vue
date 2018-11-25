<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate"
                 v-model="checkAll"
                 @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedOptions"
                       @change="handleCheckedOptionsChange">
      <el-checkbox v-for="item in options"
                   :label="item.id"
                   :key="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
const allData = [];
export default {
  name: 'UserGroupCheck',
  data () {
    return {
      checkAll: false,
      checkedOptions: [],
      options: [],
      isIndeterminate: true,
    }
  },
  created () {
    this.queryUserGroup().then(res => {
      const { rows } = res.data
      rows.forEach(element => {
        allData.push(element.id)
      });
      this.options = rows
    })
  },
  methods: {
    ...mapActions({ queryUserGroup: 'QueryUserGroup' }),
    handleCheckAllChange (val) {
      this.checkedOptions = val ? allData : [];
      this.isIndeterminate = false;
    },
    handleCheckedOptionsChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    }
  }
}
</script>
<style scoped lang="scss">
.el-checkbox-group {
  margin-left: -10px;
  .el-checkbox {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
