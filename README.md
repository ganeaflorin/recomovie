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

