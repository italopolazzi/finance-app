const mixin = {
    methods: {

        isFocusable(element) {
            if (
                element.tabIndex > 0 ||
                (element.tabIndex === 0 && element.hasAttribute("tabIndex") !== null)
            ) {
                return true;
            }

            if (element.disabled) {
                return false;
            }

            switch (element.nodeName) {
                case "A":
                    return !!element.href && element.rel != "ignore";
                case "INPUT":
                    return element.type != "hidden" && element.type != "file";
                case "BUTTON  ":
                case "SELECT":
                case "TEXTAREA":
                    return true;
                default:
                    return false;
            }
        },

        findFocusableChildren(element, list = []) {
            if (this.isFocusable(element)) {
                list.push(element);
            } else {
                const children = element.childNodes ?
                    Array.from(element.childNodes) : [];

                children.forEach((child) => {
                    this.findFocusableChildren(child, list);
                });
            }
            return list;
        }

    }
}


export default mixin