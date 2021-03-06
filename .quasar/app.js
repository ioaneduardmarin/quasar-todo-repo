/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import { Quasar } from 'quasar'
import RootComponent from 'app/src/App.vue'


import createRouter from 'app/src/router/index'


  
  import '@capacitor/core'
    
    // importing it so it can install itself (used by Quasar UI)
    import { App as CapApp } from '@capacitor/app'
    
    
  




export default async function (createAppFn, quasarUserOptions) {
  // create store and router instances
  
  const router = typeof createRouter === 'function'
    ? await createRouter({})
    : createRouter
  

  // Create the app instance.
  // Here we inject into it the Quasar UI, the router & possibly the store.
  const app = createAppFn(RootComponent)

  

  app.use(Quasar, quasarUserOptions)

  
  app.config.globalProperties.$q.capacitor = window.Capacitor
  

  // Expose the app, the router and the store.
  // Note that we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app,
    
    router
  }
}
