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
export default {
  name: 'UserRoleCheck',
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      allData: [],
      checkAll: false,
      options: [],
      isIndeterminate: true,
    }
  },
  computed: {
    checkedOptions: {
      get () {
        return [...this.value]
      },
      set (val) {
        this.$emit('input', [...val])
      }
    }
  },
  created () {
    this.queryUserRole().then(res => {
      const { rows } = res.data
      rows.forEach(element => {
        this.allData.push(element.id)
      });
      this.options = rows
    })
  },
  methods: {
    ...mapActions({ queryUserRole: 'QueryUserRole' }),
    handleCheckAllChange (val) {
      this.checkedOptions = val ? this.allData : [];
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
