let nickname = document.getElementsByClassName("nickname")[0].innerText;
let title = document.getElementsByClassName("broadcast_title")[0].innerText;
let view = 0;

let getViewer = setInterval(() => {
  view = document.getElementById("nAllViewer").innerText;

  console.log(view);

  if (parseInt(view) > 0) {
    clearInterval(getViewer);

    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        nickname: nickname,
        title: title,
        view: view,
      }),
    });
  }
}, 500);
