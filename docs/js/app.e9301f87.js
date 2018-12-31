(function(e) {
  function t(t) {
    for (
      var i, r, o = t[0], l = t[1], c = t[2], m = 0, u = [];
      m < o.length;
      m++
    )
      (r = o[m]), a[r] && u.push(a[r][0]), (a[r] = 0);
    for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
    d && d(t);
    while (u.length) u.shift()();
    return n.push.apply(n, c || []), s();
  }
  function s() {
    for (var e, t = 0; t < n.length; t++) {
      for (var s = n[t], i = !0, o = 1; o < s.length; o++) {
        var l = s[o];
        0 !== a[l] && (i = !1);
      }
      i && (n.splice(t--, 1), (e = r((r.s = s[0]))));
    }
    return e;
  }
  var i = {},
    a = { app: 0 },
    n = [];
  function r(t) {
    if (i[t]) return i[t].exports;
    var s = (i[t] = { i: t, l: !1, exports: {} });
    return e[t].call(s.exports, s, s.exports, r), (s.l = !0), s.exports;
  }
  (r.m = e),
    (r.c = i),
    (r.d = function(e, t, s) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
    }),
    (r.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var s = Object.create(null);
      if (
        (r.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          r.d(
            s,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return s;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = "/");
  var o = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = o.push.bind(o);
  (o.push = t), (o = o.slice());
  for (var c = 0; c < o.length; c++) t(o[c]);
  var d = l;
  n.push([0, "chunk-vendors"]), s();
})({
  0: function(e, t, s) {
    e.exports = s("56d7");
  },
  "034f": function(e, t, s) {
    "use strict";
    var i = s("64a9"),
      a = s.n(i);
    a.a;
  },
  "079a": function(e, t, s) {
    e.exports = s.p + "img/postgresql.a3f2664e.svg";
  },
  "090e": function(e, t, s) {
    e.exports = s.p + "img/nodejs.8ff631f6.svg";
  },
  "0b74": function(e, t, s) {
    e.exports = s.p + "img/cloudfoundry.686b1478.svg";
  },
  "0b91": function(e, t, s) {
    e.exports = s.p + "img/springboot.75f6e885.svg";
  },
  2458: function(e, t, s) {
    e.exports = s.p + "img/kafka.5824ba73.svg";
  },
  "254d": function(e, t, s) {
    e.exports = s.p + "img/openshift.8eaf7364.svg";
  },
  "3a45": function(e, t, s) {
    e.exports = s.p + "img/golang.8be7caf3.svg";
  },
  "49f8": function(e, t, s) {
    var i = { "./be.json": "d174", "./de.json": "6ce2", "./en.json": "edd4" };
    function a(e) {
      var t = n(e);
      return s(t);
    }
    function n(e) {
      var t = i[e];
      if (!(t + 1)) {
        var s = new Error("Cannot find module '" + e + "'");
        throw ((s.code = "MODULE_NOT_FOUND"), s);
      }
      return t;
    }
    (a.keys = function() {
      return Object.keys(i);
    }),
      (a.resolve = n),
      (e.exports = a),
      (a.id = "49f8");
  },
  "56d7": function(e, t, s) {
    "use strict";
    s.r(t);
    s("ac6a"), s("cadf"), s("551c"), s("097d");
    var i = s("2b0e"),
      a = function() {
        var e = this,
          t = e.$createElement,
          s = e._self._c || t;
        return s("div", { attrs: { id: "app" } }, [s("Home")], 1);
      },
      n = [],
      r = function() {
        var e = this,
          t = e.$createElement,
          s = e._self._c || t;
        return s("div", { attrs: { id: "home" } }, [
          s(
            "nav",
            {
              staticClass: "navbar is-link is-fixed-top",
              attrs: { role: "navigation", "aria-label": "main-navigation" }
            },
            [
              s("div", { staticClass: "navbar-brand" }, [
                s(
                  "a",
                  {
                    staticClass: "navbar-burger burger",
                    class: { "is-active": e.showNav },
                    attrs: {
                      role: "button",
                      "aria-label": "menu",
                      "aria-expanded": "false",
                      "data-target": "navbar-menu"
                    },
                    on: {
                      click: function(t) {
                        e.toggleNav();
                      }
                    }
                  },
                  [
                    s("span", { attrs: { "aria-hidden": "true" } }),
                    s("span", { attrs: { "aria-hidden": "true" } }),
                    s("span", { attrs: { "aria-hidden": "true" } })
                  ]
                )
              ]),
              s(
                "div",
                {
                  staticClass: "navbar-menu",
                  class: { "is-active": e.showNav },
                  attrs: { id: "navbar-menu" },
                  on: {
                    click: function(t) {
                      e.toggleNav();
                    }
                  }
                },
                [
                  s(
                    "div",
                    { staticClass: "navbar-end" },
                    [
                      s(
                        "a",
                        {
                          directives: [
                            {
                              name: "scroll-to",
                              rawName: "v-scroll-to",
                              value: "#mission",
                              expression: "'#mission'"
                            }
                          ],
                          staticClass: "navbar-item",
                          attrs: { href: "#" }
                        },
                        [e._v(e._s(e.$t("mission.nav_item")))]
                      ),
                      s(
                        "a",
                        {
                          directives: [
                            {
                              name: "scroll-to",
                              rawName: "v-scroll-to",
                              value: "#services",
                              expression: "'#services'"
                            }
                          ],
                          staticClass: "navbar-item",
                          attrs: { href: "#" }
                        },
                        [e._v(e._s(e.$t("services.nav_item")))]
                      ),
                      s(
                        "a",
                        {
                          directives: [
                            {
                              name: "scroll-to",
                              rawName: "v-scroll-to",
                              value: "#tech",
                              expression: "'#tech'"
                            }
                          ],
                          staticClass: "navbar-item",
                          attrs: { href: "#" }
                        },
                        [e._v(e._s(e.$t("technologies.nav_item")))]
                      ),
                      s(
                        "a",
                        {
                          directives: [
                            {
                              name: "scroll-to",
                              rawName: "v-scroll-to",
                              value: "#team",
                              expression: "'#team'"
                            }
                          ],
                          staticClass: "navbar-item",
                          attrs: { href: "#" }
                        },
                        [e._v(e._s(e.$t("team.nav_item")))]
                      ),
                      s(
                        "a",
                        {
                          directives: [
                            {
                              name: "scroll-to",
                              rawName: "v-scroll-to",
                              value: "#contact",
                              expression: "'#contact'"
                            }
                          ],
                          staticClass: "navbar-item",
                          attrs: { href: "#" }
                        },
                        [e._v(e._s(e.$t("contact.nav_item")))]
                      ),
                      s("LocaleChanger")
                    ],
                    1
                  )
                ]
              )
            ]
          ),
          s("section", { staticClass: "hero is-link is-fullheight" }, [
            s("div", { staticClass: "hero-body" }, [
              s(
                "div",
                {
                  staticClass: "container",
                  staticStyle: { position: "fixed" }
                },
                [
                  s("div", { staticClass: "columns" }, [
                    s(
                      "div",
                      {
                        staticClass: "column is-offset-1-desktop",
                        staticStyle: { "padding-top": "7rem" }
                      },
                      [
                        e._m(0),
                        s("h2", { staticClass: "subtitle is-4" }, [
                          e._v(e._s(e.$t("subtitle")))
                        ])
                      ]
                    ),
                    e._m(1)
                  ])
                ]
              )
            ])
          ]),
          s("section", { staticClass: "section", attrs: { id: "mission" } }, [
            s(
              "div",
              {
                staticClass: "columns is-centered",
                staticStyle: { position: "relative" }
              },
              [
                s("div", { staticClass: "column is-half" }, [
                  s("h3", { staticClass: "title is-2 is-spaced" }, [
                    e._v(e._s(e.$t("mission.title")))
                  ]),
                  s("p", [e._v(e._s(e.$t("mission.body")))]),
                  s(
                    "div",
                    {
                      staticClass: "content",
                      staticStyle: { "margin-top": "4rem" }
                    },
                    [
                      s("div", { staticClass: "columns" }, [
                        s(
                          "div",
                          {
                            staticClass:
                              "column is-centered is-half-desktop is-offset-one-quarter-desktop"
                          },
                          [
                            s("div", { staticClass: "box" }, [
                              s("div", { staticClass: "card-content" }, [
                                s("p", { staticClass: "title is-4" }, [
                                  e._v(
                                    "\n                    " +
                                      e._s(e.$t("mission.solutions.title")) +
                                      "\n                  "
                                  )
                                ]),
                                s("div", { staticClass: "content" }, [
                                  s("p", [
                                    e._m(2),
                                    e._v(
                                      e._s(e.$t("mission.solutions.operate")) +
                                        "\n                    "
                                    )
                                  ]),
                                  s("p", [
                                    e._m(3),
                                    e._v(
                                      e._s(
                                        e.$t("mission.solutions.adaptable")
                                      ) + "\n                    "
                                    )
                                  ]),
                                  s("p", [
                                    e._m(4),
                                    e._v(
                                      e._s(e.$t("mission.solutions.scalable")) +
                                        "\n                    "
                                    )
                                  ]),
                                  s("p", [
                                    e._m(5),
                                    e._v(
                                      e._s(
                                        e.$t("mission.solutions.optimized")
                                      ) + "\n                    "
                                    )
                                  ])
                                ])
                              ])
                            ])
                          ]
                        )
                      ])
                    ]
                  )
                ])
              ]
            )
          ]),
          s("section", { staticClass: "section", attrs: { id: "services" } }, [
            s(
              "div",
              {
                staticClass: "columns is-centered",
                staticStyle: { position: "relative" }
              },
              [
                s("div", { staticClass: "column is-half" }, [
                  s("h3", { staticClass: "title is-2 is-spaced" }, [
                    e._v(e._s(e.$t("services.title")))
                  ]),
                  s("p", [e._v(e._s(e.$t("services.body")))]),
                  s(
                    "div",
                    {
                      staticClass: "content",
                      staticStyle: { "margin-top": "4rem" }
                    },
                    [
                      s("div", { staticClass: "timeline is-centered" }, [
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(6),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(
                                "\n                  " +
                                  e._s(e.$t("services.timeline.assess.title")) +
                                  "\n                "
                              )
                            ]),
                            s("p", [
                              e._v(e._s(e.$t("services.timeline.assess.body")))
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(7),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(
                                "\n                  " +
                                  e._s(
                                    e.$t("services.timeline.transform.title")
                                  ) +
                                  "\n                "
                              )
                            ]),
                            s("p", [
                              e._v(
                                e._s(e.$t("services.timeline.transform.body"))
                              )
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(8),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(
                                "\n                  " +
                                  e._s(e.$t("services.timeline.design.title")) +
                                  "\n                "
                              )
                            ]),
                            s("p", [
                              e._v(e._s(e.$t("services.timeline.design.body")))
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(9),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(
                                "\n                  " +
                                  e._s(e.$t("services.timeline.build.title")) +
                                  "\n                "
                              )
                            ]),
                            s("p", [
                              e._v(e._s(e.$t("services.timeline.build.body")))
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(10),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(e._s(e.$t("services.timeline.run.title")))
                            ]),
                            s("p", [
                              e._v(e._s(e.$t("services.timeline.run.body")))
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "timeline-item" }, [
                          e._m(11),
                          s("div", { staticClass: "timeline-content" }, [
                            s("p", { staticClass: "heading" }, [
                              e._v(
                                "\n                  " +
                                  e._s(
                                    e.$t("services.timeline.rethink.title")
                                  ) +
                                  "\n                "
                              )
                            ]),
                            s("p", [
                              e._v(e._s(e.$t("services.timeline.rethink.body")))
                            ])
                          ])
                        ])
                      ])
                    ]
                  )
                ])
              ]
            )
          ]),
          s("section", { staticClass: "section", attrs: { id: "tech" } }, [
            s(
              "div",
              {
                staticClass: "columns is-centered",
                staticStyle: { position: "relative" }
              },
              [
                s("div", { staticClass: "column is-half" }, [
                  s("h3", { staticClass: "title is-2 is-spaced" }, [
                    e._v(e._s(e.$t("technologies.title")))
                  ]),
                  s("p", {
                    domProps: {
                      innerHTML: e._s(e.$t("technologies.platforms.body"))
                    }
                  }),
                  s("br"),
                  e._m(12),
                  s("p", {
                    domProps: {
                      innerHTML: e._s(e.$t("technologies.tools.body"))
                    }
                  }),
                  s("br"),
                  e._m(13)
                ])
              ]
            )
          ]),
          s("section", { staticClass: "section", attrs: { id: "team" } }, [
            s(
              "div",
              {
                staticClass: "columns is-centered",
                staticStyle: { position: "relative" }
              },
              [
                s("div", { staticClass: "column is-half" }, [
                  s("h3", { staticClass: "title is-2 is-spaced" }, [
                    e._v(e._s(e.$t("team.title")))
                  ]),
                  s("p", [e._v(e._s(e.$t("team.body")))]),
                  s(
                    "div",
                    {
                      staticClass: "content",
                      staticStyle: { "margin-top": "4rem" }
                    },
                    [
                      s("div", { staticClass: "tile is-ancestor" }, [
                        s("div", { staticClass: "tile is-parent" }, [
                          s("article", { staticClass: "tile is-child" }, [
                            s("div", { staticClass: "card" }, [
                              s("div", { staticClass: "card-content" }, [
                                s("div", { staticClass: "media" }, [
                                  e._m(14),
                                  s("div", { staticClass: "media-content" }, [
                                    s("p", { staticClass: "title is-4" }, [
                                      e._v(
                                        "\n                          " +
                                          e._s(e.$t("team.member-1.name")) +
                                          "\n                        "
                                      )
                                    ]),
                                    s("p", { staticClass: "subtitle is-6" }, [
                                      e._v(
                                        "\n                          " +
                                          e._s(
                                            e.$t("team.member-1.catchphrase")
                                          ) +
                                          "\n                        "
                                      )
                                    ])
                                  ])
                                ]),
                                s("br"),
                                s("div", { staticClass: "content" }, [
                                  e._v(e._s(e.$t("team.member-1.body")))
                                ])
                              ]),
                              e._m(15)
                            ])
                          ])
                        ]),
                        s("div", { staticClass: "tile is-parent" }, [
                          s("article", { staticClass: "tile is-child" }, [
                            s("div", { staticClass: "card" }, [
                              s("div", { staticClass: "card-content" }, [
                                s("div", { staticClass: "media" }, [
                                  e._m(16),
                                  s("div", { staticClass: "media-content" }, [
                                    s("p", { staticClass: "title is-4" }, [
                                      e._v(
                                        "\n                          " +
                                          e._s(e.$t("team.member-2.name")) +
                                          "\n                        "
                                      )
                                    ]),
                                    s("p", { staticClass: "subtitle is-6" }, [
                                      e._v(
                                        "\n                          " +
                                          e._s(
                                            e.$t("team.member-2.catchphrase")
                                          ) +
                                          "\n                        "
                                      )
                                    ])
                                  ])
                                ]),
                                s("br"),
                                s("div", { staticClass: "content" }, [
                                  e._v(e._s(e.$t("team.member-2.body")))
                                ])
                              ]),
                              e._m(17)
                            ])
                          ])
                        ])
                      ])
                    ]
                  )
                ])
              ]
            )
          ]),
          s("section", { staticClass: "section", attrs: { id: "contact" } }, [
            s(
              "div",
              {
                staticClass: "columns is-centered",
                staticStyle: { position: "relative" }
              },
              [
                s("div", { staticClass: "column is-half" }, [
                  s("h3", { staticClass: "title is-2 is-spaced" }, [
                    e._v(e._s(e.$t("contact.title")))
                  ]),
                  s("p", [e._v(e._s(e.$t("contact.body")))]),
                  s(
                    "form",
                    {
                      staticClass: "content",
                      staticStyle: { "margin-top": "4rem" },
                      attrs: {
                        action: "https://formspree.io/contact@teambespin.io",
                        method: "POST"
                      }
                    },
                    [
                      s("div", { staticClass: "field" }, [
                        s("p", { staticClass: "control has-icons-left" }, [
                          s("input", {
                            staticClass: "input",
                            attrs: {
                              name: "name",
                              placeholder: e.$t("contact.form.nameplaceholder")
                            }
                          }),
                          e._m(18)
                        ])
                      ]),
                      s("div", { staticClass: "field" }, [
                        s("p", { staticClass: "control has-icons-left" }, [
                          s("input", {
                            staticClass: "input",
                            attrs: {
                              type: "email",
                              name: "email",
                              placeholder: e.$t("contact.form.emailplaceholder")
                            }
                          }),
                          e._m(19)
                        ])
                      ]),
                      s("div", { staticClass: "field" }, [
                        s("p", { staticClass: "control has-icons-left" }, [
                          s("input", {
                            staticClass: "input",
                            attrs: {
                              name: "subject",
                              placeholder: e.$t(
                                "contact.form.subjectplaceholder"
                              )
                            }
                          }),
                          e._m(20)
                        ])
                      ]),
                      s("div", { staticClass: "field" }, [
                        s("div", { staticClass: "control" }, [
                          s("textarea", {
                            staticClass: "textarea",
                            attrs: {
                              name: "message",
                              placeholder: e.$t(
                                "contact.form.messageplaceholder"
                              ),
                              rows: "8"
                            }
                          })
                        ])
                      ]),
                      s("div", { staticClass: "field" }, [
                        s("input", {
                          staticClass: "button is-link is-fullwidth",
                          attrs: { type: "submit" },
                          domProps: {
                            value: e.$t("contact.form.sendbuttonlabel")
                          }
                        })
                      ])
                    ]
                  )
                ])
              ]
            )
          ]),
          e._m(21)
        ]);
      },
      o = [
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("h1", { staticClass: "title is-1 is-spaced" }, [
            e._v("\n              be"),
            s("span", { staticClass: "is-blinking" }, [e._v("|")]),
            e._v("spin\n            ")
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i(
            "div",
            { staticClass: "column is-offset-4-desktop has-text-centered" },
            [
              i("img", {
                staticClass: "cloud-city",
                attrs: { src: s("6620"), alt: "Cloud City" }
              })
            ]
          );
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s(
            "span",
            {
              staticClass: "icon has-text-link",
              staticStyle: { "margin-right": "0.7rem" }
            },
            [s("i", { staticClass: "fas fa-check" })]
          );
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s(
            "span",
            {
              staticClass: "icon has-text-link",
              staticStyle: { "margin-right": "0.7rem" }
            },
            [s("i", { staticClass: "fas fa-check" })]
          );
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s(
            "span",
            {
              staticClass: "icon has-text-link",
              staticStyle: { "margin-right": "0.7rem" }
            },
            [s("i", { staticClass: "fas fa-check" })]
          );
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s(
            "span",
            {
              staticClass: "icon has-text-link",
              staticStyle: { "margin-right": "0.7rem" }
            },
            [s("i", { staticClass: "fas fa-check" })]
          );
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-clipboard-list" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-recycle" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-pencil-alt" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-box" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-rocket" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "timeline-marker is-icon is-link" }, [
            s("i", { staticClass: "fa fa-undo" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", { staticClass: "tile is-ancestor" }, [
            i("div", { staticClass: "tile is-parent" }, [
              i(
                "div",
                { staticClass: "tile is-child has-text-centered tech-logo" },
                [
                  i("figure", { staticClass: "image" }, [
                    i("img", { attrs: { src: s("c981"), alt: "AWS" } })
                  ]),
                  i("br"),
                  i(
                    "a",
                    {
                      attrs: {
                        href: "https://aws.amazon.com",
                        target: "_blank"
                      }
                    },
                    [e._v("AWS")]
                  )
                ]
              ),
              i(
                "div",
                { staticClass: "tile is-child has-text-centered tech-logo" },
                [
                  i("figure", { staticClass: "image" }, [
                    i("img", { attrs: { src: s("254d"), alt: "OpenShift" } })
                  ]),
                  i("br"),
                  i(
                    "a",
                    {
                      attrs: {
                        href: "https://www.openshift.com",
                        target: "_blank"
                      }
                    },
                    [e._v("OpenShift")]
                  )
                ]
              ),
              i(
                "div",
                { staticClass: "tile is-child has-text-centered tech-logo" },
                [
                  i("figure", { staticClass: "image" }, [
                    i("img", {
                      attrs: { src: s("0b74"), alt: "Cloud Foundry" }
                    })
                  ]),
                  i("br"),
                  i(
                    "a",
                    {
                      attrs: {
                        href: "https://www.cloudfoundry.org",
                        target: "_blank"
                      }
                    },
                    [e._v("Cloud Foundry")]
                  )
                ]
              ),
              i(
                "div",
                { staticClass: "tile is-child has-text-centered tech-logo" },
                [
                  i("figure", { staticClass: "image" }, [
                    i("img", { attrs: { src: s("90a8"), alt: "Kubernetes" } })
                  ]),
                  i("br"),
                  i(
                    "a",
                    {
                      attrs: { href: "https://kubernetes.io", target: "_blank" }
                    },
                    [e._v("Kubernetes")]
                  )
                ]
              ),
              i(
                "div",
                { staticClass: "tile is-child has-text-centered tech-logo" },
                [
                  i("figure", { staticClass: "image" }, [
                    i("img", { attrs: { src: s("8857"), alt: "Docker" } })
                  ]),
                  i("br"),
                  i(
                    "a",
                    {
                      attrs: {
                        href: "https://www.docker.com",
                        target: "_blank"
                      }
                    },
                    [e._v("Docker")]
                  )
                ]
              )
            ])
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", { staticClass: "tile is-ancestor" }, [
            i("div", { staticClass: "tile is-vertical" }, [
              i("div", { staticClass: "tile is-parent" }, [
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("3a45"), alt: "Go" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: { href: "https://golang.org", target: "_blank" }
                      },
                      [e._v("Go")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("090e"), alt: "Node.js" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: { href: "https://nodejs.org", target: "_blank" }
                      },
                      [e._v("Node.js")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", {
                        attrs: { src: s("0b91"), alt: "Spring Boot" }
                      })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://spring.io/projects/spring-boot",
                          target: "_blank"
                        }
                      },
                      [e._v("Spring Boot")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("b2e9"), alt: "React" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: { href: "https://reactjs.org", target: "_blank" }
                      },
                      [e._v("React")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("969a"), alt: "GraphQL" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: { href: "https://graphql.org", target: "_blank" }
                      },
                      [e._v("GraphQL")]
                    )
                  ]
                )
              ]),
              i("div", { staticClass: "tile is-parent" }, [
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("5e0a"), alt: "Terraform" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://www.terraform.io",
                          target: "_blank"
                        }
                      },
                      [e._v("Terraform")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("84e5"), alt: "Concourse" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://concourse-ci.org",
                          target: "_blank"
                        }
                      },
                      [e._v("Concourse")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("b0c6"), alt: "Jenkins" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: { href: "https://jenkins.io", target: "_blank" }
                      },
                      [e._v("Jenkins")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("b134"), alt: "RabbitMQ" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://www.rabbitmq.com",
                          target: "_blank"
                        }
                      },
                      [e._v("RabbitMQ")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("2458"), alt: "Kafka" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://kafka.apache.org",
                          target: "_blank"
                        }
                      },
                      [e._v("Kafka")]
                    )
                  ]
                )
              ]),
              i("div", { staticClass: "tile is-parent" }, [
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("8bcb"), alt: "Redis" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      { attrs: { href: "https://redis.io", target: "_blank" } },
                      [e._v("Redis")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", {
                        attrs: { src: s("81bb"), alt: "Elasticsearch" }
                      })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://www.elastic.co/products/elasticsearch",
                          target: "_blank"
                        }
                      },
                      [e._v("Elasticsearch")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("99e0"), alt: "MongoDB" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://www.mongodb.com",
                          target: "_blank"
                        }
                      },
                      [e._v("MongoDB")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("079a"), alt: "PostgreSQL" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://www.postgresql.org",
                          target: "_blank"
                        }
                      },
                      [e._v("PostgreSQL")]
                    )
                  ]
                ),
                i(
                  "div",
                  { staticClass: "tile is-child has-text-centered tech-logo" },
                  [
                    i("figure", { staticClass: "image" }, [
                      i("img", { attrs: { src: s("ed32"), alt: "DynamoDB" } })
                    ]),
                    i("br"),
                    i(
                      "a",
                      {
                        attrs: {
                          href: "https://aws.amazon.com/dynamodb",
                          target: "_blank"
                        }
                      },
                      [e._v("DynamoDB")]
                    )
                  ]
                )
              ])
            ])
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", { staticClass: "media-left" }, [
            i("figure", { staticClass: "image is-128x128" }, [
              i("img", {
                staticClass: "is-rounded",
                attrs: { src: s("ff16"), alt: "Gabriel Müller" }
              })
            ])
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("footer", { staticClass: "card-footer" }, [
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: { href: "https://twitter.com/", target: "_blank" }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-twitter" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: { href: "https://github.com/", target: "_blank" }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-github" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: {
                  href: "https://www.linkedin.com/in/",
                  target: "_blank"
                }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-linkedin" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: {
                  href: "https://www.xing.com/profile/",
                  target: "_blank"
                }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-xing" })
                ])
              ]
            )
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", { staticClass: "media-left" }, [
            s("figure", { staticClass: "image is-128x128" }, [
              s("img", {
                staticClass: "is-rounded",
                attrs: {
                  src:
                    "https://pbs.twimg.com/profile_images/928975001105166336/dhnwx8fA_400x400.jpg",
                  alt: "Tobi Fuhrimann"
                }
              })
            ])
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("footer", { staticClass: "card-footer" }, [
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: {
                  href: "https://twitter.com/mastertinner",
                  target: "_blank"
                }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-twitter" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: {
                  href: "https://github.com/mastertinner",
                  target: "_blank"
                }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-github" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: {
                  href: "https://www.linkedin.com/in/tobi-fuhrimann-83642746",
                  target: "_blank"
                }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fab fa-linkedin" })
                ])
              ]
            ),
            s(
              "a",
              {
                staticClass: "card-footer-item",
                attrs: { href: "https://berndsgn.ch", target: "_blank" }
              },
              [
                s("span", { staticClass: "icon" }, [
                  s("i", { staticClass: "fas fa-rss-square" })
                ])
              ]
            )
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("span", { staticClass: "icon is-small is-left" }, [
            s("i", { staticClass: "fas fa-user" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("span", { staticClass: "icon is-small is-left" }, [
            s("i", { staticClass: "fas fa-envelope" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("span", { staticClass: "icon is-small is-left" }, [
            s("i", { staticClass: "fas fa-info" })
          ]);
        },
        function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("footer", { staticClass: "footer" }, [
            s("div", { staticClass: "content has-text-centered" }, [
              s("p", [s("strong", [e._v("team be|spin")]), e._v(" 2019")])
            ])
          ]);
        }
      ],
      l = function() {
        var e = this,
          t = e.$createElement,
          s = e._self._c || t;
        return s(
          "div",
          { staticClass: "navbar-item has-dropdown is-hoverable" },
          [
            s("a", { staticClass: "navbar-link" }, [
              e._v(e._s(e.langs[e.$i18n.locale]))
            ]),
            s(
              "div",
              { staticClass: "navbar-dropdown" },
              e._l(e.langs, function(t, i) {
                return s(
                  "a",
                  {
                    key: i,
                    staticClass: "navbar-item",
                    on: {
                      click: function(t) {
                        e.handleLocaleChange(i);
                      }
                    }
                  },
                  [e._v("\n      " + e._s(t) + "\n    ")]
                );
              }),
              0
            )
          ]
        );
      },
      c = [],
      d = s("8ded"),
      m = s.n(d),
      u = s("d225"),
      h = s("b0b4"),
      f = (s("4917"), s("a925")),
      g = s("00ba");
    function v() {
      var e = s("49f8"),
        t = {};
      return (
        e.keys().forEach(function(s) {
          var i = s.match(/([A-Za-z0-9-_]+)\./i);
          if (i && i.length > 1) {
            var a = i[1];
            t[a] = e(s);
          }
        }),
        t
      );
    }
    i["a"].use(f["a"]);
    var p = "locale:teambespin",
      b = (function() {
        function e() {
          Object(u["a"])(this, e);
        }
        return (
          Object(h["a"])(e, [
            {
              key: "getLocales",
              value: function() {
                return m.a.get(p) ? [m.a.get(p)] : [];
              }
            }
          ]),
          e
        );
      })();
    function C() {
      var e = [
          new g["c"].FallbacksTransformer(),
          new g["c"].IETFTransformer(),
          new g["c"].InvalidLocalesTransformer(),
          new g["c"].LanguageOnlyTransformer()
        ],
        t = new g["b"]([new g["a"].UrlDetector("lang")], e),
        s = new g["b"]([new b()], e),
        i = new g["b"]([new g["a"].NavigatorDetector()], e);
      return t.getLocales().length > 0
        ? t.getLocales()[0]
        : s.getLocales().length > 0
          ? s.getLocales()[0]
          : i.getLocales()[0];
    }
    var _ = new f["a"]({
        locale: C(),
        fallbackLocale:
          Object({ NODE_ENV: "production", BASE_URL: "/" })
            .VUE_APP_I18N_FALLBACK_LOCALE || "en",
        messages: v()
      }),
      w = {
        name: "LocaleChanger",
        data: function() {
          return { langs: { en: "English", de: "Deutsch", be: "Bärndütsch" } };
        },
        methods: {
          handleLocaleChange: function(e) {
            (this.$i18n.locale = e), m.a.set(p, e);
          }
        }
      },
      k = w,
      y = s("2877"),
      x = Object(y["a"])(k, l, c, !1, null, null, null);
    x.options.__file = "LocaleChanger.vue";
    var S = x.exports,
      $ = {
        name: "Home",
        components: { LocaleChanger: S },
        data: function() {
          return { showNav: !1 };
        },
        methods: {
          toggleNav: function() {
            this.showNav = !this.showNav;
          }
        }
      },
      z = $,
      E = (s("8b71"), Object(y["a"])(z, r, o, !1, null, null, null));
    E.options.__file = "Home.vue";
    var T = E.exports,
      L = { name: "app", components: { Home: T } },
      M = L,
      j = (s("034f"), Object(y["a"])(M, a, n, !1, null, null, null));
    j.options.__file = "App.vue";
    var I = j.exports,
      D = (s("92c6"), s("df77"), s("c919"), s("15f5"), s("f13c")),
      N = s.n(D);
    document.addEventListener("DOMContentLoaded", function() {
      var e = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );
      e.length > 0 &&
        e.forEach(function(e) {
          e.addEventListener("click", function() {
            var t = e.dataset.target,
              s = document.getElementById(t);
            e.classList.toggle("is-active"), s.classList.toggle("is-active");
          });
        });
    }),
      i["a"].use(N.a, { offset: -30 }),
      (i["a"].config.productionTip = !1),
      new i["a"]({
        i18n: _,
        render: function(e) {
          return e(I);
        }
      }).$mount("#app");
  },
  "5e0a": function(e, t, s) {
    e.exports = s.p + "img/terraform.d4d612fc.svg";
  },
  "64a9": function(e, t, s) {},
  6620: function(e, t, s) {
    e.exports = s.p + "img/cloudcity.35d68c07.svg";
  },
  "6ce2": function(e) {
    e.exports = {
      subtitle: "Cloud Native Citizens",
      mission: {
        nav_item: "Mission",
        title: "Unsere Mission",
        body:
          "Wir von team be|spin lieben Software. Besonders, wenn sie einfach und effizient ist und ihre Anforderungen erfüllt. Grossartige Software wird von grossartigen Teams geschrieben. Aus diesem Grund bauen alle unsere Dienstleistungen auf einer engen Zusammenarbeit mit Ihrem Team auf. Wir sind zuhause in privaten, hybriden und public Clouds. Das macht uns zum idealen Partner für Ihr Unternehmen beim kreieren von erstklassigen Cloud-basierten Lösungen.",
        solutions: {
          title: "Die Lösungen, die wir zusammen kreieren sind",
          operate: "einfach zu betreiben",
          adaptable: "leicht zu ändern",
          scalable: "skalierbar unter Last",
          optimized: "optimiert auf Ihre Geschäftsziele"
        }
      },
      services: {
        nav_item: "Dienstleistungen",
        title: "Unsere Dienstleistungen",
        body:
          "Egal, ob Sie ein neues Vorhaben beginnen, eine bestehende Idee überarbeiten oder Ihre bestehenden Applikationen transformieren, wir begleiten Ihr Team hands-on, in jeder Iteration Ihres Projekts. Hier sind einige Dienstleistungen, die wir anbieten. Wenn Sie etwas suchen, das nicht auf der Liste ist, lassen Sie es uns wissen. Wir sind immer offen für Innovation.",
        timeline: {
          assess: {
            title: "Bewerten",
            body:
              "Die perfekte Wahl oder zu gut, um wahr zu sein? Wir helfen Ihnen, die richtigen Partner für Ihr Projekt zu finden."
          },
          transform: {
            title: "Transformieren",
            body:
              "Jedes Unternehmen hat eine Geschichte. Zusammen analysieren wir Ihre bestehenden Applikationen und machen sie bereit für die Cloud."
          },
          design: {
            title: "Designen",
            body:
              "Ein Diagramm sagt mehr als tausend Worte. Wir strukturieren Ihre Geschäftsdomäne und identifizieren die Schlüsselkonzepte."
          },
          build: {
            title: "Umsetzen",
            body:
              "Von der Papierserviette zum Source Code. Wir helfen Ihnen bei der Umsetzung Ihrer Ideen als Cloud-basierte Software."
          },
          run: {
            title: "Betreiben",
            body:
              "Ohne Unterbruch. Zusammen deployen wir Ihre Applikationen und betreiben sie hochgradig skaliert."
          },
          rethink: {
            title: "Überdenken",
            body:
              "Im Nachhinein ist alles einfach. Machen wir uns diese Tatsache zu Nutze und bringen wir Ihre Lösung auf die nächste Stufe!"
          }
        }
      },
      technologies: {
        nav_item: "Technologien",
        title: "Unsere Technologien",
        platforms: {
          body:
            "Wir sind überzeugt, dass Ideen die Technologien bestimmen sollen und nicht umgekehrt. Zusammen entwickeln wir Lösungen auf der Basis von modernen Technologien, die Ihrem Team ermöglichen mehr Zeit mit dem Erschaffen von Mehrwert zu verbringen und weniger mit dem Betrieb von Infrastruktur. Hier ist eine Auswahl von <strong>Plattformen</strong>, auf denen wir Experten sind:"
        },
        tools: {
          body:
            "Auch wenn wir nichts mehr lieben als Code zu schreiben, ist das Rad neu erfinden nicht unser Ding. Wir wissen, wann es besser ist, ein existierendes Produkt einzusetzen und wir teilen dieses Wissen mit Ihrem Team. Hier sind einige unserer liebsten <strong>Tools</strong>:"
        }
      },
      team: {
        nav_item: "Team",
        title: "Unser Team",
        body:
          "Wir sind Cloud Software Engineers der ersten Stunde mit Berufserfahrung sowohl in Grossunternehmen als auch in Startups. Wir sind stolz auf unsere Fähigkeiten als kompetente Berater, einfühlsame Coaches und erfahrene Coder. Interessiert, uns zu treffen? Dann kommen Sie einfach ungeniert über Social Media auf uns zu, treffen uns an einem Meetup in Ihrer Nähe oder nutzen das Kontaktformular unten.",
        "member-1": {
          name: "Gabriel Müller",
          catchphrase: "Keeper of Simple",
          body:
            "Softwarearchitekt und Mitgründer. Spezialisert auf Microservices, Containertechnologien and Cloud-Native Engineering."
        },
        "member-2": {
          name: "Tobi Fuhrimann",
          catchphrase: "Head in the Clouds",
          body:
            "Software Engineer und Mitgründer. Spezialisiert auf Clouddienste, verteilte Systeme und Webentwicklung mit modernen Technologien."
        }
      },
      contact: {
        nav_item: "Kontakt",
        title: "Kontaktieren Sie uns",
        body:
          "Haben Sie eine Frage? Benötigen Sie eine Offerte? Oder möchten Sie mal auf einen Kaffee oder ein Bier vorbeikommen? In jedem Fall freuen wir uns über Ihre Kontaktaufnahme und melden uns so rasch wie möglich bei Ihnen.",
        form: {
          nameplaceholder: "Name",
          emailplaceholder: "Email",
          subjectplaceholder: "Betreff",
          messageplaceholder: "Nachricht",
          sendbuttonlabel: "Abschicken"
        }
      }
    };
  },
  "81bb": function(e, t, s) {
    e.exports = s.p + "img/elasticsearch.0d4e4f51.svg";
  },
  "84e5": function(e, t, s) {
    e.exports = s.p + "img/concourse.cfc439f0.svg";
  },
  8857: function(e, t, s) {
    e.exports = s.p + "img/docker.ce9fe79f.svg";
  },
  "8b71": function(e, t, s) {
    "use strict";
    var i = s("e3a2"),
      a = s.n(i);
    a.a;
  },
  "8bcb": function(e, t, s) {
    e.exports = s.p + "img/redis.22209f44.svg";
  },
  "90a8": function(e, t, s) {
    e.exports = s.p + "img/kubernetes.42656ba0.svg";
  },
  "969a": function(e, t, s) {
    e.exports = s.p + "img/graphql.7dd3e9ee.svg";
  },
  "99e0": function(e, t, s) {
    e.exports = s.p + "img/mongodb.586d05b8.svg";
  },
  b0c6: function(e, t, s) {
    e.exports = s.p + "img/jenkins.dd521bc2.svg";
  },
  b134: function(e, t, s) {
    e.exports = s.p + "img/rabbitmq.59aa0861.svg";
  },
  b2e9: function(e, t, s) {
    e.exports = s.p + "img/react.d1cfa973.svg";
  },
  c981: function(e, t, s) {
    e.exports = s.p + "img/aws.597c02ad.svg";
  },
  d174: function(e) {
    e.exports = {
      subtitle: "Cloud Native Citizens",
      mission: {
        nav_item: "Mission",
        title: "Üsi Mission",
        body:
          "Mir vo team be|spin liebe Software. Bsunders, wenn si eifach und effiziänt isch und ihri Aforderige erfüllt. Grossartigi Software wird vo grossartige Teams gschribe. Us däm Grund boue aui üsi Dienstleistige uf ere änge Zämearbeit mit Öiem Team uf. Mir füehle üs deheim uf private, hybride und public Clouds. Das macht üs zum ideale Partner für Öies Ungernähmä bim Kreiere vo erstklassige Cloud-basierte Lösige.",
        solutions: {
          title: "D Lösige, wo mir zämä kreiere si",
          operate: "eifach z betribe",
          adaptable: "liecht z ändere",
          scalable: "skalierbar unter Last",
          optimized: "optimiert uf Öii Gschäftzziel"
        }
      },
      services: {
        nav_item: "Dienstleistige",
        title: "Üsi Dienstleistige",
        body:
          "Egal, öb Dir es nöis Vorhabe aföht, e bestehendi Idee überarbeitet oder Öii bestehende Applikatione tranformieret, mir begleite Öies Team hands-on, i jedere Iteration vo Öiem Projekt. Hie si es paar vo de Dienstleistige wo mir abiete. Wenn Dir öppis suechet, wo nid uf dr Liste isch, löhts üs la wüsse. Mir si immer offe für Innovation.",
        timeline: {
          assess: {
            title: "Bewärte",
            body:
              "Di perfekti Wahl oder z guet um wahr z sy? Mir hälfä Öich di richtige Partner für Öies Projekt z finge."
          },
          transform: {
            title: "Transformiere",
            body:
              "Jedes Unternähmä het ä Gschicht. Zämä analysiere mr Öii bestehende Applikatione und mache se parat für d Cloud."
          },
          design: {
            title: "Designe",
            body:
              "Es Diagramm seit meh aus tuusig Wort. Mir strukturiere Öii Gschäftsdomänä und identifiziere d Schlüssukonzept."
          },
          build: {
            title: "Umsetze",
            body:
              "Vo dr Serviette zum Source Code. Mir hälfä Öich bi dr Umsetzig vo öine Ideene als Cloud-basierti Software."
          },
          run: {
            title: "Betribe",
            body:
              "Ohni Ungerbruch. Zämä deploye mr Öii Applikatione und betribe se hochgradig skaliert."
          },
          rethink: {
            title: "Überdänke",
            body:
              "Im Nachhinein isch alles eifach. Nütze mr di Tatsach und bringe Öii Lösig uf di nächsti Stuefe!"
          }
        }
      },
      technologies: {
        nav_item: "Technologie",
        title: "Üsi Technologie",
        platforms: {
          body:
            "Mir si überzügt, dass Ideene d Technologie söue bestimme und nid umgekehrt. Zämä finge mir Lösige uf Basis vo moderne Technologie wo Öiem Team ermögleche meh Zyt mitem Erschaffe vo Mehrwärt z verbringe und weniger mitem Betrib vo Infrastruktur. Hie isch e Uswahl vo <strong>Plattforme</strong> wo mir Experte druf si:"
        },
        tools: {
          body:
            "Ou wenn mir nüt meh liebe als Code z schribe, isch ds Rad nöi z erfinde nid üses Ding. Mir wüsse, wenns besser isch, es existierends Produkt izsetzä und mir teile das Wüsse mit Öiem Team. Hie si es paar vo üsne liebste <strong>Tools</strong>:"
        }
      },
      team: {
        nav_item: "Team",
        title: "Üses Team",
        body:
          "Mir si Cloud Software Engineers vor erste Stund mit Bruefserfahrig sowohl i Grossungernähmä als ou i Startups. Mir si stolz uf üsi Fähigkeite als kompetänti Berater, iifühlsami Coaches und erfahreni Coder. Interessiert üs z träffä? De chömet eifach ungeniert über Social Media uf üs zue, träffet is amne Meetup ir Nechi oder nützet ds Kontaktformular unge.",
        "member-1": {
          name: "Gabriel Müller",
          catchphrase: "Keeper of Simple",
          body:
            "Softwarearchitekt und Mitgründer. Spezialisert uf Microservices, Containertechnologie and Cloud-Native Engineering."
        },
        "member-2": {
          name: "Tobi Fuhrimann",
          catchphrase: "Head in the Clouds",
          body:
            "Software Engineer und Mitgründer. Spezialisiert uf Clouddienst, verteilti System und Webentwicklig mit moderne Technologie."
        }
      },
      contact: {
        nav_item: "Kontakt",
        title: "Kontaktieret üs",
        body:
          "Heiter e Frag? Bruuchet dr e Offerte? Oder möchtet dr mal ufnes Kafi oder es Bier verbicho? I jedem Fall fröie mir üs über Öii Kontaktufnahm und mäldä üs so rasch wi möglech bi Öich.",
        form: {
          nameplaceholder: "Name",
          emailplaceholder: "Email",
          subjectplaceholder: "Beträff",
          messageplaceholder: "Nachricht",
          sendbuttonlabel: "Abschicke"
        }
      }
    };
  },
  e3a2: function(e, t, s) {},
  ed32: function(e, t, s) {
    e.exports = s.p + "img/dynamodb.7f4a5fbc.svg";
  },
  edd4: function(e) {
    e.exports = {
      subtitle: "Cloud Native Citizens",
      mission: {
        nav_item: "Mission",
        title: "Our Mission",
        body:
          "At team be|spin we love software. Especially if it's simple, efficient and spot on the requirements. Awesome software is made by awesome teams. That's why all of our services are focused on close collaboration with your team. Also, we feel at home in private, hybrid and public clouds. That makes us your ideal partner for creating great cloud-native solutions.",
        solutions: {
          title: "Together, we create solutions which are",
          operate: "easy to operate",
          adaptable: "adaptable to change",
          scalable: "scalable under load",
          optimized: "optimized for your business"
        }
      },
      services: {
        nav_item: "Services",
        title: "Our Services",
        body:
          "No matter whether you are embarking on a new endeavour, reworking an idea or transforming your existing applications, we work hands-on with your team in every iteration of your project. Here are some of the services we offer. If what you require is not on the list, let us know. We're always happy to innovate.",
        timeline: {
          assess: {
            title: "Assess",
            body:
              "Perfect match or too good to be true? We help you choose the right partners for your project."
          },
          transform: {
            title: "Transform",
            body:
              "Everyone has a history. Together, we review your existing applications and get them ready for the cloud."
          },
          design: {
            title: "Design",
            body:
              "A diagram says more than a thousand words. Let’s structure your business domain and identify crucial concepts."
          },
          build: {
            title: "Build",
            body:
              "From napkin to code. We help you realize your ideas in lean and cloud-native software."
          },
          run: {
            title: "Run",
            body:
              "Zero downtime. Together we continuously deploy your applications and run them at scale."
          },
          rethink: {
            title: "Rethink",
            body:
              "Everything is simple in hindsight. Let’s embrace that fact and take your solution to the next level!"
          }
        }
      },
      technologies: {
        nav_item: "Technologies",
        title: "Our Technologies",
        platforms: {
          body:
            "We are convinced that technology should follow ideas and not the other way around. Together we design and implement architectures based on modern technologies which enable your team to spend more time on delivering business value and less on infrastructure operations. Here's a selection of the <strong>platforms</strong> we are native to:"
        },
        tools: {
          body:
            "Even though we passionately write code, reinventing the wheel is not our game. We know when to use an existing product to solve a problem and we share this knowledge with your team. Here are some of our favorite <strong>tools</strong>:"
        }
      },
      team: {
        nav_item: "Team",
        title: "The Team",
        body:
          "We are cloud-native software engineers with experience in both the corporate and the startup world. We pride ourselves in being expert consultants, competent coaches and seasoned coders at the same time. Interested in meeting us? Feel free to approach us on social media or at a meetup near you.",
        "member-1": {
          name: "Gabriel Müller",
          catchphrase: "Keeper of Simple",
          body:
            "Software Architect and co-founder. Specialized in microservices, container technologies and cloud-native engineering."
        },
        "member-2": {
          name: "Tobi Fuhrimann",
          catchphrase: "Head in the Clouds",
          body:
            "Software Engineer and co-founder. Specialized in cloud services, distributed systems and web development with modern technologies."
        }
      },
      contact: {
        nav_item: "Contact",
        title: "Contact Us",
        body:
          "Have a question? Need a quote? Wanna grab a coffee or a beer? Drop us a line and we'll be happy to get back to you as soon as possible.",
        form: {
          nameplaceholder: "Name",
          emailplaceholder: "Email",
          subjectplaceholder: "Subject",
          messageplaceholder: "Message",
          sendbuttonlabel: "Send"
        }
      }
    };
  },
  ff16: function(e, t, s) {
    e.exports = s.p + "img/gopher.c3ed7b11.png";
  }
});
//# sourceMappingURL=app.e9301f87.js.map
