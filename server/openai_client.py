from config import OPENAI_API_KEY
from openai import OpenAI

# unlike the pre-1.0 SDK, the client validates the key eagerly at construction
# time; fall back to a placeholder so import doesn't crash when no real key is
# configured (e.g. in tests, where the API call itself is mocked out).
client = OpenAI(api_key=OPENAI_API_KEY or "sk-no-key-set")
