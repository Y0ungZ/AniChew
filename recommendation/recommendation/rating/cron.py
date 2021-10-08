from .views import save_similar, save_predicted_score, update_recommended_genre_all

def cron_save_similar():
    save_similar()

def cron_save_predicted_score():
    save_predicted_score()

def cron_update_recommended_genre_all():
    update_recommended_genre_all()