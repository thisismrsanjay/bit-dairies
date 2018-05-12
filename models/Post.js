const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public'
    },
    allowComments:{
        type:Boolean,
        default:true
    },
    comments:[{
        commentsBody:{
            type:String,
            required:true
        },
        commentDate:{
            type:Date,
            default:Date.now
        },
        commentUser:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Post',PostSchema,'Post');