const _ =require('lodash')
exports.findPrice = (findItem, quantity) => {
    //console.log(findItem.itemDomainID.haveWholeSalesPrice)
    if (!findItem.itemDomainID.haveWholeSalesPrice){
        //console.log(false)
        return findItem.price
    }else{
        //console.log(true)
        const stepPrice = findItem.itemDomainID.wholeSalePrices
        let defaultPrice = findItem.price
        for(let i = 0;i < stepPrice.length; i++){
            //console.log(stepPrice[i].startQuantity, stepPrice[i].endQuantity, quantity, stepPrice[i].price)
            if(stepPrice[i].startQuantity<=quantity && stepPrice[i].endQuantity>=quantity ){
                defaultPrice = stepPrice[i].price
                break
            }
        }
        return defaultPrice
    }
}

exports.calculatePrice = (order) => {
    //console.log(order)
    const sendConst = order.postPriceID
    const ordersItem = order.items
    const allQuantity = ordersItem.reduce((sum,item) => {
        return sum + item.quantity
    },0)
    //console.log(allQuantity)
    //console.log(sendConst)
    const allPostPrice = sendConst.startPrice + (sendConst.perPrice * (allQuantity-1))
    //console.log(allPostPrice)
    const sumItems = ordersItem.map((item) => {
        let totalPrice = 0
        let profitPercent = 0
        if (item.promoCode === undefined){
            totalPrice = item.price * item.quantity
            profitPercent = 100*(item.price -item.buyingPrice)/item.buyingPrice
        } else {
            if (item.promoCode.type === "percent"){
                totalPrice = (item.price * ( (100 - item.promoCode.sale)/100 ) ) * item.quantity
                profitPercent = 100*( (item.price * ( (100 - item.promoCode.sale)/100 ) )  -item.buyingPrice)/item.buyingPrice
            }
            else if(item.promoCode.type === "static"){
                totalPrice = (item.price - item.promoCode.sale) * item.quantity
                profitPercent = 100*( (item.price - item.promoCode.sale) -item.buyingPrice)/item.buyingPrice
            }
        }
        //console.log(totalPrice)
        item.totalPrice = totalPrice
        item.profitPercent =profitPercent
        return item
    })
    const sumItemsCost = sumItems.reduce((sum,item) => {
        return sum + item.totalPrice
    },0)
    //console.log(sumItemsCost)
    return {
        allQuantity: allQuantity,
        allPostPrice: allPostPrice,
        sumItemsCost: sumItemsCost
    }
}

exports.createItemsOrders = (findItem, quantity, itemPrice) => {
    const stocks = findItem.stocks
    const sortStocks = _.orderBy(stocks, ['lotID'], ['ass'])
    const aviable = sortStocks
    let itemsOrdersID = []
    let newStocks = []
    let watchQuantity = quantity
    for(let i = 0; i < aviable.length; i++ ){
        if (watchQuantity == 0){
            break
        }
        if (aviable[i].watchQuantity > watchQuantity) {
            //console.log("Lot "+i+" "+aviable[i].watchQuantity+" watchQuntity"+watchQuantity)
            itemsOrdersID.push({
               itemID : findItem._id,
               lotID: aviable[i].lotID,
               quantity: watchQuantity,
               price: itemPrice,
               buyingPrice : aviable[i].price,
               transportPrice: aviable[i].transportCost,
               promoCode: findItem.promoCode
            }) 
            aviable[i].watchQuantity = aviable[i].watchQuantity - watchQuantity
            watchQuantity = 0          
        } else if (aviable[i].watchQuantity <= watchQuantity) {
           //console.log("Lot "+i+" "+aviable[i].watchQuantity+" watchQuntity"+watchQuantity)
           itemsOrdersID.push({
               itemID : findItem._id,
               lotID: aviable[i].lotID,
               quantity: aviable[i].watchQuantity,
               price: itemPrice,
               buyingPrice : aviable[i].price,
               transportPrice: aviable[i].transportCost,
               promoCode: findItem.promoCode
            }) 
           watchQuantity = watchQuantity - aviable[i].watchQuantity 
           aviable[i].watchQuantity = 0     
        }
    }
    const updateStock = findItem.stocks
    return {
       updateStock: updateStock,
       itemsOrders: itemsOrdersID
    }
}

exports.removeItemsOrders = (resetItem, quantity) => {
    const stocks = resetItem.stocks
    let sortStocks = _.orderBy(stocks, ['lotID'], ['desc'])
    let watchQuantity = quantity
    for (let i = 0; i< sortStocks.length ; i++){
        const total = sortStocks[i].totalQuantity
        const watch = sortStocks[i].watchQuantity
        if (watchQuantity == 0){
            break
        }
        if (total == watch && total > 0){
            continue
        }
        if((total - watch) <= watchQuantity) {
            sortStocks[i].watchQuantity = sortStocks[i].watchQuantity+ (total - watch)
            watchQuantity = watchQuantity - (total - watch)
        }
        else if((total - watch) > watchQuantity){
            sortStocks[i].watchQuantity = sortStocks[i].watchQuantity + watchQuantity
            watchQuantity = 0
        }
    }
    const result = _.orderBy(sortStocks, ['lotID'], ['asc'])
    return result
 }