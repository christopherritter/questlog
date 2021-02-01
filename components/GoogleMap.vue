<script>
const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Package: @nuxtjs/dotenv
export default {
  head() {
    return {
      script: [
        {src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      ]
    };
  },
  methods: {

  },
  mounted() {
    var input = this.$refs.searchTextField; //.getElementById('searchTextField');
    new google.maps.places.Autocomplete(input);
  },
  data() {
    return {};
  }
};

</script>
<template>
  <div>
<input class="input" ref="searchTextField" type="text">
  </div>
</template>
