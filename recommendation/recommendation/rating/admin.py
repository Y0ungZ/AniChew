from django.contrib import admin
from .models import RatingCompleted, SimilarAnimes, RecommendataionCF

# Register your models here.
admin.site.register(RatingCompleted)
admin.site.register(SimilarAnimes)
admin.site.register(RecommendataionCF)