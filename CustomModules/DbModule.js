import * as SQLite from 'expo-sqlite'
let dbInstance = null;
export default async function openDatabase(){
    if(!dbInstance){
       try{
         dbInstance = await SQLite.openDatabaseAsync("wekha.db");
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS wallets(walletId INTEGER PRIMARY KEY,wName TEXT,balance INTEGER,themeColor TEXT)`);
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS target(targetId INTEGER PRIMARY KEY,target INTEGER)`);
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS transactions(transId INTEGER PRIMARY KEY NOT NULL,walletId INTEGER,transTitle TEXT,transDescription TEXT,amount INTEGER,transDate TEXT,transTime TEXT,FOREIGN KEY(walletId)REFERENCES wallets(walletId))`)
         console.log("tables created successfully");
       }
       catch(e){
        console.log(e);
       }
        
    }
    return dbInstance;
}