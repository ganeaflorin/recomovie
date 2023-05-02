import json
from urllib.parse import unquote_plus

from rest_framework.decorators import api_view
from rest_framework.response import Response

import py_eureka_client.eureka_client as eureka_client

from movie_recommender_service.api.models.get_similar_movies import get_similar_movies

server_port = 8086
eureka_client.init(eureka_server="http://localhost:8761/eureka/",
                   app_name="movie-recommender-service",
                   instance_port=server_port)


@api_view(['GET'])
def similar_movies(request):
    user_input = json.loads(unquote_plus(request.GET["input"]))
    movies = get_similar_movies(user_input)
    return Response(movies)
