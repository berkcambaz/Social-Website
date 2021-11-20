import { lucid } from "../lucid.js";
import { superpage } from "../superpage";

export const Component_Signup = lucid.component({
  methods: {
    signup: function (ev) {

    },
    gotoLogin: function (ev) {
      superpage.to("/login");
    }
  },
  render: function () {
    return `
      <div class="signup">
        <input class="signup__input" type="text" placeholder="Usertag..." spellcheck="false" autocomplete="false">
        <input class="signup__input" type="text" placeholder="Email..." spellcheck="false" autocomplete="false">
        <input class="signup__input" type="password" placeholder="Password..." spellcheck="false" autocomplete="false">
        <button class="signup__button" onclick="{{methods.signup}}">Sign up</button>
        <div class="signup__text" onclick="{{methods.gotoLogin}}">I have an account</div>
      </div>
    `;
  }
});