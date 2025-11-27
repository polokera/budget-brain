import openMyDatabase from "./DbModule";
import {isSunday,formatDate,previousSunday,startOfWeek,format} from 'date-fns'
import { AddComas } from "./generalModules";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function getWallets(){

    try{
        // const dbx = await openMyDatabase()
        // cashTotal = await dbx.getAllAsync(`SELECT * from wallets`)
        // console.log(cashTotal)
        // return cashTotal;
        const dbx = await openMyDatabase()
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
        const dbx = await openMyDatabase()
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
        const dbx = await openMyDatabase()
        let referenceDate;
        // let weeklyTargetObj = await dbx.getFirstAsync(`SELECT target from target`)
        // return weeklyTargetObj.target;
        const targetFromAsyncStorage = await AsyncStorage.getItem("weeklyTarget");
        console.log(targetFromAsyncStorage," is the target that was stored in async storage")
        const dateToday = new Date();
        if(isSunday(dateToday)){
            //check whether todays date is in database
             const formattedDate = formatDate(dateToday,"yyyy-MM-dd");
            const result = await dbx.getAllAsync(`SELECT COUNT(*) as count FROM weeks where weekStart = "${formattedDate}"`)
           if(result[0].count==0 || result[0].count == undefined){
            //if the date doesnt exist in the weeks table add it
            const result2 = await dbx.runAsync(`INSERT INTO weeks(weekStart,weekTarget,weekSPent)values(?,?)`,[formattedDate,Number(targetFromAsyncStorage),0])
            result2>0&&console.log("its sunday and a new week has been created")
        }
            console.log(parsedDate)
           //test this on a sunday please
            referenceDate = formattedDate;
        }
        else{
            const parsedDate = formatDate(dateToday,"yyyy-MM-dd");
            const previousSundayDate = formatDate(previousSunday(new Date(parsedDate)),"yyyy-MM-dd")
            const result = await dbx.getAllAsync(`SELECT COUNT(*) as count FROM weeks where weekStart = "${previousSundayDate}"`)
            console.log(result)
            referenceDate=previousSundayDate;
            if(result[0].count == undefined || result[0].count == 0){
               //this means this week doesnt exist yet in the database
               //create the week give it a weekid,startdate and weektarget
               //weektarget will be stored in asyncStorage
                console.log(previousSundayDate, " is the previous sunday")
                const result2 = await dbx.runAsync(`INSERT INTO weeks(weekStart,weekTarget,weekSPent)values(?,?,?)`,[previousSundayDate,targetFromAsyncStorage,0])
                result2.changes>0&&console.log("not a sunday week created");
            }
        }
        const weeklyTarget = await dbx.getAllAsync(`SELECT weekTarget from weeks where weekStart = "${referenceDate}"`);
        console.log(weeklyTarget.weeklyTarget)
        return weeklyTarget[0].weekTarget;
    }
    catch(e){
        console.log(e)
    }
}

export async function getSpentinWeek(){
    const dateOnSunday = format((startOfWeek(new Date())),"yyyy-MM-dd")
    try{ 
        const dbx = await openMyDatabase();
        const transactionsInPastWeek = await dbx.getAllAsync(`SELECT amount,transDate from transactions where transDate >= "${dateOnSunday}" and transSign=-1 `)
        console.log(transactionsInPastWeek, " are the transactions this week")
        const weeklySpent = transactionsInPastWeek.reduce((sum,transaction)=>sum+transaction.amount,0)
        // console.log(weeklySpent);

        return AddComas(String(weeklySpent));
    }
    catch(e){
        console.log(e)
    }
    
}

export async function Test(){
    try{
        const dbx = await openMyDatabase()
        let test = await dbx.getAllAsync(`SELECT * from wallets`)
        console.log(test)
        test = test.reduce((sum,wallet)=>sum+wallet.balance,0)
        return test;
    }
    catch(e){
        console.log(e)
    }
}