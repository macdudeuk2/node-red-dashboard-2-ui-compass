(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ui-compass-wrapper[data-v-e29e3519]{width:100%;height:100%;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;overflow:hidden;font-family:inherit}.ui-compass-label[data-v-e29e3519]{flex:0 0 auto;width:100%;text-align:center;font-weight:700;font-size:1rem;line-height:1.25;padding-bottom:4px}.ui-compass-body[data-v-e29e3519]{flex:1 1 0;min-height:0;position:relative;width:100%;overflow:hidden}.ui-compass-body svg[data-v-e29e3519]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:100%;max-height:100%;display:block}.compass-blob[data-v-e29e3519]{transition:cx .3s ease-out,cy .3s ease-out}.ui-compass-display[data-v-e29e3519]{flex:0 0 auto;display:flex;align-items:baseline;justify-content:center;gap:.4rem;padding-top:4px;font-size:1.5rem;font-weight:300;line-height:1}.heading-value[data-v-e29e3519]{font-variant-numeric:tabular-nums}.cardinal-direction[data-v-e29e3519]{font-size:1.25rem;font-weight:500;opacity:.8}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { openBlock as s, createElementBlock as l, toDisplayString as r, createCommentVNode as o, createElementVNode as i, Fragment as b } from "vue";
const _ = (t, c) => {
  const a = t.__vccOpts || t;
  for (const [h, u] of c)
    a[h] = u;
  return a;
}, g = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW"
], d = 44, n = 50, m = {
  name: "UICompass",
  inject: ["$socket"],
  props: {
    id: { type: String, required: !0 },
    props: { type: Object, default: () => ({}) },
    state: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      heading: 0
    };
  },
  computed: {
    label() {
      return this.props.label;
    },
    compassPointsResolved() {
      return this.props.compassPoints || "NESW";
    },
    showValueResolved() {
      return this.props.showValue || "cardinal";
    },
    blobColorResolved() {
      return this.props.blobColor || "rgb(var(--v-theme-primary))";
    },
    ringColorResolved() {
      return this.props.ringColor || "currentColor";
    },
    ringWidthResolved() {
      const t = Number(this.props.ringWidth);
      return isNaN(t) || t < 1 ? 2 : t;
    },
    labelInset() {
      return d - this.ringWidthResolved / 2 - 8;
    },
    labelN() {
      return n - this.labelInset;
    },
    labelS() {
      return n + this.labelInset;
    },
    labelE() {
      return n + this.labelInset;
    },
    labelW() {
      return n - this.labelInset;
    },
    blobX() {
      const t = this.heading * Math.PI / 180;
      return n + d * Math.sin(t);
    },
    blobY() {
      const t = this.heading * Math.PI / 180;
      return n - d * Math.cos(t);
    },
    displayHeading() {
      return this.heading % 1 === 0 ? this.heading.toFixed(0) : this.heading.toFixed(1);
    },
    cardinalDirection() {
      const t = Math.round(this.heading / 22.5) % 16;
      return g[t];
    }
  },
  mounted() {
    this.$socket.on("msg-input:" + this.id, this.onInput), this.$socket.on("widget-load:" + this.id, this.onLoad), this.$socket.emit("widget-load", this.id);
  },
  unmounted() {
    this.$socket.off("msg-input:" + this.id, this.onInput), this.$socket.off("widget-load:" + this.id, this.onLoad);
  },
  methods: {
    onInput(t) {
      t && typeof t.payload == "number" && (this.heading = t.payload);
    },
    onLoad(t) {
      t && typeof t.payload == "number" && (this.heading = t.payload);
    }
  }
}, p = { class: "ui-compass-wrapper" }, f = {
  key: 0,
  class: "ui-compass-label"
}, v = { class: "ui-compass-body" }, y = {
  viewBox: "0 0 100 100",
  width: "200",
  height: "200",
  xmlns: "http://www.w3.org/2000/svg"
}, x = ["stroke", "stroke-width"], w = ["y", "fill"], R = ["x", "fill"], N = ["y", "fill"], k = ["x", "fill"], E = ["cx", "cy", "fill"], W = {
  key: 1,
  class: "ui-compass-display"
}, S = {
  key: 0,
  class: "heading-value"
}, C = {
  key: 1,
  class: "cardinal-direction"
};
function I(t, c, a, h, u, e) {
  return s(), l("div", p, [
    e.label ? (s(), l("div", f, r(e.label), 1)) : o("", !0),
    i("div", v, [
      (s(), l("svg", y, [
        i("circle", {
          cx: "50",
          cy: "50",
          r: "44",
          fill: "none",
          stroke: e.ringColorResolved,
          "stroke-width": e.ringWidthResolved
        }, null, 8, x),
        e.compassPointsResolved === "N" || e.compassPointsResolved === "NESW" ? (s(), l("text", {
          key: 0,
          x: "50",
          y: e.labelN,
          "text-anchor": "middle",
          "dominant-baseline": "central",
          "font-size": "10",
          "font-weight": "bold",
          fill: e.ringColorResolved
        }, "N", 8, w)) : o("", !0),
        e.compassPointsResolved === "NESW" ? (s(), l(b, { key: 1 }, [
          i("text", {
            x: e.labelE,
            y: "51",
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": "10",
            "font-weight": "bold",
            fill: e.ringColorResolved
          }, "E", 8, R),
          i("text", {
            x: "50",
            y: e.labelS,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": "10",
            "font-weight": "bold",
            fill: e.ringColorResolved
          }, "S", 8, N),
          i("text", {
            x: e.labelW,
            y: "51",
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": "10",
            "font-weight": "bold",
            fill: e.ringColorResolved
          }, "W", 8, k)
        ], 64)) : o("", !0),
        i("circle", {
          class: "compass-blob",
          cx: e.blobX,
          cy: e.blobY,
          r: "5",
          fill: e.blobColorResolved
        }, null, 8, E)
      ]))
    ]),
    e.showValueResolved !== "none" ? (s(), l("div", W, [
      e.showValueResolved === "degrees" || e.showValueResolved === "both" ? (s(), l("span", S, r(e.displayHeading) + "°", 1)) : o("", !0),
      e.showValueResolved === "cardinal" || e.showValueResolved === "both" ? (s(), l("span", C, r(e.cardinalDirection), 1)) : o("", !0)
    ])) : o("", !0)
  ]);
}
const P = /* @__PURE__ */ _(m, [["render", I], ["__scopeId", "data-v-e29e3519"]]);
export {
  P as UICompass
};
