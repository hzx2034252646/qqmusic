webpackJsonp([4],{"4B0c":function(t,e,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",t._l(t.data,function(e,i){return a("span",{key:i,staticClass:"nav-item",class:{"nav-active":t.active==e.active},on:{click:function(a){t.active=e.active}}},[t._v("\n    "+t._s(e.name)+"\n  ")])}))},staticRenderFns:[]};var s=a("vSla")({props:["data"],data:function(){return{active:this.data[0].active}},watch:{active:function(t){this.$emit("setActive",t)}}},i,!1,function(t){a("GsMm")},"data-v-228d91e1",null);e.a=s.exports},AeuC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("IHPB"),s=a.n(i),r=a("lC5x"),n=a.n(r),c=a("J0Oq"),l=a.n(c),o=a("gyMJ"),u=a("KgXo"),m=a("/Nt4"),d=a("iuKr"),v=a("DKky"),f=a("4B0c"),h={components:{loading:u.a,song:m.a,album:d.a,mv:v.a,tabBar:f.a},data:function(){return{loading:!1,type:"music",artistName:"",artistDesc:"",music:[],album:[],mv:[],page:1,tab:[{name:"单曲",active:"music"},{name:"专辑",active:"album"},{name:"MV",active:"mv"},{name:"详情",active:"detail"}],tabFixed:!1}},computed:{cover:function(){return"http://y.gtimg.cn/music/photo_new/T001R500x500M000"+this.$route.params.id+".jpg"},artistId:function(){return this.$route.params.id}},methods:{setActive:function(t){var e=this;return l()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.type=t,e.page=1,e.music=[],e.album=[],e.mv=[],e.loading=!0,a.t0=t,a.next="music"===a.t0?9:"album"===a.t0?12:"mv"===a.t0?15:18;break;case 9:return a.next=11,e.loadMusic();case 11:return a.abrupt("break",18);case 12:return a.next=14,e.loadAlbum();case 14:return a.abrupt("break",18);case 15:return a.next=17,e.loadMV();case 17:return a.abrupt("break",18);case 18:e.loading=!1;case 19:case"end":return a.stop()}},a,e)}))()},scroll:function(){var t=this.$refs.scrollView;if(t.scrollTop+t.offsetHeight>=t.scrollHeight)switch(this.type){case"music":this.music.length>0&&this.loadMusic();break;case"album":this.album.length>0&&this.loadAlbum();break;case"mv":this.mv.length>0&&this.loadMV()}},loadMusic:function(){var t=this;return this.$refs.scrollView&&this.$refs.scrollView.removeEventListener("scroll",this.scroll),this.$jsonp(o.a.GET_ARTIST_MUSIC,{singermid:this.artistId,begin:20*(this.page++-1),from:"h5",callbackName:"get_artist_music"}).then(function(e){var a=e.data.list&&e.data.list.map(function(t){return{id:t.musicData.songid,mid:t.musicData.songmid,title:t.musicData.songname,singer:t.musicData.singer,album:{mid:t.musicData.albummid,title:t.musicData.albumname},mv:{vid:t.musicData.vid}}})||[];t.music=[].concat(s()(t.music),s()(a)),!t.artistName&&(t.artistName=e.data.singer_name),!t.artistDesc&&(t.artistDesc=e.data.SingerDesc),t.$nextTick(function(){a.length>0&&t.$refs.scrollView.addEventListener("scroll",t.scroll)})})},loadAlbum:function(){var t=this;return this.$refs.scrollView.removeEventListener("scroll",this.scroll),this.$jsonp(o.a.GET_ARTIST_ALBUM,{singermid:this.artistId,begin:20*(this.page++-1),callbackName:"get_artist_album"}).then(function(e){var a=e.data.list&&e.data.list.map(function(t){return{id:t.albumMID,title:t.albumName,artist:t.singers.map(function(t){return t.singer_name}).join("、"),pic:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.albumMID+".jpg"}})||[];t.album=[].concat(s()(t.album),s()(a)),a.length>0&&t.$refs.scrollView.addEventListener("scroll",t.scroll)})},loadMV:function(){var t=this;return this.$refs.scrollView.removeEventListener("scroll",this.scroll),this.$jsonp(o.a.GET_ARTIST_MV,{singermid:this.artistId,begin:20*(this.page++-1),callbackName:"get_artist_mv"}).then(function(e){var a=e.data.list&&e.data.list.map(function(t){return{id:t.vid,title:t.title,artist:t.singer_name,pic:t.pic}})||[];t.mv=[].concat(s()(t.mv),s()(a)),a.length>0&&t.$refs.scrollView.addEventListener("scroll",t.scroll)})}},mounted:function(){var t=this;return l()(n.a.mark(function e(){var a,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.loadMusic();case 2:a=4.2*parseFloat(document.documentElement.style.fontSize),(i=t.$refs.scrollView).addEventListener("scroll",function(){var e=i.scrollTop;e<=a?(t.$refs.title.style.opacity=(e/a).toFixed(1),t.$refs.header.style.background="rgba(0,0,0,"+(.5*e/a).toFixed(1)+")",t.tabFixed=!1):(t.$refs.title.style.opacity=1,t.$refs.header.style.background="rgba(0,0,0,0.5)",t.tabFixed=!0)});case 5:case"end":return e.stop()}},e,t)}))()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"artist-detail"}},[t.artistName?a("header",{ref:"header"},[a("span",{staticClass:"back",on:{click:function(e){t.$router.back()}}}),t._v(" "),a("span",{ref:"title",staticClass:"title"},[t._v(t._s(t.artistName))])]):t._e(),t._v(" "),t.artistName?a("div",{ref:"cover",staticClass:"cover",style:{"background-image":"url("+t.cover+")"}}):t._e(),t._v(" "),t.artistName?a("div",{ref:"scrollView",staticClass:"container"},[a("div",{staticStyle:{"margin-top":"4.2rem"}}),t._v(" "),a("tab-bar",{class:{fixed:t.tabFixed},attrs:{data:t.tab},on:{setActive:t.setActive}}),t._v(" "),a("song",{attrs:{data:t.music}}),t._v(" "),a("album",{attrs:{data:t.album}}),t._v(" "),a("mv",{attrs:{data:t.mv}}),t._v(" "),"detail"===t.type?a("div",{staticClass:"desc"},[a("p",{domProps:{innerHTML:t._s(t.artistDesc)}})]):t._e()],1):t._e(),t._v(" "),t.artistName?t._e():a("loading"),t._v(" "),a("loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticStyle:{top:"60%"}})],1)},staticRenderFns:[]};var g=a("vSla")(h,p,!1,function(t){a("W08x")},"data-v-4389ae4d",null);e.default=g.exports},GsMm:function(t,e){},W08x:function(t,e){}});