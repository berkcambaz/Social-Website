import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

import { Component_User } from "../components/user";
import { Component_Post } from "../components/post";

import { storePost, POST_GETTERS } from "../stores/store_post";
import { storeUser, USER_GETTERS } from "../stores/store_user";

export const Component_View_User = lucid.component({
  attributes: function () { return { args: /* args is usertag here */ undefined } },
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      const user = storeUser.getters[USER_GETTERS.GET_USER_BY_TAG](this.attributes.args);

      lucid.render(this.dom, Component_User, 0, { user: user });

      const posts = storePost.getters[POST_GETTERS.USER](user.id);
      for (let i = 0; i < posts.length; ++i) {
        lucid.render(this.dom, Component_Post, posts[i].postId,
          {
            post: posts[i],
            user: user
          }
        );
      }
    }
  }
});