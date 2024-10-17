import { DataTypes, Model, Sequelize } from 'sequelize';

class Size extends Model {
    static initModel(connection: Sequelize) {
        Size.init(
            {
                id: {
                    type: new DataTypes.INTEGER(),
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            },
            {
                sequelize: connection,
                tableName: 'size',
                freezeTableName: true,
                timestamps: true,
            }
        );
    };

    static initAssociations() {

    }
}

export default Size;