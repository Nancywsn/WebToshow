<template>
    <div id="wrapper">
        <el-container>
            <el-header>
              <el-col>
                <b>
                    <h1 style="opacity: 0.8; font-family: 楷体;" class="header">雪山搜救--小目标识别 </h1>
                </b>
              </el-col>
              <el-col style="width: 200px;">
              </el-col>
              <el-col>
                <div class="choose">
                     <input type="file" style="font-family: 楷体; display: inline-block; align-self: center;" @change="handleFileChange" accept="image/*">
                </div>
              </el-col>

            </el-header>
            <el-main>

              <div>
                <el-row class="horizontal-row2">
                  <el-col class="jianxie">
                    <div>
                      <p class="display">输 入 图 片
                      </p>
                    </div>
                  </el-col>
                  <el-col style="width: 100px;">
                  </el-col>
                  <el-col class="jianxie">
                    <p class="display">     输 出 图 片
                    </p>
                  </el-col>
                  <el-col class="jianxie">
                    <p class="display">     识 别 数 据
                    </p>
                  </el-col>
                </el-row>
              </div>
              <div class="main">
                  <div>
                      <el-row class="horizontal-row">
                          <el-col :span="6" class="picture">
                              <el-card shadow="hover"
                                  style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
                                  <div v-if="selectedImage">

                                      <!--      显示图片     -->
                                      <img :src="selectedImage" alt="Selected Image"
                                          style="width: 300px; height: auto; max-height: 400px;" />
                                  </div>
                              </el-card>
                          </el-col>
                          <el-col :span="6"
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

                          <el-col :span="6" class="picture">
                              <el-card shadow="hover"
                                  style="width: 400px; display: flex; align-items: center; justify-content: center;">
                                  <img :src="codeUrl" style=" max-width: 300px; height: auto; max-height: 400px;" />
                              </el-card>
                          </el-col>

                          <el-col :span="6" style=" width: 300px; height: 300px; display: flex; flex-direction: column; align-items: center; ">
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
              </div>
            </el-main>
        </el-container>
        <div id="bg" style="height: 28%;"></div>
    </div>
</template>
  
<script>
import { ref, reactive } from 'vue';
import axios from 'axios';

// 使用 ref 声明响应式变量
const selectedImage = ref(null);
const codeUrl = ref('');
const peoNum = ref();
var base64String = ''
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // 使用 FileReader 读取文件并在加载完成后更新 selectedImage 值
        const reader = new FileReader();
        reader.onload = function () {
            selectedImage.value = reader.result
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
    font-size: 40px;
    /* 你可以根据需要调整字体大小，单位可以是像素(px)、em等 */
}

.data1 {
    width: 250px;
    height: 50px;
    //background-color: rgb(255,255,255);
    //opacity:0.6;
}

.main {
  background-color: rgba(255, 255, 255, 0.5);
  height: 400px;
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

}

.jianxie {
  height: 30px;
  width: 200px;
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
  margin-left: 100px;
  margin-right: 100px;
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
.horizontal-row2{
  display: flex;
}

.choose{
    height: 40px;
    display: flex;
    justify-content: center; //水平布局
    align-items: center; //垂直居中
}

.el-header {
    height: 60px;
    //background-color: rgb(255,255,255);
    //background-image: url("src/assets/SnowMountain(1).png");
    //opacity:0.9;
    //background-color: transparent;
    display: flex;
    justify-content: center; //水平布局 
    align-items: center; //垂直居中
}
.picture{
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-col {
    align-self: center;
}
</style>

  