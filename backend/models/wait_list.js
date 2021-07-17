const mongoose = require("mongoose");
const db_schema = require("../database/index");

const schema = new db_schema(
    {
        ip_address: {
          type: String
        },
        is_connected: {
            type: Boolean,
            default: false
          }
      },
      {
        timestamps: true,
      }
);

const wait_list =  mongoose.model("wait_list", schema);

module.exports = wait_list;
