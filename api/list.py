#!/usr/bin/env python3

import cgi   # NEW
import sqlite3
import json

def main(): # NEW except for the call to processInput
    conn = sqlite3.connect('docman.db')
    c = conn.cursor()
    

    form = cgi.FieldStorage()      # standard cgi script lines to here!
    
    print(json.dumps([{"subject": x[0], "date": x[1]} for x in c.execute("select subject, date from document")]))

try:   # NEW
    print("Content-type: application/json\r\n")   # say generating html
    main() 
except:
    cgi.print_exception()                 # catch and print errors
