#!/usr/bin/env python3

import sqlite3
import json


def main():  # NEW except for the call to processInput
    conn = sqlite3.connect('api/docman.db')
    c = conn.cursor()

    with open('api/db.json') as json_file:
        data = json.load(json_file)
        for p in data:
            file = p['id']
            data = p['data']
            query = f"INSERT INTO document (name, correspondent, subject, date) VALUES ('{file}','{data['sender']}','{data['subject']}',datetime('{data['date']}'))"
            print(query)
            c.execute(query)
        conn.commit()


main()
