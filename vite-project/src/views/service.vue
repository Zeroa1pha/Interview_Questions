<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo container" mode="horizontal" :ellipsis="false">
                    <el-menu-item index="0" class="logo"><img src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png"
                            alt="">
                        <h1>共创云</h1>
                    </el-menu-item>
                    <el-menu-item index="1">服务产品</el-menu-item>
                    <el-menu-item index="2">科创需求</el-menu-item>
                    <el-menu-item index="3">专利论文</el-menu-item>
                    <el-menu-item index="4">交易大数据</el-menu-item>
                    <div class="flex-grow" />
                    <el-button type="primary">登录</el-button>
                    <el-button>注册</el-button>
                </el-menu>
            </el-header>
            <el-main class="mainBox">
                <el-card class="container" shadow="always">
                    <div class="panel_header">
                        <div class="title_box">
                            <p>资源大厅</p>
                        </div>
                        <div class="search_box">
                            <el-input v-model="input" placeholder="请输入资源名称或用户名搜索" style="width: 400px;height:40px;">
                                <template #append>
                                    <el-button type="primary" :icon="Search" @click="searchBtn">
                                        搜索
                                    </el-button>
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <div class="panel_tabs">
                        <el-menu class="el-menu-panel" mode="horizontal" default-active="0" style="height: 50px;">
                            <el-menu-item :index="index.toString()" v-for="(item, index) in panelMenu" :key="index">{{ item
                            }}</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="panel_main">
                        <div class="categoryPicker">
                            <div :class="['serviceRadioMenu', serviceRadioIf ? 'menu_isfold' : '']">
                                <p class="condition_label">服务类型：</p>
                                <el-radio-group v-model="serviceRadio" class="condition_list">
                                    <el-radio label="" class="condition_list_item">不限</el-radio>
                                    <el-radio class="condition_list_item" v-for="item in ladderList" :key="item.id"
                                        :label="item.id">{{ item.name }}</el-radio>
                                </el-radio-group>
                                <el-link type="primary" :underline="false" class="foldLink" v-if="serviceRadioIf"
                                    @click="handleLadderList">更多<el-icon>
                                        <ArrowDown />
                                    </el-icon></el-link>
                                <el-link type="primary" :underline="false" class="foldLink" v-else
                                    @click="handleLadderList">收起<el-icon>
                                        <ArrowUp />
                                    </el-icon></el-link>
                            </div>
                            <el-divider border-style="dotted" v-if="secondLadderListIf" />
                            <div :class="['serviceSecondRadioMenu', serviceRadioIf ? 'menu_isfold' : '']"
                                v-if="secondLadderListIf">
                                <p class="condition_label">二级分类：</p>
                                <el-radio-group v-model="serviceSecondRadio" class="condition_list">
                                    <el-radio class="condition_list_item" v-for="item in ladderSecondList" :key="item.id"
                                        :label="item.id">{{ item.name }}</el-radio>
                                </el-radio-group>
                                <el-link type="primary" :underline="false" class="foldLink" v-if="serviceSecondRadioIf"
                                    @click="handleSecondLadderList">更多<el-icon>
                                        <ArrowDown />
                                    </el-icon></el-link>
                                <el-link type="primary" :underline="false" class="foldLink" v-else
                                    @click="handleSecondLadderList">收起<el-icon>
                                        <ArrowUp />
                                    </el-icon></el-link>
                            </div>
                            <el-divider border-style="dotted" />
                            <div :class="['technicalRadioMenu', technicalRadioIf ? 'menu_isfold' : '']">
                                <p class="condition_label">技术领域：</p>
                                <el-radio-group v-model="technicalRadio" class="condition_list">
                                    <el-radio class="condition_list_item" label="">不限</el-radio>
                                    <el-radio class="condition_list_item" v-for="item in technicalList" :key="item.id"
                                        :label="item.id">{{ item.name }}</el-radio>
                                </el-radio-group>
                                <el-link type="primary" :underline="false" class="foldLink" v-if="technicalRadioIf"
                                    @click="handleTechnicalList">更多<el-icon>
                                        <ArrowDown />
                                    </el-icon></el-link>
                                <el-link type="primary" :underline="false" class="foldLink" v-else
                                    @click="handleTechnicalList">收起<el-icon>
                                        <ArrowUp />
                                    </el-icon></el-link>
                            </div>
                            <el-divider border-style="dotted" />
                            <div :class="['sourceRadioMenu', sourceRadioIf ? 'menu_isfold' : '']">
                                <p class="condition_label">数据来源：</p>
                                <el-radio-group v-model="sourceRadio" class="condition_list">
                                    <el-radio class="condition_list_item" label="">不限</el-radio>
                                    <el-radio class="condition_list_item" v-for="(item, index) in sourceList" :key="index"
                                        :label="item.label">{{ item.name }}</el-radio>
                                </el-radio-group>
                                <el-link type="primary" :underline="false" class="foldLink" v-if="technicalRadioIf"
                                    @click="handleSourceList">更多<el-icon>
                                        <ArrowDown />
                                    </el-icon></el-link>
                                <el-link type="primary" :underline="false" class="foldLink" v-else
                                    @click="handleSourceList">收起<el-icon>
                                        <ArrowUp />
                                    </el-icon></el-link>
                            </div>
                            <el-divider border-style="dotted" />
                            <div :class="['regionRadioMenu', regionRadioIf ? 'menu_isfold' : '']">
                                <p class="condition_label">地区：</p>
                                <el-radio-group v-model="regionRadio" class="condition_list">
                                    <el-radio class="condition_list_item" label="">不限</el-radio>
                                    <el-radio class="condition_list_item" v-for="(item, index) in regionList" :key="index"
                                        :label="item">{{ item }}</el-radio>
                                </el-radio-group>
                                <el-link type="primary" :underline="false" class="foldLink" v-if="technicalRadioIf"
                                    @click="handleRegionList">更多<el-icon>
                                        <ArrowDown />
                                    </el-icon></el-link>
                                <el-link type="primary" :underline="false" class="foldLink" v-else
                                    @click="handleRegionList">收起<el-icon>
                                        <ArrowUp />
                                    </el-icon></el-link>
                            </div>

                        </div>
                        <div class="contentBox">
                            <div class="result_header">
                                <div class="result_header_item col1">
                                    服务名称
                                </div>
                                <div class="result_header_item col2" style="padding-left: 80px;">
                                    发布用户
                                </div>
                                <div class="result_header_item col3">
                                    服务类型
                                </div>
                                <div class="result_header_item col4">
                                    成功成交数
                                </div>
                                <div class="result_header_item col5">
                                    信用评价
                                </div>
                            </div>
                            <el-card class="result-card" body-style="display: flex;flex-direction:row;"
                                v-for="item in resultList">
                                <div class="result-card-item col1">{{ item.title }}</div>
                                <div class="result-card-item col2"> <img :src="item.avatarUrl" alt=""
                                        :onerror='defaultImg'>{{ item.orgName }}</div>
                                <div class="result-card-item col3">{{ item.serviceTypeName }}</div>
                                <div class="result-card-item col4" style="color:#f1b221 ;">{{ item.totalDeal }}</div>
                                <div class="result-card-item col5" style="color: #3473e6;">{{ item.avgScore }}</div>
                            </el-card>
                        </div>




                        <div class="pagination">
                            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" small background
                                layout="prev, pager, next, jumper" :total="totalPage" />
                        </div>
                    </div>
                </el-card>
            </el-main>
            <el-footer class="container">Footer</el-footer>
        </el-container>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, computed, watch } from 'vue'
import { Search, ArrowDown, ArrowUp, List } from '@element-plus/icons-vue'
import { getLadderList, getTechnicalList, getResultList } from '../request/api'


let input = ref('') //输入框变量
const panelMenu = ['服务', '需求', '科创资源'] //顶部菜单数组

//筛选列表数组
let ladderList = ref<LadderListRes[]>()
let ladderSecondList = ref<LadderListRes[]>()
let technicalList = ref<TechnicalListResData[]>()

let sourceList = [{ name: '共创云', label: 'nttcc' }, { name: '科惠网', label: '51kehui' }, { name: '江西省网上常设技术市场', label: 'jxstc' }, { name: '潇湘科技要素大市场', label: 'hntpe' }]
let regionList = ['湖北省', '湖南省', '江西省', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '山东省', '河南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区']
let resultList = ref<resultResData[]>([])

//分页变量定义
const currentPage = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)

//筛选类型变量定义
const serviceRadio = ref('')
const serviceSecondRadio = ref('')
const technicalRadio = ref('')
const sourceRadio = ref('')
const regionRadio = ref('')

//二级分类显示
const secondLadderListIf = ref(false)

//折叠变量定义
let serviceRadioIf = ref(true)
let serviceSecondRadioIf = ref(true)
let technicalRadioIf = ref(true)
let sourceRadioIf = ref(true)
let regionRadioIf = ref(true)

//获取服务类型列表
getLadderList().then(res => {
    if (res.data.code === 0) {
        ladderList.value = res.data.data
    }
})

//获取技术领域列表
getTechnicalList().then(res => {
    if (res.data.code === 0) {
        technicalList.value = res.data.data.list
    }
})

//获取结果列表
const getResult = () => {
    getResultList({
        pageNum: currentPage.value,
        pagesize: pageSize.value,
        keywords: input.value,
        serviceTypeId: serviceRadio.value,
        serviceTypeId2: serviceSecondRadio.value,
        technicalId: technicalRadio.value,
        province: regionRadio.value,
        dataOrigin: sourceRadio.value,
        logicStatus: 1
    }).then(res => {
        resultList.value = res.data.data.list
        totalPage.value = res.data.data.total
        ladderSecondList.value = ladderList.value!.find(item => item.id == serviceRadio.value)?.children
        if (ladderSecondList.value == undefined||ladderSecondList.value!.length === 0) {
            secondLadderListIf.value = false
        } else {
            secondLadderListIf.value = true
        }
    })
}

getResult()

//折叠方法
const handleLadderList = () => {
    serviceRadioIf.value = !serviceRadioIf.value
}

const handleSecondLadderList = () => {
    serviceSecondRadioIf.value = !serviceSecondRadioIf.value
}

const handleTechnicalList = () => {
    technicalRadioIf.value = !technicalRadioIf.value
}

const handleSourceList = () => {
    sourceRadioIf.value = !sourceRadioIf.value
}

const handleRegionList = () => {
    regionRadioIf.value = !regionRadioIf.value
}

//默认图片
const defaultImg = computed(() => {
    // return 'https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png'
    return 'this.src="' + 'https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png' + '"';
})


//响应监听
watch([serviceRadio, serviceSecondRadio,technicalRadio, sourceRadio, regionRadio, pageSize, currentPage], () => {
    getResult()
})

//搜索功能
const searchBtn = () => {
    getResult()
}
</script>

<style scoped>
.mainBox {
    overflow: inherit;
}

.container {
    width: 1200px;
    margin: 0 auto;
}

.el-menu-demo {
    height: 40px;
}

.logo h1 {
    margin-left: 10px;
    color: #3473e6
}

.flex-grow {
    flex-grow: 1;
}

.panel_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
}

.el-menu-panel li {
    width: 200px;
}

.serviceRadioMenu,
.serviceSecondRadioMenu,
.technicalRadioMenu,
.sourceRadioMenu,
.regionRadioMenu {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin-bottom: 10px;
}

.el-divider {
    margin: 5px 0
}

.condition_label {
    width: 120px;
    line-height: 30px;
    padding-left: 10px;
    margin-top: 15px;
    color: #909399;
    font-size: 14px;
}

.menu_isfold {
    height: 40px;
}



.condition_list {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 74px;
}

.condition_list_item {
    cursor: pointer;
    line-height: 20px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 2px;
    color: #303133;
}

.foldLink {
    top: 10px;
    line-height: 32px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.contentBox {
    margin-top: 30px;
}

.result_header {
    width: 1120px;
    height: 48px;
    padding: 0 20px;
    background: #f7f8f9;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 700;
}

.result_header_item {
    display: flex;
    align-items: center;
    color: #909399;
    height: 100%;
    padding: 0 20px;

}

.result-card {
    padding-left: 20px;
    margin-top: 15px;

}

.result-card-item {
    display: flex;
    padding: 0 20px;
}

.result-card-item img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
}

.col1 {
    flex: 1 1 420px;
}

.col2 {
    flex: 1 1 440px;
    justify-content: flex-start;
}

.col3 {
    flex: 1 1 300px;
}

.col4 {
    flex: 1 1 200px;
}

.col5 {
    flex: 1 1 180px;
}
</style>