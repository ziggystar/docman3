#!/usr/bin/env python3

import cgi   # NEW
import sys

def main(): # NEW except for the call to processInput
    form = cgi.FieldStorage()      # type: MiniFieldStorage
    with open("data/" + form["path"].value,"rb") as f:
        sys.stdout.buffer.write(f.read())

try:   # NEW
    main() 
except:
    cgi.print_exception()                 # catch and print errors

