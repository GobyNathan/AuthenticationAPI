const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saveUser, findUserByEmail, findAllEmails } = require('../models/user');
const { authenticateToken, generateAccessToken, parseCookies } = require('../auth/auth');
const { revokeAllTokens, addRefreshToken, verifyRefreshToken } = require('../tokens/token');
let { refreshTokens } = require('../tokens/token');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("./home");
});

router.get("/login", (req, res) => {
    res.render("./login");
});

router.get("/register", (req, res) => {
    res.render("./register");
});

router.post("/register", async (req, res) => {
    try {
        const { Email, password } = req.body;
        if (!Email.includes('@')) {
            return res.status(400).send('Invalid email!');
        }
        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long!');
        }
        const existingUser = await findUserByEmail(Email);
        if (existingUser) {
            return res.status(400).send('User already exists!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: Date.now().toString(),
            Email,
            password: hashedPassword,
        };
        await saveUser(user);
        res.redirect("/login");
    } catch (err) {
        res.status(500).redirect("/register");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { Email, password } = req.body;
        const user = await findUserByEmail(Email);
        if (!user) {
            return res.status(400).send('User not found!');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send('Invalid password!');
        }
        const accessToken = generateAccessToken({ Email: user.Email, Password: user.password, expiresIn: '15m' });
        const refreshToken = jwt.sign({ Email: user.Email, Password: user.password }, process.env.REFRESH_TOKEN_SECRET);
        addRefreshToken(refreshToken);
        res.setHeader('Set-Cookie', `jwt=${accessToken}; HttpOnly`);
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Error logging in user');
    }
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        console.error('Refresh token is null');
        return res.sendStatus(401);
    }
    if (!verifyRefreshToken(refreshToken)) {
        console.error('Invalid refresh token');
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.sendStatus(403);
        }
    });
});

router.get('/users', authenticateToken, async (req, res) => {
    try {
        const emailList = await findAllEmails();
        const users = emailList.map(email => ({ email }));
        res.render('users', { users });
    } catch (error) {
        res.status(500);
    }
});

router.get("/logout", authenticateToken, async (req, res) => {
    try {
        const cookies = parseCookies(req);
        const token = cookies.jwt;

        if (token) {
            refreshTokens = refreshTokens.filter(t => t !== token);
        }
        res.cookie('jwt', '', { expires: new Date(0) });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error logging out');
    }
});

module.exports = router;