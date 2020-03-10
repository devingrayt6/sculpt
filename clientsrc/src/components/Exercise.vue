<template>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button
          class="btn btn-link"
          type="button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >Exercise title</button>
      </h2>
    </div>

    <div
      id="collapseOne"
      class="collapse show"
      aria-labelledby="headingOne"
      data-parent="#accordionExample"
    >
      <div class="card-body">
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exercise",
  methods: {}
};
</script>

<style>
</style>