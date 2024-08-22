let ready = false;

async function setReady(status: boolean) {
  ready = status;
}

async function getReady() {
  return ready;
}

export { setReady, getReady };
