var requestURL = 'https://raw.githubusercontent.com/DARKNESS-1/darkness.github.io/main/json.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    let jsonObj = request.response;
    let products = [];
    let totalPrice = 0;

    for (let product of jsonObj) {
        products.push(product);
    }

    function createProduct(name, price, ordered) {
        return {
            name: name,
            price: price,
            ordered: ordered
        }
    };
    products.forEach((product) => {
        createProduct(product);
    });

    console.log(products);
    products.forEach((product, index) => {
        let name = product.name;
        let price = product.price;
        let section = document.querySelector('.card-group-column');
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardPrice = document.createElement("p");
        let cardSumPrice = document.createElement("p");
        let cardFooter = document.createElement("div");
        let cardButtonMin = document.createElement("button");
        let cardOrder = document.createElement("div");
        let cardButtonMax = document.createElement("button");

        card.classList.add("card", "card_" + index);
        card.id = index;
        card.setAttribute("draggable", "true");
        card.setAttribute("ondragstart", "event.dataTransfer.setData(\'text/plain\',event.target.id");
        cardBody.classList.add("card_body");
        cardBody.textContent = name;
        cardPrice.textContent = "Price: " + price + "₴"
        cardSumPrice.id = "price_" + index;
        cardSumPrice.textContent = "Sum: - ";
        cardFooter.classList.add("card-footer");
        cardButtonMin.classList.add("btn", "btn-sm", "btn-success");
        cardButtonMin.id = "btn_min_" + index;
        cardButtonMin.setAttribute("type", "button");
        cardButtonMin.setAttribute("disabled", "disabled");
        cardButtonMin.textContent = "-";
        cardOrder.id = "order_" + index;
        cardOrder.textContent = "0";
        cardButtonMax.classList.add("btn", "btn-sm", "btn-success");
        cardButtonMax.id = "btn_max_" + index;
        cardButtonMax.textContent = "+";

        section.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardSumPrice);
        card.appendChild(cardFooter);
        cardFooter.appendChild(cardButtonMin);
        cardFooter.appendChild(cardOrder);
        cardFooter.appendChild(cardButtonMax);

        document.getElementById("btn_min_" + index).addEventListener("click", () => {
            totalOrders(-1, index);
        });
        document.getElementById("btn_max_" + index).addEventListener("click", () => {
            totalOrders(1, index);
        });
    });

    let totalOrders = (e, id) => {
        products.forEach((product, index) => {
            if (id == index) {
                product.ordered += e;
                document.querySelector("#order_" + id).innerHTML = `${product.ordered}`;
                let order = 0;
                order += ((product.ordered * product.price) * e) * e;
                document.querySelector("#price_" + id).innerHTML = `Sum: ${order}₴`;
                let elem = document.querySelector(".card_" + id);
                (elem.parentNode.id == "dropzone") ? totalPrice += product.price * e : false;
                (product.ordered > 0) ? document.querySelector("#btn_min_" + id).removeAttribute("disabled") : document.querySelector("#btn_min_" + id).setAttribute("disabled", "disabled");
                outTotal();
            };
        });
    };

    let totalSum = (e) => {
        products.forEach((product, index) => {
            (dragged.id == index && dragged.id !== undefined) ? totalPrice += (product.ordered * product.price) * e : false;
            outTotal();
        });
    };

    let outTotal = () => {
        document.querySelector("#totalPrice").innerHTML = `Total Price: ${totalPrice}₴`;
        (totalPrice >= 1000) ? document.querySelector("#isFreeShipping").innerHTML = `Free Shipping` : document.querySelector("#isFreeShipping").innerHTML = `Shipping`;
    }

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
}