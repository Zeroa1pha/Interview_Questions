import request from "./request";

export const getLadderList = (): Promise<IRes<IResData<LadderListRes[]>>> => request.get('/admin/api/v1/service_type/ladderlist')

export const getTechnicalList = (): Promise<IRes<IResData<TechnicalListRes<TechnicalListResData[]>>>> => request.get('api/v1/technical/list')

export const getResultList = (data: getResultParams):Promise<IRes<IResData<getResultRes<resultResData[]>>>>=> request.get('api/v1/service/list', { params: data })