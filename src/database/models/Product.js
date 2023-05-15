module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        short_description: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        cost: {
            type: dataTypes.INTEGER(20),
            allowNull: true
        },
        price: {
            type: dataTypes.INTEGER(20),
            allowNull: true
        },
        stock: {
            type: dataTypes.INTEGER(4),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_mark: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_state: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    };
    let config = {
        tableName:  'product',
        timestamps: true,
        paranoid:   true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time'
    }
    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function (models) {

        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        })
        Product.belongsTo(models.Mark, {
            as: "mark",
            foreignKey: "id_mark"
        })
        Product.hasMany(models.OrderProduct, {
            as: "order_product",
            foreignKey: "id_product"
        })

   }
 
    return Product
};