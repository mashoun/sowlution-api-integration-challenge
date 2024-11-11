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
        this.index = ""
    }
    setIndex(i) {
        this.index = i
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
            // from: null,
            // to: null
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
                for (let i in this.products) {
                    this.products[i].index = `${i}`
                }

                // console.log(this.products);


            }).catch(err => {
                this.spinner = false
                console.log(err);
                this.status = false
            })
        },
        renderImg(obj = {}) {
            return obj.isBroken ? "https://placehold.co/400" : obj.image
        },

        dragMe(e, index) {
            console.log("i am being dragged: ", index);
            e.dataTransfer.setData('itemID', index)
        },

        dropMe(e, index) {
            console.log(e.dataTransfer.getData('itemID') + " is being dropped on :" + index);
            // this.from = parseInt(e.dataTransfer.getData('itemID'))
            // this.to = parseInt(index)
            // this.swipe(e.dataTransfer.getData('itemID'), index)
        },

        swipe(from, to) {
            // console.log(this.products[this.to].index);
            // console.log(typeof(from), typeof(to));
            // this.products[this.to].index = this.from
            // this.products[this.from].index = this.to

            // this.from = null
            // this.to = null

            // this.products[from].index = to
            // this.products[to].index = from

            // passing by reference?

            // console.log(this.products[from].index);
            // console.log(this.products[to].index);


            let arr = [...this.products].map(node => new Product(node))
            for (let i in arr) {
                arr[i].index = `${i}`
            }

            arr.at(from).setIndex(to)
            arr.at(to).setIndex(from)

            console.log(arr);

            this.products = arr.sort((from, to) => to - from)




        }


    },
    mounted() {
        this.readProducts()
    },
})

app.component('brand', {
    template: ` <div class="brand">
                <h4>{{title}}</h4>
            </div>`,
    props: ['title']

})

app.mount("#app")