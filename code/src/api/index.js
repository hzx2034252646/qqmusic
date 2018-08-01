export default {
  GET_RECOMMEND: `https://u.y.qq.com/cgi-bin/musicu.fcg?format=jsonp&data={"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"music.web_album_library","method":"get_album_by_tags","param":{"area":7,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":40,"click_albumid":0}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}`,
  GET_TOPLIST: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1&jsonCallback=jsonCallback',
  GET_MUSIC: 'https://u.y.qq.com/cgi-bin/musicu.fcg?format=jsonp',
  GET_MV: 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?jsonpCallback=getMvlist&format=jsonp&type=2&pagecount=20&taglist=1',
  GET_NEW_MV: 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag?format=jsonp&cmd=shoubo&jsonpCallback=get_new_mv',
  GET_SEARCH_HOT: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?format=jsonp&jsonpCallback=get_search_hot',
  GET_SEARCH: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?new_json=1&cr=1&n=20&format=jsonp&jsonpCallback=get_search',
  GET_SONG_DETAIL: 'http://www.gy84.com/music/api.php?source=tencent',
  GET_MV_INFO: 'https://c.y.qq.com/mv/fcgi-bin/fcg_get_mvinfo.fcg?format=jsonp&cid=205361939',
  GET_TOPLIST_INFO: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?format=jsonp&jsonpCallback=get_toplist_info',
  GET_MV_TOPLIST: 'https://c.y.qq.com/mv/fcgi-bin/fcg_musicshow_mvtoplist.fcg?format=jsonp&jsonpCallback=get_mv_toplist',
  GET_ARTIST_MUSIC: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?format=jsonp&order=listen&num=20&&jsonpCallback=get_artist_music',
  GET_ARTIST_ALBUM: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?format=jsonp&order=time&num=20&jsonpCallback=get_artist_album',
  GET_ARTIST_MV: 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?g_tk=5381&jsonpCallback=get_artist_mv&format=jsonp&platform=yqq&order=listen&num=20&cid=205360581',
  GET_ALBUM_INFO: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?jsonpCallback=get_album_info&format=jsonp&platform=h5',
  GET_COMMENT: 'https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg?format=jsonp&reqtype=1&pagesize=10'
}
