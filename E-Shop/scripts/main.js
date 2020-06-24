class Main {
    constructor(container, url, btn) {
        this.items = [];
        this.container = container;
        this.url = url;
        this.API = 'https://raw.githubusercontent.com/MaiklTimofeev/E-Shop-API/master/';
        this.actBtn = btn;
        this._init();
        this.constructorObj = {
            Catalog: CatalogElement,
            Cart: CartElement
        }
    }
   
    construct(cart) {
        this.cart = cart;
    }

    _init() {
        this._handleData();
        this._handleEvents();
    }

    _fetchData() {
        return fetch(this.API + this.url)
            .then((response) => {
                response.json();
            })
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            let e = evt.target;
            if (e.name === 'buy-btn') {
                this.cart.plusProduct(e);
            } else if (e.name === 'del-btn') {
                this.deleteProduct(e);
            } else if (e.name === 'min-btn') {
                this.minusProduct(e);
            } else if (e.name === 'pls-btn') {
                this.plusProduct(e);
            }
        })
    }

    render() {
        let str = '';
        this.items.forEach(item => {
            str += new this.constructorObj[this.constructor.name](item).render();
        })
        document.querySelector(this.container).innerHTML = str;
        if (this.constructor.name === 'Cart') {
            this.quantityBlock.innerText = this.total;
            this.priceBlock.innerText = this.sum;
        }
    }
}

class Catalog extends Main {
    constructor(container, url, btn) {
        super(container = '.products', url = 'catalogData.json', btn = 'buy-btn');
    }

    _handleData() {
        fetch(this.API + this.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.items = data;
                this.render();
            })
            .catch(err => {alert(`${err}`)});
    }
}

class Cart extends Main {
    constructor(container, url, btn) {
        super(container = '.cart-items', url = 'cartData.json', btn = 'del-btn');
        this.total = 0;
        this.sum = 0;
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
        this._handleShowHideCart();
    }

    _handleData() {
        fetch(this.API + this.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.items = data;
                this._checkTotalAndSum();
                this.render();
            })
            .catch(err => {alert(`${err}`)});
    }

    _handleShowHideCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    addProduct(product) {
        let prod = this._createNewProduct(product);
        this.items.push(prod);
        this.checkAndRender();
    }

    deleteProduct(find) {
        this.items.splice(this.items.indexOf(find), 1);
        this.checkAndRender();
    }

    minusProduct(product) {
        console.log(`minus ${product.dataset['id']}`);
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product == id);
        if (find.quantity > 1) {
            find.quantity--;
            this.checkAndRender();
        } else {
            this.deleteProduct(find);
        }
    }

    plusProduct(product) {
        console.log(`plus ${product.dataset['id']}`);
        let id = product.dataset['id'];
        let find = this.items.find(product => product.id_product == id);
        if (find) {
            find.quantity++;
            this.checkAndRender();
        } else {
            this.addProduct(product);
        }

    }

    _createNewProduct(prod) {
        const {
            name,
            price,
            id
        } = prod.dataset;
        return {
            product_name: name,
            price: price,
            id_product: id,
            quantity: 1
        }
    }

    checkAndRender() {
        this._checkTotalAndSum();
        this.render();
    }

    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach(item => {
            qua += +item.quantity;
            pr += item.price * item.quantity;
        })
        this.total = qua;
        this.sum = pr;
    }
}

class PageElement {
    constructor(item) {
        this.item = item;
        this.img = 'https://placehold.it/300x200';
    }

    render() {
        const {
            product_name: name,
            price,
            id_product: id,
        } = this.item;
        return `
        <div class="product-item">
            <img src="https://placehold.it/300x200" alt="${name}">
            <!--img src="${this.img}" width="300" height="200" alt="${name}"-->
            <div class="desc">
                <h1>${name}</h1>
                <p>${price}</p>
                <button 
                class="buy-btn" 
                name="buy-btn"
                data-name="${name}"
                data-price="${price}"
                data-id="${id}"
                >Buy</button>
            </div>
        </div>
    `;
    }
}

class CatalogElement extends PageElement {
    constructor(item) {
        super(item);
    }
}

class CartElement extends PageElement {
    constructor(item) {
        super(item);
        this.item = item;
        this.img = 'https://placehold.it/100x80';
    }

    render() {
        const {
            product_name: name,
            price,
            id_product: id,
            quantity
        } = this.item;
        return `<div class="cart-item" data-id="${id}">
        <img src="${this.img}" alt="">
        <div class="product-desc">
            <p class="product-title">Product: ${name}</p>
            <p class="product-quantity">Quantity: ${quantity}</p>
            <p class="product-single-price">Price: ${price}</p>
        </div>
        <div class="right-block">
            <button name="min-btn" class="min-btn" data-id="${id}">-</button>
            <button name="pls-btn" class="pls-btn" data-id="${id}">+</button>
            <button name="del-btn" class="del-btn" data-id="${id}">x</button>
        </div>
    </div>`;
    }
}

function renderPage() {
    const catalog = new Catalog;
    const cart = new Cart;

    catalog.construct(cart);
}

window.addEventListener('load', renderPage);