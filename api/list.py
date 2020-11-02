#!/usr/bin/env python3

import cgi   # NEW
import sqlite3
import json

def main(): # NEW except for the call to processInput
    conn = sqlite3.connect('docman.db')
    c = conn.cursor()
    

    form = cgi.FieldStorage()      # standard cgi script lines to here!
    
    print(json.dumps([{
        "id": x[0], 
        "correspondent": x[1],
        "subject": x[2],   
        "date": x[3], 
        "fileName": x[4]
        } for x in c.execute("select id, correspondent, subject, date, name from document")]))

try:   # NEW
    print("Content-type: application/json\r\n")   # say generating html
    main() 
except:
    cgi.print_exception()                 # catch and print errors
