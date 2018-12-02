<template>
  <el-dialog :title="isEdit?'权限编辑':'权限创建'"
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
                 @click="onUpdateClick">更 新</el-button>
      <el-button v-else
                 type="primary"
                 @click="onCreateClick">创 建</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AuthDetail',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default: function() {return {}}
    }
  },
  watch: {
source:{
      deep: true,
      handler(value) {
        const {user_menu = {}} = value
        this.form = value
        this.menuSelected = [user_menu.pid,user_menu.id]
      }
    },
  },
  data () {
    return {
      form: {
        name: null,
        menu_id: null
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
    ...mapActions({ queryUserMenu: 'QueryUserMenu',createUserAuth:'CreateUserAuth',updateUserAuth:'UpdateUserAuth' }),
    onMenuChange (value) {
      this.form.menu_id = this.menuSelected[1]
    },
    onCreateClick () {
      console.log(this.form)
      this.createUserAuth(this.form).then((res)=>{
        this.$message({
          type: 'success',
          message: res.message
        });
        this.dialogVisible = false
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        });
      })
    },
    onUpdateClick() {
      this.updateUserAuth(this.form).then((res)=>{
        this.$message({
          type: 'success',
          message: res.message
        });
        this.dialogVisible = false
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        });
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
