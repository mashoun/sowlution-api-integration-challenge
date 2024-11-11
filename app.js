console.log('app.js is working');
class Product {
    constructor(payload = {}) {
        // never trust eno always there will gonna be an id or an image prop comming the api,
        // in this senario will consider that the type is always going to be a string
        // this way will be easier to add props and no crash will happen in the design 
        let props = ['id', 'category', 'description', 'image', 'price', 'rating', 'title']
        for (let node of props) {
            this[node] = payload[node] ? payload[node] : ""
            // this way iza shi property mana mawjoude empty string wont make any problems in the design
        }
        this.isBroken = false
    }
}
const app = Vue.createApp({
    data() {
        return {
            title: 'Platzi Store',
            api: 'https://fakestoreapi.com/products',
            spinner: false,
            products: [],
        }
    },
    methods: {
        readProducts() {
            let api = this.api
            this.spinner = true
            fetch(api).then(res => {
                if (res.status === 200 || res.status === 201) return res.json()
            }).then(res => {
                this.spinner = false
                this.products = res
                this.products.map(node => new Product(node))

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