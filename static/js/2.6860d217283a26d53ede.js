webpackJsonp([2],{"De5/":function(t,e){},bp2D:function(t,e){},d0kq:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"artist-list"},t._l(t.data,function(e,r){return a("div",{key:r,staticClass:"artist-list-item",on:{click:function(s){t.$router.push("/artist/"+e.id)}}},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:{src:e.pic,error:s("Zziw"),loading:s("Zziw")},expression:"{src: item.pic, error: require('../assets/img/person.png'), loading: require('../assets/img/person.png')}"}],attrs:{alt:""}})]),t._v(" "),a("div",{staticClass:"title"},[t._v(t._s(e.title))])])}))},staticRenderFns:[]};var r=s("C7Lr")({props:["data"]},a,!1,function(t){s("De5/")},"data-v-4febf968",null);e.a=r.exports},jm6G:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("lC5x"),r=s.n(a),n=s("J0Oq"),i=s.n(n),c=s("IHPB"),o=s.n(c),l=s("3cXf"),h=s.n(l),u=s("gyMJ"),p=s("/Nt4"),m=s("d0kq"),d=s("iuKr"),v=s("DKky"),g=s("34jS"),_=s("KgXo"),y={components:{song:p.a,artist:m.a,album:d.a,mv:v.a,Nav:g.a,loading:_.a},data:function(){return{visible:!0,loading:!1,search_hot:[],search_history:[],type:0,keyword:"",s:"",page:1,song:[],artist:[],album:[],mv:[]}},computed:{nav:function(){return[{name:"单曲",path:"/search?type=song&s="+this.keyword},{name:"歌手",path:"/search?type=singer&s="+this.keyword},{name:"专辑",path:"/search?type=album&s="+this.keyword},{name:"MV",path:"/search?type=mv&s="+this.keyword}]}},methods:{cancel:function(){this.s="",this.visible=!0,this.$refs.search.blur(),this.$router.push("/search")},clearHistory:function(){localStorage.removeItem("qsearch"),this.search_history=[]},clear:function(t){this.search_history.splice(t,1),localStorage.setItem("qsearch",h()(this.search_history))},scroll:function(){var t=document.getElementById("app");if(t.scrollTop+t.offsetHeight>=t.scrollHeight)switch(this.$route.query.type){case"song":this.song.length>0&&this.searchSong();break;case"singer":this.artist.length>0&&this.searchArtist();break;case"album":this.album.length>0&&this.searchAlbum();break;case"mv":this.mv.length>0&&this.searchMV()}},searchSong:function(){var t=this;return document.getElementById("app").removeEventListener("scroll",this.scroll),this.$jsonp(u.a.GET_SEARCH,{t:this.type,w:this.keyword,p:this.page++,callbackName:"get_search"}).then(function(e){var s=e.data.song.list;t.song=[].concat(o()(t.song),o()(s)),s.length>0&&document.getElementById("app").addEventListener("scroll",t.scroll)})},searchArtist:function(){var t=this;return document.getElementById("app").removeEventListener("scroll",this.scroll),this.$jsonp(u.a.GET_SEARCH,{t:this.type,w:this.keyword,p:this.page++,callbackName:"get_search"}).then(function(e){var s=e.data.singer.list.map(function(t){return{id:t.singerMID,title:t.singerName,pic:t.singerPic}});t.artist=[].concat(o()(t.artist),o()(s)),s.length>0&&document.getElementById("app").addEventListener("scroll",t.scroll)})},searchAlbum:function(){var t=this;return document.getElementById("app").removeEventListener("scroll",this.scroll),this.$jsonp(u.a.GET_SEARCH,{t:this.type,w:this.keyword,p:this.page++,callbackName:"get_search"}).then(function(e){var s=e.data.album.list.map(function(t){return{id:t.albumMID,title:t.albumName,artist:t.singer_list.map(function(t){return t.name}).join("、"),pic:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.albumMID+".jpg"}});t.album=[].concat(o()(t.album),o()(s)),s.length>0&&document.getElementById("app").addEventListener("scroll",t.scroll)})},searchMV:function(){var t=this;return document.getElementById("app").removeEventListener("scroll",this.scroll),this.$jsonp(u.a.GET_SEARCH,{t:this.type,w:this.keyword,p:this.page++,callbackName:"get_search"}).then(function(e){var s=e.data.mv.list.map(function(t){return{id:t.v_id,title:t.mv_name,artist:t.singer_list.map(function(t){return t.name}).join("、"),pic:t.mv_pic_url}});t.mv=[].concat(o()(t.mv),o()(s)),s.length>0&&document.getElementById("app").addEventListener("scroll",t.scroll)})},search:function(t){if(t){this.$refs.search.blur(),this.$router.push({path:"/search",query:{type:"song",s:t}});var e=JSON.parse(localStorage.getItem("qsearch"))||[],s=e.findIndex(function(e){return e===t});s>-1&&e.splice(s,1),e.unshift(t),localStorage.setItem("qsearch",h()(e))}},loadData:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.page=1,t.visible=!t.$route.query.type,t.loading=!0,t.s=t.$route.query.s,t.keyword=t.s,t.song=[],t.artist=[],t.album=[],t.mv=[],t.search_history=JSON.parse(localStorage.getItem("qsearch"))||[],e.t0=t.$route.query.type,e.next="song"===e.t0?13:"singer"===e.t0?18:"album"===e.t0?23:"mv"===e.t0?28:33;break;case 13:return t.type=0,e.next=16,t.searchSong();case 16:return t.loading=!1,e.abrupt("break",33);case 18:return t.type=9,e.next=21,t.searchArtist();case 21:return t.loading=!1,e.abrupt("break",33);case 23:return t.type=8,e.next=26,t.searchAlbum();case 26:return t.loading=!1,e.abrupt("break",33);case 28:return t.type=12,e.next=31,t.searchMV();case 31:return t.loading=!1,e.abrupt("break",33);case 33:case"end":return e.stop()}},e,t)}))()}},watch:{$route:"loadData"},mounted:function(){var t=this;this.$jsonp(u.a.GET_SEARCH_HOT,{callbackName:"get_search_hot"}).then(function(e){t.search_hot=e.data.hotkey.slice(0,8)}),this.loadData(),this.search_history=JSON.parse(localStorage.getItem("qsearch"))||[]}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"search"}},[s("header",[s("span",{staticClass:"back",on:{click:function(e){t.$router.push("/")}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.s,expression:"s",modifiers:{trim:!0}}],ref:"search",staticClass:"search-input",attrs:{type:"text",placeholder:"搜索歌曲、歌手、专辑"},domProps:{value:t.s},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.search(t.s)},input:function(e){e.target.composing||(t.s=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.s,expression:"s"}],staticClass:"cancel",on:{click:t.cancel}},[t._v("×")])]),t._v(" "),t.visible?s("div",[s("div",{staticClass:"search-hot"},[s("p",[t._v("热门搜索")]),t._v(" "),t._l(t.search_hot,function(e,a){return s("span",{key:a,staticClass:"search-hot-item",class:{active:0==a},on:{click:function(s){t.search(e.k)}}},[t._v("\n        "+t._s(e.k)+"\n      ")])})],2),t._v(" "),t.search_history.length>0?s("div",{staticClass:"search-history"},[s("p",[s("span",[t._v("搜索历史")]),t._v(" "),s("span",{staticClass:"clearHistory",on:{click:t.clearHistory}},[t._v("清空历史")])]),t._v(" "),s("div",{staticClass:"search-history-list"},t._l(t.search_history,function(e,a){return s("div",{key:a,staticClass:"search-history-item",on:{click:function(s){t.search(e)}}},[s("p",[t._v(t._s(e))]),t._v(" "),s("span",{staticClass:"clear",on:{click:function(e){e.stopPropagation(),t.clear(a)}}},[t._v("×")])])}))]):t._e()]):s("div",{staticClass:"search-content"},[s("Nav",{staticClass:"nav",attrs:{data:t.nav}}),t._v(" "),s("div",{staticClass:"divider"}),t._v(" "),t.song.length>0?s("song",{attrs:{data:t.song}}):t._e(),t._v(" "),t.artist.length>0?s("artist",{attrs:{data:t.artist}}):t._e(),t._v(" "),t.album.length>0?s("album",{attrs:{data:t.album}}):t._e(),t._v(" "),t.mv.length>0?s("mv",{attrs:{data:t.mv}}):t._e(),t._v(" "),s("loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1)])},staticRenderFns:[]};var b=s("C7Lr")(y,f,!1,function(t){s("bp2D")},"data-v-8eb93156",null);e.default=b.exports}});