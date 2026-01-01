import sqlite3


def get_db_connection():
    conn=sqlite3.connect("sales.db")

    conn.row_factory=sqlite3.Row
    return conn
def create_table():
    conn=get_db_connection()
    conn.execute(""" CREATE TABLE IF NOT EXISTS sales(
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 date TEXT,
                 product_name TEXT,
                 category TEXT,
                 quantity INTEGER,
                 price REAL
                 ) """)
    conn.commit()
    conn.close()
create_table()
