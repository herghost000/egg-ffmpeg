<template>
  <div class="app-container">
    <el-form ref="formUser"
             :model="formUser"
             size="small"
             label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="账号">
            <el-input v-model="formUser.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-input-number v-model="formUser.age"
                             controls-position="right"
                             :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="用户组">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities"
                           @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data () {
    return {
      formUser: {
        name: '',
        age: null
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style scoped>
</style>