# WARNING: this script is intended to be run locally, when the entire Clotho
# evaluation set is present.
# This script will remove random files from the clotho evaluation dataset to 
# reduce its size.
import random
import csv
import os

if __name__ == '__main__':

    # open metadata csv
    with open('src/data/test.csv') as f:
        reader = csv.DictReader(f)

        # randomly select some files to delete, remove the corresponding lines
        for line in reader:
            print(line['file_name'])

        # delete file if it exists
        