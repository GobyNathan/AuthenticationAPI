const { connectDB } = require('../db/db');

async function saveUser(user) {
    try {
        const db = await connectDB();
        const collection = db.collection("users");
        const result = await collection.insertOne(user);
        console.log(`User created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}

async function findUserByEmail(email) {
    try {
        const db = await connectDB();
        const collection = db.collection("users");
        return await collection.findOne({ Email: email });
    } catch (error) {
        throw error;
    }
}

async function findAllEmails() {
    try {
        const db = await connectDB();
        const collection = db.collection("users");
        const users = await collection.find({}, { projection: { Email: 1, _id: 0 } }).toArray();
        return users.map(user => user.Email);
    } catch (error) {
        throw error;
    }
}

module.exports = { saveUser, findUserByEmail, findAllEmails };