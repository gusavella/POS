module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderProduct';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: dataTypes.FLOAT,
            allowNull: false        
        },
        quantity: {
            type: dataTypes.INTEGER(),
            allowNull: false        
        },
        subTotal: {
            type: dataTypes.FLOAT,
            allowNull: false        
        },
        id_order: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
       
    };
    let config = {
        tableName:'Order_Products',
        timestamps: true,
        paranoid:   true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time'
    }
    const ProductConsole = sequelize.define(alias, cols, config); 

    ProductConsole.associate = function (models) {


        ProductConsole.belongsTo(models.Product, {
            as: "product",
            foreignKey: "id_product"
        })

        ProductConsole.belongsTo(models.Order, {
            as: "order",
            foreignKey: "id_order"
        })
       

   }
 
    return ProductConsole
};