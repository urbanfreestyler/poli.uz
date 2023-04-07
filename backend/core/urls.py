from django.urls import path
from . import views

urlpatterns = [
    path('api/variants/', views.variants_list),
    path('api/variants/<int:pk>', views.variant_detail),

    path('api/questions/', views.questions_list),
    path('api/questions/<int:pk>/', views.question_detail),

    path('api/quiz-questions/<int:pk>', views.get_quiz_questions),
    path('api/explanation/<int:question_id>',
         views.get_explanation_for_question),

    path('api/answers/<int:variant_id>', views.get_answers_by_variant),
]
