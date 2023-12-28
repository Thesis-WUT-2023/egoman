class SessionExpired(Exception):
    def __init__(self):
        super().__init__("Session Expired")


class InvalidToken(Exception):
    def __init__(self):
        super().__init__("Invalid Token")
