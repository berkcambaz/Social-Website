import { lucid } from "../lucid.js";

import { monthYearDate, clampNumber } from "../core/utility";

import { Component_Icon_Calendar } from "../icons/icon_calendar";

export const Component_User = lucid.component({
  attributes: function () { return { user: undefined } },
  methods: {
    getDate: function () {
      return monthYearDate(this.attributes.user.date);
    },
    getFollowerCount: function () {
      return clampNumber(this.attributes.user.followers);
    },
    getFollowingCount: function () {
      return clampNumber(this.attributes.user.following);
    }
  },
  render: function () {
    return `
      <div class="user">
        <div class="user__username">{{attributes.user.username}}</div>
        <div class="user__usertag">@{{attributes.user.usertag}}</div>
        <div>{{attributes.user.bio}}</div>
        <div class="user__date" lucid-ref="date">
          <div>{{methods.getDate}}</div>
        </div>
        <div>
          <div class="user__followers" title="{{attributes.user.followers}} followers">Followers {{methods.getFollowerCount}}</div>
          <div class="user__following" title="{{attributes.user.following}} following">Following {{methods.getFollowingCount}}</div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["date"], Component_Icon_Calendar, 0, undefined, { first: true });
    }
  }
});