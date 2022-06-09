const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('name',val.common);
    },
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
      set(val){
        this.setDataValue("continent", val[0]);
      },
    },
    capital:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.FLOAT,
    },
    population:{
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false, 
   });
};
