import { jsx as r, jsxs as c, Fragment as U } from "react/jsx-runtime";
import { useCallback as D, useEffect as O, useRef as X, useState as k, useMemo as W, useId as fe } from "react";
const ae = "https://lsapi.casholab.com";
async function ie(e, n, t) {
  const o = await pe(e, {
    flagDisplayMode: n.flagMode,
    apiUrl: t.apiUrl,
    flagLoadMode: t.flagLoadMode
  });
  return await _e(o, t.flagLoadMode);
}
async function pe(e, n = {}) {
  const { flagDisplayMode: t = "single", apiUrl: o = ae } = n, s = new URLSearchParams({
    l: e.join(","),
    f: t
  }), a = await fetch(`${o}/languages?${s}`);
  if (!a.ok) {
    const d = await a.json().catch(() => ({ error: "Request failed" }));
    throw new Error(d.error || `HTTP ${a.status}`);
  }
  const i = await a.json();
  if (!i.resolved || i.resolved.length === 0)
    throw new Error("Invalid response: no valid languages returned");
  return i;
}
async function _e(e, n = "multi", t = ae) {
  if (e.flags && Object.keys(e.flags).length > 0)
    return e;
  const o = ve(e);
  if (o.length === 0)
    return e;
  let s;
  return n === "single" ? s = await Ne(t) : s = await ge(o, t), { ...e, flags: s };
}
function ve(e) {
  const n = /* @__PURE__ */ new Set();
  for (const t of Object.values(e.data))
    if (t.flags && t.flags.forEach((o) => n.add(o.toLowerCase())), t.scriptFlags)
      for (const o of Object.values(t.scriptFlags))
        o.forEach((s) => n.add(s.toLowerCase()));
  return Array.from(n);
}
async function Ne(e) {
  const n = await fetch(`${e}/all-flags`);
  if (!n.ok)
    throw new Error(`Failed to fetch flags: HTTP ${n.status}`);
  return await n.json();
}
async function we(e, n) {
  const t = await fetch(`${n}/flags/${e.toLowerCase()}`);
  if (!t.ok) {
    if (t.status === 404) return null;
    throw new Error(`Failed to fetch flag: HTTP ${t.status}`);
  }
  return t.text();
}
async function ge(e, n) {
  const t = {}, o = await Promise.all(
    e.map(async (s) => {
      const a = await we(s, n);
      return { code: s.toLowerCase(), svg: a };
    })
  );
  for (const { code: s, svg: a } of o)
    a && (t[s] = a);
  return t;
}
const ue = "1.0.0";
function Ce(e) {
  let n;
  if (typeof e == "string")
    try {
      n = JSON.parse(e);
    } catch (s) {
      throw new Error(
        "Invalid JSON format: " + (s instanceof Error ? s.message : String(s))
      );
    }
  else
    n = e;
  if (typeof n != "object" || n === null)
    throw new Error("Invalid input: expected object");
  const t = n;
  if ("data" in t && t.data && typeof t.data == "object") {
    const s = oe(t.data), a = t.displayOptions && typeof t.displayOptions == "object" ? t.displayOptions : null;
    return { data: s, displayOptions: a };
  }
  return { data: oe(n), displayOptions: null };
}
function oe(e) {
  if (!e || typeof e != "object")
    throw new Error("Invalid language data: expected object");
  const n = e;
  if (!n.data || typeof n.data != "object")
    throw new Error("Invalid language data: missing 'data' field");
  if (!Array.isArray(n.resolved) || n.resolved.length === 0)
    throw new Error("Invalid language data: missing or empty 'resolved' array");
  const t = n.data;
  let o = !1;
  for (const s of Object.values(t))
    if (s && typeof s == "object") {
      const i = s.data;
      if (i) {
        const d = typeof i.code == "string" && i.code.length > 0, m = typeof i.name == "string" && i.name.length > 0, p = typeof i.endonym == "string" && i.endonym.length > 0;
        if (d && (m || p)) {
          o = !0;
          break;
        }
      }
    }
  if (!o)
    throw new Error(
      "Invalid language data: requires at least 1 language with code and name/endonym"
    );
  return e;
}
async function Zt(e, n, t) {
  const o = await ie(
    e,
    n,
    t
  );
  return {
    displayOptions: n,
    languageData: o,
    meta: {
      generatedTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: ue
    }
  };
}
function Pt(e) {
  const n = new Blob([JSON.stringify(e, null, 2)], {
    type: "application/json"
  }), t = URL.createObjectURL(n), o = document.createElement("a");
  o.href = t, o.download = "language-data.json", o.click();
}
function ee(e) {
  const n = e.split("-"), t = { lang: n[0] };
  for (let o = 1; o < n.length; o++) {
    const s = n[o];
    s.length === 4 && /^[A-Za-z]{4}$/.test(s) ? t.script = s : s.length === 2 && /^[A-Za-z]{2}$/.test(s) && (t.region = s);
  }
  return t;
}
function Le(e, n, t) {
  var o;
  return t === "none" || !n ? [] : e.region ? [e.region.toLowerCase()] : e.script && ((o = n.scriptFlags) != null && o[e.script]) ? n.scriptFlags[e.script] : n.flags ?? [];
}
function ye(e) {
  return "data:image/svg+xml," + encodeURIComponent(e);
}
function Ee(e, n, t) {
  return e.resolved.map((o) => {
    var j, h;
    const s = ee(o), a = e.data[s.lang];
    let i, d, m, p, v = (a == null ? void 0 : a.data.endonym) ?? "";
    if (s.region && ((j = a == null ? void 0 : a.regionData) != null && j[s.region])) {
      const f = a.regionData[s.region];
      i = f.regionNameEnglish, d = f.regionNameNative;
    }
    if (s.script && ((h = a == null ? void 0 : a.scriptData) != null && h[s.script])) {
      const f = a.scriptData[s.script];
      m = f.scriptNameEnglish, p = f.scriptNameLocal, v = f.languageInScript || v;
    }
    const y = Le(s, a, n).map((f) => {
      const $ = (t == null ? void 0 : t[f]) ?? (t == null ? void 0 : t[f.toLowerCase()]);
      return $ ? ye($) : null;
    }).filter((f) => f !== null);
    return {
      code: o,
      name: (a == null ? void 0 : a.data.name) ?? o,
      endonym: v,
      regionNameEnglish: i,
      regionNameNative: d,
      scriptNameEnglish: m,
      scriptNameLocal: p,
      flagSvgDataUris: y
    };
  }).sort((o, s) => o.endonym.localeCompare(s.endonym));
}
function ce(e, n) {
  if (!n) return e;
  const t = n.toLowerCase();
  return e.filter(
    (o) => o.name.toLowerCase().includes(t) || o.endonym.toLowerCase().includes(t) || o.code.toLowerCase().includes(t) || o.regionNameEnglish && o.regionNameEnglish.toLowerCase().includes(t) || o.regionNameNative && o.regionNameNative.toLowerCase().includes(t) || o.scriptNameEnglish && o.scriptNameEnglish.toLowerCase().includes(t) || o.scriptNameLocal && o.scriptNameLocal.toLowerCase().includes(t)
  );
}
function be() {
  var e;
  return typeof navigator > "u" ? [] : ((e = navigator.languages) == null ? void 0 : e.slice()) ?? (navigator.language ? [navigator.language] : []);
}
function ke(e, n) {
  const t = n.map((s) => s.code.toLowerCase()), o = new Map(n.map((s) => [s.code.toLowerCase(), s]));
  for (const s of e) {
    const a = s.toLowerCase();
    if (o.has(a))
      return o.get(a);
    const d = ee(s).lang.toLowerCase();
    if (o.has(d))
      return o.get(d);
    for (const m of t)
      if (ee(m).lang.toLowerCase() === d)
        return o.get(m);
  }
  return null;
}
const te = ({
  width: e = "24",
  height: n = "24",
  color: t = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: n,
    viewBox: "0 0 400 364",
    fill: "none",
    children: /* @__PURE__ */ r(
      "path",
      {
        d: "M269.958 133.006C277.449 129.385 286.184 129.385 293.675 133.006L293.675 133.006C300.193 136.157 303.727 141.647 305.482 144.6C306.931 147.038 308.409 150.006 309.877 153.053L311.339 156.108L311.34 156.109L363.435 265.144L363.436 265.145L398.217 337.944C402.549 347.011 398.717 357.878 389.658 362.215C380.6 366.551 369.745 362.716 365.412 353.648L335.575 291.197H228.058L198.221 353.648C193.888 362.716 183.033 366.551 173.974 362.215C164.915 357.878 161.084 347.011 165.416 337.944L252.293 156.109L252.293 156.108C254.236 152.044 256.219 147.85 258.15 144.6C259.905 141.647 263.44 136.156 269.958 133.006ZM109.093 18.1996C109.093 8.14815 117.233 0 127.274 0C137.315 0 145.455 8.14815 145.455 18.1996V36.3992H236.363C246.404 36.3992 254.544 44.5479 254.544 54.5994C254.544 64.6508 246.404 72.799 236.363 72.799H205.968C196.654 116.969 179.546 157.739 155.723 193.585C160.911 196.781 166.067 199.538 171.088 201.796C180.247 205.915 184.337 216.687 180.221 225.856C176.106 235.025 165.345 239.118 156.186 234.999C148.681 231.624 141.196 227.516 133.88 222.837C104.662 257.777 68.3185 286.581 26.2765 307.495C17.2844 311.968 6.37227 308.297 1.90357 299.296C-2.56499 290.295 1.1022 279.372 10.0943 274.898C47.1711 256.454 79.1804 231.207 104.999 200.661C84.2915 181.895 66.1749 158.631 55.9818 134.482C52.0737 125.223 56.4038 114.546 65.6533 110.634C74.9029 106.722 85.5694 111.056 89.4776 120.315C96.8424 137.763 110.426 155.897 126.838 171.313C146.005 141.934 160.241 108.778 168.712 72.799H18.1854C8.1441 72.799 0.00420549 64.6508 0.00410879 54.5994C0.00410879 44.5479 8.14404 36.3992 18.1854 36.3992H109.093V18.1996ZM245.449 254.797H318.183L281.816 178.68L245.449 254.797Z",
        fill: t
      }
    )
  }
), $e = ({
  width: e = "24",
  height: n = "24",
  color: t = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" })
  }
), se = ({
  width: e = "24",
  height: n = "24",
  color: t = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: n,
    viewBox: "0 0 360 360",
    fill: "none",
    children: /* @__PURE__ */ r(
      "path",
      {
        d: "M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z",
        fill: t
      }
    )
  }
), xe = ({
  width: e = "24",
  height: n = "24",
  color: t = "currentColor"
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ r("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ r("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), De = "_close_10rmb_1", je = "_outer_10rmb_22", Fe = "_overlay_10rmb_32", Se = "_container_10rmb_44", ze = "_body_10rmb_59", B = {
  close: De,
  outer: je,
  overlay: Fe,
  container: Se,
  body: ze
}, Me = ({
  close: e,
  xbutton: n = !1,
  bgCloses: t = !0,
  children: o
}) => {
  const s = D(
    (i) => {
      t && i.target === i.currentTarget && e();
    },
    [t, e]
  ), a = D(
    (i) => {
      i.key === "Escape" && t && e();
    },
    [t, e]
  );
  return O(() => (window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a)), [a]), /* @__PURE__ */ c("div", { className: B.outer, children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: B.overlay,
        onClick: s,
        "aria-label": "Close modal",
        role: "button",
        tabIndex: 0
      }
    ),
    /* @__PURE__ */ r("div", { className: B.container, children: /* @__PURE__ */ c("div", { className: B.body, children: [
      n && /* @__PURE__ */ r(
        "button",
        {
          className: B.close,
          onClick: e,
          "aria-label": "close",
          children: /* @__PURE__ */ r(xe, {})
        }
      ),
      o
    ] }) })
  ] });
}, Ie = "_search_18os4_1", Re = "_searchCompact_18os4_35", re = {
  search: Ie,
  searchCompact: Re
}, le = ({
  value: e,
  onChange: n,
  placeholder: t = "Search languages...",
  variant: o = "default",
  autoFocus: s = !1,
  onKeyDown: a
}) => {
  const i = X(null);
  return O(() => {
    s && i.current && i.current.focus();
  }, [s]), o === "default" ? /* @__PURE__ */ c("label", { htmlFor: "ls-search", className: re.search, children: [
    /* @__PURE__ */ r(se, { width: "18", height: "18" }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: i,
        id: "ls-search",
        type: "text",
        placeholder: t,
        value: e,
        onChange: (d) => n(d.target.value),
        onKeyDown: a
      }
    )
  ] }) : /* @__PURE__ */ c("div", { className: re.searchCompact, children: [
    /* @__PURE__ */ r(se, { width: "16", height: "16" }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: i,
        type: "text",
        placeholder: t,
        value: e,
        onChange: (d) => n(d.target.value),
        onKeyDown: a
      }
    )
  ] });
}, Ue = "_flags_jz6q8_1", Te = "_flag_jz6q8_1", Oe = "_sm_jz6q8_13", qe = "_single_jz6q8_13", Ae = "_md_jz6q8_25", He = "_row_jz6q8_39", Be = "_grid_jz6q8_50", We = "_lg_jz6q8_63", J = {
  flags: Ue,
  flag: Te,
  sm: Oe,
  single: qe,
  md: Ae,
  row: He,
  grid: Be,
  lg: We
}, de = ({
  flagSvgDataUris: e,
  size: n = "md"
}) => {
  if (e.length === 0) return null;
  const t = e.length > 2 ? "grid" : e.length === 2 ? "row" : "single";
  return /* @__PURE__ */ r("div", { className: `${J.flags} ${J[t]} ${J[n]}`, children: e.map((o, s) => /* @__PURE__ */ r(
    "img",
    {
      className: J.flag,
      src: o,
      alt: ""
    },
    s
  )) });
}, Ze = "_option_1b8fs_1", Pe = "_selected_1b8fs_28", Ve = "_content_1b8fs_33", Je = "_native_1b8fs_37", Ke = "_english_1b8fs_38", Xe = "_metaContainer_1b8fs_53", Ye = "_meta_1b8fs_53", Ge = "_metaNative_1b8fs_66", Qe = "_metaEnglish_1b8fs_77", g = {
  option: Ze,
  selected: Pe,
  content: Ve,
  native: Je,
  english: Ke,
  metaContainer: Xe,
  meta: Ye,
  metaNative: Ge,
  metaEnglish: Qe
}, et = ({
  language: e,
  showFlags: n = !1,
  showEnglishName: t = !0,
  selected: o = !1,
  onClick: s
}) => {
  const a = e.regionNameNative || e.regionNameEnglish || e.scriptNameLocal || e.scriptNameEnglish;
  return /* @__PURE__ */ c(
    "button",
    {
      className: `${g.option} ${o ? g.selected : ""}`,
      onClick: s,
      children: [
        n && e.flagSvgDataUris.length > 0 && /* @__PURE__ */ r(de, { flagSvgDataUris: e.flagSvgDataUris, size: "md" }),
        /* @__PURE__ */ c("div", { className: g.content, children: [
          /* @__PURE__ */ r("div", { className: g.native, children: e.endonym || e.name }),
          t && /* @__PURE__ */ r("div", { className: g.english, children: /* @__PURE__ */ r("span", { className: g.name, children: e.name }) })
        ] }),
        a && /* @__PURE__ */ c("div", { className: g.metaContainer, children: [
          (e.regionNameNative || e.regionNameEnglish) && /* @__PURE__ */ c("div", { className: g.meta, children: [
            /* @__PURE__ */ r("div", { className: g.metaNative, children: e.regionNameNative || "" }),
            t && e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && /* @__PURE__ */ r("div", { className: g.metaEnglish, children: e.regionNameEnglish })
          ] }),
          (e.scriptNameLocal || e.scriptNameEnglish) && /* @__PURE__ */ c("div", { className: g.meta, children: [
            /* @__PURE__ */ r("div", { className: g.metaNative, children: e.scriptNameLocal || "" }),
            t && e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && /* @__PURE__ */ r("div", { className: g.metaEnglish, children: e.scriptNameEnglish })
          ] })
        ] })
      ]
    }
  );
}, tt = "_selected_vh9v3_1", nt = "_native_vh9v3_11", ot = "_english_vh9v3_17", st = "_scriptLocal_vh9v3_22", rt = "_regionLocal_vh9v3_23", R = {
  selected: tt,
  native: nt,
  english: ot,
  scriptLocal: st,
  regionLocal: rt
}, at = ({
  language: e,
  showFlags: n = !1,
  showEnglishName: t = !0
}) => /* @__PURE__ */ c("div", { className: R.selected, children: [
  /* @__PURE__ */ c("div", { className: R.native, children: [
    e.endonym || e.name,
    e.scriptNameLocal && /* @__PURE__ */ c("span", { className: R.scriptLocal, children: [
      "(",
      e.scriptNameLocal,
      ")"
    ] }),
    e.regionNameNative && /* @__PURE__ */ c("span", { className: R.regionLocal, children: [
      "(",
      e.regionNameNative,
      ")"
    ] })
  ] }),
  t && /* @__PURE__ */ c("div", { className: R.english, children: [
    /* @__PURE__ */ r("span", { className: R.name, children: e.name }),
    (e.regionNameEnglish || e.scriptNameEnglish) && /* @__PURE__ */ c("span", { className: R.variant, children: [
      e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && /* @__PURE__ */ c(U, { children: [
        "(",
        e.scriptNameEnglish,
        ")"
      ] }),
      e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && /* @__PURE__ */ c(U, { children: [
        " ",
        e.regionNameEnglish
      ] })
    ] })
  ] }),
  n && e.flagSvgDataUris.length > 0 && /* @__PURE__ */ r(de, { flagSvgDataUris: e.flagSvgDataUris, size: "lg" })
] }), it = "_divider_koho4_1", ct = "_container_koho4_11", lt = "_content_koho4_16", dt = "_loadingOverlay_koho4_20", mt = "_spinner_koho4_36", ht = "_header_koho4_58", ft = "_list_koho4_68", pt = "_placeholder_koho4_76", z = {
  divider: it,
  container: ct,
  content: lt,
  loadingOverlay: dt,
  spinner: mt,
  header: ht,
  list: ft,
  placeholder: pt
}, _t = ({
  displayLanguages: e = [],
  isLoading: n = !1,
  skeletonCount: t = 0,
  selectedEntry: o = null,
  isOpen: s,
  showEnglishName: a = !0,
  showFlags: i = !1,
  selectLanguage: d,
  close: m
}) => {
  const [p, v] = k(""), M = () => {
    m(), v("");
  }, y = (h) => {
    d(h), M();
  }, j = W(
    () => ce(e, p),
    [e, p]
  );
  return s ? /* @__PURE__ */ r(Me, { close: M, xbutton: !0, bgCloses: !0, children: /* @__PURE__ */ c("div", { className: z.container, children: [
    /* @__PURE__ */ c("header", { className: z.header, children: [
      /* @__PURE__ */ r(te, { width: "20", height: "20" }),
      /* @__PURE__ */ r("span", { children: "Select a Language" })
    ] }),
    /* @__PURE__ */ c("div", { className: z.content, children: [
      n && /* @__PURE__ */ r("div", { className: z.loadingOverlay, children: /* @__PURE__ */ r("div", { className: z.spinner }) }),
      o && /* @__PURE__ */ c(U, { children: [
        /* @__PURE__ */ r(
          at,
          {
            language: o,
            showFlags: i,
            showEnglishName: a && !!o.endonym && o.endonym !== o.name
          }
        ),
        /* @__PURE__ */ r("hr", { className: z.divider })
      ] }),
      /* @__PURE__ */ r(le, { value: p, onChange: v }),
      /* @__PURE__ */ r("div", { className: z.list, children: e.length > 0 ? j.map((h) => /* @__PURE__ */ r(
        et,
        {
          language: h,
          showFlags: i,
          showEnglishName: a && !!h.endonym && h.endonym !== h.name,
          selected: (o == null ? void 0 : o.code) === h.code,
          onClick: () => y(h.code)
        },
        h.code
      )) : Array.from({ length: t }).map((h, f) => /* @__PURE__ */ r("div", { className: z.placeholder }, f)) })
    ] })
  ] }) }) : null;
}, vt = "_variantContainer_1cgzk_1", Nt = "_option_1cgzk_8", wt = "_selected_1cgzk_25", gt = "_flag_1cgzk_29", ut = "_text_1cgzk_37", Ct = "_native_1cgzk_46", Lt = "_english_1cgzk_55", yt = "_variant_1cgzk_1", x = {
  variantContainer: vt,
  option: Nt,
  selected: wt,
  flag: gt,
  text: ut,
  native: Ct,
  english: Lt,
  variant: yt
}, Et = ({
  language: e,
  showFlags: n = !1,
  showEnglishName: t = !0,
  selected: o = !1,
  onClick: s
}) => /* @__PURE__ */ c(
  "button",
  {
    className: `${x.option} ${o ? x.selected : ""}`,
    onClick: s,
    type: "button",
    children: [
      n && e.flagSvgDataUris.length > 0 && /* @__PURE__ */ r("img", { className: x.flag, src: e.flagSvgDataUris[0], alt: "" }),
      /* @__PURE__ */ c("div", { className: x.text, children: [
        /* @__PURE__ */ r("span", { className: x.native, children: e.endonym || e.name }),
        t && e.endonym && e.endonym.toLowerCase() !== e.name.toLowerCase() && /* @__PURE__ */ r("span", { className: x.english, children: e.name })
      ] }),
      /* @__PURE__ */ c("div", { className: x.variantContainer, children: [
        (e.scriptNameLocal || e.scriptNameEnglish) && /* @__PURE__ */ c("span", { className: x.variant, children: [
          e.scriptNameLocal,
          e.scriptNameLocal && e.scriptNameEnglish && e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase() && " | ",
          e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && e.scriptNameEnglish
        ] }),
        (e.regionNameNative || e.regionNameEnglish) && /* @__PURE__ */ c("span", { className: x.variant, children: [
          e.regionNameNative,
          e.regionNameNative && e.regionNameEnglish && e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase() && " | ",
          e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && e.regionNameEnglish
        ] })
      ] })
    ]
  }
), bt = "_pixel_16e0b_1", kt = "_dropdown_16e0b_10", $t = "_upward_16e0b_27", xt = "_right_16e0b_34", Dt = "_content_16e0b_39", jt = "_loadingOverlay_16e0b_47", Ft = "_list_16e0b_63", St = "_empty_16e0b_70", zt = "_spinner_16e0b_77", Mt = "_placeholder_16e0b_114", b = {
  pixel: bt,
  dropdown: kt,
  upward: $t,
  right: xt,
  content: Dt,
  loadingOverlay: jt,
  list: Ft,
  empty: St,
  spinner: zt,
  placeholder: Mt
}, It = ({
  displayLanguages: e = [],
  isLoading: n = !1,
  skeletonCount: t = 0,
  selectedEntry: o = null,
  isOpen: s,
  showEnglishName: a = !0,
  showFlags: i = !1,
  selectLanguage: d,
  close: m
}) => {
  const [p, v] = k(""), [M, y] = k(!1), [j, h] = k(!1), [f, $] = k(0), N = X(null), q = X(null), Z = fe(), E = D(() => {
    m(), v("");
  }, [m]), L = (l) => {
    d(l), E();
  }, T = D(
    (l) => {
      l.key === "Escape" && E();
    },
    [E]
  );
  O(() => {
    if (!s) return;
    const l = (w) => T(w);
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [s, T]), O(() => {
    if (!s || !N.current || !q.current) return;
    const l = q.current.getBoundingClientRect(), w = N.current.getBoundingClientRect(), F = document.documentElement.clientHeight, Y = document.documentElement.clientWidth, P = w.height, S = w.width, u = l.top, I = l.left, V = F - u;
    y(V < P && u > P);
    const H = Y - I, _ = I;
    H < S && _ < S ? (h(!1), $(-I)) : H < S ? (h(!0), $(0)) : (h(!1), $(0));
    const C = (he) => {
      var ne;
      (ne = N.current) != null && ne.contains(he.target) || E();
    }, G = setTimeout(() => {
      window.addEventListener("click", C);
    }, 0);
    return () => {
      clearTimeout(G), window.removeEventListener("click", C);
    };
  }, [s, E]);
  const A = W(
    () => ce(e, p),
    [e, p]
  );
  return /* @__PURE__ */ c(U, { children: [
    /* @__PURE__ */ r("span", { ref: q, className: b.pixel }),
    s && /* @__PURE__ */ r(
      "div",
      {
        ref: N,
        className: `${b.dropdown} ${M ? b.upward : ""} ${j ? b.right : ""}`,
        style: f ? { transform: `translateX(${f}px)` } : void 0,
        children: /* @__PURE__ */ c("div", { className: b.content, children: [
          n && /* @__PURE__ */ r("div", { className: b.loadingOverlay, children: /* @__PURE__ */ r("div", { className: b.spinner }) }),
          /* @__PURE__ */ r(
            le,
            {
              value: p,
              onChange: v,
              variant: "compact",
              autoFocus: !0,
              onKeyDown: T
            }
          ),
          /* @__PURE__ */ r("div", { className: b.list, children: e.length > 0 ? /* @__PURE__ */ c(U, { children: [
            A.length === 0 && /* @__PURE__ */ r("div", { className: b.empty, children: "No languages found" }),
            A.map((l) => /* @__PURE__ */ r(
              Et,
              {
                language: l,
                showFlags: i,
                showEnglishName: a && !!l.endonym && l.endonym !== l.name,
                selected: (o == null ? void 0 : o.code) === l.code,
                onClick: () => L(l.code)
              },
              l.code
            ))
          ] }) : Array.from({ length: t }).map((l, w) => /* @__PURE__ */ r("div", { className: b.placeholder }, w)) })
        ] })
      },
      Z
    )
  ] });
}, Rt = "_btn_1o64a_1", Ut = "_sm_1o64a_27", Tt = "_flag_1o64a_31", K = {
  btn: Rt,
  sm: Ut,
  flag: Tt
}, Ot = ({
  text: e = "Language",
  size: n = "lg",
  onClick: t,
  onMouseEnter: o,
  selectedLanguage: s,
  displaySelected: a = !1,
  showFlag: i = !1
}) => {
  var v;
  const d = a && s ? s.endonym || s.name : e, m = a && i && ((v = s == null ? void 0 : s.flagSvgDataUris) != null && v.length) ? s.flagSvgDataUris[0] : null, p = a && s;
  return /* @__PURE__ */ r(
    "button",
    {
      className: `${K.btn} ${n === "sm" ? K.sm : ""}`,
      onClick: t,
      onMouseEnter: o,
      children: n === "lg" ? /* @__PURE__ */ c(U, { children: [
        p && m ? /* @__PURE__ */ r("img", { className: K.flag, src: m, alt: "" }) : /* @__PURE__ */ r(te, { width: "18", height: "18" }),
        /* @__PURE__ */ r("span", { children: d }),
        /* @__PURE__ */ r($e, { width: "16", height: "16" })
      ] }) : /* @__PURE__ */ c(U, { children: [
        /* @__PURE__ */ r(te, { width: "18", height: "18" }),
        p && m && /* @__PURE__ */ r("img", { className: K.flag, src: m, alt: "" })
      ] })
    }
  );
}, qt = "_wrapper_1qnc8_1", At = "_error_1qnc8_6", Ht = "_errorDetails_1qnc8_25", Q = {
  wrapper: qt,
  error: At,
  errorDetails: Ht
}, me = ({
  staticData: e,
  languages: n = [],
  displayOptions: t = {},
  loadOptions: o = {},
  selectedLanguage: s,
  onSelectedLanguageChange: a,
  onSelection: i
}) => {
  const d = t.showEnglishName ?? !1, m = t.flagMode ?? "single", p = t.isModal ?? !0, v = t.placeholderText ?? "Language", M = t.displaySelected ?? !1, y = o.autoSelect ?? !1, [j, h] = k(null), [f, $] = k(!1), [N, q] = k(null), [Z, E] = k(null), [L, T] = k(!1), A = X(!1), l = s !== void 0, w = l ? s : j, F = D(async () => {
    if (!(L || N || e)) {
      if (!n || n.length === 0) {
        E(new Error("No languages provided"));
        return;
      }
      T(!0);
      try {
        const _ = await ie(n, t, o);
        q(_), E(null);
      } catch (_) {
        E(_ instanceof Error ? _ : new Error(String(_)));
      } finally {
        T(!1);
      }
    }
  }, [L, N, e, n, t, o]), Y = D(() => {
    !e && !N && !L && F();
  }, [e, N, L, F]), P = D(() => {
    $((_) => !_), !e && !N && !L && F();
  }, [e, N, L, F]), S = e ?? N, u = W(() => S ? Ee(S, m, S.flags) : [], [S, m]), I = W(() => w ? u.find((_) => _.code === w.code) ?? w : null, [w, u]);
  O(() => {
    y && !e && !N && !L && F();
  }, [y]), O(() => {
    if (y && !A.current && u.length > 0 && !w) {
      const _ = be(), C = ke(_, u);
      C && (A.current = !0, l || h(C), a == null || a(C), i == null || i(C));
    }
  }, [y, u, w, l, a, i]);
  const V = D(
    (_) => {
      const C = u.find((G) => G.code === _);
      C && (l || h(C), a == null || a(C), i == null || i(C));
    },
    [l, u, a, i]
  ), H = D(() => {
    $(!1);
  }, []);
  return /* @__PURE__ */ c("div", { className: Q.wrapper, children: [
    /* @__PURE__ */ r(
      Ot,
      {
        onMouseEnter: Y,
        onClick: P,
        size: t.buttonSize,
        text: v,
        displaySelected: M,
        selectedLanguage: I,
        showFlag: m !== "none"
      }
    ),
    Z && /* @__PURE__ */ c("div", { className: Q.error, children: [
      /* @__PURE__ */ r("p", { children: "Failed to load languages" }),
      /* @__PURE__ */ r("p", { className: Q.errorDetails, children: Z.message }),
      /* @__PURE__ */ r("button", { onClick: F, children: "Retry" }),
      /* @__PURE__ */ r("hr", {}),
      /* @__PURE__ */ r("button", { onClick: () => E(null), children: "Close" })
    ] }),
    p ? /* @__PURE__ */ r(
      _t,
      {
        displayLanguages: u,
        isLoading: L,
        skeletonCount: n.length,
        selectedEntry: I,
        isOpen: f,
        showEnglishName: d,
        showFlags: m !== "none",
        selectLanguage: V,
        close: H
      }
    ) : /* @__PURE__ */ r(
      It,
      {
        displayLanguages: u,
        isLoading: L,
        skeletonCount: n.length,
        selectedEntry: I,
        isOpen: f,
        showEnglishName: d,
        showFlags: m !== "none",
        selectLanguage: V,
        close: H
      }
    )
  ] });
}, Vt = ({
  languages: e,
  displayOptions: n = {},
  loadOptions: t = {},
  selectedLanguage: o,
  onSelectedLanguageChange: s,
  onSelection: a
}) => !e || e.length === 0 ? (console.error("[LanguageSelector] No languages provided."), null) : /* @__PURE__ */ r(
  me,
  {
    languages: e,
    displayOptions: n,
    loadOptions: t,
    selectedLanguage: o,
    onSelectedLanguageChange: s,
    onSelection: a
  }
), Jt = ({
  staticFileData: e,
  selectedLanguage: n,
  onSelectedLanguageChange: t,
  onSelection: o,
  displayOptions: s
}) => {
  const { data: a, displayOptions: i } = W(
    () => Ce(e),
    [e]
  );
  return /* @__PURE__ */ r(
    me,
    {
      staticData: a,
      displayOptions: s ?? i ?? void 0,
      selectedLanguage: n,
      onSelectedLanguageChange: t,
      onSelection: o
    }
  );
};
export {
  Et as DropdownOption,
  de as FlagDisplay,
  It as LanguageDropdown,
  _t as LanguageModal,
  et as LanguageOption,
  Vt as LanguageSelector,
  me as LanguageSelectorHandler,
  Jt as LanguageSelectorStatic,
  Ot as LocalizeButton,
  Me as Modal,
  le as SearchInput,
  at as SelectedLanguageDisplay,
  Ee as buildDisplayLanguages,
  Pt as downloadStaticDataFile,
  ce as filterLanguages,
  ke as findMatchingLanguage,
  Zt as generateStaticDataFile,
  be as getBrowserLocales,
  Ce as loadDataFromFile,
  ye as svgToDataUri
};
