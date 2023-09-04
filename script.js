let scrollDuration = 1000;

const wrappers = document.querySelectorAll(".wrapper");

for (const wrapper of wrappers) {
  const styles = wrapper.style;

  styles.position = "relative";
  styles.height = "100vh";
  styles.overflow = "hidden";

  wrapper.addEventListener("wheel", onWheel);

  if (!wrapper.children.length) continue;

  Array.from(wrapper.children).forEach((child, i) => {
    if (!child.classList.contains("slice")) return;

    if (i === 0) {
      child.classList.add("first");
    }

    if (i === wrapper.children.length - 1) {
      child.classList.add("last");
    }

    const styles = child.style;

    styles.position = "absolute";
    styles.height = "100vh";
    styles.width = "100%";
    styles.border = "1px solid red";
    styles.transition = `all ${scrollDuration}ms`;
    styles.top = `${i}00vh`;
    styles.fontSize = "80px";
  });
}

window.onunload = function () {
  for (const wrapper of wrapper) {
    wrapper.removeEventListener("wheel", onWheel);
  }
};

let isScrolling = false;
function onWheel(e) {
  if (isScrolling) {
    return;
  }
  isScrolling = true;

  const direction = e.wheelDeltaY < 0;

  let target = e.target;
  let sliceNotFound = false;

  while (!Array.from(target.classList).includes("slice")) {
    if (target.nodeNAME === "BODY") {
      sliceNotFound = true;
      return;
    }
    target = target.parentElement;
  }

  if (sliceNotFound) {
    clean();
    return;
  }

  const isFirst = Array.from(target.classList).includes("first");
  const isLast = Array.from(target.classList).includes("last");

  if ((direction && isLast) || (!direction && isFirst)) {
    clean();
    return;
  }

  const parent = target.parentElement;

  for (const child of parent.children) {
    const childTop = getVH(child.style.top);

    child.style.top = `${childTop + (direction ? -100 : 100)}vh`;
  }

  setTimeout(() => {
    clean();
  }, scrollDuration);

  function clean() {
    isScrolling = false;
  }
}

function getVH(val) {
  assert(val);

  if (val.slice(-2) !== "vh") {
    return undefined;
  }

  return parseInt(val.substring(0, val.length - 2));
}

function assert(val) {
  if (!val) {
    throw new Error("expected value, got: " + val);
  }
}
