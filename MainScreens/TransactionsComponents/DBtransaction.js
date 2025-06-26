import openDatabase from '../../CustomModules/DbModule'
import * as DateFns from 'date-fns'

export async function WalletToWalletTrans(data){
    const {amount,from,to,extraFees} = data;
    const cashTotal = Number(amount)+Number(extraFees)
    const dbx = await openDatabase()
    const date = DateFns.format(new Date(),"yyyy-MM-dd")
    const time = DateFns.format(new Date(),"HHmm")
    try{
        await dbx.withTransactionAsync(async()=>{
            const result = await dbx.getFirstAsync(`SELECT COUNT(*) from transactions`);
            const transId = result['COUNT(*)'] +100;
           await dbx.runAsync(`INSERT into transactions(transId,walletId,transType,transDescription,amount,transDate,transTime,transSign)VALUES(?,?,?,?,?,?,?,?)`,[transId,from.walletId,"wallet transfer",`MwK${amount} moved from ${from.wName} to ${to.wName}`,Number(extraFees),date,time,-1])
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
    const cashTotal = Number(amount)+Number(extraFees)
    const dbx = await openDatabase()
    const date = DateFns.format(new Date(),"yyyy-MM-dd")
    const time = DateFns.format(new Date(),"HHmm")
    try{

        await dbx.withTransactionAsync(async()=>{
            const result = await dbx.getFirstAsync(`SELECT COUNT(*) from transactions`);
            const transId = result['COUNT(*)'] +100;
           await dbx.runAsync(`INSERT into transactions(transId,walletId,transType,transDescription,amount,transDate,transTime,transSign)VALUES(?,?,?,?,?,?,?,?)`,[transId,from.walletId,transType.transType,description,cashTotal,date,time,-1])
           await dbx.runAsync(`UPDATE wallets set balance = balance - ? where walletId = ?`,[cashTotal,from.walletId])
        })
        console.log("logged")
    }
    catch(e){
        console.log(e)
    }
}