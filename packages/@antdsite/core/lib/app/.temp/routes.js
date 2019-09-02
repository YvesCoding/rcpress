import Vue from 'vue'
Vue.component("Api-GetCurrentviewDom", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Api/GetCurrentviewDom.vue"))
Vue.component("Api-ScrollBy", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Api/ScrollBy.vue"))
Vue.component("Api-ScrollIntoView", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Api/ScrollIntoView.vue"))
Vue.component("Api-ScrollTo", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Api/ScrollTo.vue"))
Vue.component("Demo-Carousel", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/Carousel.vue"))
Vue.component("Demo-CustomizeScrollbar", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/CustomizeScrollbar.vue"))
Vue.component("Demo-DemoIdicator", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/DemoIdicator.vue"))
Vue.component("Demo-DemoMenu", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/DemoMenu.vue"))
Vue.component("Demo-Index", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/Index.vue"))
Vue.component("Demo-RefreshAndLoad", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Demo/RefreshAndLoad.vue"))
Vue.component("Guide-Bar", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Guide/Bar.vue"))
Vue.component("Guide-BaseConfig", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Guide/BaseConfig.vue"))
Vue.component("Guide-Rail", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Guide/Rail.vue"))
Vue.component("Guide-ScrollButton", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Guide/ScrollButton.vue"))
Vue.component("Guide-ScrollPanel", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Guide/ScrollPanel.vue"))
Vue.component("IndexDemo", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/IndexDemo.vue"))
Vue.component("Slot-PullRefresh", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/PullRefresh.vue"))
Vue.component("Slot-svg-animate1", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/svg-animate1.vue"))
Vue.component("Slot-svg-animate2", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/svg-animate2.vue"))
Vue.component("Slot-svg-animate3", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/svg-animate3.vue"))
Vue.component("Slot-svg-animate4", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/svg-animate4.vue"))
Vue.component("Slot-svg-animate5", () => import("/Users/yiwang/Desktop/node/vuescrolljs/docs/.antdsite/components/Slot/svg-animate5.vue"))
import ThemeLayout from '@themeLayout'
import ThemeNotFound from '@themeNotFound'
import { injectMixins } from '@app/util'
import rootMixins from '@app/root-mixins'

injectMixins(ThemeLayout, rootMixins)
injectMixins(ThemeNotFound, rootMixins)

export const routes = [
  {
    name: "v-b116056d6fd2a",
    path: "/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/README.md").then(comp => {
        Vue.component("v-b116056d6fd2a", comp.default)
        next()
      })
    }
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-23d836466795c",
    path: "/demo/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/demo/README.md").then(comp => {
        Vue.component("v-23d836466795c", comp.default)
        next()
      })
    }
  },
  {
    path: "/demo/index.html",
    redirect: "/demo/"
  },
  {
    name: "v-040a3bb149349",
    path: "/guide/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/README.md").then(comp => {
        Vue.component("v-040a3bb149349", comp.default)
        next()
      })
    }
  },
  {
    path: "/guide/index.html",
    redirect: "/guide/"
  },
  {
    name: "v-5a9732fa73e53",
    path: "/guide/api.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/api.md").then(comp => {
        Vue.component("v-5a9732fa73e53", comp.default)
        next()
      })
    }
  },
  {
    name: "v-857cdfa447606",
    path: "/guide/class-hook.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/class-hook.md").then(comp => {
        Vue.component("v-857cdfa447606", comp.default)
        next()
      })
    }
  },
  {
    name: "v-2ea2a3cec7e83",
    path: "/guide/configuration.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/configuration.md").then(comp => {
        Vue.component("v-2ea2a3cec7e83", comp.default)
        next()
      })
    }
  },
  {
    name: "v-c17638055817e",
    path: "/guide/event.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/event.md").then(comp => {
        Vue.component("v-c17638055817e", comp.default)
        next()
      })
    }
  },
  {
    name: "v-8274741c3dfab",
    path: "/guide/getting-started.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/getting-started.md").then(comp => {
        Vue.component("v-8274741c3dfab", comp.default)
        next()
      })
    }
  },
  {
    name: "v-fa8c4392c49",
    path: "/guide/optimizing-performance.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/optimizing-performance.md").then(comp => {
        Vue.component("v-fa8c4392c49", comp.default)
        next()
      })
    }
  },
  {
    name: "v-2dff58a0f1273",
    path: "/guide/slot.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/slot.md").then(comp => {
        Vue.component("v-2dff58a0f1273", comp.default)
        next()
      })
    }
  },
  {
    name: "v-198ac1caae0d6",
    path: "/guide/typescript.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/guide/typescript.md").then(comp => {
        Vue.component("v-198ac1caae0d6", comp.default)
        next()
      })
    }
  },
  {
    name: "v-3600634cb908b",
    path: "/zh/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/README.md").then(comp => {
        Vue.component("v-3600634cb908b", comp.default)
        next()
      })
    }
  },
  {
    path: "/zh/index.html",
    redirect: "/zh/"
  },
  {
    name: "v-ac7446de182b6",
    path: "/zh/demo/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/demo/README.md").then(comp => {
        Vue.component("v-ac7446de182b6", comp.default)
        next()
      })
    }
  },
  {
    path: "/zh/demo/index.html",
    redirect: "/zh/demo/"
  },
  {
    name: "v-8e3a2c4ecb0f",
    path: "/zh/donate/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/donate/README.md").then(comp => {
        Vue.component("v-8e3a2c4ecb0f", comp.default)
        next()
      })
    }
  },
  {
    path: "/zh/donate/index.html",
    redirect: "/zh/donate/"
  },
  {
    name: "v-8568deeef3017",
    path: "/zh/guide/",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/README.md").then(comp => {
        Vue.component("v-8568deeef3017", comp.default)
        next()
      })
    }
  },
  {
    path: "/zh/guide/index.html",
    redirect: "/zh/guide/"
  },
  {
    name: "v-232da1e5f2762",
    path: "/zh/guide/api.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/api.md").then(comp => {
        Vue.component("v-232da1e5f2762", comp.default)
        next()
      })
    }
  },
  {
    name: "v-23f29110fe47a",
    path: "/zh/guide/class-hook.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/class-hook.md").then(comp => {
        Vue.component("v-23f29110fe47a", comp.default)
        next()
      })
    }
  },
  {
    name: "v-ffe833fcbd02a",
    path: "/zh/guide/configuration.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/configuration.md").then(comp => {
        Vue.component("v-ffe833fcbd02a", comp.default)
        next()
      })
    }
  },
  {
    name: "v-93b53c8b0c46b",
    path: "/zh/guide/event.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/event.md").then(comp => {
        Vue.component("v-93b53c8b0c46b", comp.default)
        next()
      })
    }
  },
  {
    name: "v-42909e53c04d9",
    path: "/zh/guide/getting-started.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/getting-started.md").then(comp => {
        Vue.component("v-42909e53c04d9", comp.default)
        next()
      })
    }
  },
  {
    name: "v-e008849bbe4fb",
    path: "/zh/guide/optimizing-performance.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/optimizing-performance.md").then(comp => {
        Vue.component("v-e008849bbe4fb", comp.default)
        next()
      })
    }
  },
  {
    name: "v-e795eff82d698",
    path: "/zh/guide/slot.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/slot.md").then(comp => {
        Vue.component("v-e795eff82d698", comp.default)
        next()
      })
    }
  },
  {
    name: "v-845c9f759fb57",
    path: "/zh/guide/typescript.html",
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import("/Users/yiwang/Desktop/node/vuescrolljs/docs/zh/guide/typescript.md").then(comp => {
        Vue.component("v-845c9f759fb57", comp.default)
        next()
      })
    }
  },
  {
    path: '*',
    component: ThemeNotFound
  }
]