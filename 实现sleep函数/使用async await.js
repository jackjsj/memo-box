function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function doSth() {
  console.time();
  await sleep(3000);
  console.timeEnd();
}

doSth();
