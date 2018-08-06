import {
  connection as db,
  model,      //use the defaule connetion  (monggose.connection)
  Schema
} from "mongoose";




// let userSchema

let userSchema = new Schema({
  name: String
});