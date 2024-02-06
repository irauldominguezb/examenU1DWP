export default [
    {
        path: '/Users',
        name: 'UserModule',
        component:()=> import("../modules/users/Users.vue"),
        children: [
            {
                path:'saveUser',
                name:'SaveUser',
                component:()=> import("../modules/users/SaveUsers.vue")
            }
        ]
    }
]