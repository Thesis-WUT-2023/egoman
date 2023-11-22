from src.domains.users.entities import CreateUserRequest
from src.domains.users.gateways import IUsersStorage
from src.tests.utils.ut_matcher import UuidMatcher


class TestUserStorage:
    async def test_create__success(self, users_storage: IUsersStorage):
        req = CreateUserRequest(
            email="test",
            password="test_pass",
            name="test_name",
            surname="test_surname",
        )

        new_user = await users_storage.create(req)

        assert new_user.dict() == {
            "uid": UuidMatcher(),
            "password": "test_pass",
            "email": "test",
            "name": "test_name",
            "surname": "test_surname",
        }
