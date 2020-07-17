import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import issue from "../../src/components/issue";


const localVue = createLocalVue();
localVue.use(ElementUI);

const axios = {
    get: async () => "success",
    post:async ()=> "success"


};

/**
 * mock的axios
 * 可以根据需要添加其他函数功能
 */




describe("init", async () => {
    const wrapper = shallowMount(issue, {
        mocks: {
            axios,
        },
        localVue
    });
    it("init state", async () => {

        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.issue).toEqual('');
    });



});

