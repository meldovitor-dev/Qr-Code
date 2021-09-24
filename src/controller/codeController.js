const qrCode = require('qrcode');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');



function gerateUrl() {

    const url = "https://www.youtube.com/";
    return url;

}

async function generateQr() {

    var url = gerateUrl();
    if (!url) return false;

    const options = { margin: 7, width: 175 };

    const buffer = await qrCode.toDataURL(url, options);

    return buffer;

}

async function generatorPDF(req, res) {

    console.log("1")
    const pdf = req.file.buffer
    const qr = await generateQr();
    const qrImg = qr.split(';base64,').pop();

    const pdfDoc = await PDFDocument.load(pdf);
    const img = await pdfDoc.embedPng(qrImg);

    const imagePage = pdfDoc.getPage(0);

    let xx = imagePage.getWidth()
    let yy = imagePage.getHeight()

    imagePage.drawImage(img, {
        x: xx - 70,
        y: yy - 70,
        width: 70,
        height: 70
    });

    const pdfBytes = await pdfDoc.save();

    //fs.writeFileSync(req.file.originalname, pdfBytes);
    
    return res.status(200).send(pdfBytes);

}

module.exports = { generateQr, generatorPDF }
