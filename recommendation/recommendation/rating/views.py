from django.http import response
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SimilarAnimes, RecommendataionCF, RatingCompleted, Anime, Animescore
from .serializers import SimilarAnimesSerializer, RecommendationCFSerializer, RatingCompletedSerializer

from sklearn.decomposition import TruncatedSVD
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def upload_rating_completed(request):
    RatingCompleted.objects.all().delete()
    kaggle_rating = pd.read_csv('./files/rating_complete.csv')
    row_iter = kaggle_rating.iterrows()
    objs = [
        RatingCompleted(
            user_id=row['user_id'],
            anime_id=row['anime_id'],
            rating=row['rating'],
        )
        for index, row in row_iter
    ]
    RatingCompleted.objects.bulk_create(objs)
    return JsonResponse({
        'upload_rating_completed_status' : 1
    })

def update_similar_animes(request):
    # 데이터 테이블 삭제
    SimilarAnimes.objects.all().delete()
    
    anime_df = pd.DataFrame(list(Anime.objects.all().values('anime_id')))
    anime_score_df = pd.DataFrame(list(Animescore.objects.all().values('user', 'anime', 'animescore_score')))
    anime_score_df.columns = ['user_id', 'anime_id', 'rating']
    kaggle_rating = pd.read_csv('./files/rating_complete.csv')
    sample_rating = kaggle_rating.loc[kaggle_rating['user_id'] <10000]
    rating = pd.concat([sample_rating, anime_score_df], ignore_index=True)
    user_anime_rating = pd.pivot_table(rating, index = 'user_id', columns='anime_id', values='rating').fillna(0)
    anime_user_rating = user_anime_rating.values.T
    SVD = TruncatedSVD(n_components=12)
    matrix = SVD.fit_transform(anime_user_rating)
    corr = np.corrcoef(matrix)
    anime = user_anime_rating.columns
    anime_id_list = list(anime)

    def make_similar_anime_df(anime_id):
        if anime_id in anime_id_list:
            coffey_hands = anime_id_list.index(anime_id)
            corr_coffey_hands  = corr[coffey_hands]
            similar_animes = list(anime[(corr_coffey_hands >= 0.95)])
            for similar_anime_id in similar_animes:
                if similar_anime_id != anime_id:
                    SimilarAnimes(anime_id=anime_id, similar_anime_id=similar_anime_id).save()

            print(anime_id, '어펜드 됨')

    anime_df['anime_id'].apply(lambda x: make_similar_anime_df(x))

    return JsonResponse({
        'status' : 1
    })
    