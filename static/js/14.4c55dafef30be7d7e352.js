webpackJsonp([14],{sxg4:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),s=a("J0Oq"),i=a.n(s),o=a("IHPB"),c=a.n(o),l=a("gyMJ"),d=a("DKky"),u=a("KgXo"),v=a("ZLiS"),g={components:{mv:d.a,loading:u.a,category:v.a},data:function(){return{mv:[],tag:{},area:0,type:0,year:0,page:-1,loading:!1}},methods:{loadData:function(){var t=this;return this.page++,document.getElementById("app").removeEventListener("scroll",this.scroll),this.$jsonp(l.a.GET_MV,{year:this.year,area:this.area,tag:this.type,pageno:this.page,callbackName:"getMvlist"}).then(function(e){var a=e.data.mvlist.map(function(t){return{id:t.vid,title:t.mvtitle,pic:t.picurl,artist:t.singers.map(function(t){return t.name}).join("、")}});t.mv=[].concat(c()(t.mv),c()(a)),!t.tag.area&&(t.tag=e.data.taglist),a.length>0&&document.getElementById("app").addEventListener("scroll",t.scroll)})},scroll:function(){var t=document.getElementById("app");t.scrollTop+t.offsetHeight>=t.scrollHeight&&this.mv.length>0&&this.loadData()},setArea:function(t){var e=this;return i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.area=t,e.page=-1,e.mv=[],e.loading=!0,a.next=6,e.loadData();case 6:e.loading=!1;case 7:case"end":return a.stop()}},a,e)}))()},setType:function(t){var e=this;return i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.type=t,e.page=-1,e.mv=[],e.loading=!0,a.next=6,e.loadData();case 6:e.loading=!1;case 7:case"end":return a.stop()}},a,e)}))()},setYear:function(t){var e=this;return i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.year=t,e.page=-1,e.mv=[],e.loading=!0,a.next=6,e.loadData();case 6:e.loading=!1;case 7:case"end":return a.stop()}},a,e)}))()}},mounted:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.loadData();case 3:t.loading=!1;case 4:case"end":return e.stop()}},e,t)}))()},activated:function(){document.getElementById("app").addEventListener("scroll",this.scroll)},deactivated:function(){document.getElementById("app").removeEventListener("scroll",this.scroll)}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"mv"}},[t.tag.area?a("div",[a("category",{attrs:{data:t.tag.area,active:t.area,setActive:t.setArea}}),t._v(" "),a("category",{attrs:{data:t.tag.tag,active:t.type,setActive:t.setType}}),t._v(" "),a("category",{attrs:{data:t.tag.year,active:t.year,setActive:t.setYear}})],1):t._e(),t._v(" "),a("mv",{attrs:{data:t.mv}}),t._v(" "),a("loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1)},staticRenderFns:[]},m=a("vSla")(g,p,!1,null,null,null);e.default=m.exports}});