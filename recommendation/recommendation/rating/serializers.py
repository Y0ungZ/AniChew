from django.db import models
from .models import SimilarAnimes, RecommendataionCF, RatingCompleted
from rest_framework import serializers


class RatingCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingCompleted
        fields = '__all__'


class SimilarAnimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimilarAnimes
        fields = '__all__'


class RecommendationCFSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendataionCF
        fields = '__all__'
