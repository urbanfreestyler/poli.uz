from django.urls import path
from . import views

urlpatterns = [
    path('api/variants/', views.variants_list),
    path('api/variants/<int:pk>', views.variant_detail),

    path('api/questions/', views.questions_list),
    path('api/questions/<int:pk>/', views.question_detail)
]
