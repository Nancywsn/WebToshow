<template>
    <div>
        <!-- 使用加载后的 str 数据 -->
        <p>{{ data.str.message }}</p>
    </div>
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
                            <el-button size="large" class="button" style="font-family: 楷体;" round>识别</el-button>
                            
                        </el-col>
                        <el-col style="width: 400px; display: flex; align-items: center; justify-content: center;">
                            <el-card shadow="hover"
                                style="width: 400px; display: flex; align-items: center; justify-content: center;">
                                <img src='/src/assets/output_image.jpg'
                                    style="max-width: 300px; height: auto; max-height: 400px;" />
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
import { ref ,reactive} from 'vue';
//导航访问后台api
import { fromApi,toApi } from '../api/api'

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

const data = reactive({
    str: [],
});

// 加载数据
const loadTable = async () => {
    const r = await fromApi();
    data.str = r;
    console.log('页面显示'+data.str.message)
};
toApi(data.str);
loadTable(); // 在组件加载时调用数据加载函数

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