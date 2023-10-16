<template>
    <div>
        <el-container>
            <el-header>
                <b>
                    <h1 style="font-family: 楷体;" class="header">雪山搜救--小目标识别 </h1>
                </b>
                <input type="file" style="font-family: 楷体;" @change="handleFileChange" accept="image/*" />

            </el-header>
            <el-main>
                <div>
                    <el-row class="horizontal-row" :gutter="20">
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
                            style="width: 100px; height: 400px; display: flex; align-items: center; justify-content: center;"
                            class="mb-4">
                            <el-button size="large" class="button" @click="buttonClick" style="font-family: 楷体;"
                                round>识别</el-button>

                        </el-col>
                        <el-col style="width: 400px; display: flex; align-items: center; justify-content: center;">
                            <el-card shadow="hover"
                                style="width: 400px; display: flex; align-items: center; justify-content: center;">
                                <img :src="codeUrl" style="max-width: 300px; height: auto; max-height: 400px;" />
                            </el-card>
                        </el-col>
                        <el-col style="width: 300px; height: 400px; display: flex; align-items: center; ">
                            <p class="data" style="font-family: 楷体;">
                                经过识别，图片中有
                            </p>
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

// 使用 ref 声明响应式变量
const selectedImage = ref(null);
const codeUrl = ref('');
// const data = ''
var base64String =''
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // 使用 FileReader 读取文件并在加载完成后更新 selectedImage 值
        const reader = new FileReader();
        reader.onload = function () {
<<<<<<< HEAD
            selectedImage.value=reader.result
            const base64String = reader.result.split(',')[1];
            console.log(base64String);
            // 将 base64String 发送给后端的 API
            axios.post('http://10.13.4.225:12345/predict', { image_base64: base64String })
                .then((response) => {
                    console.log('上传成功', response);
                    console.log(response.data)
                    const data = 'data:image/png;base64,' + response.data.image_base64;
                    codeUrl.value = data;
                })
                .catch((error) => {
                    console.error('上传失败', error);
                });
=======
            selectedImage.value = reader.result
            base64String = reader.result.split(',')[1];
            // console.log(base64String);
>>>>>>> refs/remotes/origin/main
        };
        reader.readAsDataURL(file);
    } else {
        selectedImage.value = null;
    }
};
const buttonClick = function () {
    // 将 base64String 发送给后端的 API
    axios.post('http://10.13.4.225:12345/predict', { image_base64: base64String })
        .then((response) => {
            console.log('上传成功', response);
            console.log(response.data)
            const data = 'data:image/png;base64,' + response.data.image_base64;
            codeUrl.value = data;
        })
        .catch((error) => {
            console.error('上传失败', error);
        });
}



</script>


<style scoped lang="scss">
.header {
    font-size: 70px;
    /* 你可以根据需要调整字体大小，单位可以是像素(px)、em等 */
}

.data {
    width: 250px;
    height: 340px;
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