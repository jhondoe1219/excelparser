import mongoose from 'mongoose'

const FiledataSchema = new mongoose.Schema({
  Price: { type: String },
  ProductName: { type: String },
  Count: { type: String },
  Quantity:{ type: String },
  Date: { type: String },
  file: { type: String },
  row: { type: Number },
}, { timestamps: true })

export const FiledataModel = mongoose.model('Filedata', FiledataSchema)

export const createFiledata = (values: Record<string, any>) => new FiledataModel(values).save().then((filedata) => filedata.toObject())