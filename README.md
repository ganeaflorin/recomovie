# Web system based on microservices and natural language processing for movie recommendations

## Demonstration video

You can view the demonstration video by following this [link](https://www.youtube.com/watch?v=I6_OlxD79qU).

## Purpose and functionalities

The objective of this application is to provide movie recommendations based on the users' input expressed in natural language.
For each input, the user is provided with a list of 20 films which can be saved as a playlist, and later it can be viewed or deleted.

The application also provides social interaction, as the you can search for other users and add them as friends. You can view your friends' playlists and save them in your own library.  

In order to enchance the user experience, the application is internationalized, having two localizations available: English and Romanian. Additionally, it provides
the option to choose between a light and a dark theme. Real-time validations are included into the login and registration forms to deliver prompt feedback.

## Technologies and architecture

### Backend

Used technologies:

<ul>
<li>API Gateway</li>
<li>Eureka Service Discovery</li>
<li>Java</li>
<li>Spring Boot</li>
<li>PostgreSQL</li>
<li>Python</li>
<li>Django</li>
</ul>

The server is built using the microservices-oriented architecture, including 8 microservices orchestrated by API Gateway and Service Discovery. 
To facilitate the development of the backend of the application, we've used Java for 6 microservices, 
and Python for the 2 that make up the recommendation system to benefit from Python's support for data processing and wide range of libraries for the approached areas.


The API Gateway intercepts the incoming requests, decides which microservice is responsible of handling it and communicates with the Service Discovery in order to find the IP address of it.
The request is passed to the microservice, which handles it and returns the response to the API Gateway and it is served to the client. 

This process and the way the microservices interact with each other is represented in the below diagram:

![backend architecture](https://i.imgur.com/yxWGCTq.png)


### Frontend

Used technologies:

<ul>
<li>React</li>
<li>TypeScript</li>
<li>Redux Toolkit</li>
<li>Redux Saga</li>
<li>i18n</li>
<li>Material UI</li>
<li>React Router DOM</li>
</ul>

## Details of implementation

In order to recognise the user's preferences regarding films, we chose arbitrarily the most important features of a movie:
<ul>
  <li>genres</li>
  <li>the year of period of release</li>
  <li>director</li>
  <li>actors</li>
  <li>summary keywords</li>
</ul>

We have created a dataset consisting of two files: 
<ul>
  <li>one containing as many types of inputs as possible</li>
  <li>one containing the entities present in every input from the first file</li>
</ul>

Using the Spacy library, we trained a model based on the dataset to be able to recognise the entities specified above.
Example of an input and the associated labels:

 ”I like crime and drama movies released in 1960s. I prefer movies directed by David
 Fincher and I enjoy movies directed by James Cameron. I sometimes like films starring Robert
 Downey Jr. and Jake Gyllenhaal and I love films about war."

<table>
  <tr>
    <th>
      Entity
    </th>
    <th>
      Label
    </th>
  </th>
</tr>
  <tr>
    <td>crime</td>
    <td>genre</td>
  </tr>
  <tr>
    <td>drama</td>
    <td>genre</td>
  </tr>
  <tr>
    <td>1960s</td>
    <td>release period</td>
  </tr>
  <tr>
    <td>David Fincher</td>
    <td>director</td>
  </tr>    
  <tr>
    <td>James Cameron</td>
    <td>director</td>
  </tr>
  <tr>
    <td>Robert Downey Jr.</td>
    <td>actor</td>
  </tr>
  <tr>
    <td>Jake Gyllenhaal</td>
    <td>actor</td>
  </tr>
  <tr>
    <td>war</td>
    <td>keyword</td>
  </tr>
</table>

To generate the recommendations, we have approached the content based filtering strategy. We have aggregated a dataset with movies and the features that can be recognised. 

For every feature (e.g. "genres") we have computed the importance of the possible terms (e.g. "romance") using the TF-IDF (<i>Term Frequency-Inverse Document Frequency</i>) algorithm. 
Meaning, if the user prefers action movies, but the dataset has a high frequency of action movies, it will weight less compared to other preferences. 
On the other hand, if the user prefers westerns and the dataset contains few westerns, the algorithm will push those as recommendations.

The only feature not computed using the TF-IDF is the release year. We have considered the period of the release to be more important in defining a movie instead of the release year. That's why
we have chosen to normalize these values using the <i>MinMax Scaler</i> algorithm.

The next step consisted in creating the content profile of the dataset by concatenating the values computed above. 
It is represented by a sparse matrix, in which every column represents terms present in the dataset(e.g. "Quentin Tarantino") and every line represents a movie from the dataset. The matrix values
are:
<ul>
  <li>0, if the term is not present in the movie's characteristics</li>
  <li>the TF-IDF score or the result of MinMaxScaler normalization</li>
</ul>

Using the models trained on the dataset, a profile content is generated for the user's preferences, resulting a vector. 
To compute the similarity between the vector representing the user's preferences and the dataset movies, we have used the <i>cosinus similarity</i> formula.
