import { addTask, tasks, updateTask, updateTaskStatus, deleteTask, readTasks } from './task.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const filePath: string = join(dirname(fileURLToPath(import.meta.url)), 'data.json')

const args = process.argv
readTasks(filePath)

let taskId = 0

switch (args[2]) {
  case 'add':
    taskId = addTask(args[3], filePath)
    console.log(`task added sucessfully (ID: ${taskId})`)
    break
  case 'update':
    updateTask(Number(args[3]), args[4], filePath)
    break
  case 'mark-in-progress':
    updateTaskStatus(Number(args[3]), 'in-progress', filePath)
    break
  case 'mark-done':
    updateTaskStatus(Number(args[3]), 'done', filePath)
    break
  case 'delete':
    deleteTask(Number(args[3]), filePath)
    break
  case 'list':
    args[3] === 'done'
      ? console.log(tasks.filter(task => task.status === 'done'))
      : args[3] === 'todo'
        ? console.log(tasks.filter(task => task.status === 'todo'))
        : args[3] === 'in-progress'
          ? console.log(tasks.filter(task => task.status === 'in-progress'))
          : console.log(tasks)
    break
  default:
    console.error('Command not found')
    break
}
