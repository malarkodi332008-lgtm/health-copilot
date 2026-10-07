import hashlib
import secrets


def hash_pin(pin: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        pin.encode("utf-8"),
        salt,
        100_000,
    )
    return f"{salt.hex()}${digest.hex()}"


def verify_pin(pin: str, stored_hash: str) -> bool:
    try:
        salt_hex, digest_hex = stored_hash.split("$")
        salt = bytes.fromhex(salt_hex)
        digest = hashlib.pbkdf2_hmac(
            "sha256",
            pin.encode("utf-8"),
            salt,
            100_000,
        )
        return secrets.compare_digest(digest.hex(), digest_hex)
    except (ValueError, TypeError):
        return False
