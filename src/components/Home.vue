<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" :collapse-transition="false" 
        unique-opened :collapse="isCollapse" router :default-active="$router.history.current.path">
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + childItem.path" v-for="childItem in item.children" :key="childItem.id">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{childItem.authName}}</span>
                </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return {
            menulist: [],
            iconsObj: {
                '125': 'el-icon-user-solid',
                '103': 'el-icon-s-check',
                '101': 'el-icon-s-shop',
                '102': 'el-icon-box',
                '145': 'el-icon-data-line'
            },
            isCollapse: false
        }
    },
    created(){
        this.getMenuList();
    },
    methods: {
        logout() {
        window.sessionStorage.removeItem("token");
        this.$router.push("/login");
        this.$message.success("退出成功！");
        },
        //获取所有菜单
        async getMenuList(){
            const { data: res } = await this.$http.get('menus');
            if(res.meta.status !== 200)
                return this.$message.error(res.meta.msg);
            this.menulist = res.data;
        },
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 20px;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
      border-right: none;
  }
  .toggle-button{
      background-color: #4a5064;
      text-align: center;
      line-height: 24px;
      height: 24px;
      color: #fff;
      letter-spacing: 0.2em;
      font-size: 10px;
      cursor: pointer;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>