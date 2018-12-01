import os

path = "./tmp_data/"

id = 0
name_dict = dict()
with open("./game_id.txt", "w") as gid_f:
    for file in os.listdir(path):
        print(file)
        if file != "game_id.txt":
            with open(path+file, "r") as f, open("./data/"+file, "w") as output_f:
                for line in f:
                    tp = line.rstrip().split('"')
                    name = tp[1]
                    if name in name_dict.keys():
                        gid = name_dict[name][0]
                    else:
                        gid = id
                        id += 1
                        tmp = tp[2].split(",")
                        p = tmp[2].split("%")[0]
                        num = tmp[3]
                        name_dict[name] = [gid, p, num]
                    output_f.write(str(gid)+'\n')
    for key in name_dict.keys():
        string = str(name_dict[key][0])+","+str(name_dict[key][1])+","+str(name_dict[key][2])+',"'+key+'"\n'
        gid_f.write(string)