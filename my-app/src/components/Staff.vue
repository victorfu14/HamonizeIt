<template>
  <div id="staff">
    {{ content.toString() }}
  </div>
</template>

<script>
export default {
  name: 'Staff',
  props: {
    content: {
      type: Array
    }
  }
}
</script>

<style scoped>
</style>