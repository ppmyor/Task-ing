from enum import unique
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager as _UserManager
from django.utils.deconstruct import deconstructible
from django.contrib.auth.validators import validators



@deconstructible
class UnicodeUsernameValidator(validators.RegexValidator):
    regex = r'^[0-9a-zA-Z]*$'
    message = (
        '아이디는 영어 소문자, 대문자, 숫자만 가능합니다. 유효한 값을 넣어주세요'
    )
    flags = 0


class UserManager(_UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('이메일이 입력되지 않았습니다. 올바르게 입력해주세요.')

        email = self.normalize_email(email)
        user = User(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user


    def verify_password(self, password):
        return password_context.verify(password, self.hashed_password)


    def check_password_strength_and_hash_if_ok(self, password):
        if len(password) < 8:
            return '비밀번호는 8자 이상이어야 합니다.', False
        if re.search(r'[a-z]', password) is None:
            return '비밀번호는 한개 이상의 영소문자가 필수적으로 들어가야 합니다.', False
        if re.search(r'\d', password) is None:
            return '비밀번호는 한개 이상의 숫자가 필수적으로 들어가야 합니다.', False
        self.hashed_password = password_context.encrypt(password)


class User(AbstractUser):
    objects = UserManager()
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        verbose_name="아이디",
        max_length=20,
        unique=True,
        validators=[username_validator],
        error_messages={
            'unique': "아이디가 이미 존재합다."
        })
    name = models.CharField(verbose_name='이름',max_length=15)
    email = models.EmailField(unique=True, blank=False)

    is_testuser = models.BooleanField(verbose_name='테스터', default=False)
