import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrl: './booking-payment.component.scss'
})
export class BookingPaymentComponent implements OnInit {

  // ------------------ Designing Method's ------------------ //
  divs = [
    { id: 1, show: true, name: 'User Details', active: true },
    { id: 2, show: false, name: 'Passenger Details', active: false },
    { id: 3, show: false, name: 'Pickup/GST Details', active: false },
    { id: 4, show: false, name: 'Payment Information', active: false }
  ];
  toggleDiv(id: number) {
    window.scrollTo(0, 0);
    this.divs.forEach(div => {
      div.show = div.id === id;
    });
  }
  setActiveButton(id: number) {
    this.divs.forEach(div => {
      div.active = div.id === id;
    });
  }
  loginMethods = [
    { id: 1, show: true, name: 'Login With Email', active: true },
    { id: 2, show: false, name: 'Login With OTP', active: false }
  ];
  toggleLogin(id: number) {
    window.scrollTo(0, 0);
    this.loginMethods.forEach(div => {
      div.show = div.id === id;
    });
  }
  setActiveLogin(id: number) {
    this.loginMethods.forEach(div => {
      div.active = div.id === id;
    });
  }
  showPass: boolean = false;
  inputType: string = "password";
  showPassword() {
    this.showPass = !this.showPass;
    this.inputType = 'password'
    if (this.showPass)
      this.inputType = 'text'
  }
  // ------------------ End Designing Method's ------------------ //


  isDropdownOpen = false; // State to control the visibility of the dropdown list
  selectedOption: string | null = "+91"; // Selected option
  countries = [
    {
      "name": {
        "common": "India",
        "official": "Republic of India",
        "nativeName": {
          "eng": {
            "official": "Republic of India",
            "common": "India"
          },
          "hin": {
            "official": "भारत गणराज्य",
            "common": "भारत"
          },
          "tam": {
            "official": "இந்தியக் குடியரசு",
            "common": "இந்தியா"
          }
        }
      },
      "tld": [
        ".in"
      ],
      "cca2": "IN",
      "ccn3": "356",
      "cca3": "IND",
      "cioc": "IND",
      "independent": true,
      "status": "officially-assigned",
      "unMember": true,
      "currencies": {
        "INR": {
          "name": "Indian rupee",
          "symbol": "₹"
        }
      },
      "idd": {
        "root": "+9",
        "suffixes": [
          "1"
        ]
      },
      "capital": [
        "New Delhi"
      ],
      "altSpellings": [
        "IN",
        "Bhārat",
        "Republic of India",
        "Bharat Ganrajya",
        "இந்தியா"
      ],
      "region": "Asia",
      "subregion": "Southern Asia",
      "languages": {
        "eng": "English",
        "hin": "Hindi",
        "tam": "Tamil"
      },
      "translations": {
        "ara": {
          "official": "جمهورية الهند",
          "common": "الهند"
        },
        "bre": {
          "official": "Republik India",
          "common": "India"
        },
        "ces": {
          "official": "Indická republika",
          "common": "Indie"
        },
        "cym": {
          "official": "Republic of India",
          "common": "India"
        },
        "deu": {
          "official": "Republik Indien",
          "common": "Indien"
        },
        "est": {
          "official": "India Vabariik",
          "common": "India"
        },
        "fin": {
          "official": "Intian tasavalta",
          "common": "Intia"
        },
        "fra": {
          "official": "République de l'Inde",
          "common": "Inde"
        },
        "hrv": {
          "official": "Republika Indija",
          "common": "Indija"
        },
        "hun": {
          "official": "Indiai Köztársaság",
          "common": "India"
        },
        "ita": {
          "official": "Repubblica dell'India",
          "common": "India"
        },
        "jpn": {
          "official": "インド共和国",
          "common": "インド"
        },
        "kor": {
          "official": "인도 공화국",
          "common": "인도"
        },
        "nld": {
          "official": "Republiek India",
          "common": "India"
        },
        "per": {
          "official": "جمهوری هندوستان",
          "common": "هند"
        },
        "pol": {
          "official": "Republika Indii",
          "common": "Indie"
        },
        "por": {
          "official": "República da Índia",
          "common": "Índia"
        },
        "rus": {
          "official": "Республика Индия",
          "common": "Индия"
        },
        "slk": {
          "official": "Indická republika",
          "common": "India"
        },
        "spa": {
          "official": "República de la India",
          "common": "India"
        },
        "srp": {
          "official": "Република Индија",
          "common": "Индија"
        },
        "swe": {
          "official": "Republiken Indien",
          "common": "Indien"
        },
        "tur": {
          "official": "Hindistan Cumhuriyeti",
          "common": "Hindistan"
        },
        "urd": {
          "official": "جمہوریہ بھارت",
          "common": "بھارت"
        },
        "zho": {
          "official": "印度共和国",
          "common": "印度"
        }
      },
      "latlng": [
        20.0,
        77.0
      ],
      "landlocked": false,
      "borders": [
        "BGD",
        "BTN",
        "MMR",
        "CHN",
        "NPL",
        "PAK"
      ],
      "area": 3287590.0,
      "demonyms": {
        "eng": {
          "f": "Indian",
          "m": "Indian"
        },
        "fra": {
          "f": "Indienne",
          "m": "Indien"
        }
      },
      "flag": "🇮🇳",
      "maps": {
        "googleMaps": "https://goo.gl/maps/WSk3fLwG4vtPQetp7",
        "openStreetMaps": "https://www.openstreetmap.org/relation/304716"
      },
      "population": 1380004385,
      "gini": {
        "2011": 35.7
      },
      "fifa": "IND",
      "car": {
        "signs": [
          "IND"
        ],
        "side": "left"
      },
      "timezones": [
        "UTC+05:30"
      ],
      "continents": [
        "Asia"
      ],
      "flags": {
        "png": "https://flagcdn.com/w320/in.png",
        "svg": "https://flagcdn.com/in.svg",
        "alt": "The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band."
      },
      "coatOfArms": {
        "png": "https://mainfacts.com/media/images/coats_of_arms/in.png",
        "svg": "https://mainfacts.com/media/images/coats_of_arms/in.svg"
      },
      "startOfWeek": "monday",
      "capitalInfo": {
        "latlng": [
          28.6,
          77.2
        ]
      },
      "postalCode": {
        "format": "######",
        "regex": "^(\\d{6})$"
      }
    },
  ]
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  closeDropdown() {
    if (this.selectedOption == '') {
      this.selectedOption = "+91"
    }
    this.isDropdownOpen = false; // Close dropdown
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.closeDropdown();
  }
  selectOption2(option: any) {
    if (option) {
      this.selectedOption = option
      if (this.selectedOption.length == 3) {
        this.closeDropdown();
      }
    }
  }


  http = inject(HttpClient)
  ngOnInit() {
    this.http.get("https://restcountries.com/v3.1/all").subscribe((res: any) => {
      this.countries = res
    })
  }


}
