let refreshTokens = [];

function revokateToken(token) {
    refreshTokens = refreshTokens.filter(t => t !== token);
    console.log(`Token revoked: ${token}`);
}

function revokeAllTokens() {
    for (const token of refreshTokens) {
        revokateToken(token);
    }
}

function addRefreshToken(token) {
    refreshTokens.push(token);
}

function verifyRefreshToken(token) {
    return refreshTokens.includes(token);
}

module.exports = { revokeAllTokens, addRefreshToken, verifyRefreshToken, refreshTokens };