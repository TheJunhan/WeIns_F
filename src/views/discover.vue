<template>
    <div class="extern" style="width: 100%; background-color: #A7CFE8">
        <el-header>
            <Header></Header>
        </el-header>
        <el-container style="width: 100%; margin-bottom: 70px">
            <div class="category" style="width: 100%; margin: auto">
                <DIssue></DIssue>
            </div>
        </el-container>
        <el-footer>
            <Foot style="margin-top: 30px; text-align: center;"></Foot>
        </el-footer>
    </div>
</template>

<script>
    import Header from '../components/topnav';
    import Foot from '../components/footer';
    import DIssue from '../components/dissue';

    export default {
        components: { Header, Foot, DIssue }
    }
</script>
