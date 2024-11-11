console.log('app.js is working');

// this product class is used to prevent some fallbacks senarios like what if the api for some reason did not return the title property?
// this way i can always make sure eno the Product obj always gona have a the required props
class Product {
    constructor(payload = {}) {
        // this way will be easier to add props and no crash will happen in the design 
        let props = ['id', 'category', 'description', 'image', 'price', 'rating', 'title']
        for (let node of props) {
            this[node] = payload[node] ? payload[node] : ""
            // this way iza shi property mana mawjoude empty string wont make any problems in the design
        }
        // also 7atta law el url of image exists but also it might be broken!
        this.isBroken = false
    }
}
const app = Vue.createApp({
    data() {
        return {
            title: 'Platzi Store',
            api: 'https://fakestoreapi.com/products',
            // to spinn when it fetches the data
            spinner: false,
            // this rep the status of the api if it is working
            status: true,
            products: [],
        }
    },
    methods: {
        readProducts() {
            // we store it in a variable because sometimes in future iza bede a3mel query the main value wont be affected
            let api = this.api
            this.spinner = true
            fetch(api).then(res => res.json()).then(res => {
                this.spinner = false
                this.products = res
                this.products.map(node => new Product(node))

            }).catch(err => {
                this.spinner = false
                console.log(err);
                this.status = false
            })
        },
        renderImg(obj = {}) {
            return obj.isBroken ? "https://placehold.co/400" : obj.image
        },


    },
    mounted() {
        this.readProducts()
    }
})


app.mount("#app")