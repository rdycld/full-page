let scrollDuration = 1000;
let currentPane = 0;
let panes = 0;


const body = document.querySelector('body');
body.style.overflow = 'hidden';

const wrapper = document.querySelector(".wrapper");
panes = wrapper.children.length

wrapper.style.transition = `all ${scrollDuration}ms`;

wrapper.addEventListener("wheel", onWheel);
wrapper.addEventListener("transitionend", onTransitionend);

Array.from(wrapper.children).forEach((child) => {
  if(!child.classList.contains('slice')) return;

  const style = child.style;
  style.height = "100vh";
  style.width = "100%";
  style.border = "1px solid red";
});

window.onunload = function () {
    wrapper.removeEventListener("wheel", onWheel);
    wrapper.removeEventListener("transitionend", onTransitionend);
};

let isTransforming = false

function onWheel(e) {
  if(isTransforming) return;
  isTransforming = true;

  const direction = e.wheelDeltaY < 0;

  if(direction && currentPane + 1 < panes){
    currentPane += 1;
  } else if (!direction && currentPane > 0) {
    currentPane -= 1;
  }else {
    onTransitionend();
    return;
  }

  wrapper.style.transform = `translateY(${-100 * currentPane}vh)`
}

function onTransitionend(){
  isTransforming = false;
}
