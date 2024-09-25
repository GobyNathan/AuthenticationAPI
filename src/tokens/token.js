let refreshTokens = [];

function revokateToken(token) {
    // Logica per rimuovere il token dal database o dalla memoria
    refreshTokens = refreshTokens.filter(t => t !== token);
    console.log(`Token revoked: ${token}`);
}

function revokeAllTokens() {
    console.log("Revoking all tokens...");
    for (const token of refreshTokens) {
        console.log(`Revoking token: ${token}`);
        revokateToken(token);
    }
    console.log("All tokens revoked.");
}

function addRefreshToken(token) {
    refreshTokens.push(token);
}

function verifyRefreshToken(token) {
    return refreshTokens.includes(token);
}

module.exports = { revokeAllTokens, addRefreshToken, verifyRefreshToken, refreshTokens };