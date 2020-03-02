import Vue from 'vue'
import Router from 'vue-router'
import map from '@/components/map'
import dragPoint from '@/components/dragPoint'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'index',
            component: () =>
                import ('@/components/home.vue'),
            children: [{
                    path: 'map',
                    component: () =>
                        import ('@/components/map.vue'),
                    meta: { title: '1', keepAlive: false }
                }, {
                    path: 'drag',
                    component: () =>
                        import ('@/components/dragPoint'),
                    meta: { title: '2', keepAlive: false }
                },
                {
                    path: 'force',
                    component: () =>
                        import ('@/components/forceDrag'),
                    meta: { title: '3', keepAlive: false }
                },


            ]
        },
        {
            path: '/map',
            component: () =>
                import ('@/components/map.vue'),

        },

        {
            path: '/drag',
            component: () =>
                import ('@/components/dragPoint'),

        },
        {
            path: '/force',
            component: () =>
                import ('@/components/forceDrag'),

        },

    ]

})