let PRODUCTSNAMES = ['Shirt', 'Socks', 'Jacket', 'Shoes']
let PRICES = [100, 120, 400, 300]
let IDS = [0, 1, 2, 3]
let IMGS = ['', '', '', '']

class Catalog {
    constructor() {
        this.items = [];
        this.container = '.products';
        this.cart = null;
    }

    construct(cart) {
        this.cart = cart;
        this.init();
    }

    init() {
        this.handleData();
        this.render();
        this.handleEvents();
    }

    handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target);
            }
        })
    }

    handleData() {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push(this.createNewProduct(i));
        }
    }

    createNewProduct(index) {
        return {
            productname: PRODUCTSNAMES[index],
            price: PRICES[index],
            idproduct: IDS[index],
            img: IMGS[index]
        }
    }

    render() {
        let str = ''
        this.items.forEach(item => {
            str += `
                <div class="product-item">
                    <img src="https://placehold.it/300x200" alt="${item.productname}">
                    <!--img src="${item.img}" width="300" height="200" alt="${item.productname}"-->
                    <div class="desc">
                        <h1>${item.productname}</h1>
                        <p>${item.price}</p>
                        <button 
                        class="buy-btn" 
                        name="buy-btn"
                        data-name="${item.productname}"
                        data-price="${item.price}"
                        data-id="${item.idproduct}"
                        >Buy</button>
                    </div>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str;
    }
}


function renderPage() {
    const catalog = new Catalog();
    const cart = new Cart();

    catalog.construct(cart);
    cart.construct();
}

window.addEventListener('load', renderPage);


