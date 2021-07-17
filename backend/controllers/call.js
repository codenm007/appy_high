const mongoose = require("mongoose")
//importing models
const wait_list = require("../models/wait_list");
const call_logs = require("../models/call_logs");

//connect randomly 

wait_list.find({
    $and: [
    {_id:{$ne:'60f286f351cae5f9717f2699'}},
    {is_connected:false}
    ]
}).sort({'createdAt': -1})
.limit(1).then(data =>{
    console.log(data,122);
}).catch(err =>{
    console.log(err);
})

const connect_randomly = async (req, res, next) => {

    const ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const add_to_wait_list = new wait_list({
        ip_address:ip_addr
    })

    add_to_wait_list.save().then(data =>{
        console.log(data);
        let wait_list_id = data._id;
    }).catch(err =>{
        console.log(err);
    })

};




module.exports = {
    connect_randomly
};
