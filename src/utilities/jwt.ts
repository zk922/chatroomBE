import * as crypto from "crypto";
import {model} from "mongoose";


import {authentication} from "../mongoose/mongooseSchema";

const AuthModel = model('AuthModel', authentication);


// const hash = crypto.createHmac('sha256', )