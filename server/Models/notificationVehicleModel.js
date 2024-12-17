const mongoose = require('mongoose');

const notificationVehicleSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    orderId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,

    },
    idCar:{
        type:String,
    },
    status:{
        type:String,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    check:{
      type:String,
      default: 'vehicle',
    },
    date: {
        type: Date,
        default: Date.now,
    }
},{ timestamps: true });

const NotificationVehicle = mongoose.model('NotificationVehicle', notificationVehicleSchema);
module.exports = NotificationVehicle;
