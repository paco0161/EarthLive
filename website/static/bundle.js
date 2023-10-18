/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/clocks.js":
/*!**********************************!*\
  !*** ./assets/scripts/clocks.js ***!
  \**********************************/
/***/ (() => {

eval("const clocksData_dict = JSON.parse(document.getElementById('userClock').textContent);\r\nconst timeZones = JSON.parse(document.getElementById('timeZones').textContent);\r\n\r\nconst savedTmeZones = getSavedTimeZones(clocksData_dict);\r\n\r\nconst degree = 6;\r\nconst hr = document.getElementsByClassName('hour-hand');\r\nconst mn = document.getElementsByClassName('minute-hand');\r\nconst sc = document.getElementsByClassName('second-hand');\r\nconst digitalHr = document.getElementsByClassName('digital-hour');\r\nconst digitalMn = document.getElementsByClassName('digital-minute');\r\nconst digitalSc = document.getElementsByClassName('digital-second');\r\nsetInterval(function() {\r\n    if (savedTmeZones !== null) {\r\n        let day = savedTmeZones.map(t => new Date(new Date().toLocaleString(\"en-US\", {timeZone: t})));\r\n\r\n        day.forEach((value, index, array) => {\r\n            let hour = value.getHours();\r\n            let minute = value.getMinutes();\r\n            let second = value.getSeconds();\r\n\r\n            hr[index].style.transform = `rotateZ(${hour * degree * 5 + minute * degree/12}deg)`;\r\n            mn[index].style.transform = `rotateZ(${minute * degree}deg)`;\r\n            sc[index].style.transform = `rotateZ(${second * degree}deg)`;\r\n\r\n            digitalHr[index].innerHTML = hour < 10 ? \"0\" + hour : hour;\r\n            digitalMn[index].innerHTML = minute < 10 ? \"0\" + minute : minute;\r\n            digitalSc[index].innerHTML = second < 10 ? \"0\" + second : second;\r\n        });\r\n    }\r\n}, 1000)\r\n\r\n// check if display search bar or not\r\nconst searchBarElement = document.getElementById('addPlaceForm');\r\nvar searchBarDisplay = false;\r\nif (clocksData_dict[\"fields\"][\"clocks\"].length >= 2) {\r\n    searchBarElement.className += ' d-none';\r\n} else {\r\n    searchBarElement.classList.remove('d-none');\r\n    searchBarDisplay = true;\r\n}\r\n\r\n// format analog clock hour numbers\r\nconst clockHourNums = document.getElementsByClassName('hourNumber');\r\nfor (let clockHourNum of clockHourNums) {\r\n    clockHourNum.style = \"--i:\" + clockHourNum.textContent;\r\n};\r\n\r\nfunction getSavedTimeZones(clocksData_dict) {\r\n    if (clocksData_dict == '') {\r\n        return null;\r\n    }\r\n    return clocksData_dict[\"fields\"][\"clocks\"].map(c => c[\"time_zone\"]);\r\n}\r\n\r\nfunction filterTimeZones(btnId) {\r\n    console.log(btnId);\r\n    var input = document.getElementById(btnId).value;\r\n    console.log(input);\r\n    generateTimeZonesTable();\r\n    controlDisplayTimeZone(input, timeZones);\r\n}\r\n\r\nfunction generateTimeZonesTable() {\r\n\r\n}\r\n\r\nfunction controlDisplayTimeZone(input, timeZones) {\r\n\r\n}\r\n\r\nfunction updateLocation(btnId) {\r\n    searchBarElement.classList.remove('d-none');\r\n    const updateLocationForm = searchBarElement.cloneNode(true);\r\n    document.getElementById(btnId).parentElement.replaceWith(updateLocationForm);\r\n    const btnInfo = btnId.split('-');\r\n    configUpdateLocationForm(updateLocationForm, btnInfo[1], btnInfo[2]);\r\n    document.getElementById('input-update-location-' + btnInfo[1]).focus();\r\n    if (!searchBarDisplay) {\r\n        searchBarElement.className += ' d-none';\r\n    }\r\n}\r\nwindow.updateLocation = updateLocation;\r\n\r\nfunction configUpdateLocationForm(form, position, originalLocation) {\r\n    form.id = 'update-location-form-' + originalLocation;\r\n    form.className += ' area';\r\n\r\n    let btnPosition = document.createElement('input');\r\n    btnPosition.setAttribute('name', 'position');\r\n    btnPosition.setAttribute('value', position);\r\n    btnPosition.setAttribute('type', 'hidden');\r\n    form.appendChild(btnPosition);\r\n\r\n    let input = form.querySelector('#autoComplete');\r\n    input.setAttribute('name', 'updateClock');\r\n    input.setAttribute('placeholder', originalLocation);\r\n    input.id = 'input-update-location-' + position;\r\n\r\n    let btn = form.querySelector('#addPlaceBtn');\r\n    btn.textContent = 'Update';\r\n    btn.id = 'update-location-btn-' + position;\r\n}\n\n//# sourceURL=webpack://worldtimeclock_python/./assets/scripts/clocks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/scripts/clocks.js"]();
/******/ 	
/******/ })()
;