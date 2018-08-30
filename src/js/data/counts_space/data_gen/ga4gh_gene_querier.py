import sys
import argparse
import requests
import json

global outfile, f, pyresponse
#chrs = {'1':249250621,'2':243199373,'3':198022430,'4':191154276,'5':180915260,'6':171115067,'7':159138663,'8':146364022,'9':141213431,'10':135534747,'11':135006516,'12':133851895,'13':115169878,'14':107349540,'15':102531392,'16':90354753,'17':81195210,'18':78077248,'19':59128983,'20':63025520,'21':48129895,'22':51304566,'X':155270560,'Y':59373566}

# for testing
#chrs = {'3': 198022430}
#outfile = open('gene_stats.json', 'w')

g1 = open('mutation_counts_g1.txt', 'r')
g2 = open('mutation_counts_g2.txt', 'r')

with open("call2vs.json") as tweetfile:
    pyresponse = json.load(tweetfile)

#f = open('pcg_queries.csv', 'r')

vsID = {
    6: "Cervix", 
    16: "Stomach", 
    10: "Liver", 
    15: "Skin", 
    1: "Bladder", 
    2: "Brain", 
    5: "Head and Neck", 
    12: "Lung", 
    4: "Breast", 
    7: "Colorectal", 
    9: "Kidney", 
    17: "Uterus", 
    8: "Esophagus", 
    13: "Pancreas", 
    14: "Prostate", 
    11: "Ovary", 
    3: "Bone", 
    0: "Blood"
  }

def GASearchVariantsRequest(r, s, e):
    request = {'start':int(s), 'end': int(e), 'referenceName': r, 'pageSize': None, 'pageToken': None, 'callSetIds': None, 'variantName': None, 'variantSetIds': []}
    return request

def variants_search(this_request, this_url):
    # print this_request
    r = requests.post(this_url + "/variants/search", data=json.dumps(this_request), headers={'content-type':'application/json'})
    # print r
 #    l = len(r.text)
 #    if l < 500:
	# print r.text
    return json.loads(r.text)

def write_to_csv(data, gene):
    vs_tracker = {'Cervix': 0, 'All': 0, 'Stomach': 0, 'Bone': 0, 'Blood': 0, 'Breast': 0, 'Bladder': 0, 'Brain': 0, 'Head and Neck': 0, 'Lung': 0, 'Liver': 0, 'Colorectal': 0, 'Skin': 0, 'Uterus': 0, 'Ovary': 0, 'gene': gene, 'Prostate': 0, 'Esophagus': 0, 'Kidney': 0, 'Pancreas': 0}
    for variant in data['variants']:
        vs_tracker['All'] += len(variant['calls'])
        for call in variant['calls']:
            c = pyresponse[call['callSetId']]
            vs = vsID[c]
            vs_tracker[vs] += 1
    print vs_tracker+",\n"

if __name__ == "__main__":

    # for line in f:
    #     line = line.strip()
    #     eles = line.split(",")
    #     r = GASearchVariantsRequest(eles[1], eles[2], eles[3])
    #     response = variants_search(r, 'http://localhost:5000')
    #     print eles[0]
    #     print response

    r = GASearchVariantsRequest('17', '7565097', '7590868')
    response = variants_search(r, 'http://localhost:5000')
    print "var gene_stats = {"
    for line in f:
        line = line.strip()
        eles = line.split(",")
        r = GASearchVariantsRequest(eles[1], eles[2], eles[3])
        response = variants_search(r, 'http://localhost:5000')
        write
    print "}"

    f.close()
