<template>
    <div id="wrapper">
        <!-- <div id="bg"></div> -->
        <div id="main">
            <input type="file" @change="handleFileChange" accept="image/*">
            <el-card shadow="hover"
                style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
                hello
                <div v-if="selectedImage">
                    <img :src="selectedImage" alt="Selected Image" style="width: 300px; height: auto; max-height: 400px;" />
                </div>
            </el-card>
        </div>
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

.input {
    // height: 40px;
    // display: flex;
    // justify-content: center; //水平布局
    // align-items: center; //垂直居中
    font-family: 楷体;
    display: inline-block;
    align-self: center;
}
</style>

  