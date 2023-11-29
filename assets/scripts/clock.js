import {getUserTimeZonesOrNull} from './dict-helper.js';

const degree = 6;
const hr = document.getElementsByClassName('hour-hand');
const mn = document.getElementsByClassName('minute-hand');
const sc = document.getElementsByClassName('second-hand');
const digitalHr = document.getElementsByClassName('digital-hour');
const digitalMn = document.getElementsByClassName('digital-minute');
const digitalSc = document.getElementsByClassName('digital-second');
const digitalDate = document.getElementsByClassName('digital-date');
const options = { weekday: 'short', day: 'numeric', month: 'short' };

setInterval(fetchData, 1000)

export function fetchData() {
    console.log(document.getElementById('userClock').innerHTML);
    var userTimeZonesDict = JSON.parse(document.getElementById('userClock').textContent);
    var userTimeZones = getUserTimeZonesOrNull(userTimeZonesDict);
    if (userTimeZones !== null) {
        let day = userTimeZones.map(t => getTime(t));
        var tz = getTime(Intl.DateTimeFormat().resolvedOptions().timeZone);

        day.forEach((value, index, array) => {
            let hour = value.getHours();
            let minute = value.getMinutes();
            let second = value.getSeconds();
            let date = value.toLocaleDateString("en-GB", options);

            hr[index].style.transform = `rotateZ(${hour * degree * 5 + minute * degree/12}deg)`;
            mn[index].style.transform = `rotateZ(${minute * degree}deg)`;
            sc[index].style.transform = `rotateZ(${second * degree}deg)`;

            digitalHr[index].innerHTML = toDecimalFormat(hour);
            digitalMn[index].innerHTML = toDecimalFormat(minute);
            digitalSc[index].innerHTML = toDecimalFormat(second);
            digitalDate[index].textContent = date + " " + `(${showTimeDifference(getHoursDifference(tz.getTime(), value.getTime()))})`;
        });
    }
}

// format analog clock hour numbers
const clockHourNums = document.getElementsByClassName('hourNumber');
for (let clockHourNum of clockHourNums) {
    clockHourNum.style = "--i:" + clockHourNum.textContent;
};

function toDecimalFormat(value) {
    return value < 10 ? "0" + value : value;
}

function getTime(timeZoneString) {
    try {
        return new Date(new Date().toLocaleString("en-US", {timeZone: timeZoneString}));
    } catch (err) {
        console.log(err);
    }
}

function getHoursDifference(base, target) {
    return (target - base) / (1000 * 3600);
}

function showTimeDifference(value) {
    if (value < 0) {
        return Math.abs(value) + " hours behind";
    } else {
        return value + " hours ahead";
    }
}