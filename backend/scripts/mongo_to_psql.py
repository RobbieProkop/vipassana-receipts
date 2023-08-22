"""
Semi-jank solution to migrate mongo db to psql
This creates an unsanitized insert which is kind of risky but it's grabbing
values from the mongo db that were already sanitized.
The biggest issue is that it doesn't escape characters so things like ' break the query.
This likely won't be needed again so I'm going to leave it in this state.
"""
import csv

# Open file 
with open('avf-receipts-19-aug-2023.csv') as file_obj:
      
    # Create reader object by passing the file 
    # object to reader method
    reader_obj = csv.DictReader(file_obj)

    header = True

    header_map = {
        'receipt_number': 'receiptNumber',
        'place': 'place',
        'full_name': 'donor',
        'email': 'email',
        'address': 'address',
        'city': 'city',
        'province': 'province',
        'postal_code': 'postalCode',
        'type': 'type',
        'number': 'number',
        'words': 'words',
        'signature': 'signature',
        'created_at': 'createdAt'
    }

    column_list = []

    for key in header_map.keys():
        column_list.append(key)

    column_list = ', '.join(column_list)

    sql = f"""INSERT INTO receipts ({column_list})
            VALUES 
            """

    dupe_check = []
    dupe_map = {}
    dupe_overwrite = 3000

    # Iterate over each row in the csv 
    # file using reader object
    for row in reader_obj:
        if header:
            header = False
            continue
        values = []
        if row['receiptNumber'] in dupe_check:
            dupe_map[dupe_overwrite] = row.copy()
            row['receiptNumber'] = dupe_overwrite
            dupe_overwrite += 1

        if not row['donor']:
            row['donor'] = f"{row['firstName']} {row['lastName']}"

        dupe_check.append(row['receiptNumber'])
        for value in header_map.values():
            values.append(f"'{row[value]}'")
        sql += f'({", ".join(values)}),'

    print(sql)
    print(dupe_map)
