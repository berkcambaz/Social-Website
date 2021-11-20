import { lucid } from "../lucid.js";

import { Component_Icon_Send } from "../icons/icon_send";

export const Component_PostInput = lucid.component({
  state: function () {
    return { length: 0 };
  },
  attributes: function () {
    return { limit: 256 };
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