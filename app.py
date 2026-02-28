import os
from dotenv import load_dotenv
import json
from flask import Flask, flash, redirect, render_template, request, session, url_for, make_response
import sqlite3

load_dotenv()

db = sqlite3.connect("database.db")
app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False

@app.route("/")
def index():
    return render_template("landing.html")


@app.route("/cadastro", methods=["GET", "POST"])
def cadastro():
    if request.method == "POST":
        return redirect("https://www.cbctc.puc-rio.br/Paginas/MeuCB/Noticias.aspx?id=788")
    return render_template("cadastro.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/areas/escolha")
def escolha():
    return "escolha a area"


@app.route("/areas")
def areas():
    return "areas"


@app.route("/calendario")
def calendario():
    return "calendario"


@app.route("/workshops")
def workshops():
    return render_template("workshops.html")


@app.route("/workshops/<int:id>")
def video(id):
    return render_template("video.html", id=id)


@app.route("/quiz/<int:id>/<int:num>")
def quiz(id, num):
    return render_template("quiz.html", id=id, num=num)


''''
    Caso a pessoa digite um URL inválido
    aparece essa tela
'''
@app.errorhandler(404)
def not_found(error):
    resp = make_response(render_template('error.html'), 404)
    resp.headers['X-Something'] = 'A value'
    return resp


'''
    Eu não sei se isso será necessário no servidor
    mas se vc rodar local, basta digitar:
    flask run --debug
'''
# if __name__ == "__main__":
#     app.run(debug=True)