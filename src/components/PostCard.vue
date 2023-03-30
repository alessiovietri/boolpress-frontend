<script>
export default {
    name: "PostCard",
    data() {
        return {
            defaultImg: 'https://www.repstatic.it/content/contenthub/img/2023/01/23/160655497-4ddb7de0-6e11-4607-b88c-54751447d99d.jpg'
        };
    },
    props: {
        post: {
            type: Object
        }
    },
    computed: {
        shortContent() {
            let shortContent = this.post.content;

            if (shortContent.length > 128) {
                shortContent = shortContent.substr(0, 128) + '...';
            }

            return shortContent;
        }
    }
};
</script>

<template>
    <div class="card h-100">
        <img :src="post.full_img_path ?? defaultImg" class="card-img-top" :alt="post.title">
        <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <h6>
                <i class="fa-solid fa-tag"></i> {{ post.category ? post.category.name : 'Nessuna categoria' }}
            </h6>
            <p class="card-text">
                {{ shortContent }}
            </p>
            <router-link :to="{ name: 'posts-show', params: { slug: post.slug } }" class="btn btn-primary">
                Leggi tutto
            </router-link>
        </div>
        <div class="card-footer text-body-secondary" v-if="post.tags.length > 0">
            <span class="badge text-bg-primary me-1" v-for="tag in post.tags">
                {{ tag.name }}
            </span>
        </div>
    </div>
</template>

<style scoped>
</style>
