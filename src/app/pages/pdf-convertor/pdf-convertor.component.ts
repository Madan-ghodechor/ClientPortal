import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-convertor',
  templateUrl: './pdf-convertor.component.html',
  styleUrl: './pdf-convertor.component.scss'
})
export class PdfConvertorComponent {

  constructor() { }
  downloadPDF() {
    const data = document.getElementById('pdf-content');
    const pdfWidth = 208; // PDF document width in mm (A4 size)
    const dpi = 300; // Simulating DPI (300 for better quality)
    const scaleFactor = dpi / 96; // 96 is the default screen DPI, so we scale accordingly
  
    if (data) {
      html2canvas(data, {
        scale: scaleFactor,  // Use scale factor to simulate high DPI
        useCORS: true, // If you're loading external images
        scrollX: 0,
        scrollY: 0
      }).then(canvas => {
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png', 1.0);  // Highest quality PNG
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        pdf.save('HighQualityPDF.pdf');
      });
    }
  }
  
  



}
