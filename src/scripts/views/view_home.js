import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

import { Component_Post } from "../components/post";
import { Component_PostInput } from "../components/post-input";

export const Component_View_Home = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      lucid.render(this.dom, Component_PostInput, 0);

      for (let i = 0; i < 10; ++i)
        lucid.render(this.dom, Component_Post, i);
    }
  }
});