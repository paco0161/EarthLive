const clocksData_dict = JSON.parse(document.getElementById('userClock').textContent);
const timeZones = JSON.parse(document.getElementById('timeZones').textContent);

const savedTmeZones = getSavedTimeZones(clocksData_dict);

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
if (clocksData_dict["fields"]["clocks"].length >= 2) {
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

function getSavedTimeZones(clocksData_dict) {
    if (clocksData_dict == '') {
        return null;
    }
    return clocksData_dict["fields"]["clocks"].map(c => c["time_zone"]);
}

function filterTimeZones(btnId) {
    console.log(btnId);
    var input = document.getElementById(btnId).value;
    console.log(input);
    generateTimeZonesTable();
    controlDisplayTimeZone(input, timeZones);
}

function generateTimeZonesTable() {

}

function controlDisplayTimeZone(input, timeZones) {

}

function updateLocation(btnId) {
    searchBarElement.classList.remove('d-none');
    const updateLocationForm = searchBarElement.cloneNode(true);
    document.getElementById(btnId).parentElement.replaceWith(updateLocationForm);
    const btnInfo = btnId.split('-');
    configUpdateLocationForm(updateLocationForm, btnInfo[1], btnInfo[2]);
    document.getElementById('input-update-location-' + btnInfo[1]).focus();
    if (!searchBarDisplay) {
        searchBarElement.className += ' d-none';
    }
}
window.updateLocation = updateLocation;

function configUpdateLocationForm(form, position, originalLocation) {
    form.id = 'update-location-form-' + originalLocation;
    form.className += ' area';

    let btnPosition = document.createElement('input');
    btnPosition.setAttribute('name', 'position');
    btnPosition.setAttribute('value', position);
    btnPosition.setAttribute('type', 'hidden');
    form.appendChild(btnPosition);

    let input = form.querySelector('#autoComplete');
    input.setAttribute('name', 'updateClock');
    input.setAttribute('placeholder', originalLocation);
    input.id = 'input-update-location-' + position;

    let btn = form.querySelector('#addPlaceBtn');
    btn.textContent = 'Update';
    btn.id = 'update-location-btn-' + position;
}