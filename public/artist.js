document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get("name");

    if (artistName) {
        fetch(`/getArtistDetails.php?name=${artistName}`)
            .then(response => response.json())
            .then(data => {
                const artistDetails = document.getElementById("artist-details");
                if (data.error) {
                    artistDetails.textContent = "Artist not found.";
                } else {
                    artistDetails.textContent = JSON.stringify(data, null, 2);
                }
            })
            .catch(error => {
                console.error("Error fetching artist details:", error);
            });
    } else {
        console.error("No artist name provided in the URL.");
    }
});
