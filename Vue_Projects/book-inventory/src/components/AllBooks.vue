<template>
  <div>
    <div class = "row btn-status" >
      <b-button class="btn btn-success" @click="getAllRead" role="button">Read</b-button>
      <b-button class="btn btn-success" @click="getCurrentlyReading" role="button">Reading</b-button>
      <b-button class="btn btn-success" @click.stop.prevent="getWishList" role="button">Wishlist</b-button>
    </div>
    <div class="table-container" v-if="listType === ''">
      <div class="row">
        <div class="col-xs-12 col-md-8">
          <h3 class="table-title">All Books</h3>
        </div>
      </div>
      <div class="row" :class = "['vertical-padding', 'header-class']">
        <div class="col">Title</div>
        <div class="col">Author</div>
        <div class="col">Status</div>
      </div>
      <template v-for="(book,i) in allBooks">
        <b-row :class="['row', 'table-row']" :key="book.title + i" >
          <b-checkbox @change="toggleBookSelection(book)"/>
          <div class="col-sm-4">{{book.title}}</div>
          <div class="col-sm-4">{{book.author}}</div>
          <div class="col-sm-4">{{book.status}}</div>
          <b-button class="btn btn-primary" v-if="book.status === 'wishlist'" @click="addToReading(book)">Start Reading</b-button>
          <b-button class="btn btn-primary" v-if="book.status === 'reading'" @click="addToRead(book)">Finished Reading</b-button>
        </b-row>
      </template>
    </div>
    <reading :listType="listType" :books="currentList" v-if="listType !== ''"></reading>
    <div>
      <a class="btn btn-primary" href="#" @click.stop.prevent="newBookModal" role="button">Add Book</a>
      <a class="btn btn-primary" href="#" @click.stop.prevent="removeBookFromInventory" role=button>Remove</a>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import NewBook from './NewBook'
import HelloWorld from './HelloWorld'
import Reading from './Reading'
// import Wishlist from './WishList'
// import Read from './Read'

export default {
  name: 'AllBooks',
  components: {
    'new-book': NewBook,
    'hello-world': HelloWorld,
    'reading': Reading
  },
  mounted () {
    this.getAllBooks()
  },
  data () {
    return {
      allBooks: [],
      selectedBooks: [],
      listType: '',
      currentlyReading: [],
      allRead: [],
      wishList: [],
      currentList: []
    }
  },
  methods: {
    getAllBooks () {
      axios.get('http://localhost:3000/books')
        .then((books) => {
          console.log(books.data)
          this.allBooks = books.data
        })
    },
    newBookModal () {
      this.$router.push({
        name: 'NewBook',
        params: {
          Totalbooks: this.allBooks.length
        }
      })
    },
    toggleBookSelection (book) {
      if (!this.selectedBooks.length || !this.selectedBooks.find(element => element === book)) {
        this.selectedBooks.push(book)
      } else {
        this.selectedBooks = this.selectedBooks.filter(item => item !== book)
      }
    },
    isBookSelected (book) {
      return this.selectedBooks.find(item => item === book)
    },
    removeBookFromInventory () {
      axios.delete(`http://localhost:3000/books/${this.selectedBooks[0].id}`)
        .then((response) => {
          this.allBooks = this.allBooks.filter(x => this.selectedBooks.find(y => y !== x))
        })
    },
    getCurrentlyReading () {
      this.listType = 'reading'
      this.currentlyReading = this.allBooks.filter(x => x.status === 'reading')
      this.currentList = this.currentlyReading
    },
    getAllRead () {
      this.listType = 'read'
      this.allRead = this.allBooks.filter(book => book.status === 'read')
      this.currentList = this.allRead
    },
    getWishList () {
      this.listType = 'wishlist'
      this.wishList = this.allBooks.filter(book => book.status === 'wishlist')
      this.currentList = this.wishList
    },
    addToReading (book) {
      this.book.status = 'reading'
    },
    addToRead (book) {
      this.book.status = 'read'
    }
  }
}
</script>
<style>
  .table-container {
    padding: 10px 20px;
  }
  .table-title {
    display: inline-block;
  }
  .vertical-padding {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .btn-status .btn-primary{
    padding: 5px 10px;
  }
  .header-class {
    background-color: lavender;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-indent: -10px;
    text-align: left;
  }
  .table-row {
    text-align: left;
    padding: 5px;
    border: solid lightslategray;
    border-top: .5px;
  }
  .btn-status {
    float: right;
    padding-right: 15px;
  }
</style>
