import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// global styles
import '@/assets/styles/index.scss'

// global components
import '@/components/global'

Vue.config.productionTip = false

Vue.mixin({
    data: () => ({ isDev: process.env.NODE_ENV === 'development' }),
    computed: {
        $themeColors() {
            const computedStyle = getComputedStyle(document.documentElement)
            const themeColorsNames = [
                "foreground",
                "background",
                "text",
                "accent",
                "dark",
                "light",
                "error",
                "success",
                "warning",
            ]

            return themeColorsNames.reduce((acc, colorKey) => {
                acc[colorKey] = computedStyle.getPropertyValue(`--color-${colorKey}`)
                return acc
            }, {})
        }
    }

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')