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
        <el-input v-model="form.url"
                  placeholder="事例：/video"></el-input>
      </el-form-item>
      <el-form-item label="定向路径">
        <el-input v-model="form.redirect"
                  placeholder="事例：/video/setting"></el-input>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="form.title"
                  placeholder="事例：Video"></el-input>
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="form.component"
                  placeholder="事例：views/layout/Layout"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.icon"
                  placeholder="事例：example"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序">
        <el-input-number v-model="form.sort" controls-position="right" :min="1"></el-input-number>
        
      </el-form-item>
      <el-form-item label="所属菜单">
        <el-cascader :props="{value: 'id',label: 'title'}"
                     :show-all-levels="false"
                     :options="menuOptions"
                     v-model="menuSelected"
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
  name: 'MenuDetail',
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
  data () {
    return {
      form: {
        name:'',
        url:'',
        component:'',
        redirect:'',
        title:'',
        icon:'',
        pid:null,
        sort:1,
      },
      menuSelected: [],
      menuOptions: [],
    }
  },
  watch: {
    menuSelected:{
      deep: true,
      handler(value) {
        this.form.pid = value[0]
      }
    },
    source:{
      deep: true,
      handler(value) {
        this.form = value
        this.menuSelected = [value.pid]
      }
    },
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
    ...mapActions({ queryUserMenu: 'QueryUserMenu',createUserMenu:'CreateUserMenu', updateUserMenu: 'UpdateUserMenu' }),
    onCreateClick () {
      this.createUserMenu(this.form).then((res)=>{
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
      console.log(this.form)
      this.updateUserMenu(this.form).then((res)=>{
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
