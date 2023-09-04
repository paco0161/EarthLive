const degree = 6;
const hr = document.getElementsByClassName('hour-hand');
const mn = document.getElementsByClassName('minute-hand');
const sc = document.getElementsByClassName('second-hand');

const digitalHr = document.getElementsByClassName('digital-hour');
const digitalMn = document.getElementsByClassName('digital-minute');
const digitalSc = document.getElementsByClassName('digital-second');

const data_dict = JSON.parse(document.getElementById('userClocks').textContent);
const savedTmeZones = data_dict != '' ? [data_dict["fields"]["clocks"][0]["timezone"], data_dict["fields"]["clocks"][1]["timezone"]] : null;

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

// var addedPlaces = [];
// const addPlacesBtn = document.getElementById('addPlacesBtn');
// const addTimeZonesForm = document.getElementById('addTimeZonesForm');

// addPlacesBtn.addEventListener("click", function(event) {
//     let place = this.previousElementSibling.value;
//     addedPlaces.push(place);
//     if (addedPlaces.length <= 1) {
//         event.preventDefault();
//     } else {
//         document.getElementsByName('addPlaces[]').value = addedPlaces;
//         console.log(document.getElementsByName('addPlaces[]').value);
//         return true;
//     }
// });