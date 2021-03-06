function $(param) {
    if (typeof param == "function") {
        document.addEventListener("DOMContentLoaded", param)
    }
    else if (typeof param == "string") {
        const self = ApplyThings(document.querySelectorAll(param)[0]);
        return self;
    }
    else if (param instanceof HTMLElement) {
        return ApplyThings(param);
    }
}

function ApplyThings(element) {
    const self = {
        element: element,
        htmlin: (...args) => {
            if (args.length < 1) return element.innerHTML;
            element.innerHTML = args[0];
            return args[0];
        },
        css: (...args) => {
            if (args.length < 2)
                return element.style[args[0]];
            else {
                element.style[args[0]] = args[1];
                return null;
            }
        },
        html: (...args) => {
            if (args.length < 1)
                return element;
            else
                element.outerHTML = args[0];
        },
        on: (event, listener) => {
                return element.addEventListener(event, listener);
        },
        classList: getClassList(element),
        addClass: (className)=> {
            if (!element.classList.contains(className)) {
                element.classList.add(className)
                return true;
            }
            else {
                return false;
            }
        },
        removeClass: (className)=> {
            if (element.classList.contains(className)) {
                element.classList.remove(className)
                return true;
            }
            else {
                return false;
            }
        },
        id: (...args) => { if (args.length < 1) { return element.id; } else { element.id = args[0]; return args[0]}},
        show: () => { element.style.display = "inherit" },
        hide: () => { element.style.display = "none" },
        blur: () => { element.blur(); },
        focus: () => { element.focus(); },
        text: () => { if(!element.textContent) {return element.value} else {return element.textContent} }
    }

    return self;
}

function getClassList(element) {
    w = []
    element.classList.forEach(e => {
        w.push(e);
    });
    return w;
}