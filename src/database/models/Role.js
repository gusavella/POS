module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
            
        }
    };
    let config = {
        tableName:'role',
        timestamps: true,
        paranoid:   true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time'
    }
    const Role = sequelize.define(alias, cols, config); 

     Role.associate = function (models) {


        Role.hasMany(models.User, {
            as: "user",
            foreignKey: "id_role"
        })

    }
 
    return Role
};