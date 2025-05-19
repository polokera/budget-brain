import * as SQLite from 'expo-sqlite'
let dbInstance = null;
export default async function openDatabase(){
    if(!dbInstance){
       try{
         dbInstance = await SQLite.openDatabaseAsync("shaymoto.db");
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS wallets(walletsId INTEGER PRIMARY KEY,wName TEXT,initialAmount INTEGER,themeColor TEXT)`);
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS target(targetId INTEGER PRIMARY KEY,target INTEGER)`);
         await dbInstance.execAsync(`CREATE TABLE IF NOT EXISTS transactions(transId TEXT PRIMARY KEY NOT NULL,walletsId INTEGER,transTitle TEXT,transDescription TEXT,amount INTEGER,transDate TEXT,transTime TEXT,FOREIGN KEY(walletsId)REFERENCES wallets(walletId))`)
         console.log("tables created successfully");
       }
       catch(e){
        console.log(e);
       }
        
    }
    return dbInstance;
}