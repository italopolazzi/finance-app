import Vue from 'vue'

const components = {
    'Button': () =>
        import ("./Button.vue"),
    'Container': () =>
        import ("./Container.vue"),
    'Toolbar': () =>
        import ("./Toolbar.vue"),
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))