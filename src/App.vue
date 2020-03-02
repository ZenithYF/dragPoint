<template>
    <div id="app">
      <div class="menu">
        <!-- <el-select v-model="page" @change='changeRoute'>
            <el-option v-for="(item, i) in options" 
            :key='i' :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->
      </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                options: [
                    { label: 'map', value: 1 },
                    { label: 'drag', value: 2 },
                ],
                page: '',
            }
        },
        components: {

        },
        created() { },
        mounted() {

        },



        methods: {
            changeRoute: function () {
                this.$router.push({ path: '/map' })
            }

        },

        watch: {}
    }
</script>


<style scoped lang="scss">
#home{

}
</style>
<style lang="scss">

</style>