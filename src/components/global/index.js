import Vue from 'vue'

const components = {
    'Button': () =>
        import ("./Button.vue"),
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))