from django.urls import path
from . import views

urlpatterns = [
    path('upload_rating_completed/', views.upload_rating_completed, name='upload_rating_completed'),
    path('update_similar/', views.update_similar_animes, name='update_similar_anime')
]