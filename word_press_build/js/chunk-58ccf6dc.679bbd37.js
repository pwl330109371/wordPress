(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-58ccf6dc"],{"079a":function(t,e,a){"use strict";a.r(e),a("6a61");var n=a("cf7f"),i=a("e793"),r=a("ed08"),s={props:{articleList:{type:Array}},data:function(){return{pageSize:10,currentPage:1,noData:!1,tag:"",keyword:"",loading:!1,immediate:!1,scroll:null}},computed:{noMore:function(){return this.noData},disabled:function(){return this.loading||this.noMore}},mounted:function(){},activated:function(){this.scroll>0&&(this.$refs.mainCenter.scrollTo(0,this.scroll),this.scroll=0)},methods:{handleScroll:function(){this.scroll=this.$refs.mainCenter.scrollTop},goArticleDetail:function(t){this.$router.push({path:"/articleDetail",query:{articleId:t}})},load:function(){var t=this;this.loading=!0,setTimeout((function(){t.currentPage++}),500)}},filters:{fromDate:function(t){return Object(r.a)(new Date(t).getTime())}}},c=(a("aad0"),a("9ca4")),o=Object(c.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainCenter",staticClass:"main-center",on:{scroll:t.handleScroll}},[a("div",{staticClass:"infinite-list-wrapper"},[t.articleList.length>0?a("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"infinite-list",attrs:{"infinite-scroll-immediate":"immediate","infinite-scroll-disabled":"disabled"}},t._l(t.articleList,(function(e){return a("li",{key:e._id,staticClass:"infinite-list-item",on:{click:function(a){return t.goArticleDetail(e._id)}}},[a("div",{staticClass:"aticle-left"},[a("div",{staticClass:"user-info"},[a("span",[t._v(t._s(e.author)+"#")]),a("em",[t._v(t._s(t._f("fromDate")(e.date))+"#")]),a("span",[t._v(t._s(e.author)+"#")]),a("span",[t._v("面试")]),a("span",[t._v("/javascript#")])]),a("div",{staticClass:"aticle-title"},[t._v(t._s(e.title))]),t._m(0,!0)]),e.articleImg?a("div",{staticClass:"aticle-right"},[a("el-image",{attrs:{src:"http://192.168.0.106:3000/upload/"+e.articleImg,lazy:"",fit:"contain"}})],1):t._e()])})),0):a("div",{staticClass:"no-more"},[t._v("暂无更多数据...")]),t.loading?a("p",{staticClass:"loading-text"},[a("i",{staticClass:"el-icon-loading"}),t._v(" 加载中... ")]):t._e(),t.noMore?a("p",{staticClass:"no-more"},[t._v("没有更多了")]):t._e()])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"aticle-share"},[e("span",[e("i",{staticClass:"el-icon-thumb"}),this._v("17")]),e("span",[e("i",{staticClass:"el-icon-chat-dot-square"}),this._v("17")])])}],!1,null,"6ed1b98d",null).exports,l={name:"FollowList",props:{followList:{type:Array}},data:function(){return{}},computed:{},watch:{},methods:{goUserInfo:function(t){this.$router.push({path:"/userInfo",query:{userId:t}})}}},u=(a("6fb7"),Object(c.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-list"},t._l(t.followList,(function(e){return a("div",{key:e._id,staticClass:"user-list"},[a("div",{staticClass:"user-avatar",on:{click:function(a){return t.goUserInfo(e._id)}}},[a("img",{attrs:{src:e.avatar,alt:"",srcset:""}})]),a("div",{staticClass:"user-info"},[a("h3",[t._v(t._s(e.name))]),a("p",[t._v("微信公众号：阿里前端")])]),a("div",{staticClass:"is-follow-btn"},[a("el-button",{attrs:{type:"success",size:"small"}},[t._v("已关注")])],1)])})),0)}),[],!1,null,"6325eeff",null).exports),d=a("5880"),f=a("c24f"),v={name:"",data:function(){return{loading:!1,activeIndex:"1",userInfo:{},articleList:[],followList:[]}},components:{ArticleList:o,UserList:u},computed:Object(i.a)(Object(i.a)({},Object(d.mapState)({user:function(t){return t.user.userInfo}})),{},{userId:function(){var t=this.$route.query.userId;return t||this.user._id}}),watch:{},mounted:function(){this.getUserInfo(),this.getMyArticle()},methods:{handleSelect:function(t){switch(t){case"1":this.getMyArticle();break;case"2":this.getMyFavorite();break;case"3":this.getMyPraise();break;case"4":this.getMyFollow();break;case"5":this.getMyFens()}this.activeIndex=t},getUserInfo:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.f)(t.userId);case 3:a=e.sent,n=a.data,t.loading=!1,t.userInfo=n;case 7:case"end":return e.stop()}}),e)})))()},getMyArticle:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.a)(t.userId);case 3:a=e.sent,n=a.data,t.loading=!1,t.articleList=n;case 7:case"end":return e.stop()}}),e)})))()},getMyFavorite:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.b)(t.userId);case 3:a=e.sent,n=a.data,t.loading=!1,t.articleList=n.data;case 7:case"end":return e.stop()}}),e)})))()},getMyPraise:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.e)(t.userId);case 3:a=e.sent,n=a.data,t.loading=!1,t.articleList=n.data;case 7:case"end":return e.stop()}}),e)})))()},getMyFollow:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.d)(t.userId);case 3:a=e.sent,n=a.data,t.loading=!1,t.followList=n.data;case 7:case"end":return e.stop()}}),e)})))()},getMyFens:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(f.c)();case 3:a=e.sent,n=a.data,t.loading=!1,t.followList=n.data;case 7:case"end":return e.stop()}}),e)})))()}}},g=(a("3fa0"),Object(c.a)(v,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-info"},[a("div",{staticClass:"user-left"},[a("div",{staticClass:"user-info-head"},[a("div",{staticClass:"user-avatar"},[a("img",{attrs:{src:t.userInfo.avatar,alt:"",srcset:""}})]),a("div",{staticClass:"user-desc"},[a("h3",{staticClass:"user-name"},[t._v(t._s(t.userInfo.name))]),a("div",{staticClass:"user-work"},[t._v("前端工程师")])]),a("div",{staticClass:"edit-user"},[a("el-button",{attrs:{type:"primary",plain:""}},[t._v("编辑资料")])],1)]),a("div",{staticClass:"user-container"},[a("div",{staticClass:"user-container-tab"},[a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.handleSelect}},[a("el-menu-item",{attrs:{index:"1"}},[t._v("用户文章")]),a("el-menu-item",{attrs:{index:"2"}},[t._v("用户收藏")]),a("el-menu-item",{attrs:{index:"3"}},[t._v("用户点赞")]),a("el-menu-item",{attrs:{index:"4"}},[t._v("用户关注")])],1)],1),a("div",{staticClass:"user-container-list"},[1==t.activeIndex||2==t.activeIndex||3==t.activeIndex?a("article-list",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{articleList:t.articleList}}):t._e(),4==t.activeIndex||5==t.activeIndex?a("user-list",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"follow-list":t.followList}}):t._e()],1)])]),a("div",{staticClass:"user-right"},[t._v(" 1 ")])])}),[],!1,null,"d5876f90",null));e.default=g.exports},"3fa0":function(t,e,a){"use strict";var n=a("d99c");a.n(n).a},"6fb7":function(t,e,a){"use strict";var n=a("7b45");a.n(n).a},"77ad":function(t,e,a){"use strict";var n=a("1c8b"),i=a("a719"),r=a("74e7"),s=a("e1d6"),c=a("d88d"),o=a("da10"),l=a("1bbd"),u=a("90fb"),d=a("1ea7"),f=a("ff9c"),v=d("slice"),g=f("slice",{ACCESSORS:!0,0:0,1:2}),m=u("species"),h=[].slice,p=Math.max;n({target:"Array",proto:!0,forced:!v||!g},{slice:function(t,e){var a,n,u,d=o(this),f=c(d.length),v=s(t,f),g=s(void 0===e?f:e,f);if(r(d)&&("function"!=typeof(a=d.constructor)||a!==Array&&!r(a.prototype)?i(a)&&null===(a=a[m])&&(a=void 0):a=void 0,a===Array||void 0===a))return h.call(d,v,g);for(n=new(void 0===a?Array:a)(p(g-v,0)),u=0;v<g;v++,u++)v in d&&l(n,u,d[v]);return n.length=u,n}})},"7b45":function(t,e,a){},a27b:function(t,e,a){},aad0:function(t,e,a){"use strict";var n=a("a27b");a.n(n).a},d99c:function(t,e,a){},ed08:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return r})),a("77ad"),a("e35a"),a("5e9f");var n=a("f7f9");function i(t,e){if(0===arguments.length)return null;var a,i=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(n.a)(t)?a=t:(10===(""+t).length&&(t=1e3*parseInt(t)),a=new Date(t));var r={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),a:a.getDay()};return i.replace(/{(y|m|d|h|i|s|a)+}/g,(function(t,e){var a=r[e];return"a"===e?["日","一","二","三","四","五","六"][a]:(t.length>0&&a<10&&(a="0"+a),a||0)}))}function r(t,e){var a=new Date(t),n=(Date.now()-t)/1e3;return n<30?"刚刚":n<3600?Math.ceil(n/60)+"分钟前":n<86400?Math.ceil(n/3600)+"小时前":n<172800?"1天前":e?i(t,e):a.getMonth()+1+"月"+a.getDate()+"日"+a.getHours()+"时"+a.getMinutes()+"分"}}}]);