<template>
  <el-dialog :title="isEdit?'角色编辑':'角色创建'"
             :visible.sync="dialogVisible"
             @closed="dialogClosed"
             class="dialog">
    <el-form ref="form"
             :model="form"
             label-width="40px">
      <el-form-item label="名称">
        <el-input v-model="form.name"
                  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-transfer filterable
                     :props="{label: 'name',key: 'id'}"
                     :titles="['未选权限', '已选权限']"
                     :filter-method="filterMethod"
                     filter-placeholder="请输入权限拼音"
                     v-model="authids"
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
  name: 'RoleDetail',
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
        const { user_auths = {} } = value
        this.form = value
        this.authids = user_auths.map(item => {
          return item.id
        })
      }
    },
  },
  data () {
    return {
      form: {
        name: '',
      },
      authdata: [],
      authids: []
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
    this.queryUserAuth().then(res => {
      const { data: { rows = [] } } = res
      this.authdata = rows
    })
  },
  methods: {
    ...mapActions({ queryUserAuth: 'QueryUserAuth', createUserRole: 'CreateUserRole', updateUserRole: 'UpdateUserRole' }),
    filterMethod (query, item) {
      return item.name.indexOf(query) > -1
    },
    onCreateClick () {
      this.createUserRole({
        ...this.form,
        authids: this.authids
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
      this.updateUserRole({
        ...this.form,
        authids: this.authids
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
        this.authids = []
      }
    }
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
