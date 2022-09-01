const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {sequelize, modelName: 'user'});




// PUNTO 1
//insercion registro
function crearRegistro(nombre, apellido){
  sequelize.sync()
  .then(() => User.create({
    firstName: nombre,
    lastName: apellido
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

}
//CREAR 2 registros para solo modificar luego 1
const nombre = 'pepe'
const apellido = 'mujica'
crearRegistro(nombre, apellido) 
crearRegistro(nombre, apellido)

//actualiza registro
function actualizaNombreRegistro(nombreABuscar, nombreACambiar){
  User.update({ firstName: nombreACambiar }, {
    where: {
      firstName: nombreABuscar
    },
    limit: 1,
  }).then(() => {
    console.log("Done");
  });
}

const pedro = 'pedro'
//RETARDO PARA ACTUALIZAR BD
setTimeout(()=>{
    actualizaNombreRegistro(nombre, pedro)
},1000);