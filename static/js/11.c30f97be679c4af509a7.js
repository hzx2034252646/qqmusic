webpackJsonp([11],{"D+RF":function(t,a){},lL1Z:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("lC5x"),s=e.n(n),i=e("J0Oq"),o=e.n(i),c=e("gyMJ"),l=e("KgXo"),r=e("/Nt4"),m=e("lVAl"),d={components:{loading:l.a,song:r.a,comment:m.a},data:function(){return{data:{},comment_hot:[],comment_new:[],comment_hot_count:0,comment_new_count:0,loading:!0,visible:!1}},computed:{song:function(){return this.data.list&&this.data.list.map(function(t){return{id:t.songid,mid:t.songmid,title:t.songname,singer:t.singer,album:{mid:t.albummid,title:t.albumname},mv:{vid:t.vid}}})},albumId:function(){return this.$route.params.id},cover:function(){return"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+this.albumId+".jpg"},avatar:function(){return"http://y.gtimg.cn/music/photo_new/T001R150x150M000"+this.data.singermid+".jpg"}},watch:{$route:"loadData"},methods:{album_pic:function(t){return"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t+".jpg"},loadData:function(){var t=this;return o()(s.a.mark(function a(){var e,n,i,o,l;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.loading=!0,t.data={},a.next=4,t.$jsonp(c.a.GET_ALBUM_INFO,{albummid:t.albumId,callbackName:"get_album_info"});case 4:return e=a.sent,n=e.data,t.loading=!1,t.data=n,a.next=10,t.$jsonp(c.a.GET_COMMENT,{pagenum:0,cmd:8,topid:n.id,biztype:2});case 10:i=a.sent,o=i.comment,l=i.hot_comment,t.comment_new=o.commentlist,t.comment_hot=l.commentlist,t.comment_new_count=o.commenttotal,t.comment_hot_count=l.commenttotal,t.$nextTick(function(){var a=3.2*parseFloat(document.documentElement.style.fontSize),e=t.$refs.scrollView;e.addEventListener("scroll",function(){var n=e.scrollTop;t.$refs.title.style.opacity=n<a?(n/a).toFixed(1):1,t.$refs.cover.style.zIndex=0===n?0:-1})});case 18:case"end":return a.stop()}},a,t)}))()},showInfo:function(){this.visible=!0,history.pushState(null,null,document.URL)},popstate:function(){this.visible&&(this.visible=!1)}},mounted:function(){this.loadData(),window.addEventListener("popstate",this.popstate)},destroyed:function(){window.removeEventListener("popstate",this.popstate)}},u={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"album-detail"}},[t.data.list?e("header",[e("span",{staticClass:"back",on:{click:function(a){t.$router.back()}}}),t._v(" "),e("span",{ref:"title",staticClass:"title"},[t._v(t._s(t.data.name))])]):t._e(),t._v(" "),t.data.list?e("div",{ref:"cover",staticClass:"cover"},[e("div",{staticClass:"wrapper"},[e("div",{staticClass:"pic",on:{click:t.showInfo}},[e("img",{attrs:{src:t.cover,alt:""}})]),t._v(" "),e("div",{staticClass:"content"},[e("p",{staticClass:"title"},[t._v(t._s(t.data.name))]),t._v(" "),e("p",{staticClass:"singer",on:{click:function(a){t.$router.push("/artist/"+t.data.singermid)}}},[e("img",{attrs:{src:t.avatar,alt:""}}),t._v(" "),e("span",[t._v(t._s(t.data.singername))])])])]),t._v(" "),e("div",{staticClass:"bg-mask"}),t._v(" "),e("div",{staticClass:"bg-blur",style:{"background-image":"url("+t.cover+")"}})]):t._e(),t._v(" "),t.data.list?e("div",{ref:"scrollView",staticClass:"container"},[e("song",{staticStyle:{"margin-top":"3.2rem"},attrs:{data:t.song,num:!0}}),t._v(" "),t.data.otherAlbums.length>0?e("div",{staticClass:"list-wrapper"},[e("div",{staticClass:"list-title"},[t._v("\n        该歌手的其他专辑\n      ")]),t._v(" "),t._l(t.data.otherAlbums,function(a,n){return e("div",{key:n,staticClass:"list-item",on:{click:function(e){t.$router.push("/album/"+a.albumMid)}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.album_pic(a.albumMid),expression:"album_pic(item.albumMid)"}],attrs:{alt:""}}),t._v(" "),e("p",[t._v(t._s(a.title))])])})],2):t._e(),t._v(" "),e("comment",{staticStyle:{"padding-top":"1rem"},attrs:{data:t.comment_hot,title:"最热评论 "+t.comment_hot_count}},[e("router-link",{attrs:{to:/comment/+t.data.id+"?type=album"}},[t._v("更多")])],1),t._v(" "),e("comment",{staticStyle:{"padding-top":"1rem"},attrs:{data:t.comment_new,title:"最新评论 "+t.comment_new_count}},[e("router-link",{attrs:{to:/comment/+t.data.id+"?type=album"}},[t._v("更多")])],1)],1):t._e(),t._v(" "),e("loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]}),t._v(" "),e("transition",{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutRight"},on:{enter:function(a){t.$refs.mask.scrollTop=0}}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"album_info",on:{click:function(a){t.$router.back()}}},[e("div",{staticClass:"bg-blur",style:{"background-image":"url("+t.cover+")"}}),t._v(" "),e("div",{ref:"mask",staticClass:"bg-mask"},[e("div",{staticClass:"album_pic"},[e("img",{attrs:{src:t.cover,alt:""}})]),t._v(" "),e("p",{staticClass:"album_title"},[e("span",[t._v("专辑：")]),t._v(" "),e("span",[t._v(t._s(t.data.name))])]),t._v(" "),e("p",[t._v("语种："+t._s(t.data.lan))]),t._v(" "),e("p",[t._v("发行时间："+t._s(t.data.aDate))]),t._v(" "),e("p",[t._v("唱片公司："+t._s(t.data.company))]),t._v(" "),t.data.genre?e("p",[t._v("流派："+t._s(t.data.genre))]):t._e(),t._v(" "),e("p",{domProps:{innerHTML:t._s(t.data.desc&&t.data.desc.replace(/\n/g,"<br>"))}})])])])],1)},staticRenderFns:[]};var v=e("vSla")(d,u,!1,function(t){e("D+RF")},"data-v-61284940",null);a.default=v.exports}});