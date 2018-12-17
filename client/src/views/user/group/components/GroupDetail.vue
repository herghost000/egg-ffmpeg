<template>
  <el-dialog :title="isEdit?'分组编辑':'分组创建'"
             :visible.sync="dialogVisible"
             @closed="dialogClosed"
             class="dialog">
    <el-form ref="form"
             :model="form"
             label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="form.name"
                  placeholder="请输入分组名称"></el-input>
      </el-form-item>
      <el-form-item label="所属组">
        <el-cascader :props="{value: 'id',label: 'name'}"
                     :show-all-levels="false"
                     :options="menuOptions"
                     v-model="menuSelected"
                     @change="onMenuChange"
                     placeholder="试试搜索 ：)"
                     filterable
                     clearable></el-cascader>
      </el-form-item>
      <el-form-item label="角色">
        <el-transfer filterable
                     :props="{label: 'name',key: 'id'}"
                     :titles="['未选角色', '已选角色']"
                     :filter-method="filterMethod"
                     filter-placeholder="请输入角色拼音"
                     v-model="roleids"
                     :data="authdata">
        </el-transfer>
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
  name: 'GroupDetail',
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
      default: function () { return {} }
    }
  },
  watch: {
    source: {
      deep: true,
      handler (value) {
        const { user_roles = {} } = value
        this.form = value
        this.roleids = user_roles.map(item => {
          return item.id
        })
      }
    },
  },
  data () {
    return {
      form: {
        name: '',
        pid: null
      },
      authdata: [],
      roleids: [],
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
    this.queryUserRole().then(res => {
      const { data: { rows = [] } } = res
      this.authdata = rows
    })
    this.queryUserGroup().then(res => {
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
    ...mapActions({ queryUserRole: 'QueryUserRole', queryUserGroup: 'QueryUserGroup', createUserGroup: 'CreateUserGroup', updateUserGroup: 'UpdateUserGroup' }),
    onMenuChange (value) {
      this.form.pid = this.menuSelected[1]
    },
    onCreateClick () {
      this.createUserGroup({
        ...this.form,
        roleids: this.roleids
      }).then((res) => {
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
    onUpdateClick () {
      this.updateUserGroup({
        ...this.form,
        roleids: this.roleids
      }).then((res) => {
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
    dialogClosed () {
      if (!this.isEdit) {
        this.form = {
          name: ''
        }
        this.roleids = []
      }
    },
    filterMethod (query, item) {
      return item.name.indexOf(query) > -1
    },
  }
}
</script>
<style scoped>
.dialog >>> .el-dialog {
  min-width: 280px;
  max-width: 578px;
}
</style>
<style scoped lang="scss">
</style>
