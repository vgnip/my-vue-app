import { createWebHistory, createRouter } from 'vue-router'

import TestTree from '../components/test-tree/index.vue'
import TestForm from '../components/test-form/index.vue'

// const routes = [
//   { path: '/test-tree', component: TestTree },
//   { path: '/test-form', component: TestForm },
//   {
//     path: "/home",
//     component: () => import('../views/home/index.vue')
//   },
//   {
//     path: "/about",
//     component: () => import('../views/about/index.vue')
//   },
// ]


const data = import.meta.glob("../views/**/page.js", {
  eager: true,
  import: "default"
})

const components = import.meta.glob("../views/**/index.vue", {
  eager: true,
  import: "default"
})

const routes = Object.entries(data).map(([path, meta]) => {
  console.log("path, meta--", path, meta)
  const newPath = path.replace("../views", "").replace("/page.js", "").toLowerCase() || "/"
  const name = newPath.split("/").join("-").replace(/^-/, "") || "index"
  const componentPath = path.replace("/page.js", "/index.vue")
  const callbackfn = components[componentPath]
  return {
    path: newPath,
    meta: meta,
    name,
    component: callbackfn
  }
})


const router = createRouter({
  history: createWebHistory("/"),
  routes,

})

export default router