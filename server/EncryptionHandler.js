import crypto from "crypto";
const secret = "ssssssssssssssssssssssssssssssss";

export const encrypt = (password) => {
	const iv = Buffer.from(crypto.randomBytes(16));
	const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

	const encryptedPassword = Buffer.concat([
		cipher.update(password),
		cipher.final(),
	]);

	return {
		iv: iv.toString("hex"),
		password: encryptedPassword.toString("hex"),
	};
};

export const decrypt = (encryption) => {
	const decipher = crypto.createDecipheriv(
		"aes-256-ctr",
		Buffer.from(secret),
		Buffer.from(encryption.iv, "hex")
	);

	const decryptedPasssword = Buffer.concat([
		decipher.update(Buffer.from(encryption.password, "hex")),
		decipher.final(),
	]);
    
    return decryptedPasssword.toString()
};
