<template>
    <div>
        <div class="logo">
            <img class="logo img" src='../assets/image/logo.png' alt="logo picture" />
        </div>
        <div class="searchbar">
            <Searchbar></Searchbar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Topnav"
    }
</script>


<style scoped>
 .logo{
     width: 100%;
     height:50px;
     position: fixed;
     background-color: red;
     float: left;
     margin:0;
     padding: 0;

 }
 .logo .img{

        width: 50px;
    }
 body{
     margin:0;
     padding:0;
 }
</style>
