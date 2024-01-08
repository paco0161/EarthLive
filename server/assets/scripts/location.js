const searchBarElement = document.getElementById('addPlaceForm');

function updateLocation(btnId) {
    searchBarElement.classList.remove('d-none');
    const updateLocationForm = searchBarElement.cloneNode(true);
    document.getElementById(btnId).parentElement.replaceWith(updateLocationForm);
    const btnInfo = btnId.split('-');
    configUpdateLocationForm(updateLocationForm, btnInfo[1], btnInfo[2]);
    document.getElementById('input-update-location-' + btnInfo[1]).focus();
}

function configUpdateLocationForm(form, position, originalLocation) {
    form.id = 'update-location-form-' + originalLocation;
    form.className += ' area';

    let btnPosition = document.createElement('input');
    btnPosition.setAttribute('name', 'position');
    btnPosition.setAttribute('value', position);
    btnPosition.setAttribute('type', 'hidden');
    btnPosition.setAttribute('readonly', true);
    form.appendChild(btnPosition);

    let input = form.querySelector('#autoComplete');
    input.setAttribute('name', 'updateClock');
    input.setAttribute('placeholder', originalLocation);
    input.id = 'input-update-location-' + position;

    let btn = form.querySelector('#addPlaceBtn');
    btn.textContent = 'Update';
    btn.id = 'update-location-btn-' + position;
}

window.updateLocation = updateLocation;
export {updateLocation}