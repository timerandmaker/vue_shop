<template>
    <div>
        this is a home page!!!
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        logout(){
            window.sessionStorage.removeItem('token');
            this.$router.push('/login');
            this.$message.success('退出成功！');
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>