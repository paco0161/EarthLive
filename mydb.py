import mysql.connector

mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='Paco^Wong1i1i'
)

myCursor = mydb.cursor()

myCursor.execute("DROP DATABASE dasdasd")

print("all done")