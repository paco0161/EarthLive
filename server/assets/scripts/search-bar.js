import autoComplete from './autoComplete.js';
import {getAllTimeZoneAreaOrNull} from './dict-helper.js';

const timeZones = getAllTimeZoneAreaOrNull(JSON.parse(document.getElementById('timeZones').textContent));

const autoCompleteJS = new autoComplete({
    selector: "#autoComplete",
    data: {
        src: timeZones,
        cache: true,
    },
    threshold: 2,
    diacritics: true,
    resultsList: {
        element: (list, data) => {
            const info = document.createElement("p");
            if (data.results.length > 0) {
            info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
            } else {
            info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
            }
            list.prepend(info);
        },
        maxResults: 20,
        noResults: true,
        tabSelect: true
    },
    resultItem: {
        highlight: true,
        selected: "selected"
    },
    submit: true,
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;
            }
        },
        list: {
            scroll: (event) => {
            console.log("Results List scrolled!");
            }
        }
    }
});

document.getElementById("autoComplete").focus();

