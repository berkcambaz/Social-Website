import { lucid } from "../lucid.js";
import { superpage } from "../superpage";

export const Component_Login = lucid.component({
  methods: {
    login: function (ev) {

    },
    gotoSignup: function (ev) {
      superpage.to("/signup");
    }
  },
  render: function () {
    return `
      <div class="login">
        <input class="login__input" type="text" placeholder="Usertag or email..." spellcheck="false" autocomplete="false">
        <input class="login__input" type="password" placeholder="Password..." spellcheck="false" autocomplete="false">
        <button class="login__button" onclick="{{methods.login}}">Login</button>
        <div class="login__text" onclick="{{methods.gotoSignup}}">I don't have an account</div>
        <div class="login__text">I forgot my password</div>
      </div>
    `;
  }
});