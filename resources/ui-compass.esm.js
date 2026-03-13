(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ui-compass-card[data-v-c2b8847f]{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;overflow:hidden}.ui-compass-label[data-v-c2b8847f]{display:block;text-align:center;font-weight:700;font-size:1rem;padding-bottom:4px;flex-shrink:0}.ui-compass-content[data-v-c2b8847f]{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;overflow:hidden}.compass-visual[data-v-c2b8847f]{flex:1 1 auto;min-height:0;max-width:100%;aspect-ratio:1}.compass-visual svg[data-v-c2b8847f]{width:100%;height:100%;display:block}.compass-blob[data-v-c2b8847f]{transition:cx .3s ease-out,cy .3s ease-out}.compass-display[data-v-c2b8847f]{flex-shrink:0;display:flex;align-items:baseline;justify-content:center;gap:.4rem;margin-top:.25rem;font-size:1.5rem;font-weight:300;line-height:1}.heading-value[data-v-c2b8847f]{font-variant-numeric:tabular-nums}.cardinal-direction[data-v-c2b8847f]{font-size:1.25rem;font-weight:500;opacity:.8}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { openBlock as s, createElementBlock as o, toDisplayString as r, createCommentVNode as i, createElementVNode as l, Fragment as b } from "vue";
const _ = (t, c) => {
  const a = t.__vccOpts || t;
  for (const [h, u] of c)
    a[h] = u;
  return a;
}, m = [
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
], d = 44, n = 50, g = {
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
      return m[t];
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
}, p = { class: "ui-compass-card" }, f = {
  key: 0,
  class: "ui-compass-label"
}, v = { class: "ui-compass-content" }, y = { class: "compass-visual" }, x = {
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
}, R = ["stroke", "stroke-width"], N = ["y", "fill"], w = ["x", "fill"], k = ["y", "fill"], E = ["x", "fill"], W = ["cx", "cy", "fill"], S = {
  key: 0,
  class: "compass-display"
}, C = {
  key: 0,
  class: "heading-value"
}, I = {
  key: 1,
  class: "cardinal-direction"
};
function V(t, c, a, h, u, e) {
  return s(), o("div", p, [
    e.label ? (s(), o("div", f, r(e.label), 1)) : i("", !0),
    l("div", v, [
      l("div", y, [
        (s(), o("svg", x, [
          l("circle", {
            cx: "50",
            cy: "50",
            r: "44",
            fill: "none",
            stroke: e.ringColorResolved,
            "stroke-width": e.ringWidthResolved
          }, null, 8, R),
          e.compassPointsResolved === "N" || e.compassPointsResolved === "NESW" ? (s(), o("text", {
            key: 0,
            x: "50",
            y: e.labelN,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": "10",
            "font-weight": "bold",
            fill: e.ringColorResolved
          }, "N", 8, N)) : i("", !0),
          e.compassPointsResolved === "NESW" ? (s(), o(b, { key: 1 }, [
            l("text", {
              x: e.labelE,
              y: "51",
              "text-anchor": "middle",
              "dominant-baseline": "central",
              "font-size": "10",
              "font-weight": "bold",
              fill: e.ringColorResolved
            }, "E", 8, w),
            l("text", {
              x: "50",
              y: e.labelS,
              "text-anchor": "middle",
              "dominant-baseline": "central",
              "font-size": "10",
              "font-weight": "bold",
              fill: e.ringColorResolved
            }, "S", 8, k),
            l("text", {
              x: e.labelW,
              y: "51",
              "text-anchor": "middle",
              "dominant-baseline": "central",
              "font-size": "10",
              "font-weight": "bold",
              fill: e.ringColorResolved
            }, "W", 8, E)
          ], 64)) : i("", !0),
          l("circle", {
            class: "compass-blob",
            cx: e.blobX,
            cy: e.blobY,
            r: "5",
            fill: e.blobColorResolved
          }, null, 8, W)
        ]))
      ]),
      e.showValueResolved !== "none" ? (s(), o("div", S, [
        e.showValueResolved === "degrees" || e.showValueResolved === "both" ? (s(), o("span", C, r(e.displayHeading) + "°", 1)) : i("", !0),
        e.showValueResolved === "cardinal" || e.showValueResolved === "both" ? (s(), o("span", I, r(e.cardinalDirection), 1)) : i("", !0)
      ])) : i("", !0)
    ])
  ]);
}
const B = /* @__PURE__ */ _(g, [["render", V], ["__scopeId", "data-v-c2b8847f"]]);
export {
  B as UICompass
};
