import requests
import csv

csv_columns = ['id', 'title', 'releaseDate', 'voteAverage', 'voteCount', 'keywords', 'genres', 'cast', 'directors']
API_URL = 'https://api.themoviedb.org/3'
API_KEY = '3ea83eb3dc26b179e45630d02e2a3668'
csv_file = "movie_dataset.csv"


def get_keywords(movie_id):
    payload = {'api_key': API_KEY}
    r = requests.get(API_URL + '/movie/' + str(movie_id) + '/keywords', params=payload)
    keywords = []
    for keyword in r.json()['keywords'][:10]:
        keywords.append(keyword['name'])
    return keywords


def get_genres(movie_id):
    payload = {'api_key': API_KEY}
    r = requests.get(API_URL + '/movie/' + str(movie_id), params=payload)
    genres = []
    for genre in r.json()['genres']:
        genres.append(genre['name'])
    return genres


def get_credits(movie_id):
    payload = {'api_key': API_KEY}
    r = requests.get(API_URL + '/movie/' + str(movie_id) + '/credits', params=payload)
    cast = []
    for actor in r.json()['cast'][:6]:
        cast.append(actor['name'])
    for crew_member in r.json()['crew']:
        if crew_member['job'] == "Director":
            return [cast, crew_member['name']]
    return [cast, '']


def get_movies(number_of_pages):
    for page in range(1, number_of_pages + 1):
        print(page)
        payload = {'api_key': API_KEY, 'sort_by': 'voteCount.desc', 'page': page}
        r = requests.get(API_URL + '/discover/movie', params=payload)
        if "results" in r.json():
            response_movies = r.json()['results']
            for movie in response_movies:
                [cast, director] = get_credits(movie['id'])
                write_row_to_csv({
                    'id': movie['id'],
                    'title': movie['title'],
                    'releaseDate': movie['releaseDate'],
                    'voteAverage': movie['voteAverage'],
                    'voteCount': movie['voteCount'],
                    'keywords': get_keywords(movie['id']),
                    'genres': get_genres(movie['id']),
                    'cast': cast,
                    'directors': director
                })


def write_row_to_csv(row):
    try:
        with open(csv_file, 'a', encoding="utf-8", newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            # writer.writeheader()
            writer.writerow(row)
    except IOError:
        print("I/O error")


def write_csv_fieldnames():
    try:
        with open(csv_file, 'w', encoding="utf-8", newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
    except IOError:
        print("I/O error")


write_csv_fieldnames()
get_movies(250)
