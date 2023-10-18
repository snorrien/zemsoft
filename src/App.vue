<script>
import Message from './views/Message.vue'

export default {
  components: {
    Message
  },
}
</script>
<template>
  <router-view />
  <div v-if="this.$store.state.message" class="message_container">
    <Message />
  </div>
</template>