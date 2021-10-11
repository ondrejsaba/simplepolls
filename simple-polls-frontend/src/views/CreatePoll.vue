<template>
  <div id="create-poll">
    <NewPollForm />
  </div>
</template>

<script>
import NewPollForm from '@/components/NewPollForm.vue'

export default {
  name: 'CreatePoll',
  components: {
    NewPollForm
  }
}
</script>