const degree = 6;
const hr = document.getElementsByClassName('hour-hand');
const mn = document.getElementsByClassName('minute-hand');
const sc = document.getElementsByClassName('second-hand');

const digitalHr = document.getElementsByClassName('digital-hour');
const digitalMn = document.getElementsByClassName('digital-minute');
const digitalSc = document.getElementsByClassName('digital-second');

const data_dict = JSON.parse(document.getElementById('userClocks').textContent);
const savedTmeZones = getSavedTimeZones(data_dict);

setInterval(function() {
    if (savedTmeZones !== null) {
        let day = savedTmeZones.map(t => new Date(new Date().toLocaleString("en-US", {timeZone: t})));

        day.forEach((value, index, array) => {
            let hour = value.getHours();
            let minute = value.getMinutes();
            let second = value.getSeconds();

            hr[index].style.transform = `rotateZ(${hour * degree * 5 + minute * degree/12}deg)`;
            mn[index].style.transform = `rotateZ(${minute * degree}deg)`;
            sc[index].style.transform = `rotateZ(${second * degree}deg)`;

            digitalHr[index].innerHTML = hour < 10 ? "0" + hour : hour;
            digitalMn[index].innerHTML = minute < 10 ? "0" + minute : minute;
            digitalSc[index].innerHTML = second < 10 ? "0" + second : second;
        });
    }
}, 1000)

const searchBarElement = document.getElementById("addPlaceForm");

if (data_dict["fields"]["clocks"].length >= 2) {
    searchBarElement.className += "d-none";
} else {
    searchBarElement.className.replace('d-none', '');
}

function getSavedTimeZones(data_dict) {
    if (data_dict == '') {
        return null;
    }
    return data_dict["fields"]["clocks"].map(c => c["timeZone"]);
}





function filterTimeZones(timeZonesList) {
    console.log(timeZonesList)
}


function updateLocation(btnId) {
    // console.log(btnId);
    // var currentLocation = document.getElementById(btnId).parentElement.textContent;
    // console.log('currentLocation:' + currentLocation);
    // // var currentLocation2 = document.getElementById(btnId).parentElement.innerHTML;
    // // console.log('currentLocation2:' + currentLocation2);
    // var searchBarElementCopy = searchBarElement.cloneNode(false);
    // searchBarElementCopy.id = 'updateLocationForm' + currentLocation;
    // const currentBtn = document.getElementById(btnId).parentNode;
    // currentBtn.replaceWith(searchBarElementCopy);
}
