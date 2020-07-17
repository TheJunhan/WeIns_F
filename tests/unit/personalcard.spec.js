import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import personalcard from "../../src/components/personalcard";
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
    const wrapper = shallowMount(personalcard, {
        mocks: {
            axios
        },
        localVue
    });

    it("data",()=>{
        expect(wrapper.vm.signature).toEqual("");
        expect(wrapper.vm.user).toEqual({
            id: null,
            name: null,
            birthday: "1896-04-07",
            sex: null,
            reg_time: "2020-07-01",
            age: 14,
            email: 'se128@sjtu.edu.cn',
            phone:  "021-34200000",
            userMongo: {
                avatar:null
            }
        });
    })

})