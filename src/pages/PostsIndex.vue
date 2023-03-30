<script>
import axios from 'axios';
import PostCard from '../components/PostCard.vue'

export default {
    name: 'PostsIndex',
    components: {
        PostCard,
    },
    data() {
        return {
            posts: [],
            currentPage: 1,
            lastPage: 1
        };
    },
    created() {
        this.getPosts();
    },
    methods: {
        changePage(page) {
            this.currentPage = page;

            this.getPosts();
        },
        getPosts() {
            axios
                .get('http://127.0.0.1:8000/api/posts', {
                    params: {
                        page: this.currentPage
                    }
                })
                .then(response => {
                    console.log(response.data);

                    this.posts = response.data.posts.data;
                    this.lastPage = response.data.posts.last_page;
                });
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row g-3 mb-4">
            <div v-for="post in posts" class="col-12 col-sm-4 col-md-3">
                <PostCard :post="post" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <nav class="d-flex justify-content-center">
                    <ul class="pagination">
                        <li class="page-item" v-for="i in lastPage">
                            <button class="page-link" :class="{
                                active: currentPage == i
                            }" @click="changePage(i)">
                                {{ i }}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>