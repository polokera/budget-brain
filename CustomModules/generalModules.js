
export function AddComas(value){
    //this formats numbers and adds comas to them e.g 1100 to 1,100
        const numeric = value.replace(/[^0-9]/g,'');
        //removes all non numbers including commas
        const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        //formats the values at this point there should be no previous commas 
        //if there are commas it wont work thats why we have to remove commas at first.
        return formatted;
}

export function removeCommas(value){
    //this removes commas from a value
    //for math functions, values with commas will not work properly 
    //so we need to remove the commas
    const cleanValue = Number(String(value).replace(/,/g,""))
    return cleanValue;
}