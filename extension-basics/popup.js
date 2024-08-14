console.log("This is a popup!");

let savedItems = [];

function saveToArray(str) {

    chrome.storage.local.get(['inputText']).then((result) => {
        let savedItems = result.inputText || [];

        savedItems.push(str);
        console.log(savedItems);

        chrome.storage.local.set({ 'inputText': savedItems }).then(() => {
            console.log("Value stored");
        });      

    });
    
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#button").addEventListener("click", function () {
        let inputText = document.querySelector("#input").value;
        console.log(inputText);

        saveToArray(inputText);
    })
})

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#get").addEventListener("click", function () {
        
        chrome.storage.local.get(['inputText']).then((result) => {
            console.log("Stored array : " + result.inputText);
        });

    })
})