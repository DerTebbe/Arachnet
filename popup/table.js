window.addEventListener("DOMContentLoaded", () => {

    /**
     * Renders domain and CSRs of the domain in popup-table
     * @param result Domain and CSRs provided by the background script
     */
    function renderCSRsInTable(result) {
        var csrs = result.csr;
        var domain = result.domain;
        var table = document.getElementById("csr_of_domain");
        var counter = 0;
        for (var key of Object.keys(csrs[domain])) {
            for (var type of csrs[domain][key].types) {
                var row = table.insertRow(counter);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerText = key;
                cell2.innerText = type;
                counter++;
            }
        }
        document.getElementById('header').innerText = domain + " (" + counter + " CSRs)";
    }

    /**
     * Writes error message into console
     * @param error
     */
    function handleError(error) {
        console.error(`Error: ${error}`);
    }

    /**
     * Sends message to background script to get all needed CSRs
     */
    var sending = browser.runtime.sendMessage({});
    sending.then(renderCSRsInTable, handleError);
});
