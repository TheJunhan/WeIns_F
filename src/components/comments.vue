<template>
    <div>
        <release_comment :bid="bid" :to_uid="to_uid" :to_username="to_username" @change="change"></release_comment>
        <div v-if="list.length > 0">
            <ul>
                <li v-for="comment in comments" :key="comment.cid">
                    <comment :data="comment"></comment>
                </li>
            </ul>
        </div>
        <div v-else style="width: 100%; background-color: #f2f2f5; text-align: center; height: 40px; font-size: 20px; color: darkgray; border-radius: 4px">
            <p style="margin-top: 10px">暂无评论...</p>
        </div>
    </div>
</template>

<script>
    import comment from "./comment";
    import release_comment from "./release_comment";

    export default {
        name: "comments",
        components: {
            comment, release_comment
        },
        props: {
            bid: Number,
            to_uid: Number,
            to_username: String,
            list: Array
        },
        data() {
            return {
                comments: [],
            }
        },
        created() {
            let tmp = JSON.parse(sessionStorage.getItem("comments"));
            console.log(tmp);

            // let tmp = this.$props.list;
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].to_uid === this.$props.to_uid)
                    this.comments.push(tmp[i]);
            }

            console.log(this.comments);
        },
        methods: {
            change() {
                this.$emit('change');
            }
        }
    }
</script>

<style scoped>

</style>
