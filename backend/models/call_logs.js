const mongoose = require("mongoose");
const db_schema = require("../database/index");

const schema = new db_schema(
    {
        id_1_address: {
          type: String
        },
        id_1_ip_address: {
          type: String
        },
        id_2_address: {
          type: String
        },
        id_2_ip_address: {
          type: String
        },
        ended_at: {
          type:Date
        }
      },
      {
        timestamps: true,
      }
);

const call_logs =  mongoose.model("call_logs", schema);

module.exports = call_logs;
