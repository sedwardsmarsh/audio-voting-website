# This script cleans the clotho dataset and chooses 100 sounds from it
import random

with open('src/data/clotho_metadata.csv', 'w+') as new_file:
    dev_lines = open(
        'src/data/clotho_metadata_development.csv', 'r').readlines()
    eval_lines = open(
        'src/data/clotho_metadata_evaluation.csv', 'r').readlines()
    # drop the header lines from each dataset
    all_lines = dev_lines[1:] + eval_lines[1:]
    # drop lines with "Not found" sound_id's
    all_lines = [l for l in all_lines if "Not found" not in l]
    # drop lines missing start_end_samples
    all_lines = [l for l in all_lines if l.split(',')[4] != '']
    # insert .csv header
    new_file.write(
        'file_name,keywords,sound_id,sound_link,start_end_samples,manufacturer,license\n')
    # choose 100 random sounds from the dataset
    for line in random.choices(all_lines, k=100):
        new_file.write(line)
