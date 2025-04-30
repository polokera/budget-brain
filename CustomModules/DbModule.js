import * as SQLite from 'expo-sqlite'
let dbInstance = null;
export default async function openDatabase(){
    if(!dbInstance){
        try{
            dbInstance = await SQLite.openDatabaseAsync("database95.db");
            await dbInstance.execAsync(
            `CREATE TABLE IF NOT EXISTS wallets(id INTEGER PRIMARY KEY,wName TEXT,initialAmount INTEGER,themeColor TEXT);`);
            await dbInstance.execAsync(' CREATE TABLE IF NOT EXISTS target(targetId INTEGER AUTO INCREMENT PRIMARY KEY,target INTEGER);')
            console.log("connection successful")
        }
        catch(error){
            console.log(error)
        }
    }
    return dbInstance;
}