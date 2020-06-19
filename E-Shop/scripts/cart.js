class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.container = '.cart-block';
        this.quantityBlock = document.querySelector('#quantity');
        this.priceBlock = document.querySelector('#price');
    }

    construct() {
        this.init();
    }

    init() {
        this.handleEvents();
    }

    handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target);
            }
        })
    }

    addProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find(product => product.idproduct === id);
        if (find) {
            find.quantity++;
        } else {
            let prod = this.createNewProduct(product);
            this.items.push(prod);
        }

        this.checkTotalAndSum();
        this.render();
    }

    createNewProduct(prod) {
        return {
            productname: prod.dataset['name'],
            price: prod.dataset['price'],
            idproduct: prod.dataset['id'],
            quantity: 1
        }
    }

    deleteProduct(product) {
        let id = product.dataset['id']
        let find = this.items.find(product => product.idproduct === id)
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }

        this.checkTotalAndSum();
        this.render();
    }

    checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach(item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        })
        this.total = qua;
        this.sum = pr;
    }

    render() {
        let itemsBlock = document.querySelector(this.container).querySelector('.cart-items');
        let str = '';
        this.items.forEach(item => {
            str += `<div class="cart-item" data-id="${item.idproduct}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">Product: ${item.productname}</p>
                        <p class="product-quantity">Quantity: ${item.quantity}</p>
                        <p class="product-single-price">Price: ${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.idproduct}">&times;</button>
                    </div>
                </div>`
        })
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
}