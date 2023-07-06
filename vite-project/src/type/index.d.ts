//后端返回接口类型
interface IRes<T> {
    status: number
    data: T
}

interface IResData<T> {
    code: number
    data: T
}

//服务类型列表返回类型
interface LadderListRes {
    id: string
    name: string
    children: LadderListRes[]
}

//技术领域列表返回类型
interface TechnicalListRes<T> {
    list: T
}

interface TechnicalListResData {
    id: string
    name: string
}

//获取结果接口传参类型
interface getResultParams {
    pageNum: number
    pagesize: number
    keywords: string
    serviceTypeId:string
    serviceTypeId2:string
    technicalId:string
    province:string
    dataOrigin:string
    logicStatus:number
}

//获取结果接口返回类型
interface getResultRes<T>{
    total:number
    lastpage:number
    list: T
}

interface resultResData{
    avgScore:number
    id:number
    orgName:string
    serviceTypeName:string
    title:string
    totalDeal:number
    avatarUrl:string
}