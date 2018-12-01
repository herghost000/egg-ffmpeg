<template>
  <el-dialog :title="isEdit?'菜单编辑':'菜单创建'"
             :visible.sync="dialogVisible">
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"
                  placeholder="事例：视频管理"></el-input>
      </el-form-item>
      <el-form-item label="路由路径">
        <el-input v-model="form.name"
                  placeholder="事例：/video"></el-input>
      </el-form-item>
      <el-form-item label="路由路径">
        <el-input v-model="form.name"
                  placeholder="事例：/video"></el-input>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="form.name"
                  placeholder="事例：Video"></el-input>
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="form.name"
                  placeholder="事例：views/layout/Layout"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.name"
                  placeholder="事例：example"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序">
        <el-input-number v-model="form.sort" controls-position="right" @change="handleChange" :min="1"></el-input-number>
        
      </el-form-item>
      <el-form-item label="所属菜单">
        <el-cascader :props="{value: 'id',label: 'title'}"
                     :show-all-levels="false"
                     :options="menuOptions"
                     v-model="menuSelected"
                     @change="onMenuChange"
                     placeholder="试试搜索 ：)"
                     filterable
                     clearable></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button v-if="isEdit"
                 type="primary"
                 @click="dialogVisible = false">更 新</el-button>
      <el-button v-else
                 type="primary"
                 @click="onCreateClick">创 建</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MenuDetail',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: null,
        menuid: null,
        sort: 1
      },
      menuSelected: [],
      menuOptions: []
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
  },
  created () {
    this.queryUserMenu().then(res => {
      const { data: { rows = [] } } = res
      this.menuOptions = rows.filter(_ => !_.pid)
    })
  },
  methods: {
    ...mapActions({ queryUserMenu: 'QueryUserMenu' }),
    handleMenu (value) {
      console.log(value)
    },
    onMenuChange (value) {
      this.form.menuid = this.menuSelected[1]
    },
    onCreateClick () {
      console.log(this.form)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
