let container = document.querySelector(".container");
let toggleBtn = document.querySelector(".toggle-box input");
let qrCodeGeneratorBox = container.querySelector(".qr-code-generator-box");
let qrCodeScannerBox = container.querySelector(".qr-code-scanner-box");
let userQrInput = qrCodeGeneratorBox.querySelector(".qr-code-input");
let generateBtn = qrCodeGeneratorBox.querySelector(".generator-btn");
let qrBox = qrCodeGeneratorBox.querySelector(".qr-code-box");
let qrCode = qrBox.querySelector(".qr-code img");
let qrScanValue = qrCodeScannerBox.querySelector(".qr-scan-value");
let copyBtn = qrCodeScannerBox.querySelector(".copy-btn");
let qrScanner = qrCodeScannerBox.querySelector("#preview");

// Initialize the scanner variable 
let scanner = null;

// Add Event Listener to the Generate Button 
generateBtn.addEventListener("click", () => {
    // check if the user input field is not empty 
    if(userQrInput.value != ""){

        // Display the QR code box 
        qrBox.style.display = "block";

        // Generate QR Code using the GoQR.me(QRserver) api 
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userQrInput.value}`;
        qrCode.src = url;
    }
    else{
        // Display an alert message if the input field is empty 
        alert("Please Enter text or url in the input field!")
    }
})


// Add event listener to the toggle button 
toggleBtn.addEventListener("click", () => {
    // checked if the toggle button is checked
    if(toggleBtn.checked == true){
        // Hide the QR Code generator box and Display QR code scanner box 
        qrCodeGeneratorBox.style.display ="none";
        qrCodeScannerBox.style.display = "block";

        // start the QR code scanner 
        startScan();
    }else{
        // Display the QR Code generator box and Hide QR code scanner box 
        qrCodeGeneratorBox.style.display ="block";
        qrCodeScannerBox.style.display = "none";

        // Check if the user field is empty 
        if(userQrInput.value == ""){
            // Hide the QR code box 
            qrBox.style.display = "none";
        }

        // Stop the QR code scanner 
        if(scanner !== ""){
            scanner.stop().then(() => {
                alert("Camera scanning has stopped!");
                qrScanner.srcObject = null; //Deactivate Camera
            })
        }
        qrCodeScannerBox.style.display = "none";
    }
})

// Define the startScan function to start the QR code scanner 
let startScan = () => {
    // Initialize the scanner object 
    scanner = new Instascan.Scanner({ 
         video: qrScanner,
         mirror: true,
         });

        //  Get the available Cameras 
         Instascan.Camera.getCameras().then(function (cameras){
            // check if there any camera length available 
            if(cameras.length > 0){
                // start the scanner with the first available camera 
                scanner.start(cameras[0]);
            } else{
                // Display an alert message if no camera found 
                alert('No Camera Found!');
            }
        }).catch(function (e){
             // Display an alert message if there is an error 
            alert(e);
       });
         

        //  Add event listener to the scanner handle scan results 
         scanner.addListener('scan', function (content){
            // Display the scan result in the scan value input field 
            qrScanValue.value = content;
         })
}

// Add event listener to the copy button 
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(qrScanValue.value);
})