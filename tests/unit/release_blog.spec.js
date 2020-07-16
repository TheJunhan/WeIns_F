import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import release_blog from "../../src/components/release_blog";


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


// const Mock=require('mockjs');
// Mock.mock('http://localhost:8088/user/reg',()=>{
//     return ({
//         data:"success"
//     })
//     }
// )

describe("init", async () => {
    const wrapper = shallowMount(release_blog, {
        mocks: {
            axios
        },
        localVue
    });
    it("init state", () => {


        /**
         * 检查data的初始状态
         */
        expect(wrapper.vm.Tags).toEqual(["交大","软院","菜鸡","瓜皮","东川路","东三区","小霸王","挂科小能手","ics太简单了"]);
        expect(wrapper.vm.oldtags).toEqual(["交大","软院","菜鸡","瓜皮","东川路","东三区","小霸王","挂科小能手","ics太简单了"]);
        expect(wrapper.vm.choosen_tags).toEqual([]);
        expect(wrapper.vm.filelist).toEqual([]);
        expect(wrapper.vm.state).toEqual('公开');
        expect(wrapper.vm.dialogVisible).toEqual(false);
        expect(wrapper.vm.uploaded).toEqual(false);
        expect(wrapper.vm.uploadmode).toEqual(false);
        expect(wrapper.vm.text).toEqual('');

    });

    it('created',  ()=>{
        expect(typeof release_blog.created).toBe('function');
        expect(wrapper.vm.init()).resolves.toBeTruthy();
        expect(wrapper.vm.$data.oldtags).toEqual(["交大","软院","菜鸡","瓜皮","东川路","东三区","小霸王","挂科小能手","ics太简单了"]);

    })

});

describe('function test',()=>{
    const wrapper = shallowMount(release_blog, {
        mocks: {
            axios
        },
        localVue
    });
    it('counter()',()=>{
        wrapper.setData({text:"2134"});
        expect(wrapper.vm.counter()).toEqual(4);
        wrapper.setData({text:"敖宇晨太帅了!"});
        expect(wrapper.vm.counter()).toEqual(7);
    })

    it('getfile()',()=>{
        expect(typeof release_blog.methods.getFile1).toBe('function');
        expect(typeof release_blog.methods.getFile2).toBe('function');
        expect(typeof release_blog.methods.getFile).toBe('function');

        wrapper.setData({
            lock:2,
            filelist:["1"],
        });
        expect(wrapper.vm.getFile2()).toEqual(false);
        wrapper.setData({
            lock:1,
            filelist:[],
        });
        expect(wrapper.vm.getFile2()).toEqual(false);
        wrapper.setData({
            lock:2,
            filelist:[],
        });
        expect(wrapper.vm.getFile1()).toEqual(false);
        wrapper.setData({
            lock:1,
            filelist:["1","2","3","4","5","6"],
        });
        expect(wrapper.vm.getFile1()).toEqual(false);




        wrapper.setData({
            lock:1,
            filelist:["1","2"],
            uploaded:true
        });
        expect(wrapper.vm.removefile(0)).toEqual(true);
        expect(wrapper.vm.lock).toEqual(1);
        expect(wrapper.vm.filelist).toEqual(["2"]);
        expect(wrapper.vm.uploaded).toEqual(true);

        expect(wrapper.vm.removefile(0)).toEqual(true);
        expect(wrapper.vm.lock).toEqual(0);
        expect(wrapper.vm.filelist).toEqual([]);
        expect(wrapper.vm.uploaded).toEqual(false);



    });
    it("functions about tags",()=>{
        expect(wrapper.vm.addTag(0)).toEqual(true);
        expect(wrapper.vm.choosen_tags).toEqual(["交大"]);
        expect(wrapper.vm.handleClose(0)).toEqual(true);
        expect(wrapper.vm.choosen_tags).toEqual([]);
        wrapper.setData({
            taginput:"东"
        })
        expect(wrapper.vm.searchtags()).toEqual(true);
        expect(wrapper.vm.Tags).toEqual(["东川路","东三区"]);

    });

    it("other function",()=>{
        expect(wrapper.vm.emoji()).toEqual(true);
        expect(wrapper.vm.uploadsuccess()).toEqual(true);
        expect(wrapper.vm.topic()).toEqual(true);
        expect(wrapper.vm.emoji()).toEqual(true);
        expect(wrapper.vm.handleCommand(0)).toEqual(0);
        expect(wrapper.vm.handleCommand(1)).toEqual(1);
        expect(wrapper.vm.handleCommand(2)).toEqual(2);
        expect(wrapper.vm.handleCommand(3)).toEqual(-1);

        wrapper.setData({
            uploadmode:false
        })
        expect(wrapper.vm.changemode()).toEqual(true);
        expect(wrapper.vm.uploadmode).toEqual(true);
        expect(wrapper.vm.changemode()).toEqual(true);
        expect(wrapper.vm.uploadmode).toEqual(false);
    })

})



// // data:image/jpeg;base64,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
