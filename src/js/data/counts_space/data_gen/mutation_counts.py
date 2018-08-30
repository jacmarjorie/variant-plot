import sys
import argparse
import requests
import json


g1 = open('mutation_counts_g1.txt', 'r')
g2 = open('mutation_counts_g2.txt', 'r')

with open("call2vs.json") as tweetfile:
    pyresponse = json.load(tweetfile)

#f = open('pcg_queries.csv', 'r')

vsID = {
    6: "cervix", 
    16: "stomach", 
    10: "liver", 
    15: "skin", 
    1: "bladder", 
    2: "brain", 
    5: "head", 
    12: "lung", 
    4: "breast", 
    7: "colorectal", 
    9: "kidney", 
    17: "uterus", 
    8: "esophagus", 
    13: "pancreas", 
    14: "prostate", 
    11: "ovary", 
    3: "bone", 
    0: "blood"
  }

c1 = {'name': 'Portland', 'blood':0, 'bladder':0, 'brain':0, 'bone':0, 'breast':0,'head':0, 'cervix':0, 'colorectal':0, 'esophagus':0, 'kidney':0, 'liver':0, 'ovary':0, 'lung':0, 'pancreas':0, 'prostate':0, 'skin':0, 'stomach':0, 'uterus':0}

c2 = {'name': 'Austin', 'blood':0, 'bladder':0, 'brain':0, 'bone':0, 'breast':0,'head':0, 'cervix':0, 'colorectal':0, 'esophagus':0, 'kidney':0, 'liver':0, 'ovary':0, 'lung':0, 'pancreas':0, 'prostate':0, 'skin':0, 'stomach':0, 'uterus':0}

c3 = {'blood':0, 'bladder':0, 'brain':0, 'bone':0, 'breast':0,'head':0, 'cervix':0, 'colorectal':0, 'esophagus':0, 'kidney':0, 'liver':0, 'ovary':0, 'lung':0, 'pancreas':0, 'prostate':0, 'skin':0, 'stomach':0, 'uterus':0}

t = {'cervix' : {'name':'cervix', 'g1':0, 'g2':0},
'stomach' : {'name':'stomach', 'g1':0, 'g2':0},
'liver' : {'name':'liver', 'g1':0, 'g2':0},
'skin' : {'name':'skin', 'g1':0, 'g2':0},
'bladder' : {'name':'bladder', 'g1':0, 'g2':0},
'brain' : {'name':'brain', 'g1':0, 'g2':0},
'head' : {'name':'head', 'g1':0, 'g2':0},
'lung' : {'name':'lung', 'g1':0, 'g2':0},
'breast' : {'name':'breast', 'g1':0, 'g2':0},
'colorectal' : {'name':'colorectal', 'g1':0, 'g2':0},
'kidney' : {'name':'kidney', 'g1':0, 'g2':0},
'uterus' : {'name':'uterus', 'g1':0, 'g2':0},
'esophagus' : {'name':'esophagus', 'g1':0, 'g2':0},
'pancreas' : {'name':'pancreas', 'g1':0, 'g2':0},
'prostate' : {'name':'prostate', 'g1':0, 'g2':0},
'ovary' : {'name':'ovary', 'g1':0, 'g2':0},
'bone' : {'name':'bone', 'g1':0, 'g2':0},
'blood' : {'name':'blood', 'g1':0, 'g2':0}}

s1 = 0
for line in g1:
    line = line.strip()
    eles = line.split('\t')
    cnt = eles[0]
    samp = eles[1]
    vs = pyresponse[eles[1]]
    cancer = vsID[vs]
    t[cancer]['g1'] += 1
    c3[cancer] += int(cnt)
    s1 += 1
    # print cnt, samp, vs, cancer

s2 = 0
for line in g2:
    line = line.strip()
    eles = line.split('\t')
    cnt = eles[0]
    samp = eles[1]
    vs = pyresponse[eles[1]]
    cancer = vsID[vs]
    t[cancer]['g2'] += 1
    c3[cancer] += int(cnt)
    s2 += 1
    # print cnt, samp, vs, cancer
# print "var basic_stats = ["
# for e in t:
#     print str(t[e]) + ","
# print "]"

print s1, s2
#print c3





