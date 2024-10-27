import htttpService from './service'
import { loginInfoType, meetingRoomListParamsType } from './api.type';

export const userLoginPost = async (loginInfo: loginInfoType) => {
    return await htttpService.post('/user/login', loginInfo)
}

export const meetingRoomListGet = async (meetingRoomListParams: meetingRoomListParamsType) => {
    return await htttpService.get('/meeting-room/list', {
        params: meetingRoomListParams
    })
}