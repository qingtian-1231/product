
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
// import posts from './modules/posts'
// import post from './modules/post'
// import tags from './modules/tags'
// import authorPosts from './modules/authorPosts'
// import columns from './modules/columns'
// import column from './modules/column'
// import comments from './modules/comments'
// import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
    // posts,
    // post,
    // tags,
    // authorPosts,
    // columns,
    // column,
    // comments
  }
})
