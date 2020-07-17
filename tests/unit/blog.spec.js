import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import blog from "../../src/components/blog";
import image from '../../src/assets/image/poster_1.png';
import image2 from '../../src/assets/image/poster_2.png';
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






describe("init blog", async () => {
    const wrapper = mount(blog, {
        mocks: {
            axios,
        },
        localVue
    });

    it("init state",   () => {

        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.blog).toEqual( {
            id: 0,
            user: {
                name: '交通大学',
                avatar: {
                    // default avatar, must be iconBase64 mode
                    iconBase64: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                }
            },
            time: '2020-07-09 21:57',
            content: {
                text: '大家好,我是上海交通大学软件学院的最咸的咸鱼！不会有人比我还菜吧，不会吧不会吧！项目做得太差劲了！哭哭!',
                images: [{
                    image: image
                }, {
                    image: image2
                }, {
                    image: image2
                }, {
                    image: image2
                }, {
                    image: image
                }]
            },
            like: 1453,
            like_flag: false,
            collect: 253,
            collect_flag: false,
            share: 424,
            share_flag: false,
            comment: {
                count: 3214,
            },
            comment_flag: false
        });

        expect(wrapper.vm.dialogVisible).toEqual(false);
        expect(wrapper.vm.showpic).toEqual("");
    });

});

describe('test function',async()=>{
    const wrapper = shallowMount(blog, {
        mocks: {
            axios,
        },
        localVue
    });

    it("test simple func",async ()=>{
        //generete()
        expect(wrapper.vm.generate()).resolves.toBeTruthy();


        //share()
        expect(wrapper.vm.share()).toEqual(true);
        expect(wrapper.vm.blog.share_flag).toEqual(true);


        //change()
        expect(wrapper.vm.change()).toEqual(true);
        expect(wrapper.vm.blog.share_flag).toEqual(false);

        //collect()
        expect(wrapper.vm.collect()).toEqual(true);
        expect(wrapper.vm.blog.collect_flag).toEqual(true);
        expect(wrapper.vm.blog.collect).toEqual(254);
        expect(wrapper.vm.collect()).toEqual(false);
        expect(wrapper.vm.blog.collect_flag).toEqual(false);
        expect(wrapper.vm.blog.collect).toEqual(253);


        //like()
        expect(wrapper.vm.like()).toEqual(true);
        expect(wrapper.vm.blog.like_flag).toEqual(true);
        expect(wrapper.vm.blog.like).toEqual(1454);
        expect(wrapper.vm.like()).toEqual(false);
        expect(wrapper.vm.blog.like_flag).toEqual(false);
        expect(wrapper.vm.blog.like).toEqual(1453);



        //maiPic()
        expect(wrapper.vm.showpic).toEqual("");
        expect(wrapper.vm.maxPic({image:image})).toEqual(true);
        expect(wrapper.vm.showpic).toEqual(image);


        //coment()
        expect(wrapper.vm.comment()).toEqual(true);

    })


})
