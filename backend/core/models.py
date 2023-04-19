from django.db import models
from tinymce.models import HTMLField


class Variant(models.Model):
    variant = models.CharField(max_length=5)

    def __str__(self):
        return self.variant

    def get_questions(self):
        return self.question_set.all()


class Question(models.Model):
    text = HTMLField()

    variant = models.ForeignKey(Variant, on_delete=models.CASCADE,
                                related_name='questions')

    def get_answer(self):
        return self.answers.all()

    def get_exploration(self):
        return self.explanation.all()

    def __str__(self):
        return f'{self.id} {self.text}'


class Answer(models.Model):
    text = HTMLField()
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                                 related_name='answers')

    def __str__(self):
        return self.text


class Explanation(models.Model):
    text = HTMLField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                                 related_name='explanation')

    def __str__(self):
        return f"Explanation for a question {self.question.id}: {self.question.text}"
