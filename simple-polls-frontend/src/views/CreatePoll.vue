<template>
  <div id="create-poll">
    <NewPollForm
      @updateContentPosition="$emit('updateContentPosition')"
    />
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