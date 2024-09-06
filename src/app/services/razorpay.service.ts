import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  options: any;

  constructor() {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();

    // Initialize Razorpay options
    const baseFare = 1000; // Example base fare
    const gstPercentage = 18; // Example GST percentage
    const convenienceFee = 50; // Example convenience fee

    const gstAmount = (baseFare * gstPercentage) / 100;
    const totalAmount = baseFare + gstAmount + convenienceFee;
    
    this.options = {
      key: 'rzp_test_5V2dfV0DMydP0L',
      SECRETE_KEY :"Php0ypQ3WiiFJbByPH9urxYT",
      amount: 551.25*100,
      currency: 'INR',
      name: 'Fleet24x7',
      description: 'Acme Corp',
      image: 'example.com/image/rzp.jpg',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '+919900000000',
      },
      theme: {
        color: themeColor
      },
      config: {
        display: {
          blocks: {
            other: {
              name: "Netbanking",
              instruments: [
                {
                  method: "netbanking",
                  banks: ["ICIC", "HDFC", "SBI"]
                }
              ]
            }
          },
          hide: [
            {
              method: "paylater"
            }
          ],
          sequence: ["block.recommended", "block.other"],
          preferences: {
            show_default_blocks: true
          },
        }
      },
      handler: this.paymentHandler.bind(this),
      modal: {
        ondismiss: () => {
          if (confirm("Are you sure you want to close the form?")) {
            console.log("Checkout form closed by the user");
          } else {
            console.log("Complete the Payment");
          }
        }
      }
    };



  }

  // Handle payment success
  paymentHandler(response: any) {
    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
  }


  // Open Razorpay checkout
  openCheckout() {
    const rzp = new Razorpay(this.options);
    rzp.open();
  }


}

