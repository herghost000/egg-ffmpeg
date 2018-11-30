<template>
  <el-dialog :title="isEdit?'菜单编辑':'菜单创建'"
             :visible.sync="dialogVisible">
    <el-form ref="form"
             :model="form"
             label-width="40px">
      <el-form-item label="名称">
        <el-input v-model="form.name"
                  placeholder="请输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单">
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
        menuid: null
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
      const pmenus = rows.filter(_ => !_.pid)
      this.menuOptions = pmenus.map(pmenu => {
        const cmenus = rows.filter(menu => pmenu.id === menu.pid)
        cmenus.unshift({
          ...pmenu
        })
        pmenu.children = cmenus
        return pmenu
      })
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
