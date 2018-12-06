import os

for file in os.listdir("./tmp_data2/"):
    with open("./tmp_data2/"+file, "r") as input_file, open("./data/"+file, "w") as output_file:
        for line in input_file:
            print(line.rstrip().split(","))
    break
