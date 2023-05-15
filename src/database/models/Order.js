module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataTypes.FLOAT(),
            allowNull: false
        },
        id_user: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

    };
    let config = {
        tableName:  'order',
        timestamps: true,
        paranoid:   true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time'
    }
    const Order = sequelize.define(alias, cols, config); 

    Order.associate = function (models) {


        Order.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user"
        })
       
        Order.hasMany(models.OrderProduct, {
            as: "order_product",
            foreignKey: "id_order"
        })

   
   }
 
    return Order
};