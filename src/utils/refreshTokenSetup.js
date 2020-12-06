export const refreshTokenSetup=(res)=>{
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60)* 1000;

    const refreshToken = async()=>{
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 -5 * 60) * 1000;
        console.log('new Auth Response is ',newAuthRes)
        console.log("New Token is ", newAuthRes.id_token)
        setTimeout(refreshTokenSetup, refreshTiming)
    }
    setTimeout(refreshToken, refreshTiming)
}