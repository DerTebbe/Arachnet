/**
 * The processor is responsible for storing incoming requests and for filtering
 * those requests in order to display them in the popup.
 */
const Processor = {

    /**
     * Dictionary to store a list of resources ordered by the domain that
     * requested them
     */
    resourcesByDomain: {},


    /**
     * Saves a web request captured by the capturer in the dictionary
     * @param req The request that should be saved
     */
    trackRequest(req) {
        var currentDomain = new URL(req.documentUrl).hostname;
        var calledDomain = new URL(req.url).hostname;
        var isCrossDomain = this.isCrossDomain(currentDomain, calledDomain);

        //Only handle requests, that are cross domain.
        if (isCrossDomain) {
            if (typeof this.resourcesByDomain[currentDomain] === 'undefined') {
                this.resourcesByDomain[currentDomain] = {};
            }
            if (typeof this.resourcesByDomain[currentDomain][calledDomain] === 'undefined') {
                this.resourcesByDomain[currentDomain][calledDomain] = {
                    types: []
                };
            }
            if (this.resourcesByDomain[currentDomain][calledDomain].types.indexOf(req.type) === -1) {
                this.resourcesByDomain[currentDomain][calledDomain].types.push(req.type);
            }
        }
    },

    /**
     * Call this method either like this: Processor.getCSR('web.de')
     * or like this:                      Processor.getCSR(['web.de', 'gmx.net])
     * This method shall be called from within the controller, whenever the user
     * wants to see the data.
     * @param  {...string} domains 
     */
    getCSR(...domains) {
        var results = {};
        for (var i = 0; i < domains.length; i++) {
            if (this.resourcesByDomain[domains[i]]) {
                results[domains[i]] = this.resourcesByDomain[domains[i]];
            }
        }
        return results;
    },

    /**
     * Developed together with Max Mahr and Max Schaller
     * Checks if called domain is a cross domain in comparison to the current domain
     * @param currentDomain Domain opened in the active tab
     * @param calledDomain Domain called by the current tab
     * @return {boolean} Indicates if called domain is a cross domain
     */
    isCrossDomain(currentDomain, calledDomain) {
        var currentDomainWithoutWWW = currentDomain.replace('www', "");
        return !calledDomain.includes(currentDomainWithoutWWW);
    }
};
