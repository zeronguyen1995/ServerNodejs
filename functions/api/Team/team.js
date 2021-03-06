const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceCreateTeam = require('./service_CreateTeam')
let serviceInviteMember = require('./service_InviteMember')
let serviceHasTeam = require('./service_HasTeam')
let serviceAccept = require('./service_Accept')
let serviceDecline = require('./service_Decline')
let serviceDeleteTeam = require('./service_DeleteTeam')
let serviceGetAllMember = require('./service_GetAllMembers')
let serviceLeaveTeam = require('./service_LeaveTeam')
let serviceGetInviterInfo = require('./service_GetInviterInfo')
let serviceIsLeader = require('./service_IsLeader')
let serviceRemoveMember = require('./service_RemoveMember')

router.post("/CreateTeam",(req, res)=>{
    try{
        const userEmail = req.body.userEmail
        const teamsName = req.body.teamName
        serviceCreateTeam.createTeam(userEmail, teamsName)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.team.createTeam.success.CREATE_TEAM))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, Constant.team.hasTeam.ALREADY_HAS_TEAM))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err)
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post("/InviteMember",(req, res)=>{
    try{
        const userEmail = req.body.userEmail
        const userInvitedEmail = req.body.userInvitedEmail
        const teamId = req.body.teamId
        serviceInviteMember.inviteMember(teamId, userEmail, userInvitedEmail)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.team.inviteMember.success.INVITATION))
            }
            else if(result == 2){
                res.send(responseType(Constant.resultCode.team.EMAIL_DOES_NOT_EXIST, Constant.team.checkEmail.EMAIL_DOES_NOT_EXIST))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.NOT_LEADER, Constant.team.notLeader.NOT_LEADER))
            }
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

router.post('/HasTeam', (req, res)=>{
    try{
        let userId = req.body.userId
        serviceHasTeam.hasTeam(userId)
        .then((result)=>{
            if(result == false){
                res.send(responseType(Constant.resultCode.team.HAS_NO_TEAM, ""))
            }
            else{
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, result))
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

router.post('/IsLeader', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceIsLeader.isLeader(teamId, userId)
        .then((result)=>{
            if(result == false){
                res.send(responseType(Constant.resultCode.team.NOT_LEADER, ""))
            }
            else{
                res.send(responseType(Constant.resultCode.team.IS_LEADER, result))
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

router.post('/GetInviterInfo', (req, res)=>{
    try{
        let userEmail = req.body.userEmail
        serviceGetInviterInfo.getInviterInfo(userEmail)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err)
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/AcceptTheInvitation', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceAccept.acceptTheInvitation(userId, teamId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.team.joinTeam.success.JOIN_TEAM))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, Constant.team.hasTeam.ALREADY_HAS_TEAM))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.joinTeam.fail.JOIN_TEAM))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.get('/DeclineTheInvitation', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceDecline.declineTheInvitation(userId, teamId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, ""))
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

router.post('/DeleteTeam', (req, res)=>{
    try{
        let leaderId = req.body.leaderId
        let teamId = req.body.teamId
        serviceDeleteTeam.deleteTeam(leaderId, teamId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL, ""))
            }
            else if(result == -1){
                res.send(responseType(Constant.resultCode.team.NOT_LEADER, Constant.team.notLeader.NOT_LEADER))
            }
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

router.post('/GetAllMember', (req, res)=>{
    try{
        let userEmail = req.body.userEmail
        let teamId = req.body.teamId
        serviceGetAllMember.getAllMember(userEmail, teamId)
        .then((result)=>{
            if(result == -1){
                res.send(responseType(Constant.resultCode.team.NOT_MEMBER, Constant.team.notMember))
            }
            else{
                res.send(responseType(Constant.resultCode.OK, result))
            }
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

router.post('/LeaveTeam', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceLeaveTeam.leaveTeam(userId, teamId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.team.leaveTeam.success.LEAVE_TEAM))
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

router.post('/RemoveMember', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceRemoveMember.removeMember(userId, teamId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.team.removeMember.REMOVE_MEMBER))
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
module.exports = router