const getUrlParameter = (paramName: string) => {
    let name = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results =  typeof window !== "undefined" ? regex.exec(location.search) : null;
    if (results) return decodeURIComponent(results[1].replace(/\+/g, " "))
    return null
};

export default getUrlParameter;
