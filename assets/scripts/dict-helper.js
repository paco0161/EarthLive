function getUserTimeZonesOrNull(clocksData_dict) {
    if (clocksData_dict == '') {
        return null;
    }
    return clocksData_dict["fields"]["clocks"].map(c => c["time_zone"]);
}

function getAllTimeZoneAreaOrNull(timeZoneData_dict) {
    if (timeZoneData_dict == '') {
        return null;
    }
    return timeZoneData_dict.map(t => t["fields"]["area"]);
}

export {getUserTimeZonesOrNull, getAllTimeZoneAreaOrNull}