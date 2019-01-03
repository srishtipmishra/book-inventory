<template>
  <b-modal :visible="modal" @hide="closeModal">
    <div slot="modal-title">Add New Book</div>
    <b-container fluid>
      <b-row class= "form-input">
        <div class="col-3"><label>Title</label></div>
        <div class="col-9"><b-form-input v-model="bookTitle"></b-form-input></div>
      </b-row>
      <b-row class= "form-input">
        <div class="col-3"><label>Author</label></div>
        <div class="col-9"><b-form-input v-model="bookAuthor"></b-form-input></div>
      </b-row>
      <b-row class= "form-input">
        <div class="col-3"><label>Url</label></div>
        <div class="col-9"><b-form-input v-model="bookUrl"></b-form-input></div>
      </b-row>
      <button type="button" class="btn btn-primary btn-sm" @click="addBook">Add Book</button>
    </b-container>
    <div slot="modal-footer"></div>
  </b-modal>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      modal: true,
      bookTitle: '',
      bookAuthor: '',
      bookUrl: ''
    }
  },
  methods: {
    closeModal () {
      this.$router.go(-1)
    },
    addBook () {
      axios.post('http://localhost:3000/books', {
        id: this.uuid(),
        title: this.bookTitle,
        author: this.bookAuthor,
        url: this.bookUrl,
        status: 'wishlist'
      })
    },
    uuid () {
      return crypto.getRandomValues(new Uint32Array(4)).join('-')
    }
  }
}
</script>
<style>
.form-input {
  padding-bottom: 10px;
}
</style>
