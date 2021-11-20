import { lucid } from "../lucid.js";

import { Component_Icon_Send } from "../icons/icon_send";

import { storePost, POST_ACTS } from "../stores/store_post";

export const Component_PostInput = lucid.component({
  attributes: function () {
    return { limit: 256 };
  },
  state: function () {
    return { length: 0 };
  },
  methods: {
    oninput: function (ev) {
      const element = this.refs["textarea"];
      element.style.height = "0px";
      element.style.height = element.scrollHeight + "px";
      element.value = element.value.substr(0, this.attributes.limit);
      this.setState({ length: element.value.length });
    },
    post: function (ev) {
      const element = this.refs["textarea"];

      // If text is empty, don't do anything
      if (element.value.length === 0) return;

      // Commit to the store with the content of the post
      storePost.commit(POST_ACTS.POST_POST, element.value);

      element.value = "";
      element.style.height = "0px";
      element.style.height = element.scrollHeight + "px";
      this.setState({ length: element.value.length });
    },
    getTextLength: function () {
      return this.state.length + "/" + this.attributes.limit;
    }
  },
  render: function () {
    return `
      <div class="post-input">
        <textarea class="post-input__textarea" lucid-ref="textarea" placeholder="What's on your mind?" oninput="{{methods.oninput}}"></textarea>
        <div class="post-input__bottom" lucid-ref="bottom">
          <div class="post-input__text-length">{{methods.getTextLength}}</div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      this.methods.oninput();
      lucid.render(this.refs["bottom"], Component_Icon_Send, this.key,
        { class: "post-input__icon", onclick: this.methods.post },
        { first: true }
      );
    }
  }
});