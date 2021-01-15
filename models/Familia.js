const mongoose = require('mongoose');

const FamiliaSchema = new mongoose.Schema({
    nombre : {
        type : String,
        required : [true, 'La familia debe tener nombre'],
        min : [3, 'El nombre debe tener al menos 3 caracteres'],
        max : [50, 'El nombre no puede tener mas de 50 caracteres'],
        unique : true
    }
}, {timestamps : true});

module.exports = mongoose.model('Familia', FamiliaSchema);