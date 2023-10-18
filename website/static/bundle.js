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

eval("const clocksData_dict = JSON.parse(document.getElementById('userClock').textContent);\nconst timeZones = JSON.parse(document.getElementById('timeZones').textContent);\n\nconst savedTmeZones = getSavedTimeZones(clocksData_dict);\n\nconst degree = 6;\nconst hr = document.getElementsByClassName('hour-hand');\nconst mn = document.getElementsByClassName('minute-hand');\nconst sc = document.getElementsByClassName('second-hand');\nconst digitalHr = document.getElementsByClassName('digital-hour');\nconst digitalMn = document.getElementsByClassName('digital-minute');\nconst digitalSc = document.getElementsByClassName('digital-second');\nsetInterval(function() {\n    if (savedTmeZones !== null) {\n        let day = savedTmeZones.map(t => new Date(new Date().toLocaleString(\"en-US\", {timeZone: t})));\n\n        day.forEach((value, index, array) => {\n            let hour = value.getHours();\n            let minute = value.getMinutes();\n            let second = value.getSeconds();\n\n            hr[index].style.transform = `rotateZ(${hour * degree * 5 + minute * degree/12}deg)`;\n            mn[index].style.transform = `rotateZ(${minute * degree}deg)`;\n            sc[index].style.transform = `rotateZ(${second * degree}deg)`;\n\n            digitalHr[index].innerHTML = hour < 10 ? \"0\" + hour : hour;\n            digitalMn[index].innerHTML = minute < 10 ? \"0\" + minute : minute;\n            digitalSc[index].innerHTML = second < 10 ? \"0\" + second : second;\n        });\n    }\n}, 1000)\n\n// check if display search bar or not\nconst searchBarElement = document.getElementById('addPlaceForm');\nvar searchBarDisplay = false;\nif (clocksData_dict[\"fields\"][\"clocks\"].length >= 2) {\n    searchBarElement.className += ' d-none';\n} else {\n    searchBarElement.classList.remove('d-none');\n    searchBarDisplay = true;\n}\n\n// format analog clock hour numbers\nconst clockHourNums = document.getElementsByClassName('hourNumber');\nfor (let clockHourNum of clockHourNums) {\n    clockHourNum.style = \"--i:\" + clockHourNum.textContent;\n};\n\nfunction getSavedTimeZones(clocksData_dict) {\n    if (clocksData_dict == '') {\n        return null;\n    }\n    return clocksData_dict[\"fields\"][\"clocks\"].map(c => c[\"time_zone\"]);\n}\n\nfunction filterTimeZones(btnId) {\n    console.log(btnId);\n    var input = document.getElementById(btnId).value;\n    console.log(input);\n    generateTimeZonesTable();\n    controlDisplayTimeZone(input, timeZones);\n}\n\nfunction generateTimeZonesTable() {\n\n}\n\nfunction controlDisplayTimeZone(input, timeZones) {\n\n}\n\nfunction updateLocation(btnId) {\n    searchBarElement.classList.remove('d-none');\n    const updateLocationForm = searchBarElement.cloneNode(true);\n    document.getElementById(btnId).parentElement.replaceWith(updateLocationForm);\n    const btnInfo = btnId.split('-');\n    configUpdateLocationForm(updateLocationForm, btnInfo[1], btnInfo[2]);\n    document.getElementById('input-update-location-' + btnInfo[1]).focus();\n    if (!searchBarDisplay) {\n        searchBarElement.className += ' d-none';\n    }\n}\nwindow.updateLocation = updateLocation;\n\nfunction configUpdateLocationForm(form, position, originalLocation) {\n    form.id = 'update-location-form-' + originalLocation;\n    form.className += ' area';\n\n    let btnPosition = document.createElement('input');\n    btnPosition.setAttribute('name', 'position');\n    btnPosition.setAttribute('value', position);\n    btnPosition.setAttribute('type', 'hidden');\n    form.appendChild(btnPosition);\n\n    let input = form.querySelector('#autoComplete');\n    input.setAttribute('name', 'updateClock');\n    input.setAttribute('placeholder', originalLocation);\n    input.id = 'input-update-location-' + position;\n\n    let btn = form.querySelector('#addPlaceBtn');\n    btn.textContent = 'Update';\n    btn.id = 'update-location-btn-' + position;\n}\n\n//# sourceURL=webpack://worldtimeclock_python/./assets/scripts/clocks.js?");

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