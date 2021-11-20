import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

import { Component_Login } from "../components/login";

export const Component_View_Login = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      lucid.render(this.dom, Component_Login, 0);
    }
  }
});