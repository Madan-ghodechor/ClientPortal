
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