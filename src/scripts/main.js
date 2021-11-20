import { lucid } from "./lucid";
import { superpage } from "./superpage";
import { Luckt } from "./luckt";

import "../styles/styles.scss";

import { Component_View_Home } from "./views/view_home";
import { Component_View_Search } from "./views/view_search";
import { Component_View_User } from "./views/view_user";
import { Component_View_Bookmarks } from "./views/view_bookmarks";

import { Component_Icon_Home } from "./icons/icon_home";
import { Component_Icon_Search } from "./icons/icon_search";
import { Component_Icon_User } from "./icons/icon_user";
import { Component_Icon_Bookmark } from "./icons/icon_bookmark";

function getViewComponent(view) {
  switch (view) {
    case "home": return Component_View_Home;
    case "search": return Component_View_Search;
    case "user": return Component_View_User;
    case "bookmarks": return Component_View_Bookmarks;
  }
}

const Component_App = lucid.component({
  attributes: function () {
    return { currentPage: undefined };
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
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
          onclick: () => { superpage.to("/user/berk") }
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
      if (oldPage) lucid.remove(getViewComponent(oldPage), 0);
      lucid.render(this.refs["content"], getViewComponent(newPage), 0);
    }
  }
});

superpage.redirect("/", "/home");
superpage.fallback(function () { console.log("Route was not found."); });

superpage.route("/home", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "home");
});

superpage.route("/search", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "search");
});

superpage.route("/user/([a-z0-9_]+)", function (username) {
  lucid.instance(Component_App, 0).attribute("currentPage", "user", { username: username });
});

superpage.route("/bookmarks", function () {
  lucid.instance(Component_App, 0).attribute("currentPage", "bookmarks");
});

superpage.run("hash", function () {
  lucid.render(document.getElementById("app"), Component_App, 0);
});