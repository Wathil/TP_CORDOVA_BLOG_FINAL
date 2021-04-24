# TP_CORDOVA_BLOG

BlogApp: Cordova app
json-server: contient le fichier articles.json

Pour lancer le server json: 
dans le répertoire json-server:
json-server -p 5557 articles.json

Pour lancer l'app dans le browser:
www/js/blog.js url: "http://localhost:5557/articles/", // browser
dans le répertoire BlogApp:
cordova run

Pour lancer l'app dans l'émulateur android:
www/js/blog.js url: "http://10.0.2.2:5557/articles/", // emulate android
dans le répertoire BlogApp:
cordova emulate android

page de démarrage: login.html
login: a
password: b