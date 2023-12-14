import bcrypt from "bcrypt";

export const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain,10)
    return hash
}

export const comparar = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}