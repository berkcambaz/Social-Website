import { lucid } from "../lucid";

export const Component_Icon_Edit = lucid.component({
  attributes: function () {
    return { class: "", onclick: function (ev) { } }
  },
  methods: {
    onclick: function (ev) {
      this.attributes.onclick && this.attributes.onclick(ev);
    }
  },
  render: function () {
    return `
      <svg class="{{attributes.class}}" onclick="{{methods.onclick}}" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" />
        <path d="M16 5l3 3" />
        <path d="M9 7.07a7.002 7.002 0 0 0 1 13.93a7.002 7.002 0 0 0 6.929 -5.999" />
      </svg>
    `;
  },
  watch: {
    class: function (oldClass, newClass) {
      this.setState();
    }
  }
});