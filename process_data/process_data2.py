import os

path = "./tmp_data/"

id = 0
name_dict = dict()
with open("./data/game_id.txt", "w") as gid_f:
    for file in os.listdir(path):
        print(file)
        if file != "game_id.txt":
            with open(path+file, "r") as f, open("./data/"+file, "w") as output_f:
                for line in f:
                    tp = line.rstrip().split('"')
                    name = tp[1]
                    if name in name_dict.keys():
                        gid = name_dict[name]
                    else:
                        gid = id
                        name_dict[name] = gid
                        id += 1
                    new_str = str(gid)+tp[2]+"\n"
                    output_f.write(new_str)
    for key in name_dict.keys():
        string = str(name_dict[key])+","+key+"\n"
        gid_f.write(string)