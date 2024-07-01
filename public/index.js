document.addEventListener("DOMContentLoaded", function() {
    // JavaScript code for index.html

    // Function to update the artist list
    function updateArtistList(artists) {
        const artistList = document.querySelector("ol");
        artistList.innerHTML = ''; // Clear existing list

        artists.forEach((artist, index) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `artist.html?name=${encodeURIComponent(artist.name)}`;
            link.textContent = artist.name;
            listItem.appendChild(link);
            artistList.appendChild(listItem);
        });
    }

    // Function to fetch and display artist list
    function fetchArtistList() {
        const artists = [
            { name: 'boywithuke' },
            { name: 'Alec Benjamin' },
            { name: 'Mata' },
            { name: 'Chivas' },
            { name: 'One Republic' },
            { name: 'Billie Eilish' },
            { name: 'Stellar' },
            { name: 'Eminem' },
            { name: 'YUNGBLUD' },
            { name: 'Lin-Manuel Miranda' }
        ];
        updateArtistList(artists);
    }

    // Fetch and display artist list on page load
    fetchArtistList();
});
