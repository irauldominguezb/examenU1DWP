import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component:()=> import("../components/TheWelcome.vue")
    },
    {
        path:"/save-cars",
        name: "SaveUser",
        component: () => import("../modules/Cars/SaveCar.vue")
    },
    {
        path: "/cars",
        component:()=> import("../modules/Cars/Cars.vue"),
    }
]

const router = new VueRouter({routes})
export default router;