import random
import re
import spacy
from spacy.training.example import Example
from ast import literal_eval
import os
from nlp_service.resources.constants import *


def format_release_date(release_date):
    date = re.sub(NON_DIGIT_REGEX, EMPTY_STRING, release_date)
    if len(date) != SPECIFIC_YEAR_DIGITS:
        if int(date) <= CENTURY_BREAKPOINT:
            return CURRENT_CENTURY_PREFIX + date
        return PREVIOUS_CENTURY_PREFIX + date
    return date


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
    user_preferences = {"genres": [], "keywords": [], "directors": [], "cast": [], "releaseDate": "", "voteCount": 0, "voteAverage": 0.0}
    for ent in entities:
        match ent.label_:
            case "GENRE":
                user_preferences["genres"].append(ent.text.lower())
            case "KEYWORD":
                user_preferences["keywords"].append(ent.text.lower())
            case "ACTOR":
                user_preferences["cast"].append(ent.text.lower())
            case "DIRECTOR":
                user_preferences["directors"].append(ent.text.lower())
            case "RELEASE_DATE":
                user_preferences["releaseDate"] = format_release_date(ent.text)
            case _:
                return
    return user_preferences


def get_user_preferences(user_input):
    train_data = get_train_data(training_texts_file, training_entities_file)
    trained_model = train_model(trained_model_path, train_data, 200)
    doc = trained_model(user_input)
    return get_user_preferences_dictionary(doc.ents)
