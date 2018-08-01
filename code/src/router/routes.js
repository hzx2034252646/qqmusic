export default [
  {
    path: '/',
    component: () => import('@/view/home'),
    children: [
      {
        path: '/',
        component: () => import('@/view/recommend')
      },
      {
        path: '/toplist',
        component: () => import('@/view/toplist')
      },
      {
        path: '/artist',
        component: () => import('@/view/artist')
      },
      {
        path: '/mv',
        component: () => import('@/view/mv')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/view/search')
  },
  {
    path: '/newSong',
    component: () => import('@/view/newSong')
  },
  {
    path: '/newMV',
    component: () => import('@/view/newMV')
  },
  {
    path: '/album',
    component: () => import('@/view/album')
  },
  {
    path: '/mv/:id',
    component: () => import('@/view/mv/_id')
  },
  {
    path: '/toplist/:id',
    component: () => import('@/view/toplist/_id')
  },
  {
    path: '/artist/:id',
    component: () => import('@/view/artist/_id')
  },
  {
    path: '/album/:id',
    component: () => import('@/view/album/_id')
  },
  {
    path: '/comment/:id',
    component: () => import('@/view/comment/_id')
  }
]
