import openDatabase from "./DbModule";
export async function getCashTotal(){

    try{
        // const dbx = await openDatabase()
        // cashTotal = await dbx.getAllAsync(`SELECT * from wallets`)
        // console.log(cashTotal)
        // return cashTotal;
        const dbx = await openDatabase()
        let cashTotal = await dbx.getAllAsync(`SELECT * from wallets`)
        console.log(cashTotal)
        cashTotal = cashTotal.reduce((sum,wallet)=>sum+wallet.balance,0)
        return cashTotal;
    }
    catch(e){
       console.log(e)
    }

}

export async function getHomeScreenDetails(){
    try{
        const dbx = await openDatabase()
        let homeScreenDetails = await dbx.getAllAsync(`
            SELECT transactions.transId,transactions.transTitle,transactions.amount,transactions.transDate,transactions.transTime,wallets.themeColor,wallets.wName
            FROM transactions INNER JOIN wallets
            ON transactions.walletId = wallets.walletId
            ORDER BY transDate DESC,transTime DESC
            LIMIT 3
        `)
        //homeScreenDetails = await dbx.getAllAsync(`SELECT * FROM transactions`)
        return homeScreenDetails;
    }
    catch(e){
        console.log(e)
    }
}

export async function getWeeklyTarget(){
    try{
        const dbx = await openDatabase()
        let weeklyTargetObj = await dbx.getFirstAsync(`SELECT target from target`)
        return weeklyTargetObj.target;
    }
    catch(e){
        console.log(e)
    }
}

export async function Test(){
    try{
        const dbx = await openDatabase()
        let test = await dbx.getAllAsync(`SELECT * from wallets`)
        console.log(test)
        test = test.reduce((sum,wallet)=>sum+wallet.balance,0)
        return test;
    }
    catch(e){
        console.log(e)
    }
}