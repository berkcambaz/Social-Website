import { lucid } from "./lucid";
import { superpage } from "./superpage";
import { Luckt } from "./luckt";

import "../styles/styles.scss";


import { Component_View_Menu } from "./views/view_menu";

import { Component_View_Login } from "./views/view_login";
import { Component_View_Signup } from "./views/view_signup";

import { Component_View_Home } from "./views/view_home";
import { Component_View_Search } from "./views/view_search";
import { Component_View_User } from "./views/view_user";
import { Component_View_Bookmarks } from "./views/view_bookmarks";

import { Component_Icon_Menu } from "./icons/icon_menu";
import { Component_Icon_Home } from "./icons/icon_home";
import { Component_Icon_Search } from "./icons/icon_search";
import { Component_Icon_User } from "./icons/icon_user";
import { Component_Icon_Bookmark } from "./icons/icon_bookmark";

import { storeUser } from "./stores/store_user";

function getViewComponent(view) {
  switch (view) {
    case "home": return Component_View_Home;
    case "search": return Component_View_Search;
    case "user": return Component_View_User;
    case "bookmarks": return Component_View_Bookmarks;
    case "login": return Component_View_Login;
    case "signup": return Component_View_Signup;
  }
}

function getViewIcon(view) {
  switch (view) {
    case "home": return Component_Icon_Home;
    case "search": return Component_Icon_Search;
    case "user": return Component_Icon_User;
    case "bookmarks": return Component_Icon_Bookmark;
    default: return undefined;
  }
}

const Component_App = lucid.component({
  state: function () { return { settingsShown: false } },
  attributes: function () {
    return { currentPage: undefined, args: undefined };
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">tivittırı</div>
        </div>
        <div class="app__content" lucid-ref="content">
        </div>
        <div class="app__bottom" lucid-ref="bottom">
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["top"], Component_Icon_Menu, "app",
        {
          class: "app__top__icon",
          onclick: () => {
            if (lucid.instance(Component_View_Menu, "app") === undefined)
              lucid.render(this.dom, Component_View_Menu, "app");
            else
              lucid.instance(Component_View_Menu, "app").attribute("class", "swap");
          }
        }
      );

      lucid.render(this.refs["bottom"], Component_Icon_Home, "app",
        {
          class: "app__bottom__icon",
          onclick: () => { superpage.to("/home") }
        }
      );
      lucid.render(this.refs["bottom"], Component_Icon_Search, "app",
        {
          class: "app__bottom__icon",
          onclick: () => { superpage.to("/search") }
        }
      );
      lucid.render(this.refs["bottom"], Component_Icon_User, "app",
        {
          class: "app__bottom__icon",
          onclick: () => { superpage.to("/user/" + storeUser.state.main.usertag) }
        }
      );
      lucid.render(this.refs["bottom"], Component_Icon_Bookmark, "app",
        {
          class: "app__bottom__icon",
          onclick: () => { superpage.to("/bookmarks") }
        }
      );
    }
  },
  watch: {
    currentPage: function (oldPage, newPage) {
      if (oldPage) {
        lucid.remove(getViewComponent(oldPage), 0);
        if (getViewIcon(oldPage))
          lucid.instance(getViewIcon(oldPage), "app").attribute("class", "app__bottom__icon");
      }
      lucid.render(this.refs["content"], getViewComponent(newPage), 0, { args: this.attributes.args });
      if (getViewIcon(newPage))
        lucid.instance(getViewIcon(newPage), "app").attribute("class", "app__bottom__icon enabled");
    }
  }
});

superpage.redirect("/", "/home");
superpage.fallback(function () { console.log("Route was not found."); });

superpage.route("/login", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "login");
});

superpage.route("/signup", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "signup");
});

superpage.route("/home", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "home");
});

superpage.route("/search", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "search");
});

superpage.route("/user/([a-z0-9_]+)", function (usertag) {
  lucid.instance(Component_App, 0).attribute("args", usertag);
  lucid.instance(Component_App, 0).attribute("currentPage", "user");
});

superpage.route("/bookmarks", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "bookmarks");
});

superpage.run("hash", function () {
  lucid.render(document.getElementById("app"), Component_App, 0);
});