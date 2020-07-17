import share from "../../src/components/share";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
const localVue = createLocalVue();
localVue.use(ElementUI);

const axios = {
    get: async () => "success",
    post:async ()=> "success"


};
describe("init share", () => {
    const wrapper = shallowMount(share, {
        mocks: {
            axios
        },
        localVue
    });
    it("init state", () => {


        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.comment_to_flag).toEqual(false);

    });

    it("func",()=>{
        expect(wrapper.vm.submit()).toEqual(true);
    })
});