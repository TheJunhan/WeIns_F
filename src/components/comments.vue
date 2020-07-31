<template>
    <div>
        <release_comment :bid="bid" :to_uid="uid" @change="change"></release_comment>
        <div v-if="list.length > 0">
            <ul>
                <li v-for="comment in comments" :key="comment.cid">
                    <comment :data="comment" @change="change"></comment>
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
            uid: Number,
        },
        data() {
            return {
                comments: [],
                list: []
            }
        },
        created() {
            this.list = JSON.parse(sessionStorage.getItem("comments"));
            this.parseReplyRelation();
        },
        methods: {
            change() {
                this.$emit('fresh');
            },
            parseReplyRelation() {
                let tmp = this.list;
                for (let i = 0; i < tmp.length; ++i) {
                    if (tmp[i].to_cid === -1) {
                        this.comments.push(tmp[i]);
                    }
                }
            },
        }
    }
</script>
