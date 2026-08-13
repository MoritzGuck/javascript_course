# tech history timeline

## Wikipedia as source

### API-Requests to wikipedia

Common domain: 
```
curl -X GET "https://en.wikipedia.org/w/api.php?titles=Apollo_11&action=query&prop=extracts&format=json&exintro=true&explaintext=true"
```

### Client-Server Diagram
1.
a) 
Browser --- get DNS address  ---> DNS-Server

b)
Browser <--- give IP-Adress  --- DNS-Server


c) 
Browser --- GET request ---> wikipedia-api-server

d)
Browser <--- response with content --- wikipedia-api-server


2. HTTPS/SSL encryption
a) 
Browser (encrypt data) -> send encrypted request -> Server (decrypt request)

b) 
Browser (decrypt response) <- send encrypted response <- Server (encrypt response)

The browser somehow uses the public key and the server the private key for that.

3. JSON response
{
    "key1": "value1"
}

4. DOM
Browswer receives JSON -> Javascript parses JSON -> JAvascript updates DOM tree -> Browswer renders page with new content

5. How javascript updates article field with extract

a) parse extract and title from JSON -> use javascript to insert a new article.event with h3 = title and p = extract -> hand it over to Browser to render with the new Appolo 11 article. 