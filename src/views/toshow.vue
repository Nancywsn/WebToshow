<template>
    <div id="wrapper">
        <el-container>
            <el-header>
              <el-col :span="16">
                <b>
                    <h1 class="header">雪山搜救--小目标识别 </h1>
                </b>
              </el-col>
              <el-col :span="8">
                <div class="choose">
                     <input type="file" style="font-family: 楷体; display: inline-block; align-self: center;" @change="handleFileChange" accept="image/*">
                </div>
              </el-col>

            </el-header>
            <el-main>
                <el-row class="horizontal-row2">
                  <el-col :span="8">
                    <div class="jianxie">
                      <p class="display">输 入 图 片
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                  </el-col>
                  <el-col :span="7">
                    <div  class="jianxie">
                    <p class="display">     输 出 图 片
                    </p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="jianxie" style="width: 140px;">
                    <p class="display">     识 别 数 据
                    </p>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="main">
                    <el-col :span="8" class="picture">
                        <el-card shadow="hover"
                            style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
                            <div v-if="selectedImage">

                                <!--      显示图片     -->
                                <img :src="selectedImage" alt="Selected Image"
                                    style="width: 300px; height: auto; max-height: 400px;" />
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="2" style="height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;"
                        class="mb-4">
                      <el-row
                          style=" height: 30px; display: flex; align-items: center; justify-content: center;">
                          <el-button size="large" class="button" @click="buttonClick" style="font-family: 楷体;"
                             round>识别</el-button>
                      </el-row>
                      <el-row style="height: 60px; display: flex; align-items: center; justify-content: center;">
                            <img src= "src/assets/arrow55.png" alt="" style="opacity: 0.8; width: 100px; height: 50px;"/>
                      </el-row>
                    </el-col>

                    <el-col :span="8" class="picture">
                        <el-card shadow="hover"
                            style="display: flex; align-items: center; justify-content: center;">
                            <img :src="codeUrl" style=" max-width: 300px; height: auto; max-height: 400px;" />
                        </el-card>
                    </el-col>

                    <el-col :span="6" style="height: 300px; display: flex; flex-direction: column;">
                        <p class="data1" style="font-family: 楷体;">
                            经过识别，图片中
                        </p>
                        <p class="data1" style="font-family: 楷体;">
                           识别到人员总数：{{peoNum}}
                        </p>
                      <div style="height: 60px; display: flex; flex-direction: row;">
                        <el-col :span="13">
                          <p class="data1" style="font-family: 楷体;">
                            是否投放救生包:
                          </p>
                        </el-col>
                        <el-col :span="3">
                            <el-button size="large" class="button" @click="buttonClick_1" style="font-family: 楷体; justify-content: center;"
                            round>投放</el-button>
                        </el-col>
                      </div>
                      <div style="height: 60px; display: flex; flex-direction: row;">
                        <el-col :span="16">
                          <p class="data1" style="font-family: 楷体;">是否请求更多相关图片:
                          </p>
                        </el-col>
                        <el-col :span="3">
                            <el-button size="large" class="button" @click="buttonClick_2" style="font-family: 楷体; justify-content: center;"
                            round>请求</el-button>
                        </el-col>
                      </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <div id="bg" style="height: 27%;"></div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { $msg_s, $msg_e, $confirm } from '../utils/msg.js'

// 使用 ref 声明响应式变量
const selectedImage = ref(null);
const codeUrl = ref('');
const peoNum = ref();
var base64String = ''
console.log('script');

const handleFileChange = (event) => {
    console.log('handleFileChange');

    const file = event.target.files[0];
    if (file) {
        // 使用 FileReader 读取文件并在加载完成后更新 selectedImage 值
        const reader = new FileReader();
        reader.onload = function () {
            selectedImage.value = reader.result
            base64String = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
        console.log('selectedImage');
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

const buttonClick_1 = function () {
    console.log('buttonClick_1')
    $confirm('确定投放救生包？')
        .then(() => {
            // 用户点击了确定按钮
            $msg_s('已投放救生包')
        })
        .catch(() => {
            $msg_e('取消投放')
            // 用户点击了取消按钮，什么都不做
        });
}
const buttonClick_2 = function () {
    console.log('buttonClick_2')
    $confirm('是否请求更多相关图片？')
        .then(() => {
            $msg_s('请求更多相关图片')
        })
        .catch(() => {
            $msg_e('取消申请')
        });
}
</script>
  
<style lang="scss" scoped>
@import "../assets/css/main.css";

h1 {
    color: white;
}

p {
    color: white;
}

.el-link {
    color: white;
}

.header {
    opacity: 0.9;
    font-family: 楷体;
    text-align: center;
    position:relative;
  bottom: 0;
    //align-items: flex-end;
    font-size: 40px;
    text-shadow: 5px 5px 5px gray;
    /* 你可以根据需要调整字体大小，单位可以是像素(px)、em等 */
}

.data1 {
    width: 250px;
    height: 50px;
    text-shadow: 2px 2px 3px gray;
    justify-content: center;
    //background-color: rgb(255,255,255);
    //opacity:0.6;
}

.main {
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  //height: 400px;
}

.display{
  display:flex;
  font-size: 20px;
  //position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 30px;
  font-family: 楷体;

  text-shadow: 3px 3px 5px gray;

}

.jianxie {
  height: 30px;
  width: 160px;
  background-color: rgba(255, 255, 255, 0.4);
  border-left-color: white;
  border-right-color: white;
  border-top-color: white;
  border-width: 1px; /* 设置边框宽度 */
  border-style: solid; /* 设置边框样式 */

  /* 简写四个字表示左上角、右上角、右下角、左下角 */
  /* border-radius: 10px 20px 30px 40px; */
  /* 简写两个值，第一个表示左上角、右下角，第二个值不表示右上角、左下角； */
  /* border-radius: 10px 40px; */
  /* 简写三个值，第一个值表示左上角，第二个值表示右上角、左下角，第三个值表示右下角 */
  /* border-radius: 10px 20px 30px; */
  /* 一个值表示四个角 */
  border-radius: 10px 10px 0px 0px;
  border-bottom: none;
  margin-left: 80px;
  margin-right: 80px;
}


.button {
    font-size: 17px
}


.horizontal-row2{
  //display: flex;
}

.choose {
    display: flex;
    justify-content: center; //水平布局
    align-items: center; //垂直居中
}

.el-header {
    height: 50px;
    //background-color: rgb(255,255,255);
    //background-image: url("src/assets/SnowMountain(1).png");
    //opacity:0.9;
    //background-color: transparent;
    display: flex;
    justify-content: center; //水平布局
    align-items: center; //垂直居中
}

.el-main{
  height: 430px;
}
.picture{
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-col {
    align-self: center;
}
</style>

  