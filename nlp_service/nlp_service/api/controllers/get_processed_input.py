from rest_framework.decorators import api_view
from rest_framework.response import Response

from nlp_service.api.models.nlp_trained_model import get_user_preferences
from urllib.parse import unquote_plus

import py_eureka_client.eureka_client as eureka_client

server_port = 8085
eureka_client.init(eureka_server="http://localhost:8761/eureka/",
                   app_name="nlp-service",
                   instance_port=server_port)


@api_view(['GET'])
def get_processed_input(request):
    user_input = unquote_plus(request.GET["input"])
    user_preferences = get_user_preferences(user_input)
    return Response(user_preferences)
