<template>
  <div class="app-container">
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
          <UserGroupCheck></UserGroupCheck>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <el-form-item label="直属角色">
          <UserGroupCheck></UserGroupCheck>
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <el-form-item label="直属权限">
          <UserGroupCheck></UserGroupCheck>
        </el-form-item>
      </el-card>

    </el-form>
  </div>
</template>

<script>
import UserGroupCheck from './UserGroupCheck'
export default {
  name: 'UserDetail',
  components: { UserGroupCheck },
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
      tempRoute: {}
    }
  },
  created () {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.setTagsViewTitle(id)

    } else {

    }

  },
  methods: {
    setTagsViewTitle (id) {
      const title = this.$route.meta.title
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${id}` })
      this.$store.dispatch('updateVisitedView', route)
    }
  }
}
</script>

<style scoped>
.el-alert {
  margin-bottom: 20px;
}
.el-card {
  margin-bottom: 20px;
}
</style>
