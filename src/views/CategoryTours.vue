<template>
  <div>
      {{this.category}}
  </div>
</template>


<script>
export default {
    props:{
        category:{
            type:String,
            required:true,
        }
    }
};
</script>

<style scoped>
</style>