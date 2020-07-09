<template>
    <div class="share">
        <div class="destination">
            转发到
        </div>
        <div class="quote">
            {{blog.content.text}}
        </div>
        <div class="comment">

        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
    export default {
        name: "shareForm",
        props: {
            blog: {

            }
        }
    }
</script>

<style scoped>
    .share {
        background-color: white;
    }
</style>
