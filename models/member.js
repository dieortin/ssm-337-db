/*
*   Mongoose model representing a member of the group
*   Made up of member schema
*/

//*** TODO: Set appropiate properties for healthcareData ***//
//*** TODO: Set appropiate data type for paidQuota ***//

var mongoose = require('mongoose');
 
module.exports = mongoose.model('Member', {
    name: String,               // Nombre
    surnames: String,           // Apellidos
    birthDate: Date,            // Fecha de nacimiento
    familyId: Number,           // Número identificador de la familia
    dni: String,                // Documento nacional de identidad
    healthcareData: String,      // Datos de la seguridad social -------------------------*** TODO
    contactData: {
      phoneNumbers: [Number],   // Lista de números de teléfono
      emailAddresses: [String]  // Lista de direcciones de correo electrónico
    },
    paidQuota: Boolean,         // Cuota anual pagada -----------------------------------*** TODO 
    section: String,            // Unidad
    sanitaryInfo: String,       // Información sanitaria: alergias, enfermedades...
});