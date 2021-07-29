<template>
  <div class="about container box is-dark">
    <h1 class="title is-1 is-family-sans-serif is-white">
      NUS Comics and Animation Society
    </h1>
    <figure class="image">
      <img class="image" src="../../src/assets/photo.jpg" />
    </figure>
    <p class="title is-4">
      The NUS Comics and Animation Society had its humble beginnings in 1999,
      when a small group of friends came together to create a space for fellow
      Japanese animation and comics enthusiasts to meet and interact. From a
      small club founded by animanga fans, we have grown into a society boasting
      more than 100 members, a dedicated committee and a strong alumni network.
      We aim to provide a platform that spreads the joy of Japanese anime and
      manga. Through our wide variety of related activities and events, members
      get to learn new skills and meet new friends. Such activities are usually
      held by our three departments; Palette, NUSCAST, and CASuals.
    </p>
    <p>Contact Information:</p>
    <p>Address</p>
    <p>Yusof Ishak House, Level 3</p>
    <p>31 Lower Kent Ridge Road</p>
    <p>119078</p>
    <p>Contact EmailE: nuscomicssoc@gmail.com</p>
  </div>
</template>



<script>

export default {
  name: "AboutPage",
  mounted() {
          document.title ="NUSCAS" + " | " + "About Us";
  }

};
</script>

<style scoped>

</style>