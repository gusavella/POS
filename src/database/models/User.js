module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(32),
            allowNull: false
        },
        id_role:  {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

    };
    let config = {
        tableName:  'user',
        timestamps: true,
        paranoid:   true,
        createdAt:  'create_time',
        updatedAt:  'update_time',
        deletedAt:  'delete_time'
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = function(models) {
       
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey: "id_role"
        })

        // User.hasMany(models.Order, {
        //     as: "order",
        //     foreignKey: "user_id"
        // })
    }
 
    return User
};