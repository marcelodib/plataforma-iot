module.exports.validatorToken = function (token) {
    const auxToken = token.split("-");

    if (!Array.isArray(auxToken) || auxToken.length !== 5) {
        return false;
    }

    if (auxToken[0].length === 8 && 
        auxToken[1].length === 4 && 
        auxToken[2].length === 4 && 
        auxToken[3].length === 4 && 
        auxToken[4].length === 12) {
            return true;
    }

    return false;
};