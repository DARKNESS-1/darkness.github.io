var requestURL = 'https://raw.githubusercontent.com/DARKNESS-1/darkness.github.io/main/json.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var products = request.response;
    // populateHeader(superHeroes);
    // showHeroes(superHeroes);
    console.log(products);

}

function createProduct(name, price) {
    return {
        name,
        price,
        ordered: 0,
        calculateOrder(e) {
            return this.ordered += e;
        },
        calculateTotal(e) {
            return (this.ordered * this.price) * e;
        },
        outTotal() {
            document.querySelector("#totalPrice").innerHTML = `Total Price: ${totalPrice}₴`;
        },
        isFreeShipping() {
            (totalPrice >= 1000) ? document.querySelector("#isFreeShipping").innerHTML = `Free Shipping` : document.querySelector("#isFreeShipping").innerHTML = `Shipping`;
        }
    };
};

    // products = [
    //     createProduct("Бумага офисная А4, 80 г/м2, 500 л", 280.25),
    //     createProduct("Биндеры для бумаги 51 мм", 56),
    //     createProduct("Ручка шариковая синяя", 12.5)
    // ];
console.log(products);
products.forEach((product, index, products) => {
    let name = product.name;
    let price = product.price;
    document.querySelector(".card-group-column").innerHTML += '<div class="card card_' + index + '" id="' + index + '" draggable="true" ondragstart="event.dataTransfer.setData(\'text/plain\',event.target.id)"><div class="card-body">' + name + '<br/>Price: ' + price + '₴<p id="price_' + index + '">Sum: -</p></div><div class="card-footer"><div><button class="btn btn-sm btn-success" id="btn_min_' + index + '" type="button" onclick="totalOrders(-1,' + index + ')" disabled="disabled">-</button><div id="order_' + index + '">0</div><button class="btn btn-success" id="btn_max_' + index + '" type="button" onclick="totalOrders(1,' + index + ')">+</button></div></div></div>';
});

let totalPrice = 0;
let totalOrders = (e, id) => {
    products.forEach((product, index, products) => {
        if (id == index) {
            product.calculateOrder(e);
            document.querySelector("#order_" + id).innerHTML = `${product.ordered}`;

            let order = 0;
            order += (product.calculateTotal(e) * e);
            document.querySelector("#price_" + id).innerHTML = `Sum: ${order}₴`;

            let elem = document.querySelector(".card_" + id);
            (elem.parentNode.id == "dropzone") ? totalPrice += product.price * e : false;

            (product.ordered > 0) ? document.querySelector("#btn_min_" + id).removeAttribute("disabled") : document.querySelector("#btn_min_" + id).setAttribute("disabled", "disabled");

            product.outTotal();
            product.isFreeShipping();
        }
    });
};

let totalSum = (e) => {
    products.forEach((product, index, products) => {
        (dragged.id == index && dragged.id !== undefined) ? totalPrice += product.calculateTotal(e) : false;
        product.outTotal();
        product.isFreeShipping();
    });
};

let dragged;
document.addEventListener("dragstart", (event) => {
    dragged = event.target;
    event.target.style.opacity = .5;
}, false);
document.addEventListener("dragend", (event) => {
    event.target.style.opacity = "";
}, false);
document.addEventListener("dragover", (event) => {
    event.preventDefault();
}, false);
document.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id == "dropzone") {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        totalSum(1);
    } else {
        dragged.parentNode.removeChild(dragged);
        document.querySelector(".card-group-column").appendChild(dragged);
        totalSum(-1);
    }
}, false);

var header = document.querySelector('header');
var section = document.querySelector('section');

var requestURL = 'https://raw.githubusercontent.com/DARKNESS-1/darkness.github.io/main/json.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];

    for (var i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        var superPowers = heroes[i].powers;
        for (var j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}