import warnings

import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
import time

start_time = time.time()

pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)
warnings.filterwarnings("ignore", category=UserWarning)

scaler_release_date = MinMaxScaler()
scaler_vote_count = MinMaxScaler()
scaler_vote_average = MinMaxScaler()

tfidf_genres = TfidfVectorizer(preprocessor=lambda x: x, tokenizer=lambda x: x)
tfidf_keywords = TfidfVectorizer(preprocessor=lambda x: x, tokenizer=lambda x: x)
tfidf_cast = TfidfVectorizer(preprocessor=lambda x: x, tokenizer=lambda x: x)
tfidf_directors = TfidfVectorizer(preprocessor=lambda x: x, tokenizer=lambda x: x)

feature_weights = {"keywords": 0.3, "genres": 0.1, "cast": 0.3, "directors": 0.1, "releaseDate": 0.1,
                   "voteCount": 0.05, "voteAverage": 0.05}


def strip_year_from_date(date):
    return int(date.partition('-')[0])


def normalize(scaler, df, is_fit_transform):
    df = df.values.reshape(-1, 1)
    dates_scaled = scaler.fit_transform(df) if is_fit_transform else scaler.transform(df)
    return dates_scaled


def normalize_release_date(scaler, df, is_fit_transform):
    release_date_df = df['releaseDate'].apply(strip_year_from_date)
    return normalize(scaler, release_date_df, is_fit_transform)


def get_tfidf(tfidf, df, column_name, weight):
    return pd.DataFrame((tfidf.fit_transform(df[column_name]) * weight).toarray(),
                        columns=tfidf.get_feature_names_out())


def get_tfidf_transform(tfidf, df, column_name, weight):
    return pd.DataFrame((tfidf.transform(df[column_name]) * weight).toarray(),
                        columns=tfidf.get_feature_names_out())


def create_content_profile_for_file(file, is_fit_transform):
    film_data = pd.read_csv(file,
                            converters={"directors": lambda x: [x], "genres": literal_eval, "keywords": literal_eval,
                                        "cast": literal_eval})
    film_data['releaseDate'] = normalize_release_date(scaler_release_date, film_data, is_fit_transform) * feature_weights["releaseDate"]
    film_data['voteAverage'] = normalize(scaler_vote_average, film_data['voteAverage'], is_fit_transform) * feature_weights["voteAverage"]
    film_data['voteCount'] = normalize(scaler_vote_count, film_data['voteCount'], is_fit_transform) * feature_weights["voteCount"]
    genres_tfidf = get_tfidf(tfidf_genres, film_data, 'genres', feature_weights["genres"]) if is_fit_transform else get_tfidf_transform(tfidf_genres, film_data, 'genres', feature_weights["genres"])
    keywords_tfidf = get_tfidf(tfidf_keywords, film_data, 'keywords', feature_weights["keywords"]) if is_fit_transform else get_tfidf_transform(tfidf_keywords, film_data, 'keywords',
                                                                                                                                                feature_weights["keywords"])
    cast_tfidf = get_tfidf(tfidf_cast, film_data, 'cast', feature_weights["cast"]) if is_fit_transform else get_tfidf_transform(tfidf_cast, film_data, 'cast', feature_weights["cast"])
    directors_tfidf = get_tfidf(tfidf_directors, film_data, 'directors', feature_weights["directors"]) if is_fit_transform else get_tfidf_transform(tfidf_directors, film_data, 'directors',
                                                                                                                                                feature_weights["directors"])
    return pd.concat([film_data['id'], film_data['title']], axis=1), pd.concat(
        [directors_tfidf, genres_tfidf, keywords_tfidf, cast_tfidf, film_data['voteCount'], film_data['voteAverage'], film_data['releaseDate']], axis=1)


def create_content_profile_for_input(user_input):
    film_data = pd.DataFrame([user_input])
    film_data['releaseDate'] = normalize_release_date(scaler_release_date, film_data, False) * feature_weights["releaseDate"]
    film_data['voteAverage'] = normalize(scaler_vote_average, film_data['voteAverage'], False) * feature_weights["voteAverage"]
    film_data['voteCount'] = normalize(scaler_vote_count, film_data['voteCount'], False) * feature_weights["voteCount"]
    genres_tfidf = get_tfidf_transform(tfidf_genres, film_data, 'genres', feature_weights["genres"])
    keywords_tfidf = get_tfidf_transform(tfidf_keywords, film_data, 'keywords', feature_weights["keywords"])
    cast_tfidf = get_tfidf_transform(tfidf_cast, film_data, 'cast', feature_weights["cast"])
    directors_tfidf = get_tfidf_transform(tfidf_directors, film_data, 'directors', feature_weights["directors"])
    return pd.concat([directors_tfidf, genres_tfidf, keywords_tfidf, cast_tfidf, film_data['voteCount'], film_data['voteAverage'], film_data['releaseDate']], axis=1)


def get_similar_movies(user_input):
    dataset_meta_info, dataset_profile = create_content_profile_for_file('C:\\Users\\andre\\Downloads\\recomovie\\movie_recommender_service\\movie_recommender_service\\resources\\movie_dataset.csv',
                                                                         True)
    input_profile = create_content_profile_for_input(user_input)
    dataset_length = len(dataset_profile.index)
    similarities = []
    for index in range(dataset_length):
        similarities.append({
            'id': dataset_meta_info['id'][index],
            'title': dataset_meta_info['title'][index], 'cosineSimilarity': cosine_similarity(
                input_profile.values.reshape(1, -1),
                dataset_profile.iloc[index].values.reshape(1, -1))[0][0]})
    sorted_similarities = sorted(similarities, key=lambda x: x['cosineSimilarity'], reverse=True)
    return sorted_similarities[:20]
