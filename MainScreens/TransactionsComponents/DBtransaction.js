import openMyDatabase from '../../CustomModules/DbModule'
import * as DateFns from 'date-fns'
import { removeCommas } from '../../CustomModules/generalModules';

export async function WalletToWalletTrans(data){
    const {amount,from,to,extraFees} = data;
    const cashTotal = Number(removeCommas(amount))+Number(removeCommas(extraFees))
    const dbx = await openMyDatabase()
    const date = DateFns.format(new Date(),"yyyy-MM-dd")
    const time = DateFns.format(new Date(),"HHmm")
    try{
        const weekId = await dbx.getFirstAsync(`SELECT weekid from weeks ORDER BY weekstart DESC LIMIT 1`)
        await dbx.withTransactionAsync(async()=>{
            const result = await dbx.getFirstAsync(`SELECT COUNT(*) from transactions`);
            const transId = result['COUNT(*)'] +100;
           await dbx.runAsync(`INSERT into transactions(transId,walletId,transType,transDescription,amount,transDate,transTime,transSign,weekid)VALUES(?,?,?,?,?,?,?,?,?)`,[transId,from.walletId,"wallet transfer",`MwK${amount} moved from ${from.wName} to ${to.wName}`,Number(extraFees),date,time,-1,weekId])
           await dbx.runAsync(`UPDATE wallets set balance = balance - ? where walletId = ?`,[cashTotal,from.walletId])
           await dbx.runAsync(`UPDATE wallets set balance = balance + ? where walletId = ?`,[amount,to.walletId])
           console.log("checkpoint")
        })
        console.log("logged")
    }
    catch(e){
        console.log(e)
    }
}

export async function fromWalletTransaction(data){
   
    const {transType,description,amount,from,extraFees} = data;
    const cashTotal = Number(removeCommas(amount))+Number(removeCommas(extraFees))
    const dbx = await openMyDatabase()
    const date = DateFns.format(new Date(),"yyyy-MM-dd")
    const time = DateFns.format(new Date(),"HHmm")
    try{
        const {weekId} = await dbx.getFirstAsync(`SELECT weekid from weeks ORDER BY weekstart DESC LIMIT 1`)
        await dbx.withTransactionAsync(async()=>{
            const result = await dbx.getFirstAsync(`SELECT COUNT(*) from transactions`);
            const transId = result['COUNT(*)'] +100;
            console.log("maufa pro max")
           await dbx.runAsync(`INSERT into transactions(transId,walletId,transType,transDescription,amount,transDate,transTime,transSign,weekId)VALUES(?,?,?,?,?,?,?,?,?)`,[transId,from.walletId,transType.transType,description,cashTotal,date,time,-1,weekId])
          //this does not work yet pls dddddfix
          console.log(cashTotal,"is your cashtotal")
          console.log(weekId,"is your weekid")
           await dbx.runAsync(`UPDATE weeks set weekspent = weekspent + ? where weekid = ?`,[cashTotal,weekId])
           await dbx.runAsync(`UPDATE wallets set balance = balance - ? where walletId = ?`,[cashTotal,from.walletId])
        })
        console.log("logged")
    }
    catch(e){
        console.log(e)
    }
}