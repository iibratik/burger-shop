const product = {
    plainBurger:{
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ(){
            return this.price * this.amount
        },
        get Kcall(){
            return this.amount * this.kcall
        }
    },
    freshBurger:{
      name:  'Гамбургер FRESH',
    price: 20500,
    kcall: 600,
    amount: 0,
    get Summ(){
        return this.price * this.amount
    },
    get Kcall(){
        return this.amount * this.kcall
    }
},freshCombo:{
      name:  'FRESH combo',
    price: 31900,
    kcall: 900,
    amount: 0,
    get Summ(){
        return this.price * this.amount
    },
    get Kcall(){
        return this.amount * this.kcall
    }
}
}

const extraProducts = {
    doubleMayonnaise:{
        name:'двойной майонез',
        price:2000,
        kcall: 50
        
    },
    lettuce:{
        name:'Салатный лист',
        price:1000,
        kcall: 5
    },
    cheese:{
        name:'Сыр',
        price:3000,
        kcall: 60
    },
}


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
addCart          = document.querySelector('.addCart'),
receipt          = document.querySelector('.receipt'),
receiptOut       = document.querySelector('.receipt__window-out'),
receipt__window  = document.querySelector('.receipt__window'),
btnReceipt       = document.querySelector('.receipt__window-btn'),
timerHeader      = document.querySelector('.header__timer-extra'),
btnImg           = document.querySelectorAll('.img-none');
let timerCount   = 0;
let burgerCount  = 0;


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function(){
        plusOrMinus(this);
    })
    
}
    function plusOrMinus(btn) {
        const parent   = btn.closest('.main__product'),
              parentId = parent.getAttribute('id'),
              out      = parent.querySelector('.main__product-num'),
              price    = parent.querySelector('.main__product-price span'),
              kcall    = parent.querySelector('.main__product-call span'),
              symbol   = btn.getAttribute('data-symbol');
        if (symbol == "+" && product[parentId].amount < 10) {
            product[parentId].amount++
      
        }else if (symbol == "-" && product[parentId].amount > 0) {
            product[parentId].amount--
        }
        out.innerHTML = product[parentId].amount;
        burgerCount = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
        
    }
    for (let i = 0; i < checkExtraProduct.length; i++) {
        checkExtraProduct[i].addEventListener('click', function () {
            addExtraProduct(this);
        })
    }
    function addExtraProduct(check) {
        const parent   = check.closest('.main__product'),
              parentId = parent.getAttribute('id'),
              price    = parent.querySelector('.main__product-price span'),
              kcall    = parent.querySelector('.main__product-call span'),
              extraSymbol   = check.getAttribute('data-extra');
              product[parentId][extraSymbol] = check.checked
              if (product[parentId][extraSymbol] == true) {
                  product[parentId].kcall += extraProducts[extraSymbol].kcall
                  product[parentId].price += extraProducts[extraSymbol].price
                  
                } else{
                    product[parentId].kcall -= extraProducts[extraSymbol].kcall
                    product[parentId].price -= extraProducts[extraSymbol].price
              }
              kcall.innerHTML = product[parentId].Kcall
              price.innerHTML = product[parentId].Summ
              
    }

function timer() {
    timerCount++
    timerHeader.innerHTML = timerCount; 
    let interval = setTimeout(timer, timerCount * 2);
    if (timerCount == 100){
    clearTimeout(interval);            
    }
}

timer();

let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0,
    totalCount = 0;

    addCart.addEventListener('click', ()=>{
        for (const key in product) {
            const pk = product[key];
            if (pk.amount > 0) {
                arrayProduct.push(pk);
            }
            for (const info in pk) {
               if (pk[info] === true) {
                   pk.name += '\n' + extraProducts[info].name;
                }
            }
            pk.price = pk.Summ;
            pk.kcall = pk.Kcall;
        }
        for (let i = 0; i < arrayProduct.length; i++) {
            const elem = arrayProduct[i];
            totalPrice += elem.price;
            totalKcall += elem.Kcall;
            totalCount  = elem.amount;
            totalName += "\n" + elem.name + ` X ${totalCount}` + '\n' ;
        }

        receiptOut.innerHTML = `Your bought : \n ${totalName} \n \n Kcall value: ${totalKcall} \n Cost: ${totalPrice} summ `
        receipt.style.display = 'flex';
        setTimeout(() => {
            receipt.style.opacity = '1';
            receipt.style.backdropFilter = "blur(10px)"
        }, 90);
        setTimeout(() => {
            receipt__window.style.top = "0"
        }, 100);
        document.body.style.overflow = "hidden"

    })
    btnReceipt.addEventListener('click', () => {
            location.reload()
    })