#!/usr/bin/env python3

import cgi   # NEW
import sys
import subprocess

def main(): # NEW except for the call to processInput

    form = cgi.FieldStorage()      # type: MiniFieldStorage
    fileName = "data/" + form["path"].value

    sys.stdout.buffer.write(b"Content-Type: image/png\r\n")

    result = subprocess.run(["pdftoppm", "-singlefile" ,"-png", fileName])

try:   # NEW
    main() 
except:
    cgi.print_exception()                 # catch and print errors

