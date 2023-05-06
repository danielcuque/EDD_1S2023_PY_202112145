const secretKey = 'clave-secreta123'
const buffer = new ArrayBuffer(16)
const view = new Uint8Array(buffer)
for (let i = 0; i < secretKey.length; i++) {
    view[i] = secretKey.charCodeAt(i)
}

const iv = new Uint8Array(16)
const algorithm = { name: 'AES-CBC', iv: iv }

export const encode = async (message) => {
    const enconder = new TextEncoder()
    const data = enconder.encode(message)

    const cryptoKey = await crypto.subtle.importKey('raw', view, 'AES-CBC', true, ['encrypt'])

    const encodeMessage = await crypto.subtle.encrypt(algorithm, cryptoKey, data)

    const encodeBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(encodeMessage)))

    return encodeBase64;
}

export const decode = async (message) => {
    const messageEncoded = new Uint8Array(atob(message).split('').map(char => char.charCodeAt(0)))

    const cryptoKey = await crypto.subtle.importKey('raw', view, 'AES-CBC', true, ['decrypt'])

    const decodedMessage = await crypto.subtle.decrypt(algorithm, cryptoKey, messageEncoded)

    const decoder = new TextDecoder()
    const originalMessage = decoder.decode(decodedMessage)

    return originalMessage
}

export const encryptSha256 = async (password) => {
    const passwordBytes = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
