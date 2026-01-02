from flask import Flask ,render_template,request,redirect,url_for,session
import sqlite3
import pandas as pd
from werkzeug.security import generate_password_hash,check_password_hash
import ollama
from flask import jsonify

app=Flask(__name__)
app.secret_key="secret123"

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/register",methods=["GET","POST"])

def register():
    if request.method =="POST":
        username=request.form["username"]
        password=request.form["password"]

        hashed_password=generate_password_hash(password)

        conn=sqlite3.connect("users.db")
        cursor=conn.cursor()
        try:
            cursor.execute("INSERT INTO users(username,password) VALUES(?,?)",(username,hashed_password))
            conn.commit()
            conn.close()
            return redirect(url_for("login"))
        except sqlite3.IntegrityError:
            conn.close()
            return render_template("regsiter.html",error="Username already exist")
    return render_template("register.html")


@app.route("/login",methods=["GET","POST"])

def login():
    if request.method=="POST":
        username=request.form["username"]
        password=request.form["password"]
        conn=sqlite3.connect("users.db")
        cursor=conn.cursor()
        cursor.execute("SELECT password from users WHERE username=?",(username,))
        user=cursor.fetchone()
        conn.close()


        if user and check_password_hash(user[0],password):
            session["user"]=username
            return redirect(url_for("add_sale"))
        else:
            return render_template("loginpage.html",error="Invalid username or password")
        
    return render_template("loginpage.html")



@app.route("/add-sale",methods=["GET","POST"])

def add_sale():
    if request.method=="POST":
        date=request.form["date"]
        product=request.form["product"]
        category=request.form["category"]
        quantity=request.form["quantity"]
        price=request.form["price"]
        conn=sqlite3.connect("sales.db")
        conn.execute("INSERT INTO sales(date,product_name,category,quantity,price) VALUES(?,?,?,?,?)",(date,product,category,quantity,price))
        conn.commit()
        conn.close()

        return redirect(url_for("dashboard"))
    return render_template("add_sales.html")

@app.route("/dashboard")

def dashboard():
    conn=sqlite3.connect("sales.db")
    df=pd.read_sql_query("SELECT * FROM sales",conn)
    conn.close()

    if df.empty:
        return render_template("dashboard.html")
    
    df["total"]=df["quantity"]*df["price"]
    category_sales=df.groupby("category")["total"].sum().to_dict()
    monthly_sales=df.groupby(df["date"].str[:7])["total"].sum().to_dict()

    return render_template("dashboard.html",category_sales=category_sales,monthly_sales=monthly_sales)

@app.route("/chat")
def chat_page():
    return render_template("chatbot.html")


@app.route("/chat-ai",methods=["POST"])

def chat_ai():
    user_question=request.json.get("question")

    #Loading sales data
    conn=sqlite3.connect("sales.db")
    df=pd.read_sql_query("SELECT * FROM sales",conn)
    conn.close()

    if df.empty:
        return jsonify({"answer":"No sales data available yet."})
    
    df["total"]=df["quantity"]*df["price"]

    category_sales=df.groupby("category")["total"].sum().to_dict()
    monthly_sales=df.groupby(df["date"].str[:7])["total"].sum().to_dict()

    data_summary=f""" Category wise sales : {category_sales} 
     Monthly sales : {monthly_sales} """
    
    prompt=f""" You are a sales analyst chatbot.

    Data:{data_summary}
    Question:{user_question}

    Answer clearly in simple words. """

    response=ollama.chat(model="llama3",messages=[{"role":"user","content":prompt}])

    return jsonify({"answer":response["message"]["content"]})




if __name__=="__main__":
    app.run(debug=True)
