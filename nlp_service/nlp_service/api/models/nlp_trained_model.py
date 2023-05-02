import random
from enum import Enum

import spacy
from spacy.training.example import Example
from ast import literal_eval
import os


class MovieFeature(Enum):
    CAST = "cast"
    KEYWORDS = "keywords"
    DIRECTOR = "director"
    GENRES = "genres"
    RELEASE_DATE = "release_date"


class Entities(Enum):
    ACTOR = "ACTOR"
    KEYWORD = "KEYWORD"
    DIRECTOR = "DIRECTOR"
    GENRE = "GENRE"
    RELEASE_DATE = "RELEASE_DATE"


training_texts_file = "C:\\Users\\andre\\Downloads\\recomovie\\nlp_service\\nlp_service\\resources\\nlp_training_texts"
training_entities_file = "C:\\Users\\andre\\Downloads\\recomovie\\nlp_service\\nlp_service\\resources\\nlp_training_entities"
trained_model_path = "C:\\Users\\andre\\Downloads\\recomovie\\nlp_service\\nlp_service\\trainedModel"


def read_data_from_files(texts_file, entities_file):
    with open(texts_file) as f:
        texts = f.read().splitlines()
    with open(entities_file) as f:
        entities = literal_eval(f.read())
    return texts, entities


def get_train_data(texts_file, entities_file):
    texts, text_entities = read_data_from_files(texts_file, entities_file)
    train_data = []
    for text in texts:
        current_entities = []
        for entity, label in text_entities[texts.index(text)]:
            begin_index = text.find(entity)
            end_index = begin_index + len(entity)
            if begin_index != -1:
                current_entities.append((begin_index, end_index, label))
        train_data.append((text, {"entities": current_entities}))
    return train_data


def train_model(model_path, data, iterations):
    if os.path.exists(model_path):
        return spacy.load(model_path)
    nlp = spacy.blank("en")
    nlp.add_pipe("ner")

    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]
    with nlp.disable_pipes(*other_pipes):
        optimizer = nlp.begin_training()
        for itn in range(iterations):
            print(itn)
            random.shuffle(data)
            losses = {}
            for text, annotations in data:
                doc = nlp.make_doc(text)
                example = Example.from_dict(doc, annotations)
                nlp.update([example], drop=0.2, sgd=optimizer, losses=losses)
    nlp.to_disk(model_path)
    return nlp


def get_user_preferences_dictionary(entities):
    user_preferences = {"genres": [], "keywords": [], "directors": [], "cast": [], "releaseDate": "2005", "voteCount": 5000, "voteAverage": 8.5}
    for ent in entities:
        match ent.label_:
            case "GENRE":
                user_preferences["genres"].append(ent.text)
            case "KEYWORD":
                user_preferences["keywords"].append(ent.text)
            case "ACTOR":
                user_preferences["cast"].append(ent.text)
            case "DIRECTOR":
                user_preferences["directors"].append(ent.text)
            case "RELEASE_DATE":
                user_preferences["releaseDate"] = ent.text
            case _:
                return
    return user_preferences


def get_user_preferences(user_input):
    train_data = get_train_data(training_texts_file, training_entities_file)
    trained_model = train_model(trained_model_path, train_data, 200)
    doc = trained_model(user_input)
    return get_user_preferences_dictionary(doc.ents)
