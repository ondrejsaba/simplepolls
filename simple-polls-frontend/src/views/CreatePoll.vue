<template>
  <div id="create-poll">
    <Header />
    <NewPollForm />
  </div>
</template>

<script>
import NewPollForm from '@/components/NewPollForm.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'CreatePoll',
  components: {
    NewPollForm,
    Header
  }
}
</script>