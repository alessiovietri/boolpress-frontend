import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AboutUs from './pages/AboutUs.vue';
import PostsIndex from './pages/PostsIndex.vue';
import PostsShow from './pages/PostsShow.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/chi-siamo',
            name: 'about-us',
            component: AboutUs
        },
        {
            path: '/blog',
            name: 'posts-index',
            component: PostsIndex
        },
        {
            path: '/blog/:slug',
            name: 'posts-show',
            component: PostsShow
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
});

export { router };