const mongoose = require('mongoose');

const PrecioSchema = new mongoose.Schema({
    nombre : {
        type : String,
        required : [true, 'La lista de precios debe tener un nombre']
    }
}, {timestamps : true} );

module.exports = mongoose.model('Precio', PrecioSchema);