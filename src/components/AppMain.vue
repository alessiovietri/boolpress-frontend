<script>
import axios from 'axios';

export default {
    name: "AppMain",
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
    <main>
        <div class="container">
            <div class="row mb-4">
                <div class="col">
                    <h1>
                        Boolpress Frontend
                    </h1>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div v-for="i in lastPage" style="display: inline-block;">
                        <button @click="changePage(i)">
                            Pagina {{ i }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div v-for="post in posts" class="col-12 col-sm-4 col-md-3">
                    <div>
                        <h2>
                            {{ post.title }}
                        </h2>
                        <h4>
                            {{ post.category ? post.category.name : '-' }}
                        </h4>
                        <h5 v-if="post.published">
                            Creato il: {{ post.formatted_created_at }}
                        </h5>

                        <div>
                            <img :src="post.full_img_path" alt="">
                        </div>

                        <p>
                            {{ post.content }}
                        </p>
                        <div v-if="post.tags.length > 0">
                            <h3>
                                Tags
                            </h3>
                            <ul>
                                <li v-for="tag in post.tags">
                                    {{ tag.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
img {
    height: 100px;
}
</style>
