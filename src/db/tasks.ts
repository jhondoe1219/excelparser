import mongoose from 'mongoose'

export const statuses = Object.freeze({
  PROCESSING_ERROR: 'processing_error',
  PROCESSING_STARTED: 'processing_started',
  UPLOADED_SERVICE_1: 'uploaded_service_1',
  UPLOADED_SERVICE_2: 'uploaded_service_2',
  PARSING_STARTED: 'parsing_started',
  PARSING_ERROR: 'parsing_error',
  PARSED: 'parsed',
})

// Task Config
const TaskSchema = new mongoose.Schema({
  status: { type: String, enum : Object.values(statuses), required: true },
  userid: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
  fileid: { ref: 'File', type: mongoose.Schema.Types.ObjectId },
  requestid: { type: String, required: true, unique: true },
  originalFilename: { type: String },
  pathFileServer1: { type: String },
  pathFileServer2: { type: String },
  taskname: { type: String },
}, { timestamps: true })

export const TaskModel = mongoose.model('Task', TaskSchema)

// Task Actions
export const createTask = (values: Record<string, any>) => new TaskModel(values).save().then((task) => task.toObject())
export const getTaskById = (id: string) => TaskModel.findById(id)
export const updateTaskById = (id: string, values: Record<string, any>) => TaskModel.findByIdAndUpdate(id, values)
export const deleteTaskById = (id: string) => TaskModel.findOneAndDelete({ _id: id })

export const getTaskByTaskname = (taskname: string) => TaskModel.findOne({ taskname })
export const getTaskByRequestid = (requestid: string) => TaskModel.findOne({ requestid })

export const getTasks = () => TaskModel.find()
export const getTasksByUserid = (userid: string) => TaskModel.find({ userid })
export const getTasksByStatus = (status: string) => TaskModel.find({ status })