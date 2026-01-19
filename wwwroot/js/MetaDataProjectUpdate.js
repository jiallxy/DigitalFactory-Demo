document.addEventListener("DOMContentLoaded", function () {
    // === PART 4: STATUS & DATE METADATA LOGIC ===
    let metaStatus = document.querySelector('meta[name="Status"]');
    let statusSelect = document.getElementById("status");
    let projectName = document.querySelector('meta[name="AssemblyName"]')?.getAttribute("content");
    let engineer = document.querySelector('meta[name="Engineer"]')?.getAttribute("content");

    // Helper function to format date
    function getFormattedTimestamp() {
        const now = new Date();
        return now.toISOString().split('.')[0]; // YYYY-MM-DDTHH:mm:ss
    }

    // ONLY proceed with Status logic if the dropdown element exists
    if (statusSelect) {
        
        // Set initial value from meta tag if available
        if (metaStatus) {
            let currentStatus = metaStatus.getAttribute("content");
            if (currentStatus) {
                statusSelect.value = currentStatus;
            }
        }

        // Attach event listener
        statusSelect.addEventListener("change", function () {
            let newStatus = statusSelect.value;
            let timestamp = getFormattedTimestamp();

            // 1. Update Status Metadata in memory
            if (metaStatus) {
                metaStatus.setAttribute("content", newStatus);
            }

            // 2. Update the corresponding Date Metadata
            let dateMetaName = newStatus + "Date"; 
            let metaDateTag = document.querySelector(`meta[name="${dateMetaName}"]`);
            if (metaDateTag) {
                metaDateTag.setAttribute("content", timestamp);
                console.log(`Updated ${dateMetaName} to ${timestamp}`);
            }

            // 3. Cloud Sync
            console.log(`Syncing status for ${projectName} to ${newStatus}...`);
            fetch('https://127.0.0.1:5500/api/UpdateStatus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: projectName,
                    status: newStatus,
                    statusDate: timestamp,
                    user: engineer
                })
            })
            .then(response => {
                if (response.ok) console.log("Cloud Database updated successfully.");
            })
            .catch(error => console.error("Cloud Sync Error:", error));
        });
    } else {
        console.log("Status dropdown not found. Skipping status logic.");
    }
});