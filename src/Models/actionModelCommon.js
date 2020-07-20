
import {ProductSchema,ProductDetailSchema,WarehouseSchema} from '../Models/createDBRealm'
import Realm from 'realm'
export const parseRealmToObject = (object) => {
    return JSON.parse(JSON.stringify(object))
}
export const listProduct = async () => {
    let dataProducts=[]
    let a = await Realm.open({
        schema:[ProductSchema,ProductDetailSchema,WarehouseSchema]
      }).then(realm => {
        const dataPrice = realm.objects("ProductDetail")
        const dataWH = realm.objects("warehouse")
        const data = realm.objects('Product').map(item => {
        console.log("listProduct -> data", data)
          const obj = dataPrice.find(i => (i.productCode === item.productCode))
          const objWH = dataWH.find(i => (i.productCode === item.productCode))

          return {
            ...parseRealmToObject(obj),
            detailId:obj.id,
            ...parseRealmToObject(item),
            // obj,
            whId:objWH.id,
            quantity:objWH.quantity,
            icon:faImage,
            key:item.id,
            handleView:this.handleView,
            key:item.productCode}
        })
        dataProducts = data
        realm.close()
      })
    return dataProducts
    
}