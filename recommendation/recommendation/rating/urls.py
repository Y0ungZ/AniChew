from django.urls import path
from . import views

urlpatterns = [
    path('upload_rating_completed/', views.upload_rating_completed, name='upload_rating_completed'),
    path('update_similar/', views.update_similar_animes, name='update_similar_anime'),
    path('save_similar/', views.save_similar, name='save_similar'),
    path('save_predicted_score/', views.save_predicted_score, name='save_predicted_score'),
    path('recommend_genre_user/<int:who>/', views.recommend_genre_user, name='recommend_genre_user'),
    path('update_recommend_genre/', views.update_recommended_genre_all, name='update_recommended_genre_all'),
    path('new_user/<int:who>/', views.new_user, name='newuser')
]