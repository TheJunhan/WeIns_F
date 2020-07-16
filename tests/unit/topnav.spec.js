import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import topnav from "../../src/components/topnav";


const localVue = createLocalVue();
localVue.use(ElementUI);

const axios = {
    get: async () => "success",
    post:async ()=>{return [{"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
        {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
        {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
        {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
        {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
        {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
        {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
        {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"}]}
};
const cb =()=>{
    return true;
}
/**
 * mock的axios
 * 可以根据需要添加其他函数功能
 */

// const Mock=require('mockjs');
// Mock.mock('http://localhost:8088/user/reg',()=>{
//     return ({
//         data:"success"
//     })
//     }
// )

describe("init", async () => {
    const wrapper = shallowMount(topnav, {
        mocks: {
            axios
        },
        localVue
    });
    it("init state", async () => {


        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.items).toEqual([
            {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
            {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
            {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
            {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
            {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
            {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
            {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
            {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"}
        ]);
        expect(wrapper.vm.dialogVisible).toEqual(false);
        expect(wrapper.vm.state).toEqual('');

    });


});

describe("test searchbar",()=>{
    const wrapper = shallowMount(topnav, {
        mocks: {
            axios,
            cb
        },
        localVue
    });
    it("test querySearchAsync",()=>{
        // wrapper.setData({state:"三"});
        // expect(wrapper.vm.querySearchAsync("三",cb)).toEqual([{"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"}]);

    })
})

