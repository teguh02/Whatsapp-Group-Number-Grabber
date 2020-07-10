$(document).ready(function () {
    $('#openWaWeb').click(function (e) { 
        e.preventDefault();
        window.open('https://web.whatsapp.com/')
    });

    $('#getNumber').click(function (e) { 
        e.preventDefault();

        // Mendapatkan URL saat ini

        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;

            // Mendeteksi halaman harus di web whatsapp
            if(url.indexOf("web.whatsapp.com") >= 0) {
                chrome.tabs.executeScript(null, {file: 'jquery.js'}, function(result){
                    chrome.tabs.executeScript(null, 
                        {
                            code:   `
                                        var result = $('#main header span').text()

                                        var blob = new Blob([result], { type: "text/plain;charset=utf-8" });
                                        saveAs(blob, "Ekspor Kontak Whatsapp.txt");
                                    `
                        }
                    );
                });
            } else {
                // Jika halaman saat ini bukan di halaman web whatsapp
                chrome.tabs.executeScript(null, 
                    {
                        code:   `  alert('Halaman yang kamu buka, bukan halaman whatsapp web!'); 
                                `
                    }
                );
            }
        });

        

    });

    // 
});