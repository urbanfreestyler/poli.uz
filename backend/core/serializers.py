from decimal import Clamped
from django.db.models import fields
from rest_framework import serializers
from .models import *


class VariantSerializer(serializers.ModelSerializer):
    question_set = serializers.RelatedField(
        source="question.text", read_only=True)

    class Meta:
        model = Variant
        fields = ['id', 'variant', 'question_set']


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.RelatedField(source='answer.text', read_only=True)
    explanation = serializers.RelatedField(
        source='explanation.text', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'variant', 'answers', 'explanation']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class ExplanationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Explanation
        fields = '__all__'
