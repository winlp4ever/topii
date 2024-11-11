async function initMocks() {
  const { worker } = await import("./browser");
  console.log('starting msw worker');
  worker.start();
}

initMocks();

export {};