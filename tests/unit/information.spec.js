import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import information from "../../src/components/information";


const localVue = createLocalVue();
localVue.use(ElementUI);

const axios = {
    get: async () => "success",
    post:async ()=> "success"


};



describe("init",()=>{
    const wrapper = shallowMount(information, {
        mocks: {
            axios
        },
        localVue
    });

    it("data",()=>{
        expect(wrapper.vm.basic_flag).toEqual(false);
        expect(wrapper.vm.contact_flag).toEqual(false);
        expect(wrapper.vm.sexStr).toEqual("未知");

        expect(wrapper.vm.user).toEqual({
            id: null,
            name: null,
            birthday: '2002-03-03',
            sex: null,
            reg_time: null,
            email: 'se128@sjtu.edu.cn',
            phone: null,
            userMongo: {

            }
        });
    })



})

describe('function',()=>{
    const wrapper = shallowMount(information, {
        mocks: {
            axios
        },
        localVue
    });


    it("func",()=>{

        //sex()
        wrapper.setData({
            user:{
                id: null,
                name: null,
                birthday: '2002-03-03',
                sex: "1",
                reg_time: null,
                email: 'se128@sjtu.edu.cn',
                phone: null,
                userMongo: {

                }
    }});
        expect(wrapper.vm.sex()).toEqual("男");

        wrapper.setData({
            user:{
                id: null,
                name: null,
                birthday: '2002-03-03',
                sex: "0",
                reg_time: null,
                email: 'se128@sjtu.edu.cn',
                phone: null,
                userMongo: {

                }
            }});
        expect(wrapper.vm.sex()).toEqual("女");

        wrapper.setData({
            user:{
                id: null,
                name: null,
                birthday: "2002-03-03",
                sex: "3",
                reg_time: null,
                email: 'se128@sjtu.edu.cn',
                phone: null,
                userMongo: {

                }
            }});
        expect(wrapper.vm.sex()).toEqual("未知");

    });

    it("other",async ()=>{
        //sexStrToNum()
        wrapper.setData({
            sexStr:"男"
        })
        expect(wrapper.vm.sexStrToNum()).toEqual(true);
        expect(wrapper.vm.user.sex).toEqual("1");
        wrapper.setData({
            sexStr:"ayc"
        })
        expect(wrapper.vm.sexStrToNum()).toEqual(false);
        expect(wrapper.vm.user.sex).toEqual("-1");

        wrapper.setData({
            sexStr:"女"
        })
        expect(wrapper.vm.sexStrToNum()).toEqual(true);
        expect(wrapper.vm.user.sex).toEqual("0");

//age()

        wrapper.setData({
            user:{
                id: null,
                name: null,
                birthday: "2002-03-03",
                sex: 0,
                reg_time: null,
                email: 'se128@sjtu.edu.cn',
                phone: null,
                userMongo: {
                    avatar:null
                }
            }});

        // expect(wrapper.vm.user.birthday).toEqual( "2002-03-03");
        // expect(wrapper.vm.age()).toEqual(18);



        //basic()
        expect(wrapper.vm.basic()).toEqual(true);
        expect(wrapper.vm.basic_flag).toEqual(true);
        expect(wrapper.vm.basic()).toEqual(false);
        expect(wrapper.vm.basic_flag).toEqual(false);


        //contact()
        expect(wrapper.vm.contact()).toEqual(true);
        expect(wrapper.vm.contact_flag).toEqual(true);
        expect(wrapper.vm.contact()).toEqual(false);
        expect(wrapper.vm.contact_flag).toEqual(false);

        //sessionupdate()
        expect(wrapper.vm.sessionUpdate()).toEqual(true);
    })

})

describe("axios",async ()=>{
    const wrapper = shallowMount(information, {
        mocks: {
            axios
        },
        localVue
    });
    it("axios",async ()=>{
        expect(wrapper.vm.update()).resolves.toBeTruthy();

    })
})