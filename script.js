var scrollDuration = 1000;
var currentPane = 0;
var panes = 0;
var body = document.querySelector('body');
body.style.overflow = 'hidden';
var wrapper = document.querySelector(".wrapper");
panes = wrapper.children.length;
wrapper.style.transition = "all ".concat(scrollDuration, "ms");
wrapper.addEventListener("wheel", onWheel);
wrapper.addEventListener("transitionend", onTransitionend);
Array.from(wrapper.children).forEach(function (child) {
    if (!(child instanceof HTMLElement))
        return;
    if (!child.classList.contains('slice'))
        return;
    var style = child.style;
    style.height = "100vh";
    style.width = "100%";
    style.border = "1px solid red";
});
window.onunload = function () {
    wrapper.removeEventListener("wheel", onWheel);
    wrapper.removeEventListener("transitionend", onTransitionend);
};
var isTransforming = false;
function onWheel(e) {
    if (isTransforming || Math.abs(e.deltaY) < 15)
        return;
    isTransforming = true;
    var direction = e.deltaY > 0;
    if (direction && currentPane + 1 < panes) {
        currentPane += 1;
    }
    else if (!direction && currentPane > 0) {
        currentPane -= 1;
    }
    else {
        onTransitionend();
        return;
    }
    wrapper.style.transform = "translateY(".concat(-100 * currentPane, "vh)");
}
function onTransitionend() {
    isTransforming = false;
}
//# sourceMappingURL=script.js.map