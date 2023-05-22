import queryString from "query-string";
import * as dotenv from "dotenv";
import fetch from "node-fetch"
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

const getAccessTokenDropBox = async (code) => {
    const accessTokenUrl = 'https://api.dropboxapi.com/oauth2/token';

    const appKey = process.env.DROPBOX_APP_KEY;
    const appSecret = process.env.DROPBOX_APP_SECRET;
    const redirectUri = process.env.APP_REDIRECT_URL;
    const authorizationCode = code;

    //Request Data
    /* const requestData = {
        code: authorizationCode,
        grant_type: 'authorization_code',
        client_id: appKey,
        client_secret: appSecret,
        redirect_uri: redirectUri,
      }; */

        const requestData = new URLSearchParams();
        requestData.append('code', authorizationCode);
        requestData.append('grant_type', 'authorization_code');
        requestData.append('redirect_uri', redirectUri);

        const authString = `${appKey}:${appSecret}`;
        const authHeader = `Basic ${Buffer.from(authString).toString('base64')}`;

   
    return new Promise(async(resolve,reject)=>{
        //Request my access Token
        try {
            const response = await fetch(accessTokenUrl,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    'Authorization': authHeader
                },
                body : requestData
            });
            const data = await response.json();
            //console.log(data)
            resolve(data.access_token)
        } catch (error) {
            reject("Get Error : "+error);
        }
    });
}


export {
    Date_Now_String_For_Dir_Name,
    getAccessDropBoxUrl,
    getAccessTokenDropBox
}