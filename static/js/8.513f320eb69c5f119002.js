webpackJsonp([8],{"6Ppx":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("gyMJ"),i=e("biK0"),r=e("34jS"),s=e("DKky"),v=e("KgXo"),o={components:{appBar:i.a,Nav:r.a,mv:s.a,loading:v.a},data:function(){return{nav:[{name:"推荐",path:"/newMV?type=all"},{name:"内地",path:"/newMV?type=neidi"},{name:"港台",path:"/newMV?type=gangtai"},{name:"欧美",path:"/newMV?type=oumei"},{name:"韩国",path:"/newMV?type=korea"},{name:"日本",path:"/newMV?type=janpan"}],mv:[]}},methods:{loadData:function(){var a=this;this.mv=[],this.$jsonp(n.a.GET_NEW_MV,{lan:this.$route.query.type,callbackName:"get_new_mv"}).then(function(t){a.mv=t.data.mvlist.map(function(a){return{id:a.vid,title:a.mvtitle,pic:a.picurl,artist:a.singers.map(function(a){return a.name}).join("、")}})})}},watch:{$route:"loadData"},mounted:function(){this.loadData()}},p={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"newMV"}},[e("app-bar",{attrs:{title:"最新MV"}}),a._v(" "),e("Nav",{staticClass:"nav",attrs:{data:a.nav}}),a._v(" "),e("div",{staticClass:"divider"}),a._v(" "),a.mv.length>0?e("mv",{attrs:{data:a.mv}}):a._e(),a._v(" "),e("loading",{directives:[{name:"show",rawName:"v-show",value:0==a.mv.length,expression:"mv.length == 0"}]})],1)},staticRenderFns:[]};var l=e("vSla")(o,p,!1,function(a){e("D2O3")},"data-v-71bf8ae3",null);t.default=l.exports},D2O3:function(a,t){}});