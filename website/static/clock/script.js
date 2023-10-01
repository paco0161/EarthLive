const data_dict = JSON.parse(document.getElementById('userClocks').textContent);
const savedTmeZones = getSavedTimeZones(data_dict);

const degree = 6;
const hr = document.getElementsByClassName('hour-hand');
const mn = document.getElementsByClassName('minute-hand');
const sc = document.getElementsByClassName('second-hand');
const digitalHr = document.getElementsByClassName('digital-hour');
const digitalMn = document.getElementsByClassName('digital-minute');
const digitalSc = document.getElementsByClassName('digital-second');
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

// check if display search bar or not
const searchBarElement = document.getElementById('addPlaceForm');
var searchBarDisplay = false;
if (data_dict["fields"]["clocks"].length >= 2) {
    searchBarElement.className += ' d-none';
} else {
    searchBarElement.classList.remove('d-none');
    searchBarDisplay = true;
}

// format analog clock hour numbers
const clockHourNums = document.getElementsByClassName('hourNumber');
for (let clockHourNum of clockHourNums) {
    clockHourNum.style = "--i:" + clockHourNum.textContent;
};

function getSavedTimeZones(data_dict) {
    if (data_dict == '') {
        return null;
    }
    return data_dict["fields"]["clocks"].map(c => c["timeZone"]);
}

function filterTimeZones(timeZonesList) {
    console.log(timeZonesList);
}

function updateLocation(btnId) {
    searchBarElement.classList.remove('d-none');
    const updateLocationForm = searchBarElement.cloneNode(true);
    document.getElementById(btnId).parentElement.replaceWith(updateLocationForm);
    configUpdateLocationForm(updateLocationForm, btnId.replace('btn-', ''));
    if (!searchBarDisplay) {
        searchBarElement.className += ' d-none';
    }
}

function configUpdateLocationForm(form, originalLocation) {
    form.id = 'update-location-form-' + originalLocation;

    let originalInput = document.createElement('input');
    originalInput.setAttribute('name', 'originalLocation');
    originalInput.setAttribute('value', originalLocation);
    originalInput.setAttribute('type', 'hidden');
    form.appendChild(originalInput);

    let input = form.querySelector('#add-location-input');
    input.setAttribute('name', 'updateClock');
    input.setAttribute('placeholder', originalLocation);

    let btn = form.querySelector('#addPlaceBtn');
    btn.textContent = 'Update';
    btn.id = 'update-location-btn-' + originalLocation;
}