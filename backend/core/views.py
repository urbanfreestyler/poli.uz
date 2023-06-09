from django.shortcuts import render

from django.http import HttpResponse, JsonResponse, response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def variants_list(request):
    if request.method == 'GET':
        variants = Variant.objects.all()

        variants_ids = request.query_params.get('id', None)
        if variants_ids is not None:
            variants_ids = variants_ids.filter(
                variant_id_icontains=variants_ids)

        serializer = VariantSerializer(variants, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def variant_detail(request, pk):
    try:
        variant = Variant.objects.get(pk=pk)
    except Variant.DoesNotExist:
        return JsonResponse(
            {'message': 'This variant does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VariantSerializer(variant)
        return JsonResponse(serializer.data)


@api_view(['GET'])
def questions_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()

        questions_ids = request.query_params.get('id', None)
        if questions_ids is not None:
            questions_ids = questions_ids.filter(
                question_id_icontains=questions_ids)

        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def question_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return JsonResponse(
            {'message': 'This question does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return JsonResponse(serializer.data)


@api_view(['GET'])
def get_quiz_questions(request, pk):
    try:
        pk = int(pk)
    except ValueError:
        return JsonResponse(
            {'message': 'Invalid variant ID'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        questions = Question.objects.filter(variant__variant=pk)
    except Variant.DoesNotExist:
        return JsonResponse(
            {'message': 'This variant does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def get_answers_by_variant(request, variant_id):
    if request.method == "GET":
        variant = get_object_or_404(Variant, pk=variant_id)
        questions = variant.questions.all()
        answers = Answer.objects.filter(question__in=questions)
        serializer = AnswerSerializer(answers, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def answers_list(request, pk):
    if request.method == 'GET':
        answers = Answer.objects.filter(question__variant__variant=pk)

        answers_ids = request.query_params.get('id', None)
        if answers_ids is not None:
            answers_ids = answers_ids.filter(answers_id_icontains=answers_ids)

        serializer = AnswerSerializer(answers, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def get_explanation_for_question(request, question_id):
    if request.method == "GET":
        explanation = get_object_or_404(Explanation, question__pk=question_id)
        serializer = ExplanationSerializer(explanation)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse(
            {'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
