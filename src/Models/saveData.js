import Realm from 'realm'
import {
    CheckGoodsDetailSchema,
    CheckGoodsSchema,
    CustomersSchema,
    ImportGoodsDetailSchema,
    ImportGoodsSchema,
    Paychema,
    ProductDetailSchema,
    ProductSchema,
    SupplierSchema,
    exportGoodsDetailSchema,
    exportGoodsSchema,
    WarehouseSchema
} from './createDBRealm'

export const saveDataProduct = (parram,navigation) => {
    console.log("saveDataProduct -> parram", parram)
    Realm.open({
        schema:[ProductSchema,ProductDetailSchema,WarehouseSchema]
    }).then(realm => {
        try {
            if(!!parram.id){
            realm.write(() => {
                realm.create('Product', {
                    id:parram.id,
                    productName:parram.productName,
                    productCode:parram.productCode,
                    description:parram.description,
                    unit:parram.unit,
                    weight:parram.weight,
                    productType:parram.productType,
                    brand:parram.brand,
                    createDate:parram.createDate,
                    status:parram.status,
                },'modified');
                realm.create('ProductDetail', {
                    id:parram.detailId,
                    productId:parram.id,
                    productCode:parram.productCode,
                    status:1,
                    businessStatus:1,
                    importDate:parram.importDate,
                    applyDate:parram.applyDate,
                    retailPrice:parseFloat(parram.retailPrice),
                    wholeSalePrice:parseFloat(parram.wholeSalePrice),
                    importPrice:parseFloat(parram.importPrice),
                    customUnit:parram.customUnit
                },'modified');
                realm.create('warehouse', {
                    id:parram.whId,
                    productCode:parram.productCode,
                    updateDate:parram.importDate,
                    quantity:parram.quantity
                },'modified');
                })
                realm.close()
                navigation.navigate("danhSachSanPham",{checkRender:true})
            }else{
                const maxId = realm.objects('Product')
            let id = 1
            if(maxId.length !== 0){
               id = maxId.sorted('id',true)[0].id + 1
            }
            const maxIdDetail = realm.objects('ProductDetail')
            let idDetail = 1
            if(maxId.length !== 0){
               idDetail = maxIdDetail.sorted('id',true)[0].id + 1
            }
            const maxIdWH = realm.objects('warehouse')
            let idWH = 1
            if(maxId.length !== 0){
                idWH = maxIdWH.sorted('id',true)[0].id + 1
            }
            realm.write(() => {
                realm.create('Product', {
                    id,
                    productName:parram.productName,
                    productCode:parram.productCode,
                    description:parram.description,
                    unit:parram.unit,
                    weight:parram.weight,
                    productType:parram.productType,
                    brand:parram.brand,
                    createDate:parram.createDate,
                    status:parram.status,
                });
                realm.create('ProductDetail', {
                    id:idDetail,
                    productId:id,
                    productCode:parram.productCode,
                    status:1,
                    businessStatus:1,
                    importDate:parram.importDate,
                    applyDate:parram.applyDate,
                    retailPrice:parseFloat(parram.retailPrice),
                    wholeSalePrice:parseFloat(parram.wholeSalePrice),
                    importPrice:parseFloat(parram.importPrice),
                    customUnit:parram.customUnit
                });
                realm.create('warehouse', {
                    id:idWH,
                    productCode:parram.productCode,
                    updateDate:parram.importDate,
                    quantity:parram.quantity
                });
              });
            }
            
              
            realm.close()
        } catch (error) {
            console.log(error)
        }
    })
}