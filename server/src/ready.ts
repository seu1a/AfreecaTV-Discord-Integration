let ready = false;

function setReady(status: boolean) {
  ready = status;
}

function getReady() {
  return ready;
}

export { setReady, getReady };
