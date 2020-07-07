import Realm from 'realm'

export const ProductSchema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
        id:'int',
        productName:{ type: 'string', indexed: true },
        productCode:'string',
        description:'string',
        unit:'string',
        weight:'string',
        productType:'string',
        brand:'string',
        createDate:'string',
        status:'int',
    }
  };

export const ProductDetailSchema = {
    name:'ProductDetail',
    primaryKey: 'id',
    properties:{
        id:'int',
        productId:'int',
        productCode:{ type: 'string', indexed: true },
        status:'int',
        businessStatus:'int',
        importDate:'string',
        applyDate:'string',
        retailPrice:"double",
        wholeSalePrice:"double",
        importPrice:'double',
        customUnit:'string'
    }
}

export const ImportGoodsSchema = {
    name:'ImportGoods',
    primaryKey:'id',
    properties:{
        id:'int',
        invoiceCode:{ type: 'string', indexed: true },
        createDate:'string',
        suplierCode:'string',
        suplierName:'string',
        status:'int' ,
        totalQuantity:'int' ,
        totalAmount:"double",
        discount:'float',
        emtryFee:"double",
        otheCost:"double",
        updateDate:'string',
        note:'string',
    }
}

export const ImportGoodsDetailSchema = {
    name:'ImportGoodsDetail',
    primaryKey:'id',
    properties:{
        id:'int',
        importGoodsId:'int',
        invoiceCode:{ type: 'string', indexed: true },
        productCode:'string',
        productName:'string',
        quantity:'double',
        price:'double',
        importDate:'string',
        updateDate:'string',
    }
}

export const CheckGoodsSchema = {
    name:'CheckGoods',
    primaryKey:'id',
    properties:{
        id:'int' ,
        ballotCode:{ type: 'string', indexed: true },
        createDate:'string',
        status:'int' ,
        totalQuantity:'int' ,
        totalAmount:'double',
        updateDate:'string',
        note:'string',
        type:'int' ,
    }
}

export const CheckGoodsDetailSchema = {
    name:'CheckGoodsDetail',
    primaryKey:'id',
    properties:{
        id:'int' ,
        checkGoodsId:'int',
        productCode:'string',
        productName:'string',
        quantity:'float',
        differentQty:'float',
        dateNo:'string',
        updateDate:'string',
        updateDate:'string',
    }
}

export const exportGoodsSchema = {
    name:'exportGoods',
    primaryKey:'id',
    properties:{
        id:'int' ,
        invoiceCode:{ type: 'string', indexed: true },
        createDate:'string',
        customerCode:'string',
        customerName:'string',
        status:'int' ,
        totalQuantity:'int' ,
        totalAmount:'double',
        discount:'float',
        emtryFee:'double',
        otheCost:'double',
        updateDate:'string',
        note:'string',
        typePrice:'double',
        payMethod:'string',
        paymentStatus:'int' ,

    }
}

export const exportGoodsDetailSchema = {
    name:'exportGoodsDetail',
    primaryKey:'id',
    properties:{
        id:'int' ,
        exportGoodsId:'int',
        invoiceCode:'string',
        productCode:'string',
        productName:'string',
        quantity:'float',
        price:"double",
        exportDate:'string',
        updateDate:'string',
    }
}

export const Paychema = {
    name:'Pay',
    primaryKey:'id',
    properties:{
        id:'int' ,
        invoiceCode:{ type: 'string', indexed: true },
        createDate:'string',
        amount:'double',
    }
}

export const SupplierSchema = {
    name:'Supplier',
    primaryKey:'id',
    properties:{
        id:'int' ,
        supplierCode:{ type: 'string', indexed: true },
        supplierName:'string',
        address:'string',
        telephone:'string',
        // star:"int"
    }
}

export const CustomersSchema = {
    name:'Customer',
    primaryKey:'id',
    properties:{
        id:'int' ,
        customerCode:{ type: 'string', indexed: true },
        customerName:'string',
        address:'string',
        telephone:'string',
        // star:"int"
    }
}
export const WarehouseSchema = {
    name:'warehouse',
    primaryKey:'id',
    properties:{
        id:'int' ,
        productCode:"string",
        updateDate:'string',
        quantity:'float',
        // star:"int"
    }
}
export const funcConectDB = () => {
    Realm.open(
        {
            schema:[
                ProductSchema,
                ProductDetailSchema,
                ImportGoodsSchema,
                ImportGoodsDetailSchema,
                CheckGoodsSchema,
                CheckGoodsDetailSchema,
                exportGoodsSchema,
                exportGoodsDetailSchema,
                Paychema,
                SupplierSchema,
                CustomersSchema,
                WarehouseSchema
            ]
        }
    ).then( realm => {
        console.log("connect Realm DB success...")
        realm.close()
    })
}