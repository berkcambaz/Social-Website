import { lucid } from "../lucid";
import { superpage } from "../superpage";

import { clampDate, fullDate } from "../core/utility";

import { Component_Icon_Like } from "../icons/icon_like";
import { Component_Icon_Bookmark } from "../icons/icon_bookmark";

import { storePost, POST_ACTS } from "../stores/store_post";

export const Component_Post = lucid.component({
  attributes: function () {
    return {
      post: undefined,
      user: undefined
    };
  },
  methods: {
    getLongDate: function () {
      return fullDate(this.attributes.post.date);
    },
    getShortDate: function () {
      return clampDate(this.attributes.post.date);
    },
    getLikeClass: function () {
      return this.attributes.post.liked ? "post__icon enabled" : "post__icon";
    },
    getBookmarkClass: function () {
      return this.attributes.post.bookmarked ? "post__icon enabled" : "post__icon";
    },
    like: function (ev) {
      storePost.commit(POST_ACTS.LIKE_POST, this.attributes.post);
      lucid.instance(Component_Icon_Like, this.key).attribute("class", this.methods.getLikeClass());
      this.setState();
    },
    bookmark: function (ev) {
      storePost.commit(POST_ACTS.BOOKMARK_POST, this.attributes.post);
      lucid.instance(Component_Icon_Bookmark, this.key).attribute("class", this.methods.getBookmarkClass());
      this.setState();
    },
    gotoProfile: function (ev) {
      superpage.to("/user/" + this.attributes.user.usertag);
    }
  },
  render: function () {
    return `
      <div class="post">
        <div class="post__top">
          <div class="post__user-info" onclick="{{methods.gotoProfile}}">
            <span class="post__username">{{attributes.user.username}}</span>
            <span class="post__tag">@{{attributes.user.usertag}}</span>
          </div>
          <div class="post__date" title="{{methods.getLongDate}}">{{methods.getShortDate}}</div>
        </div>
        <div class="post__content">{{attributes.post.content}}</div>
        <div class="post__bottom" lucid-ref="bottom">
          <div class="post__count">{{attributes.post.likeCount}}</div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["bottom"], Component_Icon_Like, this.key, { class: this.methods.getLikeClass(), onclick: this.methods.like });
      lucid.render(this.refs["bottom"], Component_Icon_Bookmark, this.key, { class: this.methods.getBookmarkClass(), onclick: this.methods.bookmark });
    }
  }
});