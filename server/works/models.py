from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Plan(models.Model):
    PLAN_CHOICES = (
        ('IP','Ideal Plan'),
        ('CP','Currently Plan')
    )
    title = models.CharField(verbose_name='제목',max_length=20)
    user = models.ForeignKey(verbose_name='유저', to=User, on_delete=models.CASCADE)
    date = models.DateField(verbose_name='날짜')
    start_time = models.TimeField(verbose_name='시작시간')
    end_time = models.TimeField(verbose_name='종료시간')
    plan_type = models.TextField(verbose_name='plan type', choices=PLAN_CHOICES, max_length=2)


    def __str__(self) -> str:
        return f'{self.plan_type}_{self.title}'



class Todo(models.Model):
    TODO_CHOICES = (
        ('PROJ', 'Project'),
        ('ETC', 'ETC'),
    )

    title = models.CharField(verbose_name='제목',max_length=20)
    user = models.ForeignKey(verbose_name='유저', to=User, on_delete=models.CASCADE)
    date = models.DateField(verbose_name='날짜')
    todo_type = models.TextField(verbose_name='todo type',choices=TODO_CHOICES, max_length=4)
    is_done = models.BooleanField(verbose_name='완료여부', default=False)


    def __str__(self) -> str:
        return f'{self.title}'
