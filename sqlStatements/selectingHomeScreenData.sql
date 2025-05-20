SELECT transactions.transId,transactions.transTitle,transactions.amount,transactions.transDate,transactions.transTime,wallets.themeColor,wallets.wName
FROM transactions INNER JOIN wallets
ON transactions.walletId = wallets.walletId
ORDER BY transDate DESC,transTime DESC
LIMIT 3
