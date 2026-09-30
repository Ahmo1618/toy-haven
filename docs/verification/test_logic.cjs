// Local logic checks. This is a lightweight DOM stub, NOT a browser or accessibility audit.
const fs = require('fs'); const vm = require('vm'); const assert = require('assert');
const base = require('path').resolve(__dirname, '../..') + '/';
const elements = new Map(); const storage = new Map(); let blocked = false;
class Element {
 constructor(){this.textContent='';this.innerHTML='';this.value='';this.minLength=-1;this.maxLength=-1;this.children=[];this.listeners={};this.attrs={};this.hidden=false;this.disabled=false;this.classList={add(){},remove(){},contains(){return false},toggle(){return true}};}
 addEventListener(k,f){this.listeners[k]=f} setAttribute(k,v){this.attrs[k]=v} getAttribute(k){return this.attrs[k]||null}
 appendChild(x){this.children.push(x)} append(...xs){this.children.push(...xs)} querySelector(s){if(!this.nodes)this.nodes={};return this.nodes[s]||(this.nodes[s]=new Element())} querySelectorAll(){return []} closest(){return this} focus(){} reset(){} showModal(){this.open=true} close(){this.open=false} getBoundingClientRect(){return {top:0}}
 checkValidity(){return this.value.length>0 && (!this.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value))}
}
const document={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id)},querySelector(){return new Element()},querySelectorAll(){return []},createElement(){return new Element()},addEventListener(){},hidden:false};
const ctx={console,document,localStorage:{getItem:k=>storage.get(k)||null,setItem(k,v){if(blocked)throw Error('blocked');storage.set(k,v)}},window:{matchMedia:()=>({matches:true}),addEventListener(){},isSecureContext:false,innerHeight:800,location:{search:''}},navigator:{},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},URLSearchParams,Date};
vm.createContext(ctx);function run(s){return vm.runInContext(s,ctx)};function load(f){run(fs.readFileSync(base+f,'utf8'))}
const results=[];function test(name,fn){try{fn();results.push({name,status:'PASS'})}catch(e){results.push({name,status:'FAIL',detail:e.message})}}
load('js/data.js');load('js/app.js');
test('Sixteen unique products across all four categories',()=>{assert.equal(run('products.length'),16);assert.equal(run('new Set(products.map(p=>p.id)).size'),16);assert.equal(run('new Set(products.map(p=>p.category)).size'),4)});
test('Missing storage returns empty list',()=>assert.equal(run('readList("missing").length'),0));
test('Malformed JSON returns empty list',()=>{storage.set('toyHaven.final.cart','{bad');assert.equal(run('getCart().length'),0)});
test('Non-array storage returns empty list',()=>{storage.set('toyHaven.final.cart','{}');assert.equal(run('getCart().length'),0)});
test('Cart rejects unknown IDs, zero, fractions and excessive quantities',()=>{storage.set('toyHaven.final.cart',JSON.stringify([{id:1,quantity:1},{id:999,quantity:1},{id:2,quantity:0},{id:3,quantity:1.5},{id:4,quantity:100}]));assert.equal(run('getCart().length'),1)});
test('Repeated add increments one record and cart badge',()=>{storage.clear();run('addToCart(1);addToCart(1);addToCart(3)');assert.equal(run('getCart().length'),2);assert.equal(document.getElementById('cartCount').textContent,3)});
test('Known arithmetic: two 4500 figures plus 2800 teddy equals 11800',()=>assert.equal(run('cartTotal(getCart())'),11800));
test('Quantity limit 99 is enforced when adding',()=>{run('saveList("cart",[{id:1,quantity:99}]);addToCart(1)');assert.equal(run('getCart()[0].quantity'),99)});
test('Unknown product cannot be added',()=>{run('addToCart(999)');assert.equal(run('getCart().length'),1)});
test('Wishlist prevents duplicate products',()=>{run('addToWishlist(2);addToWishlist(2)');assert.equal(run('getWishlist().length'),1)});
test('Wishlist rejects invalid status and unknown ID',()=>{run('saveList("wishlist",[{id:2,status:"Owned"},{id:3,status:"broken"},{id:999,status:"Owned"}])');assert.equal(run('getWishlist().length'),1)});
test('Blocked storage reports failure without successful update',()=>{blocked=true;assert.equal(run('saveList("cart",[])'),false);blocked=false;assert.equal(run('getCart().length'),1)});
test('Custom validation trims and rejects whitespace',()=>{const el=document.getElementById('test');el.value='   ';el.minLength=2;assert.equal(run('validateField("test","error","Invalid")'),false);assert.equal(el.attrs['aria-invalid'],'true')});
test('Custom validation enforces minimum trimmed length',()=>{document.getElementById('test').value=' A ';assert.equal(run('validateField("test","error","Invalid")'),false);document.getElementById('test').value=' Ahmed ';assert.equal(run('validateField("test","error","Invalid")'),true);assert.equal(document.getElementById('test').value,'Ahmed')});
test('Wishlist normalises known IDs and rejects unknown additions',()=>{run('saveList("wishlist",[]);addToWishlist("2");addToWishlist(2);addToWishlist(999)');assert.equal(run('readList("wishlist").length'),1);assert.equal(run('readList("wishlist")[0].id'),2)});
load('js/cart.js');
test('Minus at one removes the product',()=>{run('saveList("cart",[{id:1,quantity:1}]);changeQuantity(1,-1)');assert.equal(run('getCart().length'),0)});
test('Cart quantity changes recalculate totals',()=>{run('saveList("cart",[{id:1,quantity:1}]);changeQuantity(1,1)');assert.equal(run('cartTotal(getCart())'),9000)});
test('Clear cart empties storage and hides checkout',()=>{document.getElementById('clearCart').listeners.click();assert.equal(run('getCart().length'),0);assert.equal(document.getElementById('checkoutLink').hidden,true)});
document.getElementById('categoryFilter').value='all';load('js/products.js');
test('All products initially appear in result count',()=>assert.equal(document.getElementById('resultCount').textContent,'16 products found'));
test('Combined category plus case-insensitive trimmed search',()=>{document.getElementById('categoryFilter').value='Toys';document.getElementById('searchInput').value=' ROBOT ';run('displayProducts()');assert.equal(document.getElementById('resultCount').textContent,'1 products found')});
test('Search and category use AND, not OR',()=>{document.getElementById('categoryFilter').value='Diecast Cars';run('displayProducts()');assert.equal(document.getElementById('resultCount').textContent,'0 products found')});
test('Product modal selects requested product',()=>{run('viewProduct(7)');assert(document.getElementById('modalBody').innerHTML.includes('Crimson Roadster Model'));assert.equal(document.getElementById('productModal').open,true)});
test('Modal Close closes dialog',()=>{document.getElementById('modalClose').listeners.click();assert.equal(document.getElementById('productModal').open,false)});
load('js/checkout.js');
test('Checkout disabled with empty cart',()=>assert.equal(document.getElementById('placeOrder').disabled,true));
for(const id of ['customerName','customerEmail','customerAddress','paymentMethod'])document.getElementById(id).value='';
test('Blank checkout saves no order',()=>{document.getElementById('checkoutForm').listeners.submit({preventDefault(){}});assert.equal(run('readList("orders").length'),0)});
function fillCheckout(method){document.getElementById('customerName').value='Demo Student';document.getElementById('customerName').minLength=2;document.getElementById('customerEmail').value='demo@example.com';document.getElementById('customerEmail').email=true;document.getElementById('customerAddress').value='10 Sample Street, Colombo';document.getElementById('customerAddress').minLength=10;document.getElementById('paymentMethod').value=method;}
test('Valid Card simulation saves snapshot and clears cart',()=>{run('addToCart(1);addToCart(3)');fillCheckout('Card');document.getElementById('checkoutForm').listeners.submit({preventDefault(){}});assert.equal(run('readList("orders")[0].total'),7300);assert.equal(run('readList("orders")[0].items[0].name'),'Lunar Explorer Figure');assert.equal(run('getCart().length'),0);assert.equal(document.getElementById('successMessage').hidden,false)});
test('Empty-cart resubmission does not duplicate order',()=>{document.getElementById('checkoutForm').listeners.submit({preventDefault(){}});assert.equal(run('readList("orders").length'),1)});
test('Cash on Delivery simulation also saves selected method',()=>{run('addToCart(7)');fillCheckout('Cash on Delivery');document.getElementById('checkoutForm').listeners.submit({preventDefault(){}});assert.equal(run('readList("orders")[1].paymentMethod'),'Cash on Delivery')});
load('js/support.js');
test('Support stores valid feedback',()=>{for(const [id,v] of Object.entries({supportName:'Demo Student',supportEmail:'demo@example.com',supportMessage:'This is a fictional test message.'}))document.getElementById(id).value=v;document.getElementById('supportForm').listeners.submit({preventDefault(){}});assert.equal(run('readList("feedback").length'),1)});
test('Newsletter deduplicates case-normalised email',()=>{document.getElementById('newsletterEmail').value='Demo@Example.com';document.getElementById('newsletterForm').listeners.submit({preventDefault(){},target:new Element()});document.getElementById('newsletterEmail').value='demo@example.com';document.getElementById('newsletterForm').listeners.submit({preventDefault(){},target:new Element()});assert.equal(run('readList("newsletter").length'),1)});
load('js/index.js');
test('Daily product is an existing deterministic product',()=>{assert(run('products.includes(daily)'));assert.equal(run('daily.id'),run('products[dayNumber % products.length].id'))});
test('Carousel wraps from last slide to first',()=>{run('slideIndex=3');document.getElementById('nextSlide').listeners.click();assert.equal(document.getElementById('slideCount').textContent,'01 / 04')});
test('Carousel previous wraps to last slide',()=>{run('slideIndex=0');document.getElementById('previousSlide').listeners.click();assert.equal(document.getElementById('slideCount').textContent,'04 / 04')});
test('Exactly four products per category',()=>{assert(run("['Figurines','Toys','Board Games','Diecast Cars'].every(category => products.filter(product => product.category === category).length === 4)"))});
test('Each added product supports cart, wishlist and modal',()=>{run('saveList("cart",[]);saveList("wishlist",[])');for(let id=9;id<=16;id++){run('addToCart('+id+');addToWishlist('+id+');viewProduct('+id+')');assert(document.getElementById('modalBody').innerHTML.includes(run('getProduct('+id+').name')));}assert.equal(run('getCart().length'),8);assert.equal(run('getWishlist().length'),8);assert.equal(run('cartTotal(getCart())'),36300)});
test('Product references use three digits',()=>{assert.equal(run('productReference(1)'),'TH-001');assert.equal(run('productReference(16)'),'TH-016')});
fs.writeFileSync(require('path').join(__dirname,'logic-results.json'),JSON.stringify({environment:'Node VM with lightweight DOM and in-memory storage stubs; not a browser',results},null,2));console.log(JSON.stringify(results));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
