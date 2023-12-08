const clearBtn = document.getElementById("clearBtn");
const mainEgg = document.getElementById("mainEgg");
const eggCounter = document.getElementById("eggCounter");
const shop = document.getElementById("shop");
const eggsSecondDiv = document.getElementById("eggsSecondDiv");
const eggsClickDiv = document.getElementById("eggsClickDiv");
const errorMsg = document.getElementById("errorMsg");
let totalEPS = 1;
let totalEPC = 1;
let eggCount = 0;

const upgrades = [{
    name: "Bag of Feed",
    price: 10,
    increase: 1,
}, {
    name: "Ten Chickens",
    price: 100,
    increase: 10,
}, {
    name: "Chicken Coop",
    price: 500,
    increase: 50,
}, {
    name: "Chicken Farm",
    price: 1000,
    increase: 100,
}];

let purchasedItems = [];

function renderShop() {
    shop.innerHTML = "",
    upgrades.forEach( function (item) {
        const shopItem = document.createElement("div");
        shopItem.className = "shopItem"
        shop.appendChild(shopItem);
        const pName = document.createElement("p");
        pName.textContent = `${item.name}`;
        shopItem.appendChild(pName);
        const pPrice = document.createElement("p");
        pPrice.textContent = `${item.price}`;
        shopItem.appendChild(pPrice);
        const pInc = document.createElement("p");
        pInc.textContent = `${item.increase}`;
        shopItem.appendChild(pInc);

        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Buy";
        shopItem.appendChild(buyBtn);

        buyBtn.addEventListener("click", function() {
            if (eggCount >= item.price) {
                eggCount = eggCount - item.price;
                purchasedItems.push(item);
                save();   
            } else {
                errorMsg.textContent = `${"You don't have enough eggs yet...keep on clucking!!"}`
            }
        });
    })}


renderShop();

function game() {
    load()
    setInterval(function () {
        eggCount = eggCount +  eggsPerSecond();
        updateUI();    
        save();
        console.log(eggCount);
    }, 1000); 

}


function eggsPerSecond() {
    let total = 0
    if (purchasedItems.length == 0) {
        return 1}
    for (let i=0; i <= purchasedItems.length; i++) {
        console.log(purchasedItems[i])
    total = total + purchasedItems[i].increase
    }
    return total;
}
    

function eggsPerClick() {

}


// function addEgg() {
//     eggCount++;
// }

function updateUI() {
    eggCounter.textContent = eggCount;
    eggsSecondDiv.textContent = `${eggsPerSecond()} Eggs per second`;
    eggsClickDiv.textContent = `${totalEPC} Eggs per cluck`;
};

mainEgg.addEventListener("click", function () {
    eggCount = eggCount + 1
});

function clearCount() {
    eggCount = 0;
    localStorage.clear();
};

clearBtn.addEventListener("click", clearCount);

function save() {
    localStorage.setItem("eggCount", eggCount);
    const stringPurchasedItems = JSON.stringify(purchasedItems);
    localStorage.setItem("Purchases", stringPurchasedItems);
}

function load() {
    let storedEggCount = JSON.parse(localStorage.getItem("eggCount"));

    eggCount = storedEggCount;
    const localPurchasedItems = localStorage.getItem("Purchases");
    const parsedPurchasedItems = JSON.parse(localPurchasedItems);
    console.log(parsedPurchasedItems, ' from load function');
    purchasedItems = parsedPurchasedItems
}

game();


function reset() {
    cookies = 0;
    purchasedItems = []

}






















// document.addEventListener("DOMContentLoaded", (event) => {
//     intervalID = setInterval(startCount, 1000);
// });