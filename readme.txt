mounted() {
    console.group("%c%s", "color:red", 'mount');
    console.log("%c%s", "color:red", this.$el);
    console.log("%c%s", "color:red", this.$data);
    console.log("%c%s", "color:red", this.message);
    this.getdata()
  },
  beforeUpdate() {
    console.group("%c%s", "color:red", 'beforeUpdate');
    console.log("%c%s", "color:red", this.$el);
    console.log("%c%s", "color:red", this.$data);
    console.log("%c%s", "color:red", this.message);
    console.log("%c%s", "color:red", document.getElementById('container').innerHTML);
  },
  updated() {
    console.group("%c%s", "color:red", 'updated');
    console.log("%c%s", "color:red", this.$el);
    console.log("%c%s", "color:red", this.$data);
    console.log("%c%s", "color:red", this.message);
    console.log("%c%s", "color:red", document.getElementById('container').innerHTML);
  },
  methods: {
    changeMsg() {
      this.message='abc'
    },
    getdata() {
      this.$axios.get('/api/getdata').then((response) => {
            console.log(response.data)
           }).catch((response) => {
            console.log(response)
           })
    }
  }
  
  
  
router.beforeEach((to, from, next) => {
  if (to.meata.requireAuth) {
      if (token) {
          next()
      }
      else {
          next({
              path:'/login',
              query:{redirect:to.fullPath}
          })
      }
  }
  
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})



axios.interceptors.request.use(
    (config) => {
    if ( config.method === 'post'){
        
      config.data = qs.stringify(config.data)
    }
    config.headers.common['token']='abc'
    // 在发送请求之前做些什么
    return config
    }, (error) => {
     Message({
       showClose:Ture,
       message: error && error.data.error.message,
       type:'error' 
     })
    // 对请求错误做些什么
    return Promise.reject(error.data.error.message)
  })
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
     if (error.response) {
         switch (error.response.status) {
             case 401:
                store.commit(types.LOGOUT)
         }
     }
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  
  
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;



position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  button: 0


<el-container>
      <el-header>
        <HeaderLy/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
       <el-main>
         
         <router-view></router-view>
       </el-main>
      </el-container>
    </el-container>
if(this.user.name ==='admin' && this.user.pass ==='123'){


import { use } from 'vue/types/umd'

router.beforeEach((to, from, next) => {
  if (to.meata.requireAuth) {
      if (store.state.token) {
          next()
      }
      else {
          next({
              path:'/login',
              query:{redirect:to.fullPath}
          })
      }
  }
  else {
    next()}
})