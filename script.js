const types = document.getElementsByClassName("typewriter");
for (const type of types) {
  let e = document.createElement("div");
  e.appendChild(type.cloneNode(true));
  const string = e.innerHTML;
  e = null;
  const text = />(.+)</.exec(string)[1].split("");
  const args = /class*= *\\?".*typewriter \((.+)\)/
    .exec(string)[1]
    .split(/ *, */);
  const time = (Number(args[0]) * 1000) / text.length;
  type.innerHTML = "";
  function reload(i) {
    setTimeout(() => {
      const interval = setInterval(() => {
        type.innerHTML += text[0];
        const t = text.shift();
        if (text.length <= 0) {
          clearInterval(interval);
          return;
        }
        if (/\.|\?|!/.test(t) && !/\.|\?|!/.test(text[0])) {
          clearInterval(interval);
          reload(2);
        }
      }, time);
    }, Number(args[i]) * 1000);
  }
  reload(1);
}
