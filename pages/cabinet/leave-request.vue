<template>
  <div class="account__not-found">
    <svg xmlns="http://www.w3.org/2000/svg" width="50.922" height="42.435" viewBox="0 0 50.922 42.435"><g transform="translate(0 -2)"><path d="M45.618,44.435H5.3a5.31,5.31,0,0,1-5.3-5.3V24.278a1.062,1.062,0,0,1,.093-.435L8.515,5.13A5.318,5.318,0,0,1,13.352,2H37.57a5.318,5.318,0,0,1,4.838,3.13l8.421,18.714a1.062,1.062,0,0,1,.093.435V39.131a5.31,5.31,0,0,1-5.3,5.3Zm-43.5-19.93V39.131A3.187,3.187,0,0,0,5.3,42.313H45.618A3.187,3.187,0,0,0,48.8,39.131V24.505L40.472,6a3.192,3.192,0,0,0-2.9-1.876H13.352A3.191,3.191,0,0,0,10.45,6Z"/><path d="M35.38,22.609h-20.4A3.2,3.2,0,0,1,12,20.544L9.851,14.809a1.061,1.061,0,0,0-.993-.687H1.311a1.061,1.061,0,1,1,0-2.122H8.858a3.2,3.2,0,0,1,2.981,2.064L13.988,19.8a1.066,1.066,0,0,0,.993.687h20.4a1.061,1.061,0,0,0,.993-.687l2.149-5.735A3.2,3.2,0,0,1,41.5,12h8.077a1.061,1.061,0,0,1,0,2.122H41.5a1.061,1.061,0,0,0-.993.687l-2.149,5.735A3.2,3.2,0,0,1,35.38,22.609Z" transform="translate(0.28 11.217)"/></g></svg>
    <h4 class="account__not-found-text">
      <p>
        {{ $t('cabinet_request_message_1') }}
        <br>
        <a href="mailto:info@visit-shymkent.kz" style="font-size: 22px">info@visit-shymkent.kz</a>
        <br>
        {{$t('cabinet_request_message_2')}}
      </p>
    </h4>
  </div>
</template>

<script>
export default {
  name: "leave-request",
  layout: 'cabinet'
}
</script>

<style scoped>

</style>
