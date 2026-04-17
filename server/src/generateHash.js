import bcrypt from 'bcrypt';

async function makeHash() {
    const plainTextPassword = "password123"; 
    const hash = await bcrypt.hash(plainTextPassword, 10);
    console.log("Хеш:");
    console.log(hash);
}

makeHash();