const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceCreateDiary = require('./service_CreateDiary')
let serviceAddRoute = require('./service_AddRoute')
let serviceAddCheckPoint = require('./service_AddCheckPoint')
let serviceUpdateCheckPoint = require('./service_UpdateCheckPoint')
let serviceDeleteCheckPoint = require('./service_DeleteCheckPoint')
let serviceUpdateProfile = require('./service_UpdateProfileDiary')
let serviceGetAllMyDiary = require('./service_GetAllDiary')
let serviceGetCheckPoint = require('./service_GetCheckPoint')
let serviceGetAllCheckPoint = require('./service_GetAllCheckPoint')
let serviceShareDiary = require('./service_ShareMyDiary')
let serviceGetAllMySharedCheckPoint = require('./service_GetAllSharedDiarysCheckpoint')
let serviceGetAllMyShared = require('./service_GetMySharedDiary')

router.post('/CreateDiary', (req, res)=>{
    try{
        let userId = req.body.userId
        let diarysName = req.body.diarysName
        let diarysImage = req.body.diarysImage
        
        serviceCreateDiary.createDiary(userId, diarysName, diarysImage)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.diary.createDiary.SUCCESSFUL))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/GetAllMyDiary', (req, res)=>{
    try{
        let userId = req.body.userId
        serviceGetAllMyDiary.getAllMyDiary(userId)
        .then((resultData)=>{
            res.send(responseType(Constant.resultCode.OK, resultData))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/AddRoute', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let routes = req.body.routes
        serviceAddRoute.addRoute(userId, diaryId, routes)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/AddCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let data = req.body.data
        serviceAddCheckPoint.checkPoint(userId, diaryId, data)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.diary.addCheckPoint.SUCCESSFUL))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/UpdateCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let data = req.body.data
        serviceUpdateCheckPoint.updateCheckPoint(userId, diaryId, data)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.diary.update.SUCCESSFUL))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/DeleteCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let checkPointId = req.body.checkPointId
        serviceDeleteCheckPoint.deleteCheckPoint(userId, diaryId, checkPointId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/UpdateProfileDiary', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let diaryProfile = req.body.diaryProfile
        serviceUpdateProfile.updateProfileDiary(userId, diaryId, diaryProfile)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/GetCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let checkPointId = req.body.checkPointId
        serviceGetCheckPoint.getCheckPoint(userId, diaryId, checkPointId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/GetAllCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        serviceGetAllCheckPoint.getAllCheckPoint(userId, diaryId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/ShareMyDiary', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let userSharedEmail = req.body.userSharedEmail

        serviceShareDiary.shareDiary(userId, userSharedEmail, diaryId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.diary.shared.SUCCESSFUL))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.diary.SHARE_FAIL, Constant.diary.shared.CAN_NOT_SHARED_TO_YOURSEFT))
            }
            else{
                res.send(responseType(Constant.resultCode.diary.SHARE_FAIL, Constant.team.checkEmail.EMAIL_DOES_NOT_EXIST))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/GetAllMySharedDiarysCheckPoint', (req, res)=>{
    try{
        let userSharedId = req.body.userSharedId
        let diaryId = req.body.diaryId

        serviceGetAllMySharedCheckPoint.getAllMySharedDiarysCheckPoint(userSharedId, diaryId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/GetAllMySharedDiary', (req, res)=>{
    try{
        let userSharedId = req.body.userSharedId

        serviceGetAllMyShared.getAllMySharedDiary(userSharedId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})
module.exports = router