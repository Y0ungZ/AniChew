from django.db import models


class RatingCompleted(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField(help_text='user_id')
    anime_id = models.IntegerField()
    rating = models.IntegerField()


class SimilarAnimes(models.Model):
    id = models.BigAutoField(primary_key=True)
    anime_id = models.IntegerField()
    similar_anime_id = models.IntegerField()


class RecommendataionCF(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField()
    anime_id = models.IntegerField()

class AlramSeries(models.Model):
    alram_series_id = models.BigAutoField(primary_key=True)
    anime_series = models.ForeignKey('AnimeSeries', models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'alram_series'


# 경원님 모델
class Anime(models.Model):
    anime_id = models.BigIntegerField(primary_key=True)
    anime_name = models.CharField(max_length=300)
    anime_english_name = models.CharField(max_length=300, blank=True, null=True)
    anime_japanese_name = models.CharField(max_length=300, blank=True, null=True)
    anime_korean_name = models.CharField(max_length=300, blank=True, null=True)
    anime_type = models.CharField(max_length=7, blank=True, null=True)
    anime_episodes = models.IntegerField(blank=True, null=True)
    anime_aired_start = models.DateField(blank=True, null=True)
    anime_aired_end = models.DateField(blank=True, null=True)
    anime_season = models.CharField(max_length=20, blank=True, null=True)
    anime_duration = models.CharField(max_length=20, blank=True, null=True)
    anime_status = models.CharField(max_length=8, blank=True, null=True)
    anime_rate = models.CharField(max_length=7, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'anime'


class AnimeChara(models.Model):
    anime_chara_id = models.BigIntegerField(primary_key=True)
    anime = models.ForeignKey(Anime, models.DO_NOTHING, blank=True, null=True)
    chara = models.ForeignKey('Chara', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'anime_chara'


class AnimeGenre(models.Model):
    anime_genre_id = models.BigIntegerField(primary_key=True)
    anime = models.ForeignKey(Anime, models.DO_NOTHING)
    genre = models.ForeignKey('Genre', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'anime_genre'


class AnimeSeries(models.Model):
    anime_series_id = models.BigIntegerField(primary_key=True)
    anime = models.ForeignKey(Anime, models.DO_NOTHING)
    anime_series_name = models.CharField(max_length=300, blank=True, null=True)
    series_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'anime_series'


class Animescore(models.Model):
    animescore_id = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    anime = models.ForeignKey(Anime, models.DO_NOTHING)
    animescore_score = models.FloatField()

    class Meta:
        managed = False
        db_table = 'animescore'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Chara(models.Model):
    chara_id = models.BigIntegerField(primary_key=True)
    seiyu = models.ForeignKey('Seiyu', models.DO_NOTHING, blank=True, null=True)
    chara_last_name = models.CharField(max_length=20, blank=True, null=True)
    chara_first_name = models.CharField(max_length=20)
    chara_role = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'chara'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FavoriteAnime(models.Model):
    favorite_anime_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    anime = models.ForeignKey(Anime, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorite_anime'


class FavoriteChara(models.Model):
    favorite_chara_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    chara = models.ForeignKey(Chara, models.DO_NOTHING)
    favoirte_character_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'favorite_chara'


class FavoriteSeiyu(models.Model):
    favorite_seiyu_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    seiyu = models.ForeignKey('Seiyu', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorite_seiyu'


class Genre(models.Model):
    genre_id = models.BigIntegerField(primary_key=True)
    genre_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'genre'


class RatingRatingcompleted(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField()
    anime_id = models.IntegerField()
    rating = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'rating_ratingcompleted'


class RatingRecommendataioncf(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField()
    anime_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'rating_recommendataioncf'


class RatingSimilaranimes(models.Model):
    id = models.BigAutoField(primary_key=True)
    anime_id = models.IntegerField()
    similar_anime_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'rating_similaranimes'


class Seiyu(models.Model):
    seiyu_id = models.BigIntegerField(primary_key=True)
    seiyu_name = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'seiyu'


class Series(models.Model):
    series_id = models.BigIntegerField(primary_key=True)
    series_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'series'


class User(models.Model):
    user_id = models.BigIntegerField(primary_key=True)
    user_email = models.CharField(max_length=50, blank=True, null=True)
    user_status = models.CharField(max_length=7, blank=True, null=True)
    user_gender = models.CharField(max_length=6, blank=True, null=True)
    user_birthday = models.DateField(blank=True, null=True)
    user_nickname = models.CharField(max_length=15)
    user_avatar = models.CharField(max_length=200, blank=True, null=True)
    user_created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
