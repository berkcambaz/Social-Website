import { lucid } from "../lucid";

import { clampDate, fullDate } from "../core/utility";

import { Component_Icon_Like } from "../icons/icon_like";
import { Component_Icon_Bookmark } from "../icons/icon_bookmark";

export const Component_Post = lucid.component({
  attributes: function () {
    return {
      username: "Berk Cambaz",
      usertag: "berkcambaz",
      date: new Date(),
      content: "Hello, world!",
      likeCount: 123,
      liked: true,
      bookmarked: true
    };
  },
  methods: {
    getLongDate: function () {
      return fullDate(this.attributes.date);
    },
    getShortDate: function () {
      return clampDate(this.attributes.date);
    },
    getLikeClass: function () {
      return this.attributes.liked ? "post__icon enabled" : "post__icon";
    },
    getBookmarkClass: function () {
      return this.attributes.bookmarked ? "post__icon enabled" : "post__icon";
    },
    like: function (ev) {
      console.log(this);
      this.attributes.liked = !this.attributes.liked;
      if (this.attributes.liked) this.attributes.likeCount++;
      else this.attributes.likeCount--;
      lucid.instance(Component_Icon_Like, this.key).attribute("class", this.methods.getLikeClass());
      this.setState();
    },
    bookmark: function (ev) {
      this.attributes.bookmarked = !this.attributes.bookmarked;
      lucid.instance(Component_Icon_Bookmark, this.key).attribute("class", this.methods.getBookmarkClass());
      this.setState();
    }
  },
  render: function () {
    return `
      <div class="post">
        <div class="post__top">
          <div class="post__user-info">
            <span class="post__username">{{attributes.username}}</span>
            <span class="post__tag">@{{attributes.usertag}}</span>
          </div>
          <div class="post__date" title="{{methods.getLongDate}}">{{methods.getShortDate}}</div>
        </div>
        <div class="post__content">{{attributes.content}}</div>
        <div class="post__bottom" lucid-ref="bottom">
          <div class="post__count">{{attributes.likeCount}}</div>
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