import * as dotenv from "dotenv";
dotenv.config();

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

const getAccessDropBoxUrl = () => {
    const queryParams = queryString.stringify({
        response_type: 'code',
        client_id: process.env.DROPBOX_APP_KEY,
        redirect_uri: process.env.APP_REDIRECT_URL,
        scope: 'files.metadata.read', 
    })
    const authUrl = `https://www.dropbox.com/oauth2/authorize?${queryParams}`;
    
    return authUrl;
}


export {
    Date_Now_String_For_Dir_Name,
    getAccessDropBoxUrl
}