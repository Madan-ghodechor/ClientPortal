//************************** New Logic **************************//
var cities;

function CallMaps(input) {
    const airportOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, airportOptions);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        // console.log(place)
        // console.log(place.formatted_address)
        cities = place;
    });
}
function MapsReturn(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return cities;
}


//************************** Logic For Multiple City's **************************//
var city2;
var city3;
var city4;
var city5;

function CallMaps_city2(input) {
    const airportOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, airportOptions);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        city2 = place;
    });
}
function CallMaps_city3(input) {
    const airportOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, airportOptions);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        city3 = place;
    });
}
function CallMaps_city4(input) {
    const airportOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, airportOptions);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        city4 = place;
    });
}
function CallMaps_city5(input) {
    const airportOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
    };
    var autocomplete = new google.maps.places.Autocomplete(input, airportOptions);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        city5 = place;
    });
}

function multicity_toCity(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return cities;
}
function multicity_city2(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return city2;
}
function multicity_city3(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return city3;
}
function multicity_city4(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return city4;
}
function multicity_city5(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return city5;
}




// ------------------ Pickup Location and Google places ------------------ //
var pickupLocation;

function _callPickupLocation(input, allowedDistrict) {
    const validations = {
        componentRestrictions: { 
            country: 'in',
            administrativeArea: allowedDistrict
        }, 
        language: 'en' 
    };

    var autocomplete = new google.maps.places.Autocomplete(input, validations);

    // Add listener to capture the place after selection
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        console.log()


        if (!place || !place.address_components) {
            console.warn('No place details available');
            return;
        }

        // Get the district name from the address components (administrative_area_level_2)
        let district = '';
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types.includes("administrative_area_level_3")) {
                district = place.address_components[i].long_name;
                break;
            }
        }

        // Check if the selected place belongs to the allowed district
        console.log(place.address_components)
        console.log(district)
        if (district.toLowerCase() === allowedDistrict.toLowerCase()) {
            console.log('Valid location in ' + allowedDistrict + ':', place);
            pickupLocation = input.value; // Capture the exact value in input
        } else {
            console.warn('Selected place is not in ' + allowedDistrict);
            input.value = ''; // Clear the input if the place is not from the desired district
        }
    });
}

function _returnPickupLocation(ids) {
    let inputBox = document.getElementById(ids).value
    if (inputBox == '')
        return '';
    else
        return pickupLocation;
}