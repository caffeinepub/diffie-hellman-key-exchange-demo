/**
 * Modular exponentiation: computes (base^exp) mod m
 * Uses BigInt for accuracy with large numbers.
 */
export function modPow(base: number, exp: number, mod: number): number {
    if (mod === 1) return 0;
    let result = BigInt(1);
    let b = BigInt(base) % BigInt(mod);
    let e = BigInt(exp);
    const m = BigInt(mod);

    while (e > BigInt(0)) {
        if (e % BigInt(2) === BigInt(1)) {
            result = (result * b) % m;
        }
        e = e / BigInt(2);
        b = (b * b) % m;
    }
    return Number(result);
}

/**
 * Compute public key: g^privateKey mod p
 */
export function computePublicKey(g: number, privateKey: number, p: number): number {
    return modPow(g, privateKey, p);
}

/**
 * Compute shared secret: otherPublicKey^myPrivateKey mod p
 */
export function computeSharedSecret(otherPublicKey: number, myPrivateKey: number, p: number): number {
    return modPow(otherPublicKey, myPrivateKey, p);
}

/**
 * Check if a number is prime (simple trial division for demo purposes)
 */
export function isPrime(n: number): boolean {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}
