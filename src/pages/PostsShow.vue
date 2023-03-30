<script>
import axios from 'axios';

export default {
    name: 'PostsShow',
    data() {
        return {
            post: null,
            defaultImg: 'https://www.repstatic.it/content/contenthub/img/2023/01/23/160655497-4ddb7de0-6e11-4607-b88c-54751447d99d.jpg'
        };
    },
    created() {
        this.getPost();
    },
    methods: {
        getPost() {
            axios
                .get(`http://127.0.0.1:8000/api/posts/${this.$route.params.slug}`)
                .then(response => {
                    console.log(response.data);

                    if (response.data.success) {
                        this.post = response.data.post;
                    }
                    else {
                        this.$router.push({ name: 'not-found' });
                    }
                });
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div v-if="post">
                    <div class="post-img">
                        <img :src="post.full_img_path ?? defaultImg" :alt="post.title">
                    </div>
                    <h5>{{ post.title }}</h5>
                    <h6>
                        <i class="fa-solid fa-tag"></i> {{ post.category ? post.category.name : 'Nessuna categoria' }}
                    </h6>
                    <p class="card-text">
                        {{ post.content }}
                    </p>
                    <div v-if="post.tags.length > 0">
                        <span class="badge text-bg-primary me-1" v-for="tag in post.tags">
                            {{ tag.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .post-img {
        height: 250px;

        > img {
            height: 100%;
        }
    }
</style>