import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  // searchFormData:any = {pickupCity: 'Pune, Maharashtra', pickupDate: '2024-09-02', pickupTime: '2:00:00 AM'};
  searchFormData: any;

  storeSearchFormData(data: any) {
    let obj: { [key: string]: any } = {};

    data.forEach((val: any, index: number) => {
      obj[index] = val;  // Use the index as the key
    });

    this.searchFormData = obj;
  }
  autoHideSweetAlert(icon, message) {
    Swal.fire({
      position: "center",
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  convertCitiesHyfan(city: string) {
    // console.log(city);

    const parts = city.split(', ');

    // Join the parts with a hyphen
    return parts.join('-');
  }







  countriesWithFlags = [
    {
        "id": 1,
        "name": "Afghanistan",
        "code": "+93",
        "flag": "fi fi-af"
    },
    {
        "id": 2,
        "name": "Albania",
        "code": "+355",
        "flag": "fi fi-al"
    },
    {
        "id": 3,
        "name": "Algeria",
        "code": "+213",
        "flag": "fi fi-dz"
    },
    {
        "id": 4,
        "name": "Andorra",
        "code": "+376",
        "flag": "fi fi-ad"
    },
    {
        "id": 5,
        "name": "Angola",
        "code": "+244",
        "flag": "fi fi-ao"
    },
    {
        "id": 6,
        "name": "Argentina",
        "code": "+54",
        "flag": "fi fi-ar"
    },
    {
        "id": 7,
        "name": "Armenia",
        "code": "+374",
        "flag": "fi fi-am"
    },
    {
        "id": 8,
        "name": "Australia",
        "code": "+61",
        "flag": "fi fi-au"
    },
    {
        "id": 9,
        "name": "Austria",
        "code": "+43",
        "flag": "fi fi-at"
    },
    {
        "id": 10,
        "name": "Azerbaijan",
        "code": "+994",
        "flag": "fi fi-az"
    },
    {
        "id": 11,
        "name": "Bahamas",
        "code": "+1-242",
        "flag": "fi fi-bs"
    },
    {
        "id": 12,
        "name": "Bahrain",
        "code": "+973",
        "flag": "fi fi-bh"
    },
    {
        "id": 13,
        "name": "Bangladesh",
        "code": "+880",
        "flag": "fi fi-bd"
    },
    {
        "id": 14,
        "name": "Barbados",
        "code": "+1-246",
        "flag": "fi fi-bb"
    },
    {
        "id": 15,
        "name": "Belarus",
        "code": "+375",
        "flag": "fi fi-by"
    },
    {
        "id": 16,
        "name": "Belgium",
        "code": "+32",
        "flag": "fi fi-be"
    },
    {
        "id": 17,
        "name": "Belize",
        "code": "+501",
        "flag": "fi fi-bz"
    },
    {
        "id": 18,
        "name": "Benin",
        "code": "+229",
        "flag": "fi fi-bj"
    },
    {
        "id": 19,
        "name": "Bhutan",
        "code": "+975",
        "flag": "fi fi-bt"
    },
    {
        "id": 20,
        "name": "Bolivia",
        "code": "+591",
        "flag": "fi fi-bo"
    },
    {
        "id": 21,
        "name": "Bosnia and Herzegovina",
        "code": "+387",
        "flag": "fi fi-ba"
    },
    {
        "id": 22,
        "name": "Botswana",
        "code": "+267",
        "flag": "fi fi-bw"
    },
    {
        "id": 23,
        "name": "Brazil",
        "code": "+55",
        "flag": "fi fi-br"
    },
    {
        "id": 24,
        "name": "Brunei",
        "code": "+673",
        "flag": "fi fi-bn"
    },
    {
        "id": 25,
        "name": "Bulgaria",
        "code": "+359",
        "flag": "fi fi-bg"
    },
    {
        "id": 26,
        "name": "Burkina Faso",
        "code": "+226",
        "flag": "fi fi-bf"
    },
    {
        "id": 27,
        "name": "Burundi",
        "code": "+257",
        "flag": "fi fi-bi"
    },
    {
        "id": 28,
        "name": "Cabo Verde",
        "code": "+238",
        "flag": "fi fi-cv"
    },
    {
        "id": 29,
        "name": "Cambodia",
        "code": "+855",
        "flag": "fi fi-kh"
    },
    {
        "id": 30,
        "name": "Cameroon",
        "code": "+237",
        "flag": "fi fi-cm"
    },
    {
        "id": 31,
        "name": "Canada",
        "code": "+1",
        "flag": "fi fi-ca"
    },
    {
        "id": 32,
        "name": "Central African Republic",
        "code": "+236",
        "flag": "fi fi-cf"
    },
    {
        "id": 33,
        "name": "Chad",
        "code": "+235",
        "flag": "fi fi-td"
    },
    {
        "id": 34,
        "name": "Chile",
        "code": "+56",
        "flag": "fi fi-cl"
    },
    {
        "id": 35,
        "name": "China",
        "code": "+86",
        "flag": "fi fi-cn"
    },
    {
        "id": 36,
        "name": "Colombia",
        "code": "+57",
        "flag": "fi fi-co"
    },
    {
        "id": 37,
        "name": "Comoros",
        "code": "+269",
        "flag": "fi fi-km"
    },
    {
        "id": 38,
        "name": "Congo (Congo-Brazzaville)",
        "code": "+242",
        "flag": "fi fi-cg"
    },
    {
        "id": 39,
        "name": "Congo (Congo-Kinshasa)",
        "code": "+243",
        "flag": "fi fi-cd"
    },
    {
        "id": 40,
        "name": "Costa Rica",
        "code": "+506",
        "flag": "fi fi-cr"
    },
    {
        "id": 41,
        "name": "Croatia",
        "code": "+385",
        "flag": "fi fi-hr"
    },
    {
        "id": 42,
        "name": "Cuba",
        "code": "+53",
        "flag": "fi fi-cu"
    },
    {
        "id": 43,
        "name": "Cyprus",
        "code": "+357",
        "flag": "fi fi-cy"
    },
    {
        "id": 44,
        "name": "Czech Republic",
        "code": "+420",
        "flag": "fi fi-cz"
    },
    {
        "id": 45,
        "name": "Denmark",
        "code": "+45",
        "flag": "fi fi-dk"
    },
    {
        "id": 46,
        "name": "Djibouti",
        "code": "+253",
        "flag": "fi fi-dj"
    },
    {
        "id": 47,
        "name": "Dominica",
        "code": "+1-767",
        "flag": "fi fi-dm"
    },
    {
        "id": 48,
        "name": "Dominican Republic",
        "code": "+1-809",
        "flag": "fi fi-do"
    },
    {
        "id": 49,
        "name": "Ecuador",
        "code": "+593",
        "flag": "fi fi-ec"
    },
    {
        "id": 50,
        "name": "Egypt",
        "code": "+20",
        "flag": "fi fi-eg"
    },
    {
        "id": 51,
        "name": "El Salvador",
        "code": "+503",
        "flag": "fi fi-sv"
    },
    {
        "id": 52,
        "name": "Equatorial Guinea",
        "code": "+240",
        "flag": "fi fi-gq"
    },
    {
        "id": 53,
        "name": "Eritrea",
        "code": "+291",
        "flag": "fi fi-er"
    },
    {
        "id": 54,
        "name": "Estonia",
        "code": "+372",
        "flag": "fi fi-ee"
    },
    {
        "id": 55,
        "name": "Eswatini",
        "code": "+268",
        "flag": "fi fi-sz"
    },
    {
        "id": 56,
        "name": "Ethiopia",
        "code": "+251",
        "flag": "fi fi-et"
    },
    {
        "id": 57,
        "name": "Fiji",
        "code": "+679",
        "flag": "fi fi-fj"
    },
    {
        "id": 58,
        "name": "Finland",
        "code": "+358",
        "flag": "fi fi-fi"
    },
    {
        "id": 59,
        "name": "France",
        "code": "+33",
        "flag": "fi fi-fr"
    },
    {
        "id": 60,
        "name": "Gabon",
        "code": "+241",
        "flag": "fi fi-ga"
    },
    {
        "id": 61,
        "name": "Gambia",
        "code": "+220",
        "flag": "fi fi-gm"
    },
    {
        "id": 62,
        "name": "Georgia",
        "code": "+995",
        "flag": "fi fi-ge"
    },
    {
        "id": 63,
        "name": "Germany",
        "code": "+49",
        "flag": "fi fi-de"
    },
    {
        "id": 64,
        "name": "Ghana",
        "code": "+233",
        "flag": "fi fi-gh"
    },
    {
        "id": 65,
        "name": "Greece",
        "code": "+30",
        "flag": "fi fi-gr"
    },
    {
        "id": 66,
        "name": "Grenada",
        "code": "+1-473",
        "flag": "fi fi-gd"
    },
    {
        "id": 67,
        "name": "Guatemala",
        "code": "+502",
        "flag": "fi fi-gt"
    },
    {
        "id": 68,
        "name": "Guinea",
        "code": "+224",
        "flag": "fi fi-gn"
    },
    {
        "id": 69,
        "name": "Guinea-Bissau",
        "code": "+245",
        "flag": "fi fi-gw"
    },
    {
        "id": 70,
        "name": "Guyana",
        "code": "+592",
        "flag": "fi fi-gy"
    },
    {
        "id": 71,
        "name": "Haiti",
        "code": "+509",
        "flag": "fi fi-ht"
    },
    {
        "id": 72,
        "name": "Honduras",
        "code": "+504",
        "flag": "fi fi-hn"
    },
    {
        "id": 73,
        "name": "Hungary",
        "code": "+36",
        "flag": "fi fi-hu"
    },
    {
        "id": 74,
        "name": "Iceland",
        "code": "+354",
        "flag": "fi fi-is"
    },
    {
        "id": 75,
        "name": "India",
        "code": "+91",
        "flag": "fi fi-in"
    },
    {
        "id": 76,
        "name": "Indonesia",
        "code": "+62",
        "flag": "fi fi-id"
    },
    {
        "id": 77,
        "name": "Iran",
        "code": "+98",
        "flag": "fi fi-ir"
    },
    {
        "id": 78,
        "name": "Iraq",
        "code": "+964",
        "flag": "fi fi-iq"
    },
    {
        "id": 79,
        "name": "Ireland",
        "code": "+353",
        "flag": "fi fi-ie"
    },
    {
        "id": 80,
        "name": "Israel",
        "code": "+972",
        "flag": "fi fi-il"
    },
    {
        "id": 81,
        "name": "Italy",
        "code": "+39",
        "flag": "fi fi-it"
    },
    {
        "id": 82,
        "name": "Jamaica",
        "code": "+1-876",
        "flag": "fi fi-jm"
    },
    {
        "id": 83,
        "name": "Japan",
        "code": "+81",
        "flag": "fi fi-jp"
    },
    {
        "id": 84,
        "name": "Jordan",
        "code": "+962",
        "flag": "fi fi-jo"
    },
    {
        "id": 85,
        "name": "Kazakhstan",
        "code": "+7",
        "flag": "fi fi-kz"
    },
    {
        "id": 86,
        "name": "Kenya",
        "code": "+254",
        "flag": "fi fi-ke"
    },
    {
        "id": 87,
        "name": "Kiribati",
        "code": "+686",
        "flag": "fi fi-ki"
    },
    {
        "id": 88,
        "name": "Kuwait",
        "code": "+965",
        "flag": "fi fi-kw"
    },
    {
        "id": 89,
        "name": "Kyrgyzstan",
        "code": "+996",
        "flag": "fi fi-kg"
    },
    {
        "id": 90,
        "name": "Laos",
        "code": "+856",
        "flag": "fi fi-la"
    },
    {
        "id": 91,
        "name": "Latvia",
        "code": "+371",
        "flag": "fi fi-lv"
    },
    {
        "id": 92,
        "name": "Lebanon",
        "code": "+961",
        "flag": "fi fi-lb"
    },
    {
        "id": 93,
        "name": "Lesotho",
        "code": "+266",
        "flag": "fi fi-ls"
    },
    {
        "id": 94,
        "name": "Liberia",
        "code": "+231",
        "flag": "fi fi-lr"
    },
    {
        "id": 95,
        "name": "Libya",
        "code": "+218",
        "flag": "fi fi-ly"
    },
    {
        "id": 96,
        "name": "Liechtenstein",
        "code": "+423",
        "flag": "fi fi-li"
    },
    {
        "id": 97,
        "name": "Lithuania",
        "code": "+370",
        "flag": "fi fi-lt"
    },
    {
        "id": 98,
        "name": "Luxembourg",
        "code": "+352",
        "flag": "fi fi-lu"
    },
    {
        "id": 99,
        "name": "Madagascar",
        "code": "+261",
        "flag": "fi fi-mg"
    },
    {
        "id": 100,
        "name": "Malawi",
        "code": "+265",
        "flag": "fi fi-mw"
    },
    {
        "id": 101,
        "name": "Malaysia",
        "code": "+60",
        "flag": "fi fi-my"
    },
    {
        "id": 102,
        "name": "Maldives",
        "code": "+960",
        "flag": "fi fi-mv"
    },
    {
        "id": 103,
        "name": "Mali",
        "code": "+223",
        "flag": "fi fi-ml"
    },
    {
        "id": 104,
        "name": "Malta",
        "code": "+356",
        "flag": "fi fi-mt"
    },
    {
        "id": 105,
        "name": "Marshall Islands",
        "code": "+692",
        "flag": "fi fi-mh"
    },
    {
        "id": 106,
        "name": "Mauritania",
        "code": "+222",
        "flag": "fi fi-mr"
    },
    {
        "id": 107,
        "name": "Mauritius",
        "code": "+230",
        "flag": "fi fi-mu"
    },
    {
        "id": 108,
        "name": "Mexico",
        "code": "+52",
        "flag": "fi fi-mx"
    },
    {
        "id": 109,
        "name": "Micronesia",
        "code": "+691",
        "flag": "fi fi-fm"
    },
    {
        "id": 110,
        "name": "Moldova",
        "code": "+373",
        "flag": "fi fi-md"
    },
    {
        "id": 111,
        "name": "Monaco",
        "code": "+377",
        "flag": "fi fi-mc"
    },
    {
        "id": 112,
        "name": "Mongolia",
        "code": "+976",
        "flag": "fi fi-mn"
    },
    {
        "id": 113,
        "name": "Montenegro",
        "code": "+382",
        "flag": "fi fi-me"
    },
    {
        "id": 114,
        "name": "Morocco",
        "code": "+212",
        "flag": "fi fi-ma"
    },
    {
        "id": 115,
        "name": "Mozambique",
        "code": "+258",
        "flag": "fi fi-mz"
    },
    {
        "id": 116,
        "name": "Myanmar",
        "code": "+95",
        "flag": "fi fi-mm"
    },
    {
        "id": 117,
        "name": "Namibia",
        "code": "+264",
        "flag": "fi fi-na"
    },
    {
        "id": 118,
        "name": "Nauru",
        "code": "+674",
        "flag": "fi fi-nr"
    },
    {
        "id": 119,
        "name": "Nepal",
        "code": "+977",
        "flag": "fi fi-np"
    },
    {
        "id": 120,
        "name": "Netherlands",
        "code": "+31",
        "flag": "fi fi-nl"
    },
    {
        "id": 121,
        "name": "New Zealand",
        "code": "+64",
        "flag": "fi fi-nz"
    },
    {
        "id": 122,
        "name": "Nicaragua",
        "code": "+505",
        "flag": "fi fi-ni"
    },
    {
        "id": 123,
        "name": "Niger",
        "code": "+227",
        "flag": "fi fi-ne"
    },
    {
        "id": 124,
        "name": "Nigeria",
        "code": "+234",
        "flag": "fi fi-ng"
    },
    {
        "id": 125,
        "name": "North Korea",
        "code": "+850",
        "flag": "fi fi-kp"
    },
    {
        "id": 126,
        "name": "North Macedonia",
        "code": "+389",
        "flag": "fi fi-mk"
    },
    {
        "id": 127,
        "name": "Norway",
        "code": "+47",
        "flag": "fi fi-no"
    },
    {
        "id": 128,
        "name": "Oman",
        "code": "+968",
        "flag": "fi fi-om"
    },
    {
        "id": 129,
        "name": "Pakistan",
        "code": "+92",
        "flag": "fi fi-pk"
    },
    {
        "id": 130,
        "name": "Palau",
        "code": "+680",
        "flag": "fi fi-pw"
    },
    {
        "id": 131,
        "name": "Palestine",
        "code": "+970",
        "flag": "fi fi-ps"
    },
    {
        "id": 132,
        "name": "Panama",
        "code": "+507",
        "flag": "fi fi-pa"
    },
    {
        "id": 133,
        "name": "Papua New Guinea",
        "code": "+675",
        "flag": "fi fi-pg"
    },
    {
        "id": 134,
        "name": "Paraguay",
        "code": "+595",
        "flag": "fi fi-py"
    },
    {
        "id": 135,
        "name": "Peru",
        "code": "+51",
        "flag": "fi fi-pe"
    },
    {
        "id": 136,
        "name": "Philippines",
        "code": "+63",
        "flag": "fi fi-ph"
    },
    {
        "id": 137,
        "name": "Poland",
        "code": "+48",
        "flag": "fi fi-pl"
    },
    {
        "id": 138,
        "name": "Portugal",
        "code": "+351",
        "flag": "fi fi-pt"
    },
    {
        "id": 139,
        "name": "Qatar",
        "code": "+974",
        "flag": "fi fi-qa"
    },
    {
        "id": 140,
        "name": "Republic of the Congo",
        "code": "+242",
        "flag": "fi fi-cg"
    },
    {
        "id": 141,
        "name": "Romania",
        "code": "+40",
        "flag": "fi fi-ro"
    },
    {
        "id": 142,
        "name": "Russia",
        "code": "+7",
        "flag": "fi fi-ru"
    },
    {
        "id": 143,
        "name": "Rwanda",
        "code": "+250",
        "flag": "fi fi-rw"
    },
    {
        "id": 144,
        "name": "Saint Kitts and Nevis",
        "code": "+1-869",
        "flag": "fi fi-kn"
    },
    {
        "id": 145,
        "name": "Saint Lucia",
        "code": "+1-758",
        "flag": "fi fi-lc"
    },
    {
        "id": 146,
        "name": "Saint Vincent and the Grenadines",
        "code": "+1-784",
        "flag": "fi fi-vc"
    },
    {
        "id": 147,
        "name": "Samoa",
        "code": "+685",
        "flag": "fi fi-ws"
    },
    {
        "id": 148,
        "name": "San Marino",
        "code": "+378",
        "flag": "fi fi-sm"
    },
    {
        "id": 149,
        "name": "Sao Tome and Principe",
        "code": "+239",
        "flag": "fi fi-st"
    },
    {
        "id": 150,
        "name": "Saudi Arabia",
        "code": "+966",
        "flag": "fi fi-sa"
    },
    {
        "id": 151,
        "name": "Senegal",
        "code": "+221",
        "flag": "fi fi-sn"
    },
    {
        "id": 152,
        "name": "Serbia",
        "code": "+381",
        "flag": "fi fi-rs"
    },
    {
        "id": 153,
        "name": "Seychelles",
        "code": "+248",
        "flag": "fi fi-sc"
    },
    {
        "id": 154,
        "name": "Sierra Leone",
        "code": "+232",
        "flag": "fi fi-sl"
    },
    {
        "id": 155,
        "name": "Singapore",
        "code": "+65",
        "flag": "fi fi-sg"
    },
    {
        "id": 156,
        "name": "Slovakia",
        "code": "+421",
        "flag": "fi fi-sk"
    },
    {
        "id": 157,
        "name": "Slovenia",
        "code": "+386",
        "flag": "fi fi-si"
    },
    {
        "id": 158,
        "name": "Solomon Islands",
        "code": "+677",
        "flag": "fi fi-sb"
    },
    {
        "id": 159,
        "name": "Somalia",
        "code": "+252",
        "flag": "fi fi-so"
    },
    {
        "id": 160,
        "name": "South Africa",
        "code": "+27",
        "flag": "fi fi-za"
    },
    {
        "id": 161,
        "name": "South Korea",
        "code": "+82",
        "flag": "fi fi-kr"
    },
    {
        "id": 162,
        "name": "South Sudan",
        "code": "+211",
        "flag": "fi fi-ss"
    },
    {
        "id": 163,
        "name": "Spain",
        "code": "+34",
        "flag": "fi fi-es"
    },
    {
        "id": 164,
        "name": "Sri Lanka",
        "code": "+94",
        "flag": "fi fi-lk"
    },
    {
        "id": 165,
        "name": "Sudan",
        "code": "+249",
        "flag": "fi fi-sd"
    },
    {
        "id": 166,
        "name": "Suriname",
        "code": "+597",
        "flag": "fi fi-sr"
    },
    {
        "id": 167,
        "name": "Sweden",
        "code": "+46",
        "flag": "fi fi-se"
    },
    {
        "id": 168,
        "name": "Switzerland",
        "code": "+41",
        "flag": "fi fi-ch"
    },
    {
        "id": 169,
        "name": "Syria",
        "code": "+963",
        "flag": "fi fi-sy"
    },
    {
        "id": 170,
        "name": "Taiwan",
        "code": "+886",
        "flag": "fi fi-tw"
    },
    {
        "id": 171,
        "name": "Tajikistan",
        "code": "+992",
        "flag": "fi fi-tj"
    },
    {
        "id": 172,
        "name": "Tanzania",
        "code": "+255",
        "flag": "fi fi-tz"
    },
    {
        "id": 173,
        "name": "Thailand",
        "code": "+66",
        "flag": "fi fi-th"
    },
    {
        "id": 174,
        "name": "Timor-Leste",
        "code": "+670",
        "flag": "fi fi-tl"
    },
    {
        "id": 175,
        "name": "Togo",
        "code": "+228",
        "flag": "fi fi-tg"
    },
    {
        "id": 176,
        "name": "Tonga",
        "code": "+676",
        "flag": "fi fi-to"
    },
    {
        "id": 177,
        "name": "Trinidad and Tobago",
        "code": "+1-868",
        "flag": "fi fi-tt"
    },
    {
        "id": 178,
        "name": "Tunisia",
        "code": "+216",
        "flag": "fi fi-tn"
    },
    {
        "id": 179,
        "name": "Turkey",
        "code": "+90",
        "flag": "fi fi-tr"
    },
    {
        "id": 180,
        "name": "Turkmenistan",
        "code": "+993",
        "flag": "fi fi-tm"
    },
    {
        "id": 181,
        "name": "Tuvalu",
        "code": "+688",
        "flag": "fi fi-tv"
    },
    {
        "id": 182,
        "name": "Uganda",
        "code": "+256",
        "flag": "fi fi-ug"
    },
    {
        "id": 183,
        "name": "Ukraine",
        "code": "+380",
        "flag": "fi fi-ua"
    },
    {
        "id": 184,
        "name": "United Arab Emirates",
        "code": "+971",
        "flag": "fi fi-ae"
    },
    {
        "id": 185,
        "name": "United Kingdom",
        "code": "+44",
        "flag": "fi fi-gb"
    },
    {
        "id": 186,
        "name": "United States",
        "code": "+1",
        "flag": "fi fi-us"
    },
    {
        "id": 187,
        "name": "Uruguay",
        "code": "+598",
        "flag": "fi fi-uy"
    },
    {
        "id": 188,
        "name": "Uzbekistan",
        "code": "+998",
        "flag": "fi fi-uz"
    },
    {
        "id": 189,
        "name": "Vanuatu",
        "code": "+678",
        "flag": "fi fi-vu"
    },
    {
        "id": 190,
        "name": "Vatican City",
        "code": "+39",
        "flag": "fi fi-va"
    },
    {
        "id": 191,
        "name": "Venezuela",
        "code": "+58",
        "flag": "fi fi-ve"
    },
    {
        "id": 192,
        "name": "Vietnam",
        "code": "+84",
        "flag": "fi fi-vn"
    },
    {
        "id": 193,
        "name": "Yemen",
        "code": "+967",
        "flag": "fi fi-ye"
    },
    {
        "id": 194,
        "name": "Zambia",
        "code": "+260",
        "flag": "fi fi-zm"
    },
    {
        "id": 195,
        "name": "Zimbabwe",
        "code": "+263",
        "flag": "fi fi-zw"
    }
]

}
