<template>
  <h1>{{ quests[this.slug].title }}</h1>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  computed: {
    quests() {
      return this.$store.state.quests;
    }
  }
};
</script>
