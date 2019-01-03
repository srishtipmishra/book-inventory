<template>
  <div class="table-container" v-if="listType !== ''">
      <div class="row">
        <div class="col-xs-12 col-md-8">
          <h3 class="table-title">{{listType}}</h3>
        </div>
      </div>
      <div class="row" :class = "['vertical-padding', 'header-class']">
        <div class="col">Title</div>
        <div class="col">Author</div>
        <div class="col">Status</div>
      </div>
      <template v-for="(book,i) in books">
        <b-row :class="['row', 'table-row']" :key="book.title + i" >
          <b-checkbox @change="toggleBookSelection(book)"/>
          <div class="col-4">{{book.title}}</div>
          <div class="col-4">{{book.author}}</div>
          <div class="col-4">{{book.status}}</div>
        </b-row>
      </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['listType', 'books']
}
</script>
<style>

</style>
