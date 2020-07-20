import Realm from 'realm'
import moment from 'moment'
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
import { showMessage, hideMessage } from "react-native-flash-message";
export const saveDataProduct = (parram,navigation) => {
    console.log("saveDataProduct -> parram", parram)
    if(!parram.productName || !parram.productCode ||!parram.unit || !parram.retailPrice || !parram.importPrice ){
        showMessage({
            message: "Vui lòng kiểm tra lại dữ liệu!...",
            type: "warning",
          });
          return
    }
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
                showMessage({
                    message: "Thành Công...",
                    type: "success",
                  });
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
              showMessage({
                message: "Thành Công...",
                type: "success",
              });
              navigation.goBack()
            }
            realm.close()
        } catch (error) {
            console.log(error)
        }
    })
}

export const saveInvoiceImport = (parram,navigation) => {
    console.log("saveDataProduct -> parram", parram)
    
    const {dataProducts=[],supplier={},phiGiaoHang=0,chietKhau=0} = parram || {}
    const {
        supplierCode = ``,
        supplierName = ``
    } = supplier
    let totalQty = 0, amountTotal = 0
    
    dataProducts.forEach(i => {
        totalQty += (parseFloat(i.importQty) || 0)
        amountTotal += (parseFloat(i.importQty) * parseFloat(i.retailPrice))
    })
    if(supplierCode === `` || totalQty === 0 || dataProducts.length === 0){
        showMessage({
            message: "Vui lòng kiểm tra lại dữ liệu!...",
            type: "warning",
          });
          return
    }
    Realm.open({
        schema:[ImportGoodsSchema,ImportGoodsDetailSchema,WarehouseSchema]
    }).then(realm => {
        try {
            const maxId = realm.objects('ImportGoods')
            let id = 1
            if(maxId.length !== 0){
               id = maxId.sorted('id',true)[0].id + 1
            }
            
            // const maxIdWH = realm.objects('warehouse')
            // let idWH = 1
            // if(maxId.length !== 0){
            //     idWH = maxIdWH.sorted('id',true)[0].id + 1
            // }

            realm.write(() => {
                realm.create('ImportGoods', {
                    id,
                    invoiceCode:`IMP${id}`,
                    createDate:moment().format(`YYYYMMDD`),
                    suplierCode:supplierCode,
                    suplierName:supplierName,
                    status:1,
                    totalQuantity:parseFloat(totalQty) ,
                    totalAmount:parseFloat(amountTotal),
                    discount:parseFloat(chietKhau),
                    emtryFee:parseFloat(phiGiaoHang),
                    otheCost:0,
                    updateDate:moment().format(`YYYYMMDD`),
                    note:'',
                });
                dataProducts.forEach(impItem => {
                    const maxIdDetail = realm.objects('ImportGoodsDetail')
                    let idDetail = 1
                    if(maxIdDetail.length !== 0){
                        idDetail = maxIdDetail.sorted('id',true)[0].id + 1
                    }
                    const dataWH = realm.objects("warehouse")
                    const objWH = dataWH.find(i => (i.productCode === impItem.productCode))
                    realm.create('ImportGoodsDetail', {
                        id:idDetail,
                        importGoodsId:id,
                        invoiceCode:`IMP${id}`,
                        productCode:impItem.productCode,
                        productName:impItem.productName,
                        quantity:parseFloat(impItem.importQty),
                        price:parseFloat(impItem.retailPrice),
                        importDate:moment().format(`YYYYMMDD`),
                        updateDate:moment().format(`YYYYMMDD`),
                    });
                    realm.create('warehouse', {
                        id:objWH.id,
                        quantity:(objWH.quantity + parseFloat(impItem.importQty))
                    },'modified');
                })
                
            })
            showMessage({
                message: "Thành Công...",
                type: "success",
              });
              navigation.navigate("donNhapHang",{checkRender:true})
            realm.close()
        } catch (error) {
            console.log(error)
        }
    })
}


export const saveInvoiceExport = (parram,navigation) => {
    console.log("saveInvoiceExport -> parram", parram)
    
    const {dataProducts=[],customer={},phiGiaoHang=0,chietKhau=0,note=``} = parram || {}
    const {
        customerCode = ``,
        customerName = ``
    } = customer
    let totalQty = 0, amountTotal = 0
    
    dataProducts.forEach(i => {
        totalQty += (parseFloat(i.importQty) || 0)
        amountTotal += (parseFloat(i.importQty) * parseFloat(i.retailPrice)) 
    })
    let totalAmount = (amountTotal - (amountTotal * parseFloat(chietKhau))/100 ) + parseFloat(phiGiaoHang)
    if(customerCode === `` || totalQty === 0 || dataProducts.length === 0){
        showMessage({
            message: "Vui lòng kiểm tra lại dữ liệu!...",
            type: "warning",
          });
          return
    }
    Realm.open({
        schema:[exportGoodsSchema,exportGoodsDetailSchema,WarehouseSchema]
    }).then(realm => {
        try {
            const maxId = realm.objects('exportGoods')
            let id = 1
            if(maxId.length !== 0){
               id = maxId.sorted('id',true)[0].id + 1
            }
            
            // const maxIdWH = realm.objects('warehouse')
            // let idWH = 1
            // if(maxId.length !== 0){
            //     idWH = maxIdWH.sorted('id',true)[0].id + 1
            // }

            realm.write(() => {
                realm.create('exportGoods', {
                    id,
                    invoiceCode:`EXP${id}`,
                    createDate:moment().format(`YYYYMMDD`),
                    customerCode:customerCode,
                    customerName:customerName,
                    status:1,
                    totalQuantity:parseFloat(totalQty) ,
                    totalAmount:parseFloat(totalAmount),
                    discount:parseFloat(chietKhau),
                    emtryFee:parseFloat(phiGiaoHang),
                    otheCost:0,
                    updateDate:moment().format(`YYYYMMDD`),
                    note,
                    payMethod:'',
                    typePrice:0,
                    paymentStatus:1 ,
                });
                dataProducts.forEach(empItem => {
                    const maxIdDetail = realm.objects('exportGoodsDetail')
                    let idDetail = 1
                    if(maxIdDetail.length !== 0){
                        idDetail = maxIdDetail.sorted('id',true)[0].id + 1
                    }
                    const dataWH = realm.objects("warehouse")
                    const objWH = dataWH.find(i => (i.productCode === empItem.productCode))
                    realm.create('exportGoodsDetail', {
                        id:idDetail,
                        exportGoodsId:id,
                        invoiceCode:`EXP${id}`,
                        productCode:empItem.productCode,
                        productName:empItem.productName,
                        quantity:parseFloat(empItem.importQty),
                        price:parseFloat(empItem.retailPrice),
                        exportDate:moment().format(`YYYYMMDD`),
                        updateDate:moment().format(`YYYYMMDD`),
                    });
                    realm.create('warehouse', {
                        id:objWH.id,
                        quantity:(objWH.quantity - parseFloat(empItem.importQty))
                    },'modified');
                })
                
            })
            showMessage({
                message: "Thành Công...",
                type: "success",
              });
            //   navigation.state.params.onSelect({ checkRender: true });
            //   navigation.goBack()
              navigation.navigate("DonHang",{checkRender:true})
            realm.close()
        } catch (error) {
            console.log(error)
        }
    })
}


export const saveInvoiceCheck = (parram,navigation) => {
    console.log("saveInvoiceExport -> parram", parram)
    
    const {dataProducts=[],check=1,note=``} = parram || {}

    let totalQty = 0, amountTotal = 0
    
    dataProducts.forEach(i => {
        totalQty += (parseFloat(Math.abs(i.differentQty)) || 0)
        amountTotal += (parseFloat(Math.abs(i.differentQty)) * parseFloat(i.retailPrice))
    })

    if( totalQty === 0 || dataProducts.length === 0){
        showMessage({
            message: "Vui lòng kiểm tra lại dữ liệu!...",
            type: "warning",
          });
          return
    }
    Realm.open({
        schema:[CheckGoodsSchema,CheckGoodsDetailSchema,WarehouseSchema]
    }).then(realm => {
        try {
            const maxId = realm.objects('CheckGoods')
            let id = 1
            if(maxId.length !== 0){
               id = maxId.sorted('id',true)[0].id + 1
            }
            
            // const maxIdWH = realm.objects('warehouse')
            // let idWH = 1
            // if(maxId.length !== 0){
            //     idWH = maxIdWH.sorted('id',true)[0].id + 1
            // }

            realm.write(() => {
                realm.create('CheckGoods', {
                    id,
                    ballotCode:`CHK${id}`,
                    createDate:moment().format(`YYYYMMDD`),
                    status:check,
                    totalQuantity:parseFloat(totalQty) ,
                    totalAmount:parseFloat(amountTotal),
                    updateDate:moment().format(`YYYYMMDD`),
                    note,
                    type:check,
                });
                dataProducts.forEach(empItem => {
                    const maxIdDetail = realm.objects('CheckGoodsDetail')
                    let idDetail = 1
                    if(maxIdDetail.length !== 0){
                        idDetail = maxIdDetail.sorted('id',true)[0].id + 1
                    }
                    const dataWH = realm.objects("warehouse")
                    const objWH = dataWH.find(i => (i.productCode === empItem.productCode))
                    realm.create('CheckGoodsDetail', {
                        id:idDetail,
                        checkGoodsId:id,
                        invoiceCode:`IMP${id}`,
                        productCode:empItem.productCode,
                        productName:empItem.productName,
                        quantity:parseFloat(empItem.importQty),
                        differentQty:parseFloat(empItem.differentQty),
                        price:parseFloat(empItem.retailPrice),
                        updateDate:moment().format(`YYYYMMDD`),
                        dateNo:moment().format(`YYYYMMDD`),
                    });
                    realm.create('warehouse', {
                        id:objWH.id,
                        quantity:parseFloat(empItem.importQty)
                    },'modified');
                })
                
            })
            showMessage({
                message: "Thành Công...",
                type: "success",
              });
            //   navigation.state.params.onSelect({ checkRender: true });
            //   navigation.goBack()
              navigation.navigate("kiemHang",{checkRender:true})
            realm.close()
        } catch (error) {
            console.log(error)
        }
    })
}