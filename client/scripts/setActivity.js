let nickname = "";
let title = "";
let view = 0;
let image = "";
let url = "";

function sendData() {
  nickname = document.getElementsByClassName("nickname")[0].innerText;
  title = document.getElementsByClassName("broadcast_title")[0].innerText;
  view = document.getElementById("nAllViewer").innerText;
  image = document.getElementsByClassName("thum")[0].src;
  url = window.location.href;

  navigator.sendBeacon("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify({
      nickname: nickname,
      title: title,
      view: view,
      image: image,
      url: url,
    }),
  });
}

let getViewer = setInterval(() => {
  view = document.getElementById("nAllViewer").innerText;
  image = document.getElementsByClassName("thum")[0].src;

  console.log(view, image);

  if (
    parseInt(view) > 0 &&
    image != "https://res.afreecatv.com/images/afmain/img_thumb_profile.gif"
  ) {
    clearInterval(getViewer);

    sendData();

    setInterval(() => {
      sendData();
    }, 30000);
  }
}, 500);

window.addEventListener("beforeunload", () => {
  navigator.sendBeacon("http://localhost:3000/clear", JSON.stringify({}));
});
