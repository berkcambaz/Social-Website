import { lucid } from "../lucid";
import { superpage } from "../superpage";
import { Luckt } from "../luckt";

export const Component_View_Menu = lucid.component({
  attributes: function () { return { class: "" } },
  render: function () {
    return `
      <div class="menu">
        <div class="menu__container {{attributes.class}}" lucid-ref="container">
          Hello, world!
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      setTimeout(() => {
        this.attributes.class = "menu__slide--right";
        this.setState();
      }, 1);
      this.refs["container"].addEventListener("transitionend", (ev) => {
        if (this.attributes.class === "menu__slide--left") lucid.remove(this.id, this.key);
      })
    }
  },
  watch: {
    class: function (oldClass, newClass) {
      switch (oldClass) {
        case "menu__slide--right": this.attributes.class = "menu__slide--left"; break;
        case "menu__slide--left": this.attributes.class = "menu__slide--right"; break;
      }
      this.setState();
    }
  }
});