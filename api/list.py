#!/usr/bin/env python3

import cgi   # NEW
import sqlite3
import json
import cgitb
cgitb.enable()

def main(): # NEW except for the call to processInput
    conn = sqlite3.connect('docman.db')
    c = conn.cursor()
    

    form = cgi.FieldStorage()      # standard cgi script lines to here!
    
    if "search" in form:
        query = f"SELECT id, correspondent, subject, date, name FROM document WHERE subject LIKE '%{form['search'].value}%'"
    else:
        query = "select id, correspondent, subject, date, name from document"
    
    print(json.dumps([{
        "id": x[0], 
        "correspondent": x[1],
        "subject": x[2],   
        "date": x[3], 
        "path": x[4]
        } for x in c.execute(query)]))

try:   # NEW
    print("Content-type: application/json\r\n")   # say generating html
    main() 
except:
    cgi.print_exception()                 # catch and print errors
