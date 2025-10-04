import openDatabase from "./DbModule";
import * as Datefns from 'date-fns'
import { AddComas } from "./generalModules";
export async function getWallets(){

    try{
        // const dbx = await openDatabase()
        // cashTotal = await dbx.getAllAsync(`SELECT * from wallets`)
        // console.log(cashTotal)
        // return cashTotal;
        const dbx = await openDatabase()
        let cashTotal = await dbx.getAllAsync(`SELECT balance,wName,walletId,themeColor from wallets`)
        return cashTotal;
        // console.log(cashTotal)
        // cashTotal = cashTotal.map((wlt)=>String(wlt.balance).replace(/,/g,""))
        // console.log(cashTotal)
        // cashTotal = cashTotal.reduce((sum,balance)=>sum+Number(balance),0)
        // return cashTotal;
    }
    catch(e){
       console.log(e)
    }

}
export async function getCashTotal(){
    let wallets = await getWallets()
    let cashTotal = wallets.map((wlt)=>String(wlt.balance).replace(/,/g,""))
    console.log(cashTotal)
    cashTotal = cashTotal.reduce((sum,balance)=>sum+Number(balance),0)
    return cashTotal;
}
export async function getHomeScreenDetails(){
    try{
        const dbx = await openDatabase()
        let homeScreenDetails = await dbx.getAllAsync(`
            SELECT transactions.transId,transactions.transSign,transactions.transType,transactions.amount,transactions.transDate,transactions.transTime,transactions.transDescription,wallets.themeColor,wallets.wName
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

export async function getSpentinWeek(){
    const dateOnSunday = Datefns.format((Datefns.startOfWeek(new Date())),"yyyy-MM-dd")
    try{ 
        const dbx = await openDatabase();
        const transactionsInPastWeek = await dbx.getAllAsync(`SELECT amount,transDate from transactions where transDate >= "${dateOnSunday}" and transSign=-1 `)
        console.log(transactionsInPastWeek, " are the transactions this week")
        const weeklySpent = transactionsInPastWeek.reduce((sum,transaction)=>sum+transaction.amount,0)
        console.log(weeklySpent);

        return AddComas(String(weeklySpent));
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