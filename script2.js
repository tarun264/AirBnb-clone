const cardContainer = document.getElementById("cardContainer");
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '35529e50acmshe42c2bf03c7e96dp12989cjsn06b3989d95a2',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
};
const apiObject = JSON.parse(localStorage.getItem("searchObject"));
console.log(apiObject);
getData(apiObject.place, apiObject.checkIn, apiObject.checkOut, apiObject.guests);



async function getData(place, checkIn, checkOut, guests) {
    const url = 'https://airbnb13.p.rapidapi.com/search-location?location=' + place + '&checkin=' + checkIn + '&checkout=' + checkOut + '&adults=' + guests + '&children=0&infants=0&pets=0&page=1&currency=INR';
    fetch(url, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);

            for (let i = 0; i < response.results.length; i++) {
                createCard(response.results[i].hostThumbnail, response.results[i].type, response.results[i].rating, response.results[i].reviewsCount, response.results[i].name);
            }

        })
        .catch(err => console.error(err));
}


function createCard(thumbNail, hotelType, ratings, reviewsCount, hotelName, noBeds, stayDates, prize) {
    let card = document.createElement("div");
    card.classList.add("my-card");

    let cardImg = document.createElement("div");
    cardImg.classList.add("my-card-img");


    let imgTag = document.createElement("img");
    imgTag.src = thumbNail;

    cardImg.appendChild(imgTag);
    card.appendChild(cardImg)

    let cardTitle = document.createElement("div");
    cardTitle.classList.add("my-card-title");

    let headline = document.createElement("h5");
    headline.innerText = hotelType;

    cardTitle.appendChild(headline);

    let ratingsDisplay = document.createElement("div");
    ratingsDisplay.classList.add("ratings-display");
    ratingsDisplay.innerHTML = `<i class="fa-solid fa-star" style="color: #000000;"></i>
    <span>
        ${ratings}(${reviewsCount})
    </span>`

    cardTitle.appendChild(ratingsDisplay);
    card.appendChild(cardTitle);

    let hotelNameTag = document.createElement("h5");
    hotelNameTag.innerText = hotelName;
    card.appendChild(hotelNameTag);

    let beds = document.createElement("p");
    beds.innerText = noBeds;
    card.appendChild(beds);

    let dates = document.createElement("p");
    dates.innerText = stayDates;
    card.appendChild(dates);

    let priceDisplay = document.createElement("div");
    priceDisplay.classList.add("prize-display");
    priceDisplay.innerText = prize
    card.appendChild(priceDisplay);

    cardContainer.appendChild(card);
}




// ******************** Google maps logic *******************//


/**
       //@license
        * Copyright 2019 Google LLC. All Rights Reserved.
        * SPDX-License-Identifier: Apache-2.0
        */
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.




function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 12.972442, lng: 77.580643 },
    });

    setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.



function setMarkers(map) {

    // Adds markers to the map.
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
    };

    for (let i = 0; i < beaches.length; i++) {
        const beach = beaches[i];

        new google.maps.Marker({
            position: { lat: beach[1], lng: beach[2] },
            map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3],
        });
    }
}

window.initMap = initMap;