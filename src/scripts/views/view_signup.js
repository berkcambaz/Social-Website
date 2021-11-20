import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

import { Component_Signup } from "../components/signup";

export const Component_View_Signup = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      lucid.render(this.dom, Component_Signup, 0);
    }
  }
});