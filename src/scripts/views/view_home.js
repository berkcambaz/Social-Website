import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

import { Component_Post } from "../components/post";
import { Component_PostInput } from "../components/post-input";

import { storePost, POST_GETTERS } from "../stores/store_post";
import { storeUser, USER_GETTERS } from "../stores/store_user";

export const Component_View_Home = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      lucid.render(this.dom, Component_PostInput, 0);

      const posts = storePost.getters[POST_GETTERS.NORMAL];
      for (let i = 0; i < posts.length; ++i) {
        lucid.render(this.dom, Component_Post, posts[i].postId,
          {
            post: posts[i],
            user: storeUser.getters[USER_GETTERS.GET_USER_BY_ID](posts[i].userId)
          }
        );
      }
    }
  }
});