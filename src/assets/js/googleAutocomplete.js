
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
        console.log(place)
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