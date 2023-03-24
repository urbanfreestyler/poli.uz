from django.db import models


class Variant(models.Model):
    variant = models.CharField(max_length=5)

    def __str__(self):
        return self.variant

    def get_questions(self):
        return self.question_set.all()


class Question(models.Model):
    text = models.TextField(max_length=2048)

    variant = models.ForeignKey(Variant, on_delete=models.CASCADE,
                                related_name='questions')

    def get_answer(self):
        return self.answers.all()

    def __str__(self):
        return self.text


class Answer(models.Model):
    text = models.CharField(max_length=250)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                                 related_name='answers')

    def __str__(self):
        return f"Question: {self.question.text}, answer: {self.text}"


class Explanation(models.Model):
    text = models.TextField(max_length=4096)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                                 related_name='explanation')

    def __str__(self):
        return f"Explanation to a qustion {self.question.id}: {self.question.text}"
