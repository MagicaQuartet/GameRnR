import os

data_path = "./raw_data/"


for directory in os.listdir(data_path):
    print(directory)
    num = 0
    with open("./tmp_data/" + directory + ".txt", "w") as output_file:
        for file in os.listdir(data_path+directory):
            path = data_path + directory + "/" + file
            print("open:", path)
            with open(path, 'r') as f:
                i, j = 0, 0
                name = None
                for line in f:
                    line = line.rstrip().lstrip()
                    if '<span class="title"' in line:
                        name = line.split(">")[1].split("<")[0]

                    if 'search_review_summary' in line:
                        tmp = line.split('"')[3].split("&lt;br&gt;")
                        tmp2 = tmp[1].split(" ")
                        p, num = tmp2[0], tmp2[3].replace(',', '')
                        write_data = "\"%s\",%s,%s,%s\n" % (name, tmp[0], p, num)
                        # print(write_data)
                        output_file.write(write_data)
                    i += 1