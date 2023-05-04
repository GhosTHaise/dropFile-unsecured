

/** 
@param {string} _val 
**/
const PadZero = (_val) => {
    return _val.padStart(2,"0");
}

const Date_Now_String_For_Dir_Name = () => {
    const date_now = new Date();
    const day = PadZero(String(date_now.getDate()));
    const month = PadZero(String(date_now.getMonth() + 1));
    const year = date_now.getFullYear();

    return `${day}-${month}-${year}`;
}


export {
    Date_Now_String_For_Dir_Name
}