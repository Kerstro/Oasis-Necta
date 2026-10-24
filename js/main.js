// Oasis Necta Ltd - site behaviour (needs js/data.js loaded first)

var V = ["home", "contract", "honey", "shop", "team", "contact"],
  AL = { training: "contract", gallery: "team" };
// Builds the gallery from the GALLERY list in js/data.js
function gallery() {
  var g = document.getElementById("gallery-grid");
  if (!g) return;
  GALLERY.forEach(function (p) {
    var box = document.createElement("div");
    box.className = "zoom tile openable";
    box.tabIndex = 0;
    box.setAttribute("role", "button");
    box.setAttribute("aria-label", "View larger picture");
    var img = new Image();
    img.src = "photos/" + p[0];
    img.alt = p[1];
    img.loading = "lazy";
    img.onerror = function () {
      box.className = "ph";
      box.textContent = "Photo coming soon";
      box.removeAttribute("role");
      box.removeAttribute("tabindex");
      box.removeAttribute("aria-label");
    };
    box.appendChild(img);
    g.appendChild(box);
  });
  for (var i = GALLERY.length; i < 3; i++) {
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = "Photo coming soon";
    g.appendChild(ph);
  }
}
// Click-to-enlarge viewer. Any picture inside an element with class "openable"
// opens full size; pictures inside the same [data-group] block can be browsed
// with the arrows or the left/right keys.
function lightbox() {
  var box = document.createElement("div");
  box.id = "lb";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Picture viewer");
  box.innerHTML =
    '<button class="lb-x" aria-label="Close">&times;</button>' +
    '<button class="lb-p" aria-label="Previous picture">&lsaquo;</button>' +
    '<figure><img alt="" /><figcaption></figcaption></figure>' +
    '<button class="lb-n" aria-label="Next picture">&rsaquo;</button>';
  document.body.appendChild(box);
  var big = box.querySelector("img"),
    cap = box.querySelector("figcaption"),
    list = [],
    at = 0,
    opener = null;
  function show(i) {
    at = (i + list.length) % list.length;
    big.src = list[at].currentSrc || list[at].src;
    big.alt = list[at].alt;
    cap.textContent = list[at].alt;
  }
  function open(tile) {
    var group = tile.closest("[data-group]") || tile;
    list = Array.prototype.slice.call(group.querySelectorAll("img"));
    opener = tile;
    box.querySelector(".lb-p").hidden = box.querySelector(".lb-n").hidden =
      list.length < 2;
    show(Math.max(0, list.indexOf(tile.querySelector("img"))));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-x").focus();
  }
  function close() {
    box.hidden = true;
    big.removeAttribute("src");
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".openable");
    if (t && box.hidden) open(t);
  });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) {
      var t = e.target.closest && e.target.closest(".openable");
      if (t && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        open(t);
      }
      return;
    }
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
  box.addEventListener("click", function (e) {
    if (e.target.closest(".lb-x") || e.target === box) close();
    else if (e.target.closest(".lb-p")) show(at - 1);
    else if (e.target.closest(".lb-n")) show(at + 1);
  });
}
var Q = {},
  ALL = [];
function f(n) {
  return n.toLocaleString("en-KE");
}
function wa(t) {
  return "https://wa.me/" + NUM + "?text=" + encodeURIComponent(t);
}
function build() {
  document
    .querySelectorAll('a[href^="https://wa.me"],button[onclick^="send"]')
    .forEach(function (e) {
      e.classList.add("wa");
    });
  document.querySelectorAll(".steps").forEach(function (o) {
    o.innerHTML = STEPS.map(function (s, i) {
      return (
        "<li><b>" +
        (i + 1) +
        "</b><strong>" +
        s[0] +
        "</strong>" +
        s[1] +
        "</li>"
      );
    }).join("");
  });
  document.querySelectorAll(".board").forEach(function (o) {
    o.innerHTML = BUY.map(function (b) {
      return (
        "<div><span>" +
        b[0] +
        "</span><span class='tag'>" +
        b[1] +
        " " +
        b[2] +
        "</span></div>"
      );
    }).join("");
  });
  var h = "";
  CAT.forEach(function (c) {
    h += "<h2 style='margin-top:28px'>" + c[0] + "</h2>";
    c[1].forEach(function (it) {
      var id = ALL.length;
      ALL.push(it);
      h +=
        "<div class='item'><span class='n'>" +
        it[0] +
        "</span><span class='p'>KES " +
        f(it[1]) +
        "</span><span class='q'><button aria-label='Remove one " +
        it[0] +
        "' onclick='chg(" +
        id +
        ",-1)'>−</button><span id='q" +
        id +
        "'>0</span><button aria-label='Add one " +
        it[0] +
        "' onclick='chg(" +
        id +
        ",1)'>+</button></span></div>";
    });
  });
  document.getElementById("cat").innerHTML = h;
}
function chg(i, d) {
  Q[i] = Math.max(0, (Q[i] || 0) + d);
  document.getElementById("q" + i).textContent = Q[i];
  var n = 0,
    t = 0;
  for (var k in Q) {
    n += Q[k];
    t += Q[k] * ALL[k][1];
  }
  var b = document.getElementById("bar");
  b.style.display = n ? "flex" : "none";
  document.getElementById("bt").textContent =
    n + (n == 1 ? " item" : " items") + " · KES " + f(t);
}
function sendQ() {
  var l = [],
    t = 0;
  for (var k in Q)
    if (Q[k]) {
      l.push(
        Q[k] + " x " + ALL[k][0] + " (KES " + f(Q[k] * ALL[k][1]) + ")",
      );
      t += Q[k] * ALL[k][1];
    }
  window.open(
    wa(
      "Hello Oasis Necta, I would like a quote for:\n" +
        l.join("\n") +
        "\nTotal: KES " +
        f(t),
    ),
    "_blank",
    "noopener",
  );
}
function sendC() {
  var n = document.getElementById("fn").value.trim(),
    m = document.getElementById("fm").value.trim();
  window.open(
    wa(
      "Hello Oasis Necta. " +
        (m || "I have a question.") +
        (n ? " – " + n : ""),
    ),
    "_blank",
    "noopener",
  );
}
function show() {
  var h = location.hash.slice(1);
  h = AL[h] || h;
  if (V.indexOf(h) < 0) h = "home";
  document.querySelectorAll(".view").forEach(function (e) {
    e.classList.toggle("on", e.id === "v-" + h);
  });
  document.querySelectorAll("nav a").forEach(function (a) {
    a.setAttribute(
      "aria-current",
      a.getAttribute("href") === "#" + h ? "page" : "false",
    );
  });
  window.scrollTo(0, 0);
}
build();
gallery();
lightbox();
addEventListener("hashchange", show);
show();
