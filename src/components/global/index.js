import Vue from 'vue'

const components = {
    'CustomButton': () =>
        import ("./CustomButton.vue"),
    'Container': () =>
        import ("./Container.vue"),
    'Toolbar': () =>
        import ("./Toolbar.vue"),
    'TextInput': () =>
        import ("./TextInput.vue"),
    'CustomForm': () =>
        import ("./CustomForm.vue"),
    'Spacer': () =>
        import ("./Spacer.vue"),
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))