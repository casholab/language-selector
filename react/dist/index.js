import { jsx as r, jsxs as c, Fragment as D } from "react/jsx-runtime";
import { useCallback as b, useEffect as M, useRef as V, useState as y, useMemo as O } from "react";
const J = "https://lsapi.casholab.com";
async function K(e, t, n) {
  const s = await ie(e, {
    flagDisplayMode: t.flagMode,
    apiUrl: n.apiUrl,
    flagLoadMode: n.flagLoadMode
  });
  return await ae(s, n.flagLoadMode);
}
async function ie(e, t = {}) {
  const { flagDisplayMode: n = "none", apiUrl: s = J } = t, o = new URLSearchParams({
    l: e.join(","),
    f: n
  }), i = await fetch(`${s}/languages?${o}`);
  if (!i.ok) {
    const d = await i.json().catch(() => ({ error: "Request failed" }));
    throw new Error(d.error || `HTTP ${i.status}`);
  }
  const a = await i.json();
  if (!a.resolved || a.resolved.length === 0)
    throw new Error("Invalid response: no valid languages returned");
  return a;
}
async function ae(e, t = "multi", n = J) {
  if (e.flags && Object.keys(e.flags).length > 0)
    return e;
  const s = ce(e);
  if (s.length === 0)
    return e;
  let o;
  return t === "single" ? o = await le(n) : o = await he(s, n), { ...e, flags: o };
}
function ce(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of Object.values(e.data))
    if (n.flags && n.flags.forEach((s) => t.add(s.toLowerCase())), n.scriptFlags)
      for (const s of Object.values(n.scriptFlags))
        s.forEach((o) => t.add(o.toLowerCase()));
  return Array.from(t);
}
async function le(e) {
  const t = await fetch(`${e}/all-flags`);
  if (!t.ok)
    throw new Error(`Failed to fetch flags: HTTP ${t.status}`);
  return await t.json();
}
async function de(e, t) {
  const n = await fetch(`${t}/flags/${e.toLowerCase()}`);
  if (!n.ok) {
    if (n.status === 404) return null;
    throw new Error(`Failed to fetch flag: HTTP ${n.status}`);
  }
  return n.text();
}
async function he(e, t) {
  const n = {}, s = await Promise.all(
    e.map(async (o) => {
      const i = await de(o, t);
      return { code: o.toLowerCase(), svg: i };
    })
  );
  for (const { code: o, svg: i } of s)
    i && (n[o] = i);
  return n;
}
const me = "1.0.0";
function pe(e) {
  let t;
  if (typeof e == "string")
    try {
      t = JSON.parse(e);
    } catch (o) {
      throw new Error(
        "Invalid JSON format: " + (o instanceof Error ? o.message : String(o))
      );
    }
  else
    t = e;
  if (typeof t != "object" || t === null)
    throw new Error("Invalid input: expected object");
  const n = t;
  if ("data" in n && n.data && typeof n.data == "object") {
    const o = B(n.data), i = n.displayOptions && typeof n.displayOptions == "object" ? n.displayOptions : null;
    return { data: o, displayOptions: i };
  }
  return { data: B(t), displayOptions: null };
}
function B(e) {
  if (!e || typeof e != "object")
    throw new Error("Invalid language data: expected object");
  const t = e;
  if (!t.data || typeof t.data != "object")
    throw new Error("Invalid language data: missing 'data' field");
  if (!Array.isArray(t.resolved) || t.resolved.length === 0)
    throw new Error("Invalid language data: missing or empty 'resolved' array");
  const n = t.data;
  let s = !1;
  for (const o of Object.values(n))
    if (o && typeof o == "object") {
      const a = o.data;
      if (a) {
        const d = typeof a.code == "string" && a.code.length > 0, p = typeof a.name == "string" && a.name.length > 0, v = typeof a.endonym == "string" && a.endonym.length > 0;
        if (d && (p || v)) {
          s = !0;
          break;
        }
      }
    }
  if (!s)
    throw new Error(
      "Invalid language data: requires at least 1 language with code and name/endonym"
    );
  return e;
}
async function zt(e, t, n) {
  const s = await K(
    e,
    t,
    n
  );
  return {
    displayOptions: t,
    languageData: s,
    meta: {
      generatedTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: me
    }
  };
}
function Dt(e) {
  const t = new Blob([JSON.stringify(e, null, 2)], {
    type: "application/json"
  }), n = URL.createObjectURL(t), s = document.createElement("a");
  s.href = n, s.download = "language-data.json", s.click();
}
function fe(e) {
  const t = e.split("-"), n = { lang: t[0] };
  for (let s = 1; s < t.length; s++) {
    const o = t[s];
    o.length === 4 && /^[A-Za-z]{4}$/.test(o) ? n.script = o : o.length === 2 && /^[A-Za-z]{2}$/.test(o) && (n.region = o);
  }
  return n;
}
function _e(e, t, n) {
  var s;
  return n === "none" || !t ? [] : e.region ? [e.region.toLowerCase()] : e.script && ((s = t.scriptFlags) != null && s[e.script]) ? t.scriptFlags[e.script] : t.flags ?? [];
}
function X(e) {
  return "data:image/svg+xml," + encodeURIComponent(e);
}
function ve(e, t) {
  return e.resolved.map((n) => {
    var m, w;
    const s = fe(n), o = e.data[s.lang];
    let i, a, d, p, v = (o == null ? void 0 : o.data.endonym) ?? "";
    if (s.region && ((m = o == null ? void 0 : o.regionData) != null && m[s.region])) {
      const h = o.regionData[s.region];
      i = h.regionNameEnglish, a = h.regionNameNative;
    }
    if (s.script && ((w = o == null ? void 0 : o.scriptData) != null && w[s.script])) {
      const h = o.scriptData[s.script];
      d = h.scriptNameEnglish, p = h.scriptNameLocal, v = h.languageInScript || v;
    }
    const g = _e(s, o, t);
    return {
      code: n,
      name: (o == null ? void 0 : o.data.name) ?? n,
      endonym: v,
      regionNameEnglish: i,
      regionNameNative: a,
      scriptNameEnglish: d,
      scriptNameLocal: p,
      flagCodes: g
    };
  });
}
function G(e, t) {
  if (!t) return e;
  const n = t.toLowerCase();
  return e.filter(
    (s) => s.name.toLowerCase().includes(n) || s.endonym.toLowerCase().includes(n) || s.code.toLowerCase().includes(n) || s.regionNameEnglish && s.regionNameEnglish.toLowerCase().includes(n) || s.regionNameNative && s.regionNameNative.toLowerCase().includes(n) || s.scriptNameEnglish && s.scriptNameEnglish.toLowerCase().includes(n) || s.scriptNameLocal && s.scriptNameLocal.toLowerCase().includes(n)
  );
}
const Q = ({
  width: e = "24",
  height: t = "24",
  color: n = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: t,
    viewBox: "0 0 400 364",
    fill: "none",
    children: /* @__PURE__ */ r(
      "path",
      {
        d: "M269.958 133.006C277.449 129.385 286.184 129.385 293.675 133.006L293.675 133.006C300.193 136.157 303.727 141.647 305.482 144.6C306.931 147.038 308.409 150.006 309.877 153.053L311.339 156.108L311.34 156.109L363.435 265.144L363.436 265.145L398.217 337.944C402.549 347.011 398.717 357.878 389.658 362.215C380.6 366.551 369.745 362.716 365.412 353.648L335.575 291.197H228.058L198.221 353.648C193.888 362.716 183.033 366.551 173.974 362.215C164.915 357.878 161.084 347.011 165.416 337.944L252.293 156.109L252.293 156.108C254.236 152.044 256.219 147.85 258.15 144.6C259.905 141.647 263.44 136.156 269.958 133.006ZM109.093 18.1996C109.093 8.14815 117.233 0 127.274 0C137.315 0 145.455 8.14815 145.455 18.1996V36.3992H236.363C246.404 36.3992 254.544 44.5479 254.544 54.5994C254.544 64.6508 246.404 72.799 236.363 72.799H205.968C196.654 116.969 179.546 157.739 155.723 193.585C160.911 196.781 166.067 199.538 171.088 201.796C180.247 205.915 184.337 216.687 180.221 225.856C176.106 235.025 165.345 239.118 156.186 234.999C148.681 231.624 141.196 227.516 133.88 222.837C104.662 257.777 68.3185 286.581 26.2765 307.495C17.2844 311.968 6.37227 308.297 1.90357 299.296C-2.56499 290.295 1.1022 279.372 10.0943 274.898C47.1711 256.454 79.1804 231.207 104.999 200.661C84.2915 181.895 66.1749 158.631 55.9818 134.482C52.0737 125.223 56.4038 114.546 65.6533 110.634C74.9029 106.722 85.5694 111.056 89.4776 120.315C96.8424 137.763 110.426 155.897 126.838 171.313C146.005 141.934 160.241 108.778 168.712 72.799H18.1854C8.1441 72.799 0.00420549 64.6508 0.00410879 54.5994C0.00410879 44.5479 8.14404 36.3992 18.1854 36.3992H109.093V18.1996ZM245.449 254.797H318.183L281.816 178.68L245.449 254.797Z",
        fill: n
      }
    )
  }
), we = ({
  width: e = "24",
  height: t = "24",
  color: n = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: n,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ r("polyline", { points: "6 9 12 15 18 9" })
  }
), P = ({
  width: e = "24",
  height: t = "24",
  color: n = "currentColor"
}) => /* @__PURE__ */ r(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: t,
    viewBox: "0 0 360 360",
    fill: "none",
    children: /* @__PURE__ */ r(
      "path",
      {
        d: "M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z",
        fill: n
      }
    )
  }
), Ne = ({
  width: e = "24",
  height: t = "24",
  color: n = "currentColor"
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: n,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ r("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ r("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), ue = "_close_10rmb_1", ge = "_outer_10rmb_22", Le = "_overlay_10rmb_32", Ce = "_container_10rmb_44", ye = "_body_10rmb_59", S = {
  close: ue,
  outer: ge,
  overlay: Le,
  container: Ce,
  body: ye
}, Ee = ({
  close: e,
  xbutton: t = !1,
  bgCloses: n = !0,
  children: s
}) => {
  const o = b(
    (a) => {
      n && a.target === a.currentTarget && e();
    },
    [n, e]
  ), i = b(
    (a) => {
      a.key === "Escape" && n && e();
    },
    [n, e]
  );
  return M(() => (window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i)), [i]), /* @__PURE__ */ c("div", { className: S.outer, children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: S.overlay,
        onClick: o,
        "aria-label": "Close modal",
        role: "button",
        tabIndex: 0
      }
    ),
    /* @__PURE__ */ r("div", { className: S.container, children: /* @__PURE__ */ c("div", { className: S.body, children: [
      t && /* @__PURE__ */ r(
        "button",
        {
          className: S.close,
          onClick: e,
          "aria-label": "close",
          children: /* @__PURE__ */ r(Ne, {})
        }
      ),
      s
    ] }) })
  ] });
}, $e = "_search_18os4_1", be = "_searchCompact_18os4_35", Z = {
  search: $e,
  searchCompact: be
}, Y = ({
  value: e,
  onChange: t,
  placeholder: n = "Search languages...",
  variant: s = "default",
  autoFocus: o = !1,
  onKeyDown: i
}) => {
  const a = V(null);
  return M(() => {
    o && a.current && a.current.focus();
  }, [o]), s === "default" ? /* @__PURE__ */ c("label", { htmlFor: "ls-search", className: Z.search, children: [
    /* @__PURE__ */ r(P, { width: "18", height: "18" }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: a,
        id: "ls-search",
        type: "text",
        placeholder: n,
        value: e,
        onChange: (d) => t(d.target.value),
        onKeyDown: i
      }
    )
  ] }) : /* @__PURE__ */ c("div", { className: Z.searchCompact, children: [
    /* @__PURE__ */ r(P, { width: "16", height: "16" }),
    /* @__PURE__ */ r(
      "input",
      {
        ref: a,
        type: "text",
        placeholder: n,
        value: e,
        onChange: (d) => t(d.target.value),
        onKeyDown: i
      }
    )
  ] });
}, ke = "_flags_jz6q8_1", je = "_flag_jz6q8_1", Fe = "_sm_jz6q8_13", xe = "_single_jz6q8_13", ze = "_md_jz6q8_25", De = "_row_jz6q8_39", Ie = "_grid_jz6q8_50", Se = "_lg_jz6q8_63", q = {
  flags: ke,
  flag: je,
  sm: Fe,
  single: xe,
  md: ze,
  row: De,
  grid: Ie,
  lg: Se
}, ee = ({
  flagCodes: e,
  flags: t,
  size: n = "md"
}) => {
  if (e.length === 0 || !t) return null;
  const s = e.length > 2 ? "grid" : e.length === 2 ? "row" : "single";
  return /* @__PURE__ */ r("div", { className: `${q.flags} ${q[s]} ${q[n]}`, children: e.map((o) => {
    const i = t[o] ?? t[o.toLowerCase()];
    return i ? /* @__PURE__ */ r(
      "img",
      {
        className: q.flag,
        src: X(i),
        alt: "",
        title: o
      },
      o
    ) : null;
  }) });
}, Me = "_option_1uwwe_1", Oe = "_selected_1uwwe_21", Te = "_content_1uwwe_26", He = "_native_1uwwe_30", Re = "_english_1uwwe_31", qe = "_meta_1uwwe_46", Ae = "_metaNative_1uwwe_53", Ue = "_metaEnglish_1uwwe_64", C = {
  option: Me,
  selected: Oe,
  content: Te,
  native: He,
  english: Re,
  meta: qe,
  metaNative: Ae,
  metaEnglish: Ue
}, Be = ({
  language: e,
  flags: t,
  showFlags: n = !1,
  showEnglishName: s = !0,
  selected: o = !1,
  onClick: i
}) => {
  const a = e.regionNameNative || e.regionNameEnglish || e.scriptNameLocal || e.scriptNameEnglish;
  return /* @__PURE__ */ c(
    "button",
    {
      className: `${C.option} ${o ? C.selected : ""}`,
      onClick: i,
      children: [
        n && e.flagCodes.length > 0 && t && /* @__PURE__ */ r(ee, { flagCodes: e.flagCodes, flags: t, size: "md" }),
        /* @__PURE__ */ c("div", { className: C.content, children: [
          /* @__PURE__ */ r("div", { className: C.native, children: e.endonym || e.name }),
          s && /* @__PURE__ */ r("div", { className: C.english, children: /* @__PURE__ */ r("span", { className: C.name, children: e.name }) })
        ] }),
        a && /* @__PURE__ */ c(D, { children: [
          (e.regionNameNative || e.regionNameEnglish) && /* @__PURE__ */ c("div", { className: C.meta, children: [
            /* @__PURE__ */ r("div", { className: C.metaNative, children: e.regionNameNative || "" }),
            s && e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && /* @__PURE__ */ r("div", { className: C.metaEnglish, children: e.regionNameEnglish })
          ] }),
          (e.scriptNameLocal || e.scriptNameEnglish) && /* @__PURE__ */ c("div", { className: C.meta, children: [
            /* @__PURE__ */ r("div", { className: C.metaNative, children: e.scriptNameLocal || "" }),
            s && e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && /* @__PURE__ */ r("div", { className: C.metaEnglish, children: e.scriptNameEnglish })
          ] })
        ] })
      ]
    }
  );
}, Pe = "_selected_vh9v3_1", Ze = "_native_vh9v3_11", We = "_english_vh9v3_17", Ve = "_scriptLocal_vh9v3_22", Je = "_regionLocal_vh9v3_23", z = {
  selected: Pe,
  native: Ze,
  english: We,
  scriptLocal: Ve,
  regionLocal: Je
}, Ke = ({
  language: e,
  flags: t,
  showFlags: n = !1,
  showEnglishName: s = !0
}) => /* @__PURE__ */ c("div", { className: z.selected, children: [
  /* @__PURE__ */ c("div", { className: z.native, children: [
    e.endonym || e.name,
    e.scriptNameLocal && /* @__PURE__ */ c("span", { className: z.scriptLocal, children: [
      "(",
      e.scriptNameLocal,
      ")"
    ] }),
    e.regionNameNative && /* @__PURE__ */ c("span", { className: z.regionLocal, children: [
      "(",
      e.regionNameNative,
      ")"
    ] })
  ] }),
  s && /* @__PURE__ */ c("div", { className: z.english, children: [
    /* @__PURE__ */ r("span", { className: z.name, children: e.name }),
    (e.regionNameEnglish || e.scriptNameEnglish) && /* @__PURE__ */ c("span", { className: z.variant, children: [
      e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && /* @__PURE__ */ c(D, { children: [
        "(",
        e.scriptNameEnglish,
        ")"
      ] }),
      e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && /* @__PURE__ */ c(D, { children: [
        " ",
        e.regionNameEnglish
      ] })
    ] })
  ] }),
  n && e.flagCodes.length > 0 && t && /* @__PURE__ */ r(ee, { flagCodes: e.flagCodes, flags: t, size: "lg" })
] }), Xe = "_divider_ydyen_1", Ge = "_container_ydyen_11", Qe = "_content_ydyen_16", Ye = "_loadingOverlay_ydyen_20", et = "_spinner_ydyen_36", tt = "_error_ydyen_49", nt = "_header_ydyen_58", st = "_list_ydyen_68", ot = "_placeholder_ydyen_76", $ = {
  divider: Xe,
  container: Ge,
  content: Qe,
  loadingOverlay: Ye,
  spinner: et,
  error: tt,
  header: nt,
  list: st,
  placeholder: ot
}, rt = ({
  displayLanguages: e = [],
  flags: t,
  isLoading: n = !1,
  error: s = null,
  skeletonCount: o = 0,
  selectedEntry: i = null,
  isOpen: a,
  showEnglishName: d = !0,
  showFlags: p = !1,
  selectLanguage: v,
  close: g
}) => {
  const [m, w] = y(""), h = () => {
    g(), w("");
  }, k = (f) => {
    v(f), h();
  }, N = O(
    () => G(e, m),
    [e, m]
  );
  return a ? /* @__PURE__ */ r(Ee, { close: h, xbutton: !0, bgCloses: !0, children: /* @__PURE__ */ c("div", { className: $.container, children: [
    /* @__PURE__ */ c("header", { className: $.header, children: [
      /* @__PURE__ */ r(Q, { width: "20", height: "20" }),
      /* @__PURE__ */ r("span", { children: "Select a Language" })
    ] }),
    s ? /* @__PURE__ */ c("div", { className: $.error, children: [
      /* @__PURE__ */ r("p", { children: "Failed to load languages" }),
      /* @__PURE__ */ r("p", { className: $.errorDetails, children: s.message })
    ] }) : /* @__PURE__ */ c("div", { className: $.content, children: [
      n && /* @__PURE__ */ r("div", { className: $.loadingOverlay, children: /* @__PURE__ */ r("div", { className: $.spinner }) }),
      i && /* @__PURE__ */ c(D, { children: [
        /* @__PURE__ */ r(
          Ke,
          {
            language: i,
            flags: t,
            showFlags: p,
            showEnglishName: d && !!i.endonym && i.endonym !== i.name
          }
        ),
        /* @__PURE__ */ r("hr", { className: $.divider })
      ] }),
      /* @__PURE__ */ r(Y, { value: m, onChange: w }),
      /* @__PURE__ */ r("div", { className: $.list, children: e.length > 0 ? N.map((f) => /* @__PURE__ */ r(
        Be,
        {
          language: f,
          flags: t,
          showFlags: p,
          showEnglishName: d && !!f.endonym && f.endonym !== f.name,
          selected: (i == null ? void 0 : i.code) === f.code,
          onClick: () => k(f.code)
        },
        f.code
      )) : Array.from({ length: o }).map((f, _) => /* @__PURE__ */ r("div", { className: $.placeholder }, _)) })
    ] })
  ] }) }) : null;
}, it = "_variantContainer_1cgzk_1", at = "_option_1cgzk_8", ct = "_selected_1cgzk_25", lt = "_flag_1cgzk_29", dt = "_text_1cgzk_37", ht = "_native_1cgzk_46", mt = "_english_1cgzk_55", pt = "_variant_1cgzk_1", j = {
  variantContainer: it,
  option: at,
  selected: ct,
  flag: lt,
  text: dt,
  native: ht,
  english: mt,
  variant: pt
}, ft = ({
  language: e,
  flags: t,
  showFlags: n = !1,
  showEnglishName: s = !0,
  selected: o = !1,
  onClick: i
}) => {
  const a = n && e.flagCodes.length > 0 && t ? t[e.flagCodes[0]] : null;
  return /* @__PURE__ */ c(
    "button",
    {
      className: `${j.option} ${o ? j.selected : ""}`,
      onClick: i,
      type: "button",
      children: [
        a && /* @__PURE__ */ r("img", { className: j.flag, src: X(a), alt: "" }),
        /* @__PURE__ */ c("div", { className: j.text, children: [
          /* @__PURE__ */ r("span", { className: j.native, children: e.endonym || e.name }),
          s && e.endonym && e.endonym.toLowerCase() !== e.name.toLowerCase() && /* @__PURE__ */ r("span", { className: j.english, children: e.name })
        ] }),
        /* @__PURE__ */ c("div", { className: j.variantContainer, children: [
          (e.scriptNameLocal || e.scriptNameEnglish) && /* @__PURE__ */ c("span", { className: j.variant, children: [
            e.scriptNameLocal,
            e.scriptNameLocal && e.scriptNameEnglish && e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase() && " | ",
            e.scriptNameEnglish && (!e.scriptNameLocal || e.scriptNameLocal.toLowerCase() !== e.scriptNameEnglish.toLowerCase()) && e.scriptNameEnglish
          ] }),
          (e.regionNameNative || e.regionNameEnglish) && /* @__PURE__ */ c("span", { className: j.variant, children: [
            e.regionNameNative,
            e.regionNameNative && e.regionNameEnglish && e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase() && " | ",
            e.regionNameEnglish && (!e.regionNameNative || e.regionNameNative.toLowerCase() !== e.regionNameEnglish.toLowerCase()) && e.regionNameEnglish
          ] })
        ] })
      ]
    }
  );
}, _t = "_dropdown_vi1h5_1", vt = "_upward_vi1h5_18", wt = "_right_vi1h5_25", Nt = "_content_vi1h5_30", ut = "_loadingOverlay_vi1h5_38", gt = "_list_vi1h5_54", Lt = "_empty_vi1h5_61", Ct = "_spinner_vi1h5_68", yt = "_error_vi1h5_81", Et = "_placeholder_vi1h5_105", E = {
  dropdown: _t,
  upward: vt,
  right: wt,
  content: Nt,
  loadingOverlay: ut,
  list: gt,
  empty: Lt,
  spinner: Ct,
  error: yt,
  placeholder: Et
}, $t = ({
  displayLanguages: e = [],
  flags: t,
  isLoading: n = !1,
  error: s = null,
  skeletonCount: o = 0,
  selectedEntry: i = null,
  isOpen: a,
  showEnglishName: d = !0,
  showFlags: p = !1,
  selectLanguage: v,
  close: g
}) => {
  const [m, w] = y(""), [h, k] = y(!1), [N, f] = y(!1), _ = V(null), F = b(() => {
    g(), w("");
  }, [g]), T = (l) => {
    v(l), F();
  }, u = b(
    (l) => {
      l.key === "Escape" && F();
    },
    [F]
  );
  M(() => {
    if (!a) return;
    const l = (x) => u(x);
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [a, u]), M(() => {
    if (!a || !_.current) return;
    const l = _.current.getBoundingClientRect(), x = window.innerHeight, H = window.innerWidth, R = x - l.top, L = l.height;
    k(R < L && l.top > L), l.right > H && f(!0);
    const A = (re) => {
      var U;
      (U = _.current) != null && U.contains(re.target) || F();
    }, oe = setTimeout(() => {
      window.addEventListener("click", A);
    }, 0);
    return () => {
      clearTimeout(oe), window.removeEventListener("click", A);
    };
  }, [a, F]);
  const I = O(
    () => G(e, m),
    [e, m]
  );
  return a ? /* @__PURE__ */ r(
    "div",
    {
      ref: _,
      className: `${E.dropdown} ${h ? E.upward : ""} ${N ? E.right : ""}`,
      children: s ? /* @__PURE__ */ c("div", { className: E.error, children: [
        /* @__PURE__ */ r("p", { children: "Failed to load" }),
        /* @__PURE__ */ r("p", { className: E.errorDetails, children: s.message })
      ] }) : /* @__PURE__ */ c("div", { className: E.content, children: [
        n && /* @__PURE__ */ r("div", { className: E.loadingOverlay, children: /* @__PURE__ */ r("div", { className: E.spinner }) }),
        /* @__PURE__ */ r(
          Y,
          {
            value: m,
            onChange: w,
            variant: "compact",
            autoFocus: !0,
            onKeyDown: u
          }
        ),
        /* @__PURE__ */ r("div", { className: E.list, children: e.length > 0 ? /* @__PURE__ */ c(D, { children: [
          I.length === 0 && /* @__PURE__ */ r("div", { className: E.empty, children: "No languages found" }),
          I.map((l) => /* @__PURE__ */ r(
            ft,
            {
              language: l,
              flags: t,
              showFlags: p,
              showEnglishName: d && !!l.endonym && l.endonym !== l.name,
              selected: (i == null ? void 0 : i.code) === l.code,
              onClick: () => T(l.code)
            },
            l.code
          ))
        ] }) : Array.from({ length: o }).map((l, x) => /* @__PURE__ */ r("div", { className: E.placeholder }, x)) })
      ] })
    }
  ) : null;
}, te = ({
  staticData: e,
  languages: t = [],
  displayOptions: n = {},
  loadOptions: s = {},
  selectedLanguage: o,
  onSelectedLanguageChange: i,
  isOpen: a,
  onOpenChange: d,
  onSelection: p,
  preload: v = !1
}) => {
  const g = n.showEnglishName ?? !0, m = n.flagMode ?? "none", w = n.isModal ?? !0, [h, k] = y(null), [N, f] = y(null), [_, F] = y(!1), T = b(async () => {
    if (!(_ || h || e)) {
      if (!t || t.length === 0) {
        f(new Error("No languages provided"));
        return;
      }
      F(!0);
      try {
        const L = await K(t, n, s);
        k(L), f(null);
      } catch (L) {
        f(L instanceof Error ? L : new Error(String(L)));
      } finally {
        F(!1);
      }
    }
  }, [_, h, e, t, n, s]);
  M(() => {
    (a || v) && !e && !h && !_ && T();
  }, [a, v, e, h, _, T]);
  const u = e ?? h, I = _ || !u && !N, l = O(() => u ? ve(u, m) : [], [u, m]), x = O(() => o ? l.find((L) => L.code === o) ?? null : null, [o, l]), H = b(
    (L) => {
      i(L), p == null || p(L);
    },
    [i, p]
  ), R = b(() => {
    d(!1);
  }, [d]);
  return w ? /* @__PURE__ */ r(
    rt,
    {
      displayLanguages: l,
      flags: u == null ? void 0 : u.flags,
      isLoading: I,
      error: N,
      skeletonCount: t.length,
      selectedEntry: x,
      isOpen: a,
      showEnglishName: g,
      showFlags: m !== "none",
      selectLanguage: H,
      close: R
    }
  ) : /* @__PURE__ */ r(
    $t,
    {
      displayLanguages: l,
      flags: u == null ? void 0 : u.flags,
      isLoading: I,
      error: N,
      skeletonCount: t.length,
      selectedEntry: x,
      isOpen: a,
      showEnglishName: g,
      showFlags: m !== "none",
      selectLanguage: H,
      close: R
    }
  );
}, bt = "_btn_1cc9a_1", kt = "_sm_1cc9a_27", W = {
  btn: bt,
  sm: kt
}, ne = ({
  text: e = "Localize",
  size: t = "lg",
  onClick: n,
  onMouseEnter: s
}) => /* @__PURE__ */ c(
  "button",
  {
    className: `${W.btn} ${t === "sm" ? W.sm : ""}`,
    onClick: n,
    onMouseEnter: s,
    children: [
      /* @__PURE__ */ r(Q, { width: "18", height: "18" }),
      t === "lg" && /* @__PURE__ */ c(D, { children: [
        /* @__PURE__ */ r("span", { children: e }),
        /* @__PURE__ */ r(we, { width: "16", height: "16" })
      ] })
    ]
  }
), jt = "_wrapper_1w9b0_1", se = {
  wrapper: jt
}, It = ({
  languages: e,
  displayOptions: t = {},
  loadOptions: n = {},
  selectedLanguage: s,
  onSelectedLanguageChange: o,
  onSelection: i
}) => {
  const [a, d] = y(null), [p, v] = y(!1), [g, m] = y(!1), w = s !== void 0, h = w ? s : a, k = b(
    (N) => {
      w || d(N), o == null || o(N);
    },
    [w, o]
  );
  return !e || e.length === 0 ? (console.error("[LanguageSelector] No languages provided."), null) : /* @__PURE__ */ c("div", { className: se.wrapper, children: [
    /* @__PURE__ */ r(
      ne,
      {
        onMouseEnter: () => m(!0),
        onClick: () => v(!p),
        size: t.buttonSize
      }
    ),
    /* @__PURE__ */ r(
      te,
      {
        preload: g,
        isOpen: p,
        onOpenChange: v,
        selectedLanguage: h,
        onSelectedLanguageChange: k,
        onSelection: i,
        languages: e,
        displayOptions: t,
        loadOptions: n
      }
    )
  ] });
}, St = ({
  staticFileData: e,
  selectedLanguage: t,
  onSelectedLanguageChange: n,
  onSelection: s,
  displayOptions: o
}) => {
  const [i, a] = y(null), [d, p] = y(!1), { data: v, displayOptions: g } = O(
    () => pe(e),
    [e]
  ), m = t !== void 0, w = m ? t : i, h = b(
    (_) => {
      m || a(_), n == null || n(_);
    },
    [m, n]
  ), k = b(
    (_) => {
      h(_), s == null || s(_);
    },
    [h, s]
  ), N = o ?? g ?? void 0, f = N == null ? void 0 : N.buttonSize;
  return /* @__PURE__ */ c("div", { className: se.wrapper, children: [
    /* @__PURE__ */ r(ne, { onClick: () => p(!d), size: f }),
    /* @__PURE__ */ r(
      te,
      {
        isOpen: d,
        onOpenChange: p,
        selectedLanguage: w,
        onSelectedLanguageChange: h,
        onSelection: k,
        staticData: v,
        displayOptions: N
      }
    )
  ] });
};
export {
  ft as DropdownOption,
  ee as FlagDisplay,
  $t as LanguageDropdown,
  rt as LanguageModal,
  Be as LanguageOption,
  It as LanguageSelector,
  te as LanguageSelectorHandler,
  St as LanguageSelectorStatic,
  ne as LocalizeButton,
  Ee as Modal,
  Y as SearchInput,
  Ke as SelectedLanguageDisplay,
  ve as buildDisplayLanguages,
  Dt as downloadStaticDataFile,
  G as filterLanguages,
  zt as generateStaticDataFile,
  pe as loadDataFromFile,
  X as svgToDataUri
};
