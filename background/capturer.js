/**
 * Registers a listener that intercepts all HTTP requests and forwards them to the processor
 */
browser.webRequest.onBeforeRequest.addListener(
    Processor.trackRequest.bind(Processor),
    {urls: ["<all_urls>"]}
);
