import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

function asyncComponent(path) {
  return () => import('@/' + path + '.vue')
}

/* Layout */
const Layout = asyncComponent('views/layout/Layout')

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '*',
    component: asyncComponent('views/404'),
    hidden: true
  },
  {
    path: '/login',
    component: asyncComponent('views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: 'Index',
    redirect: '/dashboard',
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard'
        },
        component: asyncComponent('views/dashboard/index')
      }
    ]
  },
  // {
  //   path: '/video',
  //   component: Layout,
  //   redirect: '/video/setting',
  //   name: 'Video',
  //   meta: {
  //     title: '视频管理',
  //     icon: 'example'
  //   },
  //   children: [{
  //     path: 'setting',
  //     name: 'VideoSetting',
  //     component: () => import('@/views/video/setting/index'),
  //     meta: {
  //       title: '转码设置',
  //       icon: 'table'
  //     }
  //   },
  //   {
  //     path: 'type',
  //     name: 'VideoType',
  //     component: () => import('@/views/video/type/index'),
  //     meta: {
  //       title: '分类设置',
  //       icon: 'tree'
  //     }
  //   },
  //   {
  //     path: 'upload',
  //     name: 'VideoUpload',
  //     component: () => import('@/views/video/upload/index'),
  //     meta: {
  //       title: '创建视频',
  //       icon: 'form'
  //     }
  //   },
  //   {
  //     path: 'movies',
  //     name: 'VideoMovies',
  //     component: () => import('@/views/video/movies/index'),
  //     meta: {
  //       title: '视频列表',
  //       icon: 'list'
  //     }
  //   }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: asyncComponent('views/user/user/index'),
        meta: {
          title: '用户列表',
          icon: 'user'
        }
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: asyncComponent('views/user/user/create/index'),
        meta: {
          title: '用户创建',
          icon: 'user'
        },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'UserEdit',
        component: asyncComponent('views/user/user/edit/index'),
        meta: {
          title: '用户编辑',
          icon: 'user',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'group',
        name: 'UserGroup',
        component: asyncComponent('views/user/group/index'),
        meta: {
          title: '分组列表',
          icon: 'user'
        }
      },
      {
        path: 'role',
        name: 'UserRole',
        component: asyncComponent('views/user/role/index'),
        meta: {
          title: '角色列表',
          icon: 'user'
        }
      },
      {
        path: 'auth',
        name: 'UserAuth',
        component: asyncComponent('views/user/auth/index'),
        meta: {
          title: '权限列表',
          icon: 'user'
        }
      },
      {
        path: 'menu',
        name: 'UserMenu',
        component: asyncComponent('views/user/menu/index'),
        meta: {
          title: '菜单列表',
          icon: 'user'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
