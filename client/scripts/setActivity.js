let nickname = document.getElementsByClassName("nickname")[0].innerText;
let title = document.getElementsByClassName("broadcast_title")[0].innerText;
let view = 0;
let image = "";

function sendData() {
  view = document.getElementById("nAllViewer").innerText;

  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify({
      nickname: nickname,
      title: title,
      view: view,
      image: image,
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
