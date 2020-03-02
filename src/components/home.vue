<template>     
 <div id="home">
     <el-tabs :tab-position="tabPosition"  v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item, i) in tabData" :label="item.label" :key='i' :name="item.path">
          <span class="title">{{item.label}}</span> 
                 
    </el-tab-pane>
     <div class="tablemain_full">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
          </div>
  </el-tabs>

     

 </div>
</template>

<script>
    export default {
        name: 'relation',
        data() {
            return {
                tabPosition:'left',
                activeName:'',
                tabData:[
                    {
                        label:'随机',
                        path:'map'
                    },
                    {
                        label:'拖拽',
                        path:'force'
                    }
                ]
               
            }
        },
        components: {

        },
        created() { },
        mounted() {
   
        },



        methods: {
            handleClick:function(tab,event){
                 this.$router.push({
                    path: '/home/'+this.activeName
                })
            }
         
        },

        watch: {}
    }
</script>

<style scoped lang="scss">
#home{
    .title{
        display: inline-block;
        padding:20px;
        font-size:20px;
        color:#333;
        text-align: center;
    }
}

</style>
<style lang="scss">
#home{
    .el-tabs__content{
        text-align: center;
    }
}

</style>