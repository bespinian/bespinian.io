(function(e){function t(t){for(var i,r,o=t[0],l=t[1],c=t[2],m=0,h=[];m<o.length;m++)r=o[m],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&h.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);d&&d(t);while(h.length)h.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],i=!0,o=1;o<s.length;o++){var l=s[o];0!==a[l]&&(i=!1)}i&&(n.splice(t--,1),e=r(r.s=s[0]))}return e}var i={},a={app:0},n=[];function r(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=i,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";var i=s("85ec"),a=s.n(i);a.a},"079a":function(e,t,s){e.exports=s.p+"img/postgresql.a3f2664e.svg"},"090e":function(e,t,s){e.exports=s.p+"img/nodejs.8ff631f6.svg"},"0b74":function(e,t,s){e.exports=s.p+"img/cloudfoundry.686b1478.svg"},"0b91":function(e,t,s){e.exports=s.p+"img/springboot.75f6e885.svg"},2458:function(e,t,s){e.exports=s.p+"img/kafka.5824ba73.svg"},"254d":function(e,t,s){e.exports=s.p+"img/openshift.8eaf7364.svg"},2589:function(e,t,s){e.exports=s.p+"img/tobi.52db1211.jpg"},"3a45":function(e,t,s){e.exports=s.p+"img/golang.8be7caf3.svg"},"49f8":function(e,t,s){var i={"./be.json":"d174","./de.json":"6ce2","./en.json":"edd4"};function a(e){var t=n(e);return s(t)}function n(e){if(!s.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}a.keys=function(){return Object.keys(i)},a.resolve=n,e.exports=a,a.id="49f8"},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var i=s("2b0e"),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Home")],1)},n=[],r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"home"}},[s("nav",{staticClass:"navbar is-link is-fixed-top",attrs:{role:"navigation","aria-label":"main-navigation"}},[s("div",{staticClass:"navbar-brand"},[s("a",{staticClass:"navbar-burger burger",class:{"is-active":e.showNav},attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"navbar-menu"},on:{click:function(t){return e.toggleNav()}}},[s("span",{attrs:{"aria-hidden":"true"}}),e._v(" "),s("span",{attrs:{"aria-hidden":"true"}}),s("span",{attrs:{"aria-hidden":"true"}})])]),s("div",{staticClass:"navbar-menu",class:{"is-active":e.showNav},attrs:{id:"navbar-menu"},on:{click:function(t){return e.toggleNav()}}},[s("div",{staticClass:"navbar-end"},[s("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#mission",expression:"'#mission'"}],staticClass:"navbar-item",attrs:{href:"#"}},[e._v(e._s(e.$t("mission.nav_item")))]),s("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#services",expression:"'#services'"}],staticClass:"navbar-item",attrs:{href:"#"}},[e._v(e._s(e.$t("services.nav_item")))]),s("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#tech",expression:"'#tech'"}],staticClass:"navbar-item",attrs:{href:"#"}},[e._v(e._s(e.$t("technologies.nav_item")))]),s("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#team",expression:"'#team'"}],staticClass:"navbar-item",attrs:{href:"#"}},[e._v(e._s(e.$t("team.nav_item")))]),s("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#contact",expression:"'#contact'"}],staticClass:"navbar-item",attrs:{href:"#"}},[e._v(e._s(e.$t("contact.nav_item")))]),s("LocaleChanger")],1)])]),s("section",{staticClass:"hero is-link is-fullheight"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container",staticStyle:{position:"fixed",width:"100vw"}},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-offset-1-desktop",staticStyle:{"padding-top":"7rem"}},[e._m(0),s("h2",{staticClass:"subtitle is-4"},[e._v(e._s(e.$t("subtitle")))])]),e._m(1)])])])]),s("section",{staticClass:"section",attrs:{id:"mission"}},[s("div",{staticClass:"columns is-centered",staticStyle:{position:"relative"}},[s("div",{staticClass:"column is-half"},[s("h3",{staticClass:"title is-2 is-spaced"},[e._v(e._s(e.$t("mission.title")))]),s("p",[e._v(e._s(e.$t("mission.body")))]),s("div",{staticClass:"content",staticStyle:{"margin-top":"4rem"}},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-centered is-half-desktop is-offset-one-quarter-desktop"},[s("div",{staticClass:"box"},[s("div",{staticClass:"card-content"},[s("p",{staticClass:"title is-4"},[e._v(" "+e._s(e.$t("mission.solutions.title"))+" ")]),s("div",{staticClass:"content"},[s("p",[s("span",{staticClass:"icon has-text-link",staticStyle:{"margin-right":"0.7rem"}},[s("font-awesome-icon",{attrs:{icon:"check"}})],1),e._v(e._s(e.$t("mission.solutions.operate"))+" ")]),s("p",[s("span",{staticClass:"icon has-text-link",staticStyle:{"margin-right":"0.7rem"}},[s("font-awesome-icon",{attrs:{icon:"check"}})],1),e._v(e._s(e.$t("mission.solutions.adaptable"))+" ")]),s("p",[s("span",{staticClass:"icon has-text-link",staticStyle:{"margin-right":"0.7rem"}},[s("font-awesome-icon",{attrs:{icon:"check"}})],1),e._v(e._s(e.$t("mission.solutions.scalable"))+" ")]),s("p",[s("span",{staticClass:"icon has-text-link",staticStyle:{"margin-right":"0.7rem"}},[s("font-awesome-icon",{attrs:{icon:"check"}})],1),e._v(e._s(e.$t("mission.solutions.optimized"))+" ")])])])])])])])])])]),s("section",{staticClass:"section",attrs:{id:"services"}},[s("div",{staticClass:"columns is-centered",staticStyle:{position:"relative"}},[s("div",{staticClass:"column is-half"},[s("h3",{staticClass:"title is-2 is-spaced"},[e._v(e._s(e.$t("services.title")))]),s("p",[e._v(e._s(e.$t("services.body")))]),s("div",{staticClass:"content",staticStyle:{"margin-top":"4rem"}},[s("div",{staticClass:"timeline is-centered"},[s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"clipboard-list",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(" "+e._s(e.$t("services.timeline.assess.title"))+" ")]),s("p",[e._v(e._s(e.$t("services.timeline.assess.body")))])])]),s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"recycle",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(" "+e._s(e.$t("services.timeline.transform.title"))+" ")]),s("p",[e._v(e._s(e.$t("services.timeline.transform.body")))])])]),s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"pencil-alt",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(" "+e._s(e.$t("services.timeline.design.title"))+" ")]),s("p",[e._v(e._s(e.$t("services.timeline.design.body")))])])]),s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"box",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(" "+e._s(e.$t("services.timeline.build.title"))+" ")]),s("p",[e._v(e._s(e.$t("services.timeline.build.body")))])])]),s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"rocket",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(e._s(e.$t("services.timeline.run.title")))]),s("p",[e._v(e._s(e.$t("services.timeline.run.body")))])])]),s("div",{staticClass:"timeline-item"},[s("div",{staticClass:"timeline-marker is-icon is-link"},[s("font-awesome-icon",{style:{color:"white"},attrs:{icon:"undo",size:"xs"}})],1),s("div",{staticClass:"timeline-content"},[s("p",{staticClass:"heading"},[e._v(" "+e._s(e.$t("services.timeline.rethink.title"))+" ")]),s("p",[e._v(e._s(e.$t("services.timeline.rethink.body")))])])])])])])])]),s("section",{staticClass:"section",attrs:{id:"tech"}},[s("div",{staticClass:"columns is-centered",staticStyle:{position:"relative"}},[s("div",{staticClass:"column is-half"},[s("h3",{staticClass:"title is-2 is-spaced"},[e._v(e._s(e.$t("technologies.title")))]),s("p",[e._v(" "+e._s(e.$t("technologies.platforms.body.intro"))+" "),s("strong",[e._v(e._s(e.$t("technologies.platforms.body.platforms")))]),e._v(" "+e._s(e.$t("technologies.platforms.body.weAreNativeTo"))+": ")]),s("br"),e._m(2),s("p",[e._v(" "+e._s(e.$t("technologies.tools.body.intro"))+" "),s("strong",[e._v(e._s(e.$t("technologies.tools.body.tools")))]),e._v(": ")]),s("br"),e._m(3)])])]),s("section",{staticClass:"section",attrs:{id:"team"}},[s("div",{staticClass:"columns is-centered",staticStyle:{position:"relative"}},[s("div",{staticClass:"column is-half"},[s("h3",{staticClass:"title is-2 is-spaced"},[e._v(e._s(e.$t("team.title")))]),s("p",[e._v(e._s(e.$t("team.body")))]),s("div",{staticClass:"content",staticStyle:{"margin-top":"4rem"}},[s("div",{staticClass:"tile is-ancestor"},[s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-content"},[e._m(4),s("br"),s("p",{staticClass:"title"},[e._v(" "+e._s(e.$t("team.member-1.name"))+" ")]),s("p",{staticClass:"subtitle"},[e._v(" "+e._s(e.$t("team.member-1.catchphrase"))+" ")]),s("div",{staticClass:"content"},[e._v(e._s(e.$t("team.member-1.body")))])]),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"https://twitter.com/mathis_kretz",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","twitter"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://github.com/mkretz",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://www.linkedin.com/in/mathiskretz/",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","linkedin"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://www.xing.com/profile/Mathis_Kretz",target:"_blank",rel:"noopener noreferrer"}},[s("font-awesome-icon",{attrs:{icon:["fab","xing"]}})],1)])])])]),s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-content"},[e._m(5),s("br"),s("p",{staticClass:"title"},[e._v(" "+e._s(e.$t("team.member-2.name"))+" ")]),s("p",{staticClass:"subtitle"},[e._v(" "+e._s(e.$t("team.member-2.catchphrase"))+" ")]),s("div",{staticClass:"content"},[e._v(e._s(e.$t("team.member-2.body")))])]),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"https://twitter.com/mastertinner",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","twitter"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://github.com/mastertinner",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://www.linkedin.com/in/tobi-fuhrimann/",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:["fab","linkedin"]}})],1)]),s("a",{staticClass:"card-footer-item",attrs:{href:"https://blog.bespinian.io",target:"_blank",rel:"noopener noreferrer"}},[s("span",{staticClass:"icon"},[s("font-awesome-icon",{attrs:{icon:"rss-square"}})],1)])])])])])])])])])]),s("section",{staticClass:"section",attrs:{id:"contact"}},[s("div",{staticClass:"columns is-centered",staticStyle:{position:"relative"}},[s("div",{staticClass:"column is-half"},[s("h3",{staticClass:"title is-2 is-spaced"},[e._v(e._s(e.$t("contact.title")))]),s("p",[e._v(e._s(e.$t("contact.body")))]),s("form",{staticClass:"content",staticStyle:{"margin-top":"4rem"},attrs:{action:"https://formspree.io/contact@bespinian.io",method:"POST"}},[s("div",{staticClass:"field"},[s("p",{staticClass:"control has-icons-left"},[s("input",{staticClass:"input",attrs:{name:"name",placeholder:e.$t("contact.form.nameplaceholder")}}),s("span",{staticClass:"icon is-small is-left"},[s("font-awesome-icon",{attrs:{icon:"user"}})],1)])]),s("div",{staticClass:"field"},[s("p",{staticClass:"control has-icons-left"},[s("input",{staticClass:"input",attrs:{type:"email",name:"email",placeholder:e.$t("contact.form.emailplaceholder")}}),s("span",{staticClass:"icon is-small is-left"},[s("font-awesome-icon",{attrs:{icon:"envelope"}})],1)])]),s("div",{staticClass:"field"},[s("p",{staticClass:"control has-icons-left"},[s("input",{staticClass:"input",attrs:{name:"subject",placeholder:e.$t("contact.form.subjectplaceholder")}}),s("span",{staticClass:"icon is-small is-left"},[s("font-awesome-icon",{attrs:{icon:"info"}})],1)])]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{staticClass:"textarea",attrs:{name:"message",placeholder:e.$t("contact.form.messageplaceholder"),rows:"8"}})])]),s("div",{staticClass:"field"},[s("input",{staticClass:"button is-link is-fullwidth",attrs:{type:"submit"},domProps:{value:e.$t("contact.form.sendbuttonlabel")}})])])])])]),s("footer",{staticClass:"footer"},[s("div",{staticClass:"content has-text-centered"},[s("p",[s("strong",[e._v("bespinian")]),e._v(" "+e._s((new Date).getFullYear()))])])])])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h1",{staticClass:"title is-1 is-spaced"},[e._v(" be"),s("span",{staticClass:"is-blinking"},[e._v("|")]),e._v("spinian ")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"column is-offset-4-desktop has-text-centered"},[i("img",{staticClass:"cloud-city",attrs:{src:s("6620"),alt:"Cloud City"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tile is-ancestor"},[i("div",{staticClass:"tile is-parent"},[i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("c981"),alt:"AWS"}})]),i("br"),i("a",{attrs:{href:"https://aws.amazon.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("AWS")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("254d"),alt:"OpenShift"}})]),i("br"),i("a",{attrs:{href:"https://www.openshift.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenShift")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("0b74"),alt:"Cloud Foundry"}})]),i("br"),i("a",{attrs:{href:"https://www.cloudfoundry.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloud Foundry")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("90a8"),alt:"Kubernetes"}})]),i("br"),i("a",{attrs:{href:"https://kubernetes.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("8857"),alt:"Docker"}})]),i("br"),i("a",{attrs:{href:"https://www.docker.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker")])])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tile is-ancestor"},[i("div",{staticClass:"tile is-vertical"},[i("div",{staticClass:"tile is-parent"},[i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("3a45"),alt:"Go"}})]),i("br"),i("a",{attrs:{href:"https://golang.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Go")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("090e"),alt:"Node.js"}})]),i("br"),i("a",{attrs:{href:"https://nodejs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node.js")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("0b91"),alt:"Spring Boot"}})]),i("br"),i("a",{attrs:{href:"https://spring.io/projects/spring-boot",target:"_blank",rel:"noopener noreferrer"}},[e._v("Spring Boot")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("b2e9"),alt:"React"}})]),i("br"),i("a",{attrs:{href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("React")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("969a"),alt:"GraphQL"}})]),i("br"),i("a",{attrs:{href:"https://graphql.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("GraphQL")])])]),i("div",{staticClass:"tile is-parent"},[i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("5e0a"),alt:"Terraform"}})]),i("br"),i("a",{attrs:{href:"https://www.terraform.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("Terraform")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("84e5"),alt:"Concourse"}})]),i("br"),i("a",{attrs:{href:"https://concourse-ci.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Concourse")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("b0c6"),alt:"Jenkins"}})]),i("br"),i("a",{attrs:{href:"https://jenkins.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jenkins")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("b134"),alt:"RabbitMQ"}})]),i("br"),i("a",{attrs:{href:"https://www.rabbitmq.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("RabbitMQ")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("2458"),alt:"Kafka"}})]),i("br"),i("a",{attrs:{href:"https://kafka.apache.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kafka")])])]),i("div",{staticClass:"tile is-parent"},[i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("8bcb"),alt:"Redis"}})]),i("br"),i("a",{attrs:{href:"https://redis.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("Redis")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("81bb"),alt:"Elasticsearch"}})]),i("br"),i("a",{attrs:{href:"https://www.elastic.co/products/elasticsearch",target:"_blank",rel:"noopener noreferrer"}},[e._v("Elasticsearch")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("99e0"),alt:"MongoDB"}})]),i("br"),i("a",{attrs:{href:"https://www.mongodb.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("MongoDB")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("079a"),alt:"PostgreSQL"}})]),i("br"),i("a",{attrs:{href:"https://www.postgresql.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("PostgreSQL")])]),i("div",{staticClass:"tile is-child has-text-centered tech-logo"},[i("figure",{staticClass:"image"},[i("img",{attrs:{src:s("ed32"),alt:"DynamoDB"}})]),i("br"),i("a",{attrs:{href:"https://aws.amazon.com/dynamodb",target:"_blank",rel:"noopener noreferrer"}},[e._v("DynamoDB")])])])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("figure",{staticClass:"image is-128x128 is-centered"},[i("img",{staticClass:"is-rounded",attrs:{src:s("b985"),alt:"Mathis Kretz"}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("figure",{staticClass:"image is-128x128"},[i("img",{staticClass:"is-rounded",attrs:{src:s("2589"),alt:"Tobi Fuhrimann"}})])}],l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"navbar-item has-dropdown is-hoverable"},[s("a",{staticClass:"navbar-link"},[e._v(e._s(e.langs[e.$i18n.locale]))]),s("div",{staticClass:"navbar-dropdown"},e._l(e.langs,(function(t,i){return s("a",{key:i,staticClass:"navbar-item",on:{click:function(t){return e.handleLocaleChange(i)}}},[e._v(" "+e._s(t)+" ")])})),0)])},c=[],d=s("8ded"),m=s.n(d),h=(s("4160"),s("d3b7"),s("ac1f"),s("466d"),s("159b"),s("ddb0"),s("9f12")),u=s("53fe"),f=s("a925"),g=s("00ba");function p(){var e=s("49f8"),t={};return e.keys().forEach((function(s){var i=s.match(/([A-Za-z0-9-_]+)\./i);if(i&&i.length>1){var a=i[1];t[a]=e(s)}})),t}i["a"].use(f["a"]);var b="locale:bespinian",v=function(){function e(){Object(h["a"])(this,e)}return Object(u["a"])(e,[{key:"getLocales",value:function(){return m.a.get(b)?[m.a.get(b)]:[]}}]),e}();function C(){var e=[new g["c"].FallbacksTransformer,new g["c"].IETFTransformer,new g["c"].InvalidLocalesTransformer,new g["c"].LanguageOnlyTransformer],t=new g["b"]([new g["a"].UrlDetector("lang")],e),s=new g["b"]([new v],e),i=new g["b"]([new g["a"].NavigatorDetector],e);return t.getLocales().length>0?t.getLocales()[0]:s.getLocales().length>0?s.getLocales()[0]:i.getLocales()[0]}var w=new f["a"]({locale:C(),fallbackLocale:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_I18N_FALLBACK_LOCALE||"en",messages:p()}),_={data:function(){return{langs:{en:"English",de:"Deutsch",be:"Bärndütsch"}}},methods:{handleLocaleChange:function(e){this.$i18n.locale=e,m.a.set(b,e)}}},y=_,k=s("2877"),x=Object(k["a"])(y,l,c,!1,null,null,null),z=x.exports,S={components:{LocaleChanger:z},data:function(){return{showNav:!1}},methods:{toggleNav:function(){this.showNav=!this.showNav}}},T=S,$=(s("8b71"),Object(k["a"])(T,r,o,!1,null,null,null)),j=$.exports,I={name:"App",components:{Home:j}},N=I,M=(s("034f"),Object(k["a"])(N,a,n,!1,null,null,null)),E=M.exports,O=s("ecee"),D=s("c074"),L=s("f2d1"),W=s("ad3d"),A=(s("92c6"),s("df77"),s("c919"),s("f13c")),B=s.n(A);O["c"].add(D["b"],D["c"],D["g"],D["f"],D["a"],D["h"],D["j"],L["c"],L["a"],L["b"],L["d"],D["i"],D["k"],D["d"],D["e"]),i["a"].component("font-awesome-icon",W["a"]),i["a"].use(B.a,{offset:-30}),i["a"].config.productionTip=!1,new i["a"]({i18n:w,render:function(e){return e(E)}}).$mount("#app")},"5e0a":function(e,t,s){e.exports=s.p+"img/terraform.d4d612fc.svg"},6620:function(e,t,s){e.exports=s.p+"img/cloudcity.35d68c07.svg"},"6ce2":function(e){e.exports=JSON.parse('{"subtitle":"Cloud Native Citizens","mission":{"nav_item":"Mission","title":"Unsere Mission","body":"Wir von bespinian lieben Software. Besonders, wenn sie einfach und effizient ist und ihre Anforderungen erfüllt. Grossartige Software wird von grossartigen Teams entwickelt. Aus diesem Grund bauen alle unsere Dienstleistungen auf einer engen Zusammenarbeit mit Ihrem Team auf. Wir sind zuhause in privaten, hybriden und public Clouds. Das macht uns zum idealen Partner für Ihr Unternehmen beim Kreieren von erstklassigen Cloud-basierten Lösungen.","solutions":{"title":"Die Lösungen, die wir zusammen kreieren sind","operate":"einfach zu betreiben","adaptable":"leicht zu ändern","scalable":"skalierbar unter Last","optimized":"optimiert auf Ihre Geschäftsziele"}},"services":{"nav_item":"Dienstleistungen","title":"Unsere Dienstleistungen","body":"Egal, ob Sie ein neues Vorhaben beginnen, eine bestehende Idee überarbeiten oder Ihre bestehenden Applikationen transformieren, wir begleiten Ihr Team hands-on, in jeder Iteration Ihres Projekts. Hier sind einige Dienstleistungen, die wir anbieten. Wenn Sie etwas suchen, das nicht auf der Liste ist, lassen Sie es uns wissen. Wir sind immer offen für Innovation.","timeline":{"assess":{"title":"Bewerten","body":"Die perfekte Wahl oder zu gut, um wahr zu sein? Wir helfen Ihnen, die richtigen Partner für Ihr Projekt zu finden."},"transform":{"title":"Transformieren","body":"Jedes Unternehmen hat eine Geschichte. Zusammen analysieren wir Ihre bestehenden Applikationen und machen sie bereit für die Cloud."},"design":{"title":"Designen","body":"Ein Diagramm sagt mehr als tausend Worte. Wir strukturieren Ihre Geschäftsdomäne und identifizieren die Schlüsselkonzepte."},"build":{"title":"Umsetzen","body":"Von der Papierserviette zum Source Code. Wir helfen Ihnen bei der Umsetzung Ihrer Ideen als Cloud-basierte Software."},"run":{"title":"Betreiben","body":"Innovation ohne Unterbruch. Wir helfen Ihnen bei der erfolgreichen Einführung von DevOps in Ihrer Organisation."},"rethink":{"title":"Überdenken","body":"Im Nachhinein ist alles einfach. Machen wir uns diese Tatsache zu Nutze und bringen wir Ihre Lösung auf die nächste Stufe!"}}},"technologies":{"nav_item":"Technologien","title":"Unsere Technologien","platforms":{"body":{"intro":"Wir sind überzeugt, dass Ideen die Technologien bestimmen sollen und nicht umgekehrt. Zusammen entwickeln wir Lösungen auf der Basis von modernen Technologien, die Ihrem Team ermöglichen mehr Zeit mit dem Erschaffen von Mehrwert zu verbringen und weniger mit dem Betrieb von Infrastruktur. Hier ist eine Auswahl von","platforms":"Plattformen","weAreNativeTo":"auf denen wir Experten sind"}},"tools":{"body":{"intro":"Auch wenn wir nichts mehr lieben als Code zu schreiben, ist es nicht unser Ding das Rad neu zu erfinden. Wir wissen, wann es besser ist, ein existierendes Produkt einzusetzen und wir teilen dieses Wissen mit Ihrem Team. Hier sind einige unserer liebsten","tools":"Tools"}}},"team":{"nav_item":"Team","title":"Unser Team","body":"Wir sind Cloud Software Engineers der ersten Stunde mit Berufserfahrung sowohl in Grossunternehmen als auch in Startups. Wir sind stolz auf unsere Fähigkeiten als kompetente Berater, einfühlsame Coaches und erfahrene Coder. Interessiert, uns zu treffen? Dann kommen Sie einfach ungeniert über Social Media auf uns zu, treffen uns an einem Meetup in Ihrer Nähe oder nutzen das Kontaktformular unten.","member-1":{"name":"Mathis Kretz","catchphrase":"Keeper of Simple","body":"Softwarearchitekt und Mitgründer. Spezialisert auf Microservices, Containertechnologien und Cloud-Native Engineering."},"member-2":{"name":"Tobi Fuhrimann","catchphrase":"Head in the Clouds","body":"Software Engineer und Mitgründer. Spezialisiert auf Clouddienste, verteilte Systeme und Webentwicklung mit modernen Technologien."}},"contact":{"nav_item":"Kontakt","title":"Kontaktieren Sie uns","body":"Haben Sie eine Frage? Benötigen Sie eine Offerte? Oder möchten Sie mal auf einen Kaffee oder ein Bier vorbeikommen? In jedem Fall freuen wir uns über Ihre Kontaktaufnahme und melden uns so rasch wie möglich bei Ihnen.","form":{"nameplaceholder":"Name","emailplaceholder":"Email","subjectplaceholder":"Betreff","messageplaceholder":"Nachricht","sendbuttonlabel":"Abschicken"}}}')},"81bb":function(e,t,s){e.exports=s.p+"img/elasticsearch.0d4e4f51.svg"},"84e5":function(e,t,s){e.exports=s.p+"img/concourse.cfc439f0.svg"},"85ec":function(e,t,s){},8857:function(e,t,s){e.exports=s.p+"img/docker.ce9fe79f.svg"},"88d7":function(e,t,s){},"8b71":function(e,t,s){"use strict";var i=s("88d7"),a=s.n(i);a.a},"8bcb":function(e,t,s){e.exports=s.p+"img/redis.22209f44.svg"},"90a8":function(e,t,s){e.exports=s.p+"img/kubernetes.42656ba0.svg"},"969a":function(e,t,s){e.exports=s.p+"img/graphql.7dd3e9ee.svg"},"99e0":function(e,t,s){e.exports=s.p+"img/mongodb.586d05b8.svg"},b0c6:function(e,t,s){e.exports=s.p+"img/jenkins.dd521bc2.svg"},b134:function(e,t,s){e.exports=s.p+"img/rabbitmq.59aa0861.svg"},b2e9:function(e,t,s){e.exports=s.p+"img/react.d1cfa973.svg"},b985:function(e,t,s){e.exports=s.p+"img/mathis.c5e3de0c.jpg"},c981:function(e,t,s){e.exports=s.p+"img/aws.597c02ad.svg"},d174:function(e){e.exports=JSON.parse('{"subtitle":"Cloud Native Citizens","mission":{"nav_item":"Mission","title":"Üsi Mission","body":"Mir vo bespinian liebe Software. Bsunders, wenn si eifach und effiziänt isch und ihri Aforderige erfüllt. Grossartigi Software wird vo grossartige Teams entwicklet. Us däm Grund boue aui üsi Dienschtleischtige uf ere änge Zämearbeit mit öiem Team uf. Mir füehle üs deheim uf private, hybride und public Clouds. Das macht üs zum ideale Partner für öies Undernähme bim Kreiere vo erschtklassige Cloud-basierte Lösige.","solutions":{"title":"D Lösige, wo mir zäme kreiere si","operate":"eifach z betribe","adaptable":"liecht z ändere","scalable":"skalierbar unter Lascht","optimized":"optimiert uf öji Gschäftzziel"}},"services":{"nav_item":"Dienschtleischtige","title":"Üsi Dienschtleischtige","body":"Egal, öb dihr es nöis Vorhabe aföht, e beschtehendi Idee überarbeitet oder öji beschtehende Applikatione tranformieret, mir begleite öies Team hands-on, i jedere Iteration vo öiem Projekt. Hie si es paar vo de Dienschtleischtige wo mir abiete. Wenn dihr öppis suechet, wo nid uf der Lischte isch, löhts üs la wüsse. Mir si immer offe für Innovation.","timeline":{"assess":{"title":"Bewärte","body":"Di perfekti Wahl oder z guet um wahr z sii? Mir hälfe öich di richtige Partner für öies Projekt z finde."},"transform":{"title":"Transformiere","body":"Jedes Unternähme het e Gschicht. Zäme analysiere mr öji beschtehende Applikatione und mache se parat für d Cloud."},"design":{"title":"Designe","body":"Es Diagramm seit meh aus tusig Wort. Mir strukturiere öji Gschäftsdomäne und identifiziere d Schlüsselkonzept."},"build":{"title":"Umsetze","body":"Vo der Serviette zum Source Code. Mir hälfe öich bi der Umsetzig vo öine Ideene als Cloud-basierti Software."},"run":{"title":"Betribe","body":"Innovation ohni Unterbruch. Mir hälfe öich bi der erfolgriche Ifüehrig vo DevOps i öier Organisation."},"rethink":{"title":"Überdänke","body":"Im Nachhinein isch alles eifach. Nütze mr di Tatsach und bringe öji Lösig uf di nächschti Stuefe!"}}},"technologies":{"nav_item":"Technologie","title":"Üsi Technologie","platforms":{"body":{"intro":"Mir si überzügt, dass Ideene d Technologie söue beschtimme und nid umgekehrt. Zäme finde mir Lösige uf Basis vo moderne Technologie wo öiem Team ermögleche meh Zit mitem Erschaffe vo Mehrwärt z verbringe und weniger mitem Betrib vo Infraschtruktur. Hie isch e Uswahl vo","platforms":"Plattforme","weAreNativeTo":"wo mir Experte druf si"}},"tools":{"body":{"intro":"Ou wenn mir nüt meh liebe als Code z schribe, isches nid üses Ding ds Rad nöi z erfinde. Mir wüsse, wenns besser isch, es exischtierends Produkt izsetze und mir teile das Wüsse mit öiem Team. Hie si es paar vo üsne liebschte","tools":"Tools"}}},"team":{"nav_item":"Team","title":"Üses Team","body":"Mir si Cloud Software Engineers vor erschte Stund mit Bruefserfahrig sowohl i Grossundernähme als ou i Startups. Mir si stolz uf üsi Fähigkeite als kompetänti Berater, ifühlsami Coaches und erfahreni Coder. Interessiert üs z träffe? De chömet eifach ungeniert über Social Media uf üs zue, träffet üs amne Meetup ir Nechi oder nützet ds Kontaktformular unde.","member-1":{"name":"Mathis Kretz","catchphrase":"Keeper of Simple","body":"Softwarearchitekt und Mitgründer. Spezialisert uf Microservices, Containertechnologie and Cloud-Native Engineering."},"member-2":{"name":"Tobi Fuhrimann","catchphrase":"Head in the Clouds","body":"Software Engineer und Mitgründer. Spezialisiert uf Clouddienscht, verteilti Syschtem und Webentwicklig mit moderne Technologie."}},"contact":{"nav_item":"Kontakt","title":"Kontaktieret üs","body":"Heiter e Frag? Bruchet der e Offerte? Oder möchtet der mal ufnes Kafi oder es Bier verbicho? I jedem Fall fröie mir üs über öji Kontaktufnahm und mälde üs so rasch wi möglech bi öich.","form":{"nameplaceholder":"Name","emailplaceholder":"Email","subjectplaceholder":"Beträff","messageplaceholder":"Nachricht","sendbuttonlabel":"Abschicke"}}}')},ed32:function(e,t,s){e.exports=s.p+"img/dynamodb.7f4a5fbc.svg"},edd4:function(e){e.exports=JSON.parse('{"subtitle":"Cloud Native Citizens","mission":{"nav_item":"Mission","title":"Our Mission","body":"At bespinian we love software. Especially if it\'s simple, efficient and spot on the requirements. Awesome software is made by awesome teams. That\'s why all of our services are focused on close collaboration with your team. Also, we feel at home in private, hybrid and public clouds. That makes us your ideal partner for creating great cloud-native solutions.","solutions":{"title":"Together, we create solutions which are","operate":"easy to operate","adaptable":"adaptable to change","scalable":"scalable under load","optimized":"optimized for your business"}},"services":{"nav_item":"Services","title":"Our Services","body":"No matter whether you are embarking on a new endeavour, reworking an idea or transforming your existing applications, we work hands-on with your team in every iteration of your project. Here are some of the services we offer. If what you require is not on the list, let us know. We\'re always happy to innovate.","timeline":{"assess":{"title":"Assess","body":"Perfect match or too good to be true? We help you choose the right partners for your project."},"transform":{"title":"Transform","body":"Everyone has a history. Together, we review your existing applications and get them ready for the cloud."},"design":{"title":"Design","body":"A diagram says more than a thousand words. Let’s structure your business domain and identify crucial concepts."},"build":{"title":"Build","body":"From napkin to code. We help you realize your ideas in lean and cloud-native software."},"run":{"title":"Run","body":"Innovation without downtime. We help you introduce and master DevOps in your organization."},"rethink":{"title":"Rethink","body":"Everything is simple in hindsight. Let’s embrace that fact and take your solution to the next level!"}}},"technologies":{"nav_item":"Technologies","title":"Our Technologies","platforms":{"body":{"intro":"We are convinced that technology should follow ideas and not the other way around. Together we design and implement architectures based on modern technologies which enable your team to spend more time on delivering business value and less on infrastructure operations. Here\'s a selection of the","platforms":"platforms","weAreNativeTo":"we are native to"}},"tools":{"body":{"intro":"Even though we passionately write code, reinventing the wheel is not our game. We know when to use an existing product to solve a problem and we share this knowledge with your team. Here are some of our favorite","tools":"tools"}}},"team":{"nav_item":"Team","title":"The Team","body":"We are cloud-native software engineers with experience in both the corporate and the startup world. We pride ourselves in being expert consultants, competent coaches and seasoned coders at the same time. Interested in meeting us? Feel free to approach us on social media or at a meetup near you.","member-1":{"name":"Mathis Kretz","catchphrase":"Keeper of Simple","body":"Software Architect and co-founder. Specialized in microservices, container technologies and cloud-native engineering."},"member-2":{"name":"Tobi Fuhrimann","catchphrase":"Head in the Clouds","body":"Software Engineer and co-founder. Specialized in cloud services, distributed systems and web development with modern technologies."}},"contact":{"nav_item":"Contact","title":"Contact Us","body":"Have a question? Need a quote? Wanna grab a coffee or a beer? Drop us a line and we\'ll be happy to get back to you as soon as possible.","form":{"nameplaceholder":"Name","emailplaceholder":"Email","subjectplaceholder":"Subject","messageplaceholder":"Message","sendbuttonlabel":"Send"}}}')}});
//# sourceMappingURL=app.71ce697e.js.map