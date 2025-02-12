//require('dotenv').config()

//var exec = require('child_process').exec

var gh_token = ''
var owner = ''
var idToken = ''
var email = ''
var localId = ''
var refreshToken = ''
var selectedContainer = ''
var selectedWorkspace = ''
var projectUrl = ''
//var filterComplete = ''
//var workflowPath = ''
// if (process.env.LOCAL === 'true') {
//   gh_token = process.env.token
//   owner = process.env.owner
//   idToken = process.env.idToken
//   email = process.env.email
//   localId = process.env.localId
//   refreshToken = process.env.refreshToken
//   selectedContainer = process.env.selectedContainer
//   projectUrl = process.env.projectUrl
//   selectedWorkspace = process.env.selectedWorkspace
//   //workflowPath = process.env.workflowPath

// } else {

  const splitted = process.env.parameters.split('--xxx--')
  debugger;
  process.env.gh_token = splitted[0]
  process.env.owner = splitted[1]
  process.env.idToken = splitted[2]
  process.env.email = splitted[3]
  process.env.localId = splitted[4]
  process.env.refreshToken = splitted[5]
  process.env.selectedContainer = splitted[6]
  process.env.projectUrl = splitted[7]
  process.env.selectedWorkspace = splitted[8]
  
  gh_token = splitted[0]
  owner = splitted[1]
  idToken = splitted[2]
  email = splitted[3]
  localId = splitted[4]
  refreshToken = splitted[5]
  selectedContainer = splitted[6]
  projectUrl = splitted[7]
  selectedWorkspace = splitted[8]
  
  // workflowPath = splitted[9]


//}
const fetch = require('node-fetch')
//const fs = require('fs')
//const makeDir = require('make-dir');
//const pather = require('path')

const { taskRunner, taskEvents } = require('./taskRunner')
//1.get workflows info from firebase

const fetchUrl = `${projectUrl}/server/workspaces/${selectedWorkspace}/tasks/.json?auth=${idToken}`

//console.log('fetchUrl',fetchUrl)

fetch(fetchUrl).then(response => response.json()).then(data => {
  const queque = []
  const tasks = Object.entries(data)
 
  tasks.forEach(task => {
    const taskId = task[0]
    const taskOrder = task[1]['taskorder']
  debugger;
    const workflows = task[1]['workflows']
    const taskName = task[1]['taskName']
    for (let wf in workflows) {
      const workflow = workflows[wf]
      
      queque.push({ taskId,taskName, taskOrder, ...workflow,workflowKey:parseInt(wf) })
  
    }
   
  debugger;
  })
  const taskRunnerEmitter = taskRunner({ tasks: queque })
  taskRunnerEmitter.emit(taskEvents.START_TASK_RUNNER, {})
}).catch(error => {
  console.log('error',error)
  debugger;
})






