<template>
     <!-- <div id="bg"></div> -->
    <div>
        <el-container>
            <el-header>
                <b>
                    <h1 style="opacity: 0.8; font-family: 楷体;" class="header">雪山搜救--小目标识别 </h1>
                </b>
            </el-header>
            <el-main>
                <div class="choose">
                   <input type="file" style="font-family: 楷体; display: inline-block; align-self: center;" @change="handleFileChange" accept="image/*">
                </div>
                <div>
                    <el-row class="horizontal-row">
                        <el-col style="width: 400px; display: flex; align-items: center; justify-content: center;">
                            <el-card shadow="hover"
                                style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
                                <div v-if="selectedImage">

                                    <!--      显示图片     -->
                                    <img :src="selectedImage" alt="Selected Image"
                                        style="width: 300px; height: auto; max-height: 400px;" />
                                </div>
                            </el-card>
                        </el-col>
                        <el-col
                            style="width: 100px; height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
                            class="mb-4">
                          <el-row style="width: 100px; height: 30px; display: flex; align-items: center; justify-content: center;">
                            <el-button size="large" class="button" @click="buttonClick" style="font-family: 楷体;"
                                round>识别</el-button>
                          </el-row>
                          <el-row style="width: 100px; height: 60px; display: flex; align-items: center; justify-content: center;">
                                <img src= "src/assets/arrow55.png" alt="" style="opacity: 0.8; width: 100px; height: 50px;"/>
                          </el-row>
                        </el-col>

                        <el-col style="width: 400px; display: flex; align-items: center; justify-content: center;">
                            <el-card shadow="hover"
                                style="width: 400px; display: flex; align-items: center; justify-content: center;">
                                <img :src="codeUrl" style=" max-width: 300px; height: auto; max-height: 400px;" />
                            </el-card>
                        </el-col>

                        <el-col style=" width: 300px; height: 400px; display: flex; flex-direction: column; align-items: center; ">
                            <p class="data1" style="font-family: 楷体;">
                                经过识别，图片中
                            </p>
                            <p class="data1" style="font-family: 楷体;">
                               识别到人员总数：{{peoNum}}
                            </p>
                          <div style="width: 250px; height: 50px; display: flex; align-items: center; flex-direction: row;">
                            <el-col>
                              <p class="data2" style="font-family: 楷体;">
                                是否投放救生包:
                              </p>
                            </el-col>
                            <el-col>
                                <el-button size="large" class="button" @click="buttonClick" style="font-family: 楷体;"
                                round>投放</el-button>
                            </el-col>
                          </div>
                          <div style="width: 250px; height: 50px; display: flex; align-items: center; flex-direction: row;">
                            <el-col>
                              <p class="data2" style="font-family: 楷体;">
                                是否请求更多相关图片:
                              </p>
                            </el-col>
                            <el-col>
                                <el-button size="large" class="button" @click="buttonClick" style="font-family: 楷体;"
                                round>请求</el-button>
                            </el-col>
                          </div>

                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
    
<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
// import * as arrow from "video.js/dist/types/utils/mimetypes";

// 使用 ref 声明响应式变量
const selectedImage = ref(null);
const codeUrl = ref('');
const peoNum = ref();
var base64String =''
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // 使用 FileReader 读取文件并在加载完成后更新 selectedImage 值
        const reader = new FileReader();
        reader.onload = function () {
            selectedImage.value=reader.result
            base64String = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
    } else {
        selectedImage.value = null;
    }
};
const buttonClick = function () {
    // 将 base64String 发送给后端的 API
    axios.post('http://10.12.55.111:12345/predict', { image_base64: base64String })
        .then((response) => {
            console.log('上传成功', response);
            console.log(response.data)
            const data = 'data:image/png;base64,' + response.data.image_base64;
            codeUrl.value = data;
            peoNum.value = response.data.people_number;
        })
        .catch((error) => {
            console.error('上传失败', error);
        });
}

// xx
// const slider = document.getElementById("slider");
// slider.addEventListener("input", function(e) {
//   document.querySelector(".foreground-img").style.width =
//     e.target.value + "%";
// });



</script>


<style scoped lang="scss">
// @import "../assets/css/main.css";
.header {
    font-size: 70px;
    /* 你可以根据需要调整字体大小，单位可以是像素(px)、em等 */
}

.data1 {
    width: 250px;
    height: 50px;
    //background-color: rgb(255,255,255);
    //opacity:0.6;
}

.el-main {
    background-color: rgba(255, 255, 255, 0.7);
}

.button {
    font-size: 17px
}

.horizontal-row {
    display: flex;
    /* 使用 flex 布局来实现水平排列 */
    justify-content: space-between;
    /* 在 el-col 之间添加空白间隔 */
}

.choose{
    height: 40px;
    display: flex;
    justify-content: center; //水平布局
    align-items: center; //垂直居中
}

.el-header {
    height: 20vh;
    //background-color: rgb(255,255,255);
    //background-image: url("src/assets/SnowMountain(1).png");
    //opacity:0.9;
    //background-color: transparent;
    display: flex;
    justify-content: center; //水平布局 
    align-items: center; //垂直居中
}

.el-col {
    align-self: center;
}
</style>