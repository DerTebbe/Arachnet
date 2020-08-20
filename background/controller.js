/**
 * The controller communicates with the popup.
 * It sends all needed cross site requests that are persisted in the processor, to the popup
 */
const Controller = {

    /**
     * Registers a listener to send all necessary CSRs to the popup when opening the popup
     */
    init() {
        browser.runtime.onMessage.addListener(this.sendCSRsToPopup.bind(this));
    },

    /**
     * Returns the domain name of the website loaded in the active tab
     */
    getCurrentTabDomain() {
        return new Promise((resolve, reject) => {
            browser.tabs.query({
                currentWindow: true,
                active: true
            }).then((tabs) => {
                var url = new URL(tabs[0].url);
                resolve(url.hostname);
            }).catch((e) => {
                reject(e);
            });
        })
    },

    /**
     * Gets the current amount of CSRs on the current tab and sends it to the popup for displaying
     */
    sendCSRsToPopup() {
        return new Promise((resolve, reject) => {
            var currentTabDomain = '';
            this.getCurrentTabDomain().then((value) => {
                currentTabDomain = value;
                var csrs = Processor.getCSR(currentTabDomain);
                var result = {
                    csr: csrs,
                    domain: currentTabDomain
                };
                resolve(result);
            }).catch((e) => {
                reject(e);
            });
        })
    }
};

Controller.init();
