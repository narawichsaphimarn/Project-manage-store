const storeInformationRepo = require("../repositories/storeInformation.repo")
const personalInformationRepo = require("../repositories/personalInformation.repo")
const storeInfoPojo = require("../pojo/storeInformation.pojo")
const personInfoPojo = require("../pojo/person.pojo")
const warehouseRepo = require("../repositories/warehouse.repo")
const warejousePojo = require("../pojo/warehouse.pojo")
const tradingOrdersRepo = require("../repositories/tradingOrders.repo")
const productHistoryRepo = require("../repositories/productHistory.repo")
const tradingRoleRepo = require("../repositories/tradingRole.repo")
const tradingOrdersPojo = require("../pojo/tradingOrders.pojo")
const productHistoryPojo = require("../pojo/productHistory.pojo")

module.exports = async (db) => {
    try {
        createStoreInfo = async (mock) => {
            let store = storeInfoPojo.create
            let person = personInfoPojo.create
            store.name = mock.name
            person.firstname = mock.firstname
            person.lastname = mock.lastname
            person.phone_number = mock.phone_number
            const sf = await storeInformationRepo.create(store)
            if (sf != null) {
                const pf = await personalInformationRepo.create(person)
                sf.setPersonalInformation(pf)
            }
        }

        createStoreAndItems = async (mock) => {
            let store = storeInfoPojo.create
            let person = personInfoPojo.create
            store.name = mock.name
            person.firstname = mock.firstname
            person.lastname = mock.lastname
            person.phone_number = mock.phone_number
            const sf = await storeInformationRepo.create(store)
            const tr = await tradingRoleRepo.findByName(mock.role)
            if (sf != null) {
                const pf = await personalInformationRepo.create(person)
                sf.setPersonalInformation(pf)
                let dataItem = mock.dataValues
                if (dataItem.length != 0) {
                    let trad = tradingOrdersPojo.create
                    const to = await tradingOrdersRepo.create(trad)
                    to.setTradingRole(tr)
                    let price = 0
                    price = await Promise.all(dataItem.map(async (element) => {
                        price += element.price
                        const wr = await warehouseRepo.create(element.warehouse)
                        wr.setStoreInformation(sf)
                        let product = productHistoryPojo.create
                        product.old_value = 0
                        product.price = element.price
                        product.value = element.warehouse.value
                        const ph = await productHistoryRepo.create(product)
                        ph.setTradingOrders(to)
                        ph.setWarehouse(wr)
                        return price
                    })
                    )
                    to.price = price[0]
                    to.setStoreInformation(sf)
                    await to.save()
                }
            }
        }

        await createStoreInfo({
            name: "merchant1",
            firstname: "merchant1",
            lastname: "merchant1",
            phone_number: "1111111111"
        })

        await createStoreInfo({
            name: "merchant2",
            firstname: "merchant2",
            lastname: "merchant2",
            phone_number: "222222222222"
        })

        await createStoreInfo({
            name: "merchant3",
            firstname: "merchant3",
            lastname: "merchant3",
            phone_number: "3333333333333"
        })

        await createStoreAndItems({
            name: "merchant4",
            firstname: "merchant4",
            lastname: "merchant4",
            phone_number: "44444444444",
            dataValues: []
        })

        await createStoreAndItems({
            name: "merchant5",
            firstname: "merchant5",
            lastname: "merchant5",
            phone_number: "55555555555",
            role: "BUY",
            dataValues: [
                {
                    price: 1300,
                    warehouse: {
                        name: "ขนมปังเบอร์เกอร์",
                        value: "6",
                        price: "40",
                        image: "https://www.farmhouse.co.th/uploads/products/2015/9/1442481978.png",
                        description: "(1แพ็คมี6ชิ้น)",
                    }
                },
            ]
        })

        await createStoreAndItems({
            name: "merchant6",
            firstname: "merchant6",
            lastname: "merchant6",
            phone_number: "666666666",
            role: "BUY",
            dataValues: [
                {
                    price: 2500,
                    warehouse: {
                        name: "ซอสพริก",
                        value: "50",
                        price: "50",
                        image: "https://backend.tops.co.th/media/catalog/product/8/8/8850343000029_e6-12-2018.jpg",
                        description: "ถุง500ก./ซอง",
                    }
                },
                {
                    price: 2500,
                    warehouse: {
                        name: "ซอสมะเขือเทศ",
                        value: "50",
                        price: "50",
                        image: "https://backend.tops.co.th/media/catalog/product/8/8/8850511321147_e25-05-2020.jpg",
                        description: "ถุง500ก./ซอง",
                    }
                },
                {
                    price: 800,
                    warehouse: {
                        name: "แป้งทอดกรอบ",
                        value: "50",
                        price: "25",
                        image: "https://ocs-k8s-prod.s3.ap-southeast-1.amazonaws.com/PRODUCT_1589260655788.jpeg",
                        description: "-",
                    }
                },
                {
                    price: 400,
                    warehouse: {
                        name: "ซอสน้ำสลัด",
                        value: "50",
                        price: "15",
                        image: "https://lh3.googleusercontent.com/proxy/vuGMRbjRYrLscB7PrXoaJTEjL-i2feCgOiU6pVAHK6MnzutCNTHcViKxzzosu3a6TKvmTWw_ygrI37M-EfPzdFTwUPol_Yf3sbxFPgYbFAsxLsNNog3Wt_8-gNp7mUYayQ",
                        description: "ถุง500ก.",
                    }
                }
            ]
        })
    } catch (error) {
        console.error(error);
    }
}