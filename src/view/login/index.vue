<template>
<div class="login-content">
    <a-form :model="loginform" :label-col="{ span: 8 }" label-align="right">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="loginform.username" ></a-input>
        </a-form-item>
        <a-form-item label="密  码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="loginform.password"></a-input-password>
        </a-form-item>
        <a-form-item label="验证码" name="code" :rules="[{required:true,message:'请输入验证码'}]" >
            <a-input v-model:value="loginform.code" style="width: 100px;float: left;"></a-input>
            <img style="height: 40px;width: 100px;float: right;" @click="changeImg" :src="img"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 24 }">
            <a-button type="primary" @click="submit" style="width:100%">登录</a-button>
        </a-form-item>
    </a-form>
</div>
</template>

<script setup>
    import { getImage,login } from '../../api/login/index.js'
    import { reactive, ref } from "@vue/reactivity";
    import { getCurrentInstance } from 'vue';
    import { useStore } from 'vuex'
    import {useRouter} from 'vue-router'
    const { proxy } = getCurrentInstance(); 
    const store = useStore() 
    const router = useRouter() 
    const loginform = reactive({
        username:'',
        password:'',
        code:'',
        uuid:''
    })
    const img = ref('')
    function changeImg(){
       getImage().then(res=>{
        img.value = "data:image/gif;base64," + res.img
        loginform.uuid = res.uuid
       })
    }
    // 登录返回token值，记录下来
    function submit(){
        console.log(store);
        store.dispatch('user/Login',loginform).then(res=>{
           router.push({path:'/'}) 
        }).catch(() => {
            changeImg()
        })
    }
    changeImg()
</script>

<style lang="less" scoped>
    .login-content{
        padding-top: 200px;
        width:500px;
        margin:auto
    }
</style>