<template>
  <div>
    <div class="row">
      <div class="col s6">
        <!-- Form -->
        <PostForm @postCreated="addPost" :editingPost="editingPost" />
      </div>

      <div class="col s3" style="margin: 50px">
        <p>Limit number of posts</p>
        <input type="number" v-model="postLimit" />
        <button @click="setLimit()" class="waves-effect waves-light btn">Set</button>
      </div>
    </div>
    <div class="row">
      <div class="col s6" v-for="(post, index) in posts" :item="post" :index="index" :key="post.id">
        <div class="card">
          <div class="card-content">
            <p class="card-title">
              {{ post.title }}
            </p>
            <p class="timestamp">
              {{ formatDate(post.createdAt) }}
            </p>
            <p>{{ post.body }}</p>
          </div>

          <div class="card-action">
            <a href="#" @click="editPost(post)">Edit</a>
            <a href="#" class="delete-btn" @click="deletePost(post.id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../services/PostService'
import PostForm from '../components/PostForm.vue'
const post_service = new PostService()
export default {
  name: 'Home',
  components: {
    PostForm
  },
  data() {
    return { posts: [], postLimit: 5, editingPost: null }
  },

  created() {
    post_service
      .getAllPosts()
      .then((res) => {
        this.posts = res.data
      })
      .catch((err) => console.log)
  },

  methods: {
    addPost(post) {
      if (this.posts.find((p) => p.id === post.id)) {
        const index = this.posts.findIndex((p) => p.id === post.id)
        this.posts.splice(index, 1, post)
      } else this.posts.unshift(post)
    },

    editPost(post) {
      this.editingPost = post
    },
    deletePost(id) {
      post_service
        .deletePost(id)
        .then(() => {
          this.posts = this.posts.filter((post) => post.id !== id)
        })

        .catch((err) => console.error(err))
    },

    setLimit() {
      post_service
        .getPosts(this.postLimit)
        .then((res) => (this.posts = res.data))
        .catch((err) => console.log)
    },
    formatDate(date) {
      let new_date = new Date(date)
      const day = new_date.getDate()
      const month = new_date.getMonth() + 1
      const year = new_date.getFullYear()
      return `${day}-${month}-${year}`
    }
  }
}
</script>

<style scoped>
.delete-btn {
  color: red !important;
}

.card .card-content .card-title {
  margin-bottom: 0;
}

.card .card-content p.timestamp {
  color: #999;
  margin-bottom: 10px;
}
</style>
