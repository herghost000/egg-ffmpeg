<template>
  <div class="app-container">
    <Sticky :zIndex="2"
            class="sticky">
      <div class="sticky-header">
        <div class="pan-btn primary-btn"
             @click="onSumit">
          {{isEdit?'更新':'提交'}}
        </div>
      </div>
    </Sticky>
    <el-form ref="formUser"
             :model="formUser"
             size="small"
             label-width="100px">
      <el-card class="box-card">

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
      </el-card>
      <el-card class="box-card">
        <el-form-item label="用户组">
          <UserGroupCheck v-model="userGroup"></UserGroupCheck>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <el-form-item label="直属角色">
          <UserRoleCheck v-model="userRole"></UserRoleCheck>
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <el-form-item label="直属权限">
          <UserAuthCheck v-model="userAuth"></UserAuthCheck>
        </el-form-item>
      </el-card>

    </el-form>
  </div>
</template>

<script>
import UserGroupCheck from './UserGroupCheck'
import UserRoleCheck from './UserRoleCheck'
import UserAuthCheck from './UserAuthCheck'
import Sticky from '@/components/Sticky'
import { mapActions } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserGroupCheck, UserRoleCheck, UserAuthCheck, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formUser: {
        name: '',
        age: null
      },
      userGroup: [],
      userRole: [],
      userAuth: [],
      tempRoute: {}
    }
  },
  created () {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.editUser({
        id
      }).then(res => {
        this.handleEditData(res.data)
        this.setTagsViewTitle(id)
      })
    } else {

    }

  },
  methods: {
    ...mapActions({ createUser: 'CreateUser', editUser: 'EditUser', updateUser: 'UpdateUser' }),
    handleEditData (data) {
      const { user_groups = [], user_roles = [], user_auths = [] } = this.formUser = {
        ...data
      }
      this.userGroup = [...user_groups.map(item => {
        return item.id
      })]
      this.userRole = [...user_roles.map(item => {
        return item.id
      })]
      this.userAuth = [...user_auths.map(item => {
        return item.id
      })]
    },
    setTagsViewTitle (id) {
      const title = this.$route.meta.title
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    onSumit () {
      const params = {
        ...this.formUser,
        user_groups: Array.from(new Set(this.userGroup)),
        user_roles: Array.from(new Set(this.userRole)),
        user_auths: Array.from(new Set(this.userAuth)),
      }
      if (this.isEdit) {
        this.updateUser(params).then(res => {
          this.$message({
            message: res.message,
            type: 'success',
          })
        }).catch(e => {
          this.$message({
            message: e.message,
            type: 'error',
          })
        })
      } else {
        this.createUser(params).then(res => {
          this.$message({
            message: res.message,
            type: 'success',
          })
        }).catch(e => {
          this.$message({
            message: e.message,
            type: 'error',
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.app-container {
    padding-top: 0;
}
.el-alert {
    margin-bottom: 20px;
}
.el-card {
    margin-bottom: 20px;
}
.sticky {
    margin-bottom: 20px;
}
.sticky-header {
    margin-left: -20px;
    margin-right: -20px;
    padding: 10px 20px;
    /* background-image: linear-gradient(90deg, #a32dd8, #3180fd); */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* color: #fff; */
    text-align: right;
}
</style>
