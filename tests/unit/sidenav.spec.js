import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import sidenav from "../../src/components/sidenav";
const localVue = createLocalVue();
localVue.use(ElementUI);
/**
 * mock的axios
 * 可以根据需要添加其他函数功能
 */
const axios = {
    get: async () => "success",
    post:async ()=>"success"
};


describe("init",()=>{
    const wrapper=shallowMount(sidenav, {
        mocks: {
            axios,
        },
        localVue
    });


    it("data",()=>{
        const div=wrapper.find("#sidenav");
        expect(div.exists()).toBe(true);
        expect(wrapper.vm.select).toEqual(1);
    });



});

describe("clicked",async ()=>{
    const wrapper=mount(sidenav, {
        mocks: {
            axios,
        },
        localVue
    });
    const item1=wrapper.find("#1");
    const item3=wrapper.find("#3");
    const item5=wrapper.find("#5");


    it("exists",()=>{
        expect(item1.exists()).toBe(true);
        expect(item3.exists()).toBe(true);
        expect(item5.exists()).toBe(true);
    })

    it("click",async ()=>{
        await item3.trigger("click");
        expect(wrapper.vm.select).toEqual(3);
        expect(wrapper.vm.handleopen()).toBeCalled();

        await item5.trigger("click");
        expect(wrapper.vm.select).toEqual(5);
        expect(wrapper.vm.handleopen()).toBeCalled();

        await item1.trigger("click");
        expect(wrapper.vm.select).toEqual(1);
        expect(wrapper.vm.handleopen()).toBeCalled();
    });



})
describe("func2",()=>{
    const wrapper=shallowMount(sidenav, {
        mocks: {
            axios,
        },
        localVue
    });
    it("func",()=>{
        expect(wrapper.vm.handleopen(3,["3"])).toEqual(3);
        expect(wrapper.vm.select).toEqual(3);
        expect(wrapper.vm.handleopen(5,["5"])).toEqual(5);
        expect(wrapper.vm.select).toEqual(5);
        expect(wrapper.vm.handleopen(3,["3"])).toEqual(3);
        expect(wrapper.vm.select).toEqual(3);
    })
})
