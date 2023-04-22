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


        // Product.belongsTo(models.Section, {
        //     as: "section",
        //     foreignKey: "section_id"
        // }),
        // Product.belongsTo(models.Category, {
        //     as: "category",
        //     foreignKey: "category_id"
        // })

        // Product.belongsToMany(models.Console, {
        //     as: "consoles",
        //     through: "products_consoles",
        //     foreignKey: "product_id",
        //     otherKey: "console_id",
        //     timestamps: true
        // })

        // Product.hasMany(models.ProductConsole, {
        //     as: "products_consoles",
        //     foreignKey: "product_id"
        // })

        // Product.hasMany(models.OrderProduct, {
        //     as: "order_product",
        //     foreignKey: "product_id"
        // })
        // Product.belongsTo(models.ProductConsole, {
        //     as: "products_consoles",
        //     foreignKey: "id"
        // })

   }
 
    return Product
};