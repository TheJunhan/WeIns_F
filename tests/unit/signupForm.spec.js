import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import signupForm from "../../src/components/signupForm";


const localVue = createLocalVue();
localVue.use(ElementUI);

const axios = {
    get: async () => "success",
    post:async ()=>"success"
};

const $router = {
    push: jest.fn()
    // ... 其他属性
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

describe("init", () => {
    it("init state", () => {
        const wrapper = shallowMount(signupForm, {
            mocks: {
                axios,
                $router
            },
            localVue
        });

        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.errmessage).toEqual("");
        expect(wrapper.vm.registerForm).toEqual({
            phone    : '',
            name     : '',
            password : '',
            birthday : '',
            type     : 0, // 默认为普通用户
            sex      : -1, // 未知性别
            userMongo: {
                avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
            }
        });
    });
});

describe("test function",()=>{
    const wrapper = shallowMount(signupForm, {
        mocks: {
            axios,
            $router
        },
        localVue
    });
    it('test nonage',()=>{
        expect (wrapper.vm.nonage(new Date('2020-07-24'.replace(/-/g,"/")))).toEqual(false);
        expect (wrapper.vm.nonage(new Date('2006-07-17'.replace(/-/g,"/")))).toEqual(false);
        expect (wrapper.vm.nonage(new Date('2006-07-14'.replace(/-/g,"/")))).toEqual(true);
        expect (wrapper.vm.nonage(new Date('2006-06-14'.replace(/-/g,"/")))).toEqual(true);

        expect (wrapper.vm.nonage(new Date('2019-07-24'.replace(/-/g,"/")))).toEqual(false);
        expect (wrapper.vm.nonage(new Date('2002-07-24'.replace(/-/g,"/")))).toEqual(true);

    });
    it('test birth_format',()=>{
        expect (wrapper.vm.birth_format(new Date('2020-07-24'.replace(/-/g,"/")))).toEqual('2020-07-24');
        expect (wrapper.vm.birth_format(new Date('2002-07-02'.replace(/-/g,"/")))).toEqual('2002-07-02');
        expect (wrapper.vm.birth_format(new Date('2020-11-24'.replace(/-/g,"/")))).toEqual('2020-11-24');
    })

});

describe("test axios", async()=>{
    const wrapper = mount(signupForm, {
        mocks: {
            axios,
            $router
        },
        localVue
    });
    it("test sign up", ()=>{
        wrapper.setData({
            registerForm:{
                phone    : '18796700156',
                name     : 'aoyuche',
                password : '12345678',
                birthday : 'Tue Jul 05 2005',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        })
        expect(wrapper.vm.registerForm).toEqual({
            phone    : '18796700156',
            name     : 'aoyuche',
            password : '12345678',
            birthday : 'Tue Jul 05 2005',
            type     : 0, // 默认为普通用户
            sex      : -1, // 未知性别
            userMongo: {
                avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
            }
        });
        expect(wrapper.vm.register()).resolves.toBeTruthy();
        wrapper.setData({
            registerForm:{
                phone    : '18796700156',
                name     : 'aoyuche',
                password : '12345678',
                birthday : 'Tue Jul 05 2018',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("未满14周岁不能注册账户！");

        wrapper.setData({
            registerForm:{
                phone    : '187967001567',
                name     : 'aoyuche',
                password : '12345678',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("电话号码格式不正确!");

        wrapper.setData({
            registerForm:{
                phone    : '',
                name     : 'aoyuche',
                password : '12345678',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("电话号码不能为空!");

        wrapper.setData({
            registerForm:{
                phone    : '18796700152',
                name     : '',
                password : '12345678',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("用户名不能为空!");

        wrapper.setData({
            registerForm:{
                phone    : '18796700152',
                name     : 'dasdasdasdasdadsasd',
                password : '12345678',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("用户名长度须在 3 到 12 个字符!");

        wrapper.setData({
            registerForm:{
                phone    : '18796700152',
                name     : 'dasda',
                password : 'dddddddddddddddddddd',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("密码长度须在 6 到 16 个字符");


        wrapper.setData({
            registerForm:{
                phone    : '18796700152',
                name     : 'dasda',
                password : '',
                birthday : 'Tue Jul 05 2002',
                type     : 0, // 默认为普通用户
                sex      : -1, // 未知性别
                userMongo: {
                    avatar: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                }
            }
        });
        expect(wrapper.vm.register()).toEqual(false);
        expect(wrapper.vm.errmessage).toEqual("密码不能为空");




    })
})