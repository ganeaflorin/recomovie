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

feature_weights = {"keywords": 0.25, "genres": 0.15, "cast": 0.35, "directors": 0.15, "releaseDate": 0.1,
                   "voteCount": 0.0, "voteAverage": 0.0}


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


def create_content_profile_for_file(file, is_present_flags):
    film_data = pd.read_csv(file,
                            converters={"directors": lambda x: [x.lower()], "genres": lambda x: literal_eval(x.lower()), "keywords": lambda x: literal_eval(x.lower()),
                                        "cast": lambda x: literal_eval(x.lower())})
    content_profile = []
    if is_present_flags['releaseDate']:
        film_data['releaseDate'] = normalize_release_date(scaler_release_date, film_data, True) * feature_weights["releaseDate"]
        content_profile.append(film_data['releaseDate'])
    if is_present_flags['genres']:
        genres_tfidf = get_tfidf(tfidf_genres, film_data, 'genres', feature_weights["genres"])
        content_profile.append(genres_tfidf)
    if is_present_flags['keywords']:
        keywords_tfidf = get_tfidf(tfidf_keywords, film_data, 'keywords', feature_weights["keywords"])
        content_profile.append(keywords_tfidf)
    if is_present_flags['cast']:
        cast_tfidf = get_tfidf(tfidf_cast, film_data, 'cast', feature_weights["cast"])
        content_profile.append(cast_tfidf)
    if is_present_flags['directors']:
        directors_tfidf = get_tfidf(tfidf_directors, film_data, 'directors', feature_weights["directors"])
        content_profile.append(directors_tfidf)
    # film_data['voteAverage'] = normalize(scaler_vote_average, film_data['voteAverage'], is_fit_transform) * feature_weights["voteAverage"]
    # film_data['voteCount'] = normalize(scaler_vote_count, film_data['voteCount'], is_fit_transform) * feature_weights["voteCount"]
    return pd.concat([film_data['id'], film_data['title']], axis=1), pd.concat(
        content_profile, axis=1)


def create_content_profile_for_input(user_input, is_present_flags):
    film_data = pd.DataFrame([user_input])
    content_profile = []
    if is_present_flags['releaseDate']:
        film_data['releaseDate'] = normalize_release_date(scaler_release_date, film_data, False) * feature_weights["releaseDate"]
        content_profile.append(film_data['releaseDate'])
    if is_present_flags['genres']:
        genres_tfidf = get_tfidf_transform(tfidf_genres, film_data, 'genres', feature_weights["genres"])
        content_profile.append(genres_tfidf)
    if is_present_flags['keywords']:
        keywords_tfidf = get_tfidf_transform(tfidf_keywords, film_data, 'keywords', feature_weights["keywords"])
        content_profile.append(keywords_tfidf)
    if is_present_flags['cast']:
        cast_tfidf = get_tfidf_transform(tfidf_cast, film_data, 'cast', feature_weights["cast"])
        content_profile.append(cast_tfidf)
    if is_present_flags['directors']:
        directors_tfidf = get_tfidf_transform(tfidf_directors, film_data, 'directors', feature_weights["directors"])
        content_profile.append(directors_tfidf)
    # film_data['voteAverage'] = normalize(scaler_vote_average, film_data['voteAverage'], False) * feature_weights["voteAverage"]
    # film_data['voteCount'] = normalize(scaler_vote_count, film_data['voteCount'], False) * feature_weights["voteCount"]
    return pd.concat(content_profile, axis=1)


def get_is_present_flags(user_input):
    return {'genres': len(user_input['genres']) > 0, 'directors': len(user_input['directors']) > 0, 'cast': len(user_input['cast']) > 0, 'keywords': len(user_input['keywords']) > 0,
            'releaseDate': len(user_input['releaseDate']) > 0}


def get_similar_movies(user_input):
    is_present_flags = get_is_present_flags(user_input)
    dataset_meta_info, dataset_profile = create_content_profile_for_file('C:\\Users\\andre\\Downloads\\recomovie\\movie_recommender_service\\movie_recommender_service\\resources\\movie_dataset.csv',
                                                                         is_present_flags)
    print(user_input)
    input_profile = create_content_profile_for_input(user_input, is_present_flags)
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
