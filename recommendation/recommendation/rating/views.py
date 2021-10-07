from django.http import response
from django.http import JsonResponse

from django.conf import settings
from sqlalchemy import create_engine

from rest_framework import serializers, status
from rest_framework.response import Response

from .models import SimilarAnimes, RecommendataionCF, RatingCompleted, Anime, Animescore, User, PredictedRating, AnimeGenre, Genre, User_favorite_genre

from sklearn.decomposition import TruncatedSVD
from sklearn.metrics import mean_squared_error 
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import random
import itertools

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

    bulk = []
    def make_similar_anime_df(anime_id):
        if anime_id in anime_id_list:
            coffey_hands = anime_id_list.index(anime_id)
            corr_coffey_hands  = corr[coffey_hands]
            similar_animes = list(anime[(corr_coffey_hands >= 0.95)])
            for similar_anime_id in similar_animes:
                if similar_anime_id != anime_id:
                    # SimilarAnimes(anime_id=anime_id, similar_anime_id=similar_anime_id).save()
                    bulk.append(SimilarAnimes(anime_id=anime_id, similar_anime_id=similar_anime_id))

    anime_df['anime_id'].apply(lambda x: make_similar_anime_df(x))
    SimilarAnimes.objects.bulk_create(bulk)

    return JsonResponse({
        'status' : 1
    })

def save_similar(request): 
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

    df = pd.DataFrame(columns=['anime_id', 'similar_anime_id'])
    def make_similar_anime_df(anime_id):
        if anime_id in anime_id_list:
            coffey_hands = anime_id_list.index(anime_id)
            corr_coffey_hands  = corr[coffey_hands]
            similar_animes = list(anime[(corr_coffey_hands >= 0.95)])
            for similar_anime_id in similar_animes:
                if similar_anime_id != anime_id:
                    new_data = {'anime_id': anime_id, 'similar_anime_id': similar_anime_id}
                    df.append(new_data)

    anime_df['anime_id'].apply(lambda x: make_similar_anime_df(x))
    df.to_csv('./files/similar_animes.pkl', mode='w', index=False, encoding="utf-8")

    return JsonResponse({
        'status' : 1
    })

def get_UbyU(ouruser_li):
    our_user = pd.DataFrame(list(Animescore.objects.all().values()))
    our_user.columns = ['animescore_id', 'user_id', 'anime_id', 'rating']
    our_user = our_user[['user_id', 'anime_id', 'rating']]
    
    # mal user 중 300개 이상 평가한 20000명 랜덤샘플링
    rating_completed = pd.read_pickle('./files/rating_complete.pkl')
    user_counts = rating_completed['user_id'].value_counts().reset_index(name='counts')
    user_counts.columns = ['user_id', 'user_counts']
    user_counts = user_counts.loc[user_counts['user_counts'] > 300]
    maluser_li = user_counts['user_id'].values.tolist()
    sample_mal_user_list = random.sample(maluser_li, 20000)
    
    li = sample_mal_user_list + ouruser_li
    rating = pd.concat([our_user, rating_completed])
    print(rating)
    user = rating.loc[rating['user_id'].isin(li)]
    print(user)

    # calculate mean rating per user 유저마다 평균 평점 계산
    MRPU = user.groupby(['user_id']).mean().reset_index()
    MRPU['mean_rating'] = MRPU['rating']
    MRPU.drop(['anime_id', 'rating'], axis=1, inplace=True)
    user = pd.merge(user,MRPU,on=['user_id','user_id'])
    user['deviation'] = user.apply(lambda x: x['rating']-x['mean_rating'], axis=1)

    # user-anime꼴로 만들어주고 deviation을 입력한다
    user_anime = user.pivot_table('deviation', index='user_id', columns='anime_id')
    user_anime_0 = user_anime.fillna(0)
    UbyU = user_anime_0.dot(user_anime_0.transpose())
    np.fill_diagonal(UbyU.to_numpy(), 0)
    
    return UbyU, user
    
def get_sim_user_matrix(who, UbyU, user):
    # who 유저 기준으로 비슷한 user 순으로 정렬
    sim_user_list_all = UbyU.sort_values(by=who, ascending=False)[who].to_frame().index
    K_U = 300  
    sim_user_list = np.append(sim_user_list_all[0:K_U].values, [who])

    # pivot_table
    sim_user_matrix = user.loc[user['user_id'].isin(sim_user_list)].pivot_table('rating', index='user_id', columns='anime_id')
    sim_user_matrix = sim_user_matrix.fillna(0)
    sim_user_matrix = sim_user_matrix.astype('float16')
    return sim_user_matrix

def get_rmse(R, P, Q, non_zeros): 
    error = 0 
    # 두개의 분해된 행렬 P와 Q.T의 내적 곱으로 예측 R 행렬 생성 
    full_pred_matrix = np.dot(P, Q.T)
    # 실제 R 행렬에서 널이 아닌 값의 위치 인덱스 추출하여 실제 R 행렬과 예측 행렬의 RMSE 추출 
    x_non_zero_ind = [non_zero[0] for non_zero in non_zeros] 
    y_non_zero_ind = [non_zero[1] for non_zero in non_zeros] 
    R_non_zeros = R[x_non_zero_ind, y_non_zero_ind] 
    
    full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind] 
    mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros) 
    rmse = np.sqrt(mse) 
    return rmse 

def matrix_factorization(R, K, steps=200, learning_rate=0.01, r_lambda = 0.01): 
    num_users, num_items = R.shape
    # P와 Q 매트릭스의 크기를 지정하고 정규분포를 가진 랜덤한 값으로 입력
    np.random.seed(1)
    P = np.random.normal(scale=1./K, size=(num_users, K))
    Q = np.random.normal(scale=1./K, size=(num_items, K))
    
    break_count = 0 
    # R > 0 인 행 위치, 열 위치, 값을 non_zeros 리스트 객체에 저장. 
    non_zeros = [ (i, j, R[i,j]) for i in range(num_users) for j in range(num_items) if R[i,j] > 0 ]
    
    # SGD기법으로 P와 Q 매트릭스를 계속 업데이트. 
    for step in range(steps):
        for i, j, r in non_zeros:
            # 실제 값과 예측 값의 차이인 오류 값 구함 
            eij = r - np.dot(P[i, :], Q[j, :].T)
            # Regularization을 반영한 SGD 업데이트 공식 적용 
            P[i,:] = P[i,:] + learning_rate*(eij * Q[j, :] - r_lambda*P[i,:])
            Q[j,:] = Q[j,:] + learning_rate*(eij * P[i, :] - r_lambda*Q[j,:])
        rmse = get_rmse(R, P, Q, non_zeros)
        if (step % 10) == 0 :
            print("### iteration step : ", step," rmse : ", rmse)
    return P, Q

def get_predicted_score(who, UbyU, user):
    sim_user_matrix = get_sim_user_matrix(who, UbyU, user)
    P, Q = matrix_factorization(sim_user_matrix.values, K=50, steps=200, learning_rate=0.01, r_lambda = 0.01)
    pred_matrix = np.dot(P, Q.T)
    predicted = pd.DataFrame(np.round(pred_matrix, 3), columns = sim_user_matrix.columns)
    predicted = predicted.set_index(keys=sim_user_matrix.index, inplace=False, drop=False)
    user_score_predict = predicted[predicted.index==who].T
    user_score_predict = user_score_predict.reset_index()
    user_score_predict['user_id']=who
    user_score_predict.columns=['anime_id', 'predicted_score', 'user_id']
    user_score_predict = user_score_predict.sort_values(by=['predicted_score'], ascending=[False])
    
    def score_adjust(x):
        if x >= 10:
            return 10
        elif x < 0:
            return 0
        else:
            return round(x, 1)

    user_score_predict['adjusted_predicted_score'] = user_score_predict.apply(lambda x: score_adjust(x['predicted_score']), axis=1)

    return user_score_predict

def save_predicted_score(request):
    # 우리 user중 애니평가한 사람 리스트
    our_user = pd.DataFrame(list(Animescore.objects.all().values()))
    our_user_counts = our_user['user_id'].value_counts().reset_index(name='counts')
    ouruser_li = our_user_counts['index'].values.tolist()
    
    UbyU, user = get_UbyU(ouruser_li)
    
    for who in ouruser_li:
        PredictedRating.objects.filter(id=who).delete()
        user_score_predict = get_predicted_score(who, UbyU, user)
        print(user_score_predict)
        
        bulk = []
        def append_bulk(w,x,y,z):
            print(w,x,y,z)
            bulk.append(PredictedRating(
                user_id=w,
                anime_id=x,
                predicted_score=y,
                adusted_predicted_score=z
            ))
        user_score_predict.apply(lambda x: append_bulk(x['user_id'], x['anime_id'], x['predicted_score'], x['adjusted_predicted_score']), axis=1)
        PredictedRating.objects.bulk_create(bulk)
    
    return JsonResponse({
        'status' : 1
    })

def update_predcicted_score(request):
    predicted_score_df = pd.read_pickle('./files/rating_complete.pkl')
    bulk = []
    def append_bulk(x):
        print(x)
        bulk.append(PredictedRating(
            user_id=x['user_id'],
            anime_id=x['anime_id'],
            predicted_score=x['predicted_score'],
            adusted_predicted_score=x['adjusted_predicted_score']
        ))

    predicted_score_df.append(lambda x: append_bulk(x))
    PredictedRating.objects.bulk_create(bulk)
    return JsonResponse({
        'status' : 1
    })


def recommend_genre_user(requirement, who):
    df = pd.DataFrame(list(AnimeGenre.objects.all().values()))
    rating_completed= pd.read_csv('./files/rating_complete.csv')
    our_user = pd.DataFrame(list(Animescore.objects.all().values()))
    our_user.columns = ['animescore_id', 'user_id', 'anime_id', 'rating']
    our_user = our_user[['user_id', 'anime_id', 'rating']]
    rating = pd.concat([our_user, rating_completed])
    
    user_counts = rating['user_id'].value_counts().reset_index(name='counts')
    user_counts.columns = ['user_id', 'user_counts']
    user_counts = user_counts.loc[user_counts['user_counts'] > 300]
    li = user_counts['user_id'].values.tolist()
    # 랜덤하게 적당히 거른 친구들중에 뽑기
    sample_user_list = [who]+random.sample(li, 20000)
    user = rating.loc[rating['user_id'].isin(sample_user_list)]

    # calculate mean rating per user 유저마다 평균 평점 계산
    MRPU = user.groupby(['user_id']).mean().reset_index()
    MRPU['mean_rating'] = MRPU['rating']
    MRPU.drop(['anime_id', 'rating'], axis=1, inplace=True)
    user = pd.merge(user,MRPU,on=['user_id','user_id'])
    user['deviation'] = user.apply(lambda x: x['rating']-x['mean_rating'], axis=1)
    user['value'] =1

    # axis 1 붙여줘야한다.
    user['deviation'] = user.apply(lambda x: x['rating']-x['mean_rating'], axis=1)

    # user-anime꼴로 만들어주고 rating을 입력한다
    user_anime = user.pivot_table('value', index='user_id', columns='anime_id')
    user_anime_0 = user_anime.fillna(0)
    anime_user_0 = user_anime_0.T

    anime_list= anime_user_0.index
    df = df.loc[df['anime_id'].isin(anime_list.tolist())]
    df['value'] = 1
    anime_genre = df.pivot_table('value', index='anime_id', columns='genre_id')
    anime_genre_0 = anime_genre.fillna(0)
    anime_list_2 = anime_genre_0.index
    anime_user_result = anime_user_0.loc[anime_user_0.index.isin(anime_list_2)].T
    anime_user_result.dot(anime_genre_0)
    user_genre = anime_user_result.dot(anime_genre_0)
    sorted_genre_like = user_genre.loc[user_genre.index == who].sort_values(axis=1, by=who, ascending = False)
    for i in range(3):
        User_favorite_genre.objects.create(user_id=who, genre_id=sorted_genre_like.columns[i], genre_name=Genre.objects.get(pk=sorted_genre_like.columns[i]).genre_name)
    
    return JsonResponse({
        'status' : 1
    })

def update_recommended_genre_all(requset):
    # 우리 user중 애니평가한 사람 리스트
    our_user = pd.DataFrame(list(Animescore.objects.all().values()))
    our_user_counts = our_user['user_id'].value_counts().reset_index(name='counts')
    ouruser_li = our_user_counts['index'].values.tolist()
    
    for who in ouruser_li:
        recommend_genre_user(None, who)

    return JsonResponse({
        'status' : 1
    })

def new_user(who):
    recommend_genre_user(None, who)
    save_predicted_score_one(who)
    return JsonResponse({
        'status' : 1
    })    

def save_predicted_score_one(who):
    # 우리 user중 애니평가한 사람 리스트
    our_user = pd.DataFrame(list(Animescore.objects.all().values()))
    our_user_counts = our_user['user_id'].value_counts().reset_index(name='counts')
    ouruser_li = our_user_counts['index'].values.tolist()
    
    UbyU, user = get_UbyU(ouruser_li)
    
    
    PredictedRating.objects.filter(id=who).delete()
    user_score_predict = get_predicted_score(who, UbyU, user)
    print(user_score_predict)
    
    bulk = []
    def append_bulk(w,x,y,z):
        print(w,x,y,z)
        bulk.append(PredictedRating(
            user_id=w,
            anime_id=x,
            predicted_score=y,
            adusted_predicted_score=z
        ))
    user_score_predict.apply(lambda x: append_bulk(x['user_id'], x['anime_id'], x['predicted_score'], x['adjusted_predicted_score']), axis=1)
    PredictedRating.objects.bulk_create(bulk)
    
    return JsonResponse({
        'status' : 1
    })