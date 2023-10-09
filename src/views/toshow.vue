<template>
    <div>
        <el-container>
            <el-header>
                <input type="file" @change="handleFileChange" accept="image/*" />
            </el-header>
            <el-main>
                <div>
                    <el-row class="horizontal-row">
                        <el-col :span="8">
                            <el-card shadow="hover" style="height: 400px;">
                                <div v-if="selectedImage">
                                    <h2>Selected Image:</h2>
                                    <img :src="selectedImage" alt="Selected Image"
                                        style="width: 300px; max-height: 300px;" />
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <p>识别</p>
                        </el-col>
                        <el-col :span="8" >
                            <el-card shadow="hover" style="height: 400px;">
                                <img src='/src/assets/img.jpg' />
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

// 使用 ref 声明响应式变量
const selectedImage = ref(null);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // 使用 FileReader 读取文件并在加载完成后更新 selectedImage 值
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        selectedImage.value = null;
    }
};
</script>


<style scoped lang="scss">
.horizontal-row {
    display: flex;
    /* 使用 flex 布局来实现水平排列 */
    justify-content: space-between;
    /* 在 el-col 之间添加空白间隔 */
}

.el-header {
    height: 20vh;
    background-color: rgb(69, 96, 93);
    display: flex;
    justify-content: center; //水平布局 
    align-items: center; //垂直居中
}

.el-main {
    background-color: rgb(196, 215, 212);
    height: 100%;
    display: flex;
    justify-content: center; //水平布局 
}
.el-col{
    align-self: center;
}
</style>
