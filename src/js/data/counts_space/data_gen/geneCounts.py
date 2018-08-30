import sys, os, json, math, collections, operator

def round_this(n):
    return int(math.ceil(n/100.0))*100

if __name__ == "__main__":
    f = open('gene.stats')
    f2 = open('pcg.txt')
    pcg = []
    for l in f2:
        l = l.strip()
        pcg.append(l)
    #print "var gene_list = " + str(pcg[1:])

    # cnt = {'blood':359, 'bladder':233, 'brain':841, 'bone':206, 'breast':1185,'head':524, 'cervix':194, 'colorectal':345, 'esophagus':188, 'kidney':668, 'liver':991, 'ovary':316, 'lung':224, 'pancreas':1184, 'prostate':442, 'skin':337, 'stomach':298, 'uterus':246}
    cnt = {'cervix': 45859, 'head': 72926, 'stomach': 148529, 'kidney': 529976, 'liver': 3983232, 'bladder': 54768, 'brain': 166801, 'lung': 141676, 'blood': 363831, 'colorectal': 145227, 'skin': 252276, 'uterus': 184704, 'esophagus': 2007599, 'pancreas': 3588326, 'prostate': 751041, 'ovary': 1087314, 'bone': 38126, 'breast': 277924}
    # cnt_p = {}
    # for e in cnt:
    #     cnt_p[e] = cnt[e]/float(8000)
    # print cnt_p

    # data = {}
    # counts = ["counts"]
    # genes = []
    # buckets = {}
    # mutations_raw_counts = {}
    # mutations_normalized = {}
    # mutations_all = {}
    counts_all = {}
    counts_all_reg = {}
    gene_consensus = {}
    for line in f:
        if line[0] != 'g':
            line = line.strip()
            eles = line.split(",")
            bucket = round_this(int(eles[10]))
            gene_length = int(eles[8]) - int(eles[7])
            ref = eles[3][3:]
            blood = int(eles[11])
            bladder = int(eles[12])
            brain = int(eles[13])
            bone = int(eles[14])
            breast = int(eles[15])
            head = int(eles[16])
            cervix = int(eles[17])
            colo = int(eles[18])
            eso = int(eles[19])
            kid = int(eles[20])
            liv = int(eles[21])
            ov = int(eles[22])
            lung = int(eles[23])
            panc = int(eles[24])
            pros = int(eles[25])
            skin = int(eles[26])
            stom = int(eles[27])
            uter = int(eles[28])

            # newlist = []
            # if eles[0] in pcg:
            #     newlist.append(eles[0])
            #     newlist.append(eles[3][3:])
            #     newlist.append(eles[7])
            #     newlist.append(eles[8])
            #     print ",".join(newlist)


            # if eles[0] not in mutations_all and eles[0] in pcg:
            #     if int(eles[10]) != 0:
            #         mutations_all[eles[0]] = (float(eles[10])/gene_length, eles[8], eles[7], gene_length, int(eles[10]))

            if eles[0] in pcg and int(eles[10]) != 0:
                    #mutations_raw_counts[eles[0]] = int(eles[10])
                    # counts_all_reg[eles[0]] = {'all':int(eles[10]), 'blood':blood, 'bladder':bladder, 'brain':brain, 'bone':bone, 'breast':breast, 'head':head, 'cervix':cervix, 'colorectal':colo, 'esophagus':eso, 'kidney': kid, 'liver':liv, 'ovary':ov, 'lung':lung, 'pancreas':panc, 'prostate': pros, 'skin':skin, 'stomach':stom, 'uterus': uter, "name": eles[0]}
                    counts_all[eles[0]] = {'all':0, 'blood':float(blood)/cnt['blood'], 'bladder':float(bladder)/cnt['bladder'], 'brain':float(brain)/cnt['brain'], 'bone':float(bone)/cnt['bone'], 'breast':float(breast)/cnt['breast'], 'head':float(head)/cnt['head'], 'cervix':float(cervix)/cnt['cervix'], 'colorectal':float(colo)/cnt['colorectal'], 'esophagus':float(eso)/cnt['esophagus'], 'kidney': float(kid)/cnt['kidney'], 'liver':float(liv)/cnt['liver'], 'ovary':float(ov)/cnt['ovary'], 'lung':float(lung)/cnt['lung'], 'pancreas':float(panc)/cnt['pancreas'], 'prostate': float(pros)/cnt['prostate'], 'skin':float(skin)/cnt['skin'], 'stomach':float(stom)/cnt['stomach'], 'uterus': float(uter)/cnt['uterus'], "name": eles[0]}
                    s = 0
                    for e in counts_all[eles[0]]:
                        if e != 'name':
                            s += counts_all[eles[0]][e]
                            #print counts_all[eles[0]][e]
                            counts_all[eles[0]][e] = format(counts_all[eles[0]][e], '.8f')
                            #print counts_all[eles[0]][e]
                    counts_all[eles[0]]['all'] = s
                    #counts_all[eles[0]] = {'all':int(eles[10]), 'blood':float(blood)*cnt['blood'], 'bladder':float(bladder)*cnt['bladder'], 'brain':float(brain)*cnt['brain'], 'bone':float(bone)*cnt['bone'], 'breast':float(breast)*cnt['breast'], 'head':float(head)*cnt['head'], 'cervix':float(cervix)*cnt['cervix'], 'colorectal':float(colo)*cnt['colorectal'], 'esophagus':float(eso)*cnt['esophagus'], 'kidney': float(kid)*cnt['kidney'], 'liver':float(liv)*cnt['liver'], 'ovary':float(ov)*cnt['ovary'], 'lung':float(lung)*cnt['lung'], 'pancreas':float(panc)*cnt['pancreas'], 'prostate': float(pros)*cnt['prostate'], 'skin':float(skin)*cnt['skin'], 'stomach':float(stom)*cnt['stomach'], 'uterus': float(uter)*cnt['uterus'], "name": eles[0]}
                    
                    #counts_all[eles[0]] = {'blood':blood, 'name':eles[0]} 
                    #counts_all[eles[0]] = {'bladder':bladder, 'name': eles[0]} 
                    #counts_all[eles[0]] = {'brain':brain, 'name': eles[0]} 
                    #ounts_all[eles[0]] = {'bone':bone, 'name':eles[0]} 
                    # counts_all[eles[0]] = {'breast':breast, 'name':eles[0]}
                    #counts_all[eles[0]] = {'head':head, 'name':eles[0]}
                    #counts_all[eles[0]] = {'cervix':cervix, "name": eles[0]}
                    #counts_all[eles[0]] = {'colorectal':colo, "name": eles[0]}
                    #counts_all[eles[0]] = {'esophagus':eso, "name": eles[0]}
                    #counts_all[eles[0]] = {'kidney': kid, "name": eles[0]}

                    #counts_all[eles[0]] = {'liver':liv, "name": eles[0]}

                    # counts_all[eles[0]] = {'ovary':ov, "name": eles[0]}
                    # #counts_all[eles[0]] = {'ovary':int(ov), "name": eles[0]}
                    # #counts_all[eles[0]] = {'lung':lung, "name": eles[0]}
                    # #counts_all[eles[0]] = {'pancreas':panc, "name": eles[0]}
                    # #counts_all[eles[0]] = {'prostate': pros, "name": eles[0]}
                    # #counts_all[eles[0]] = {'skin':skin, "name": eles[0]}
                    # #counts_all[eles[0]] = {'stomach':stom, "name": eles[0]}
                    # #counts_all[eles[0]] = {'uterus': uter, "name": eles[0]}
                    
                    # mutations_raw_counts.append({"name":eles[0], 'all': int(eles[10]), 'blood':blood, 'bladder':bladder, 'brain':brain, 'bone':bone, 'breast':breast, 'head':head, 'cervix':cervix, 'colorectal':colo, 'esophagus':eso, 'kidney': kid, 'liver':liv, 'ovary':ov, 'lung':lung, 'pancreas':panc, 'prostate': pros, 'skin':skin, 'stomach':stom, 'uterus': uter})
            #mutations_normalized.append({"name":eles[0], 'all':int(eles[10])/gene_length, 'blood':blood/gene_length, 'bladder':bladder/gene_length, 'brain':brain/gene_length, 'bone':bone/gene_length, 'breast':breast/gene_length, 'head':head/gene_length, 'cervix':cervix/gene_length, 'colorectal':colo/gene_length, 'esophagus':eso/gene_length, 'kidney': kid/gene_length, 'liver':liv/gene_length, 'ovary':ov/gene_length, 'lung':lung/gene_length, 'pancreas':panc/gene_length, 'prostate': pros/gene_length, 'skin':skin/gene_length, 'stomach':stom/gene_length, 'uterus': uter/gene_length})
            # if eles[0] in pcg:
            #     data = ''
            #     if eles[0] in counts_all:
            #         data = counts_all[eles[0]]
            #     else:
            #         data = {'all':int(eles[10]), 'blood':blood, 'bladder':bladder, 'brain':brain, 'bone':bone, 'breast':breast, 'head':head, 'cervix':cervix, 'colorectal':colo, 'esophagus':eso, 'kidney': kid, 'liver':liv, 'ovary':ov, 'lung':lung, 'pancreas':panc, 'prostate': pros, 'skin':skin, 'stomach':stom, 'uterus': uter, "name": eles[0]}
                # data = {'all':int(eles[10]), 'blood':blood, 'bladder':bladder, 'brain':brain, 'bone':bone, 'breast':breast, 'head':head, 'cervix':cervix, 'colorectal':colo, 'esophagus':eso, 'kidney': kid, 'liver':liv, 'ovary':ov, 'lung':lung, 'pancreas':panc, 'prostate': pros, 'skin':skin, 'stomach':stom, 'uterus': uter}

                # gene_consensus[eles[0]] = {"referenceName": str(ref), "start":eles[7], "end":eles[8], "data": data}
            # # zero = eles[29]
            # # if int(zero) != 0:
            # #     print 'UHOH'
            # if bucket not in buckets:
            #     buckets[bucket] = 1
            # elif bucket in buckets:
            #     buckets[bucket] += 1
            # print str(eles[10]), str(bucket)
            # if eles[0] not in data and int(eles[10]) > 0:
            #     data[eles[0]] = {"variants": int(eles[9]), "calls": int(eles[10]), "bucket": bucket}
            
            # if int(eles[10]) > 5: 
            #     genes.append(eles[0])
            #     counts.append(eles[10])
    #sorted_raw = sorted(mutations_raw_counts, key=itemgetter('all'))
    #sorted_nom = sorted(mutations_normalized, key=itemgetter('all'))
    # sorted_all = sorted(mutations_all)
    # sorted_x = sorted(mutations_all.items(), key=operator.itemgetter(1))
    # sorted_y = sorted(mutations_raw_counts.items(), key=operator.itemgetter(1))
    sorted_counts = sorted(counts_all.items(), key=operator.itemgetter(1), reverse=True)
    # oneeight = sorted_x[len(sorted_x)-181:len(sorted_x)-1]
    #oneeight_y = sorted_y[len(sorted_y)-181:len(sorted_y)-1]
    # oneeight_c = sorted_counts[len(sorted_counts)-181:len(sorted_counts)-1]
    # print len(sorted_counts)
    oneeight_rev = sorted_counts[0:500]
    #oneeight_rev = sorted_counts[len(sorted_counts)-500:len(sorted_counts)]
    # print len(oneeight_rev)

    # print "var gene_census = {"
    # for x in sorted(gene_consensus):
    #     print '\t"'+str(x) + '" : { '
    #     for y in gene_consensus[x]:
    #         if y == 'referenceName':
    #             print '\t\t"' + str(y) + '" : ' + '"'+ str(gene_consensus[x][y]) + '",'
    #         else:
    #             print '\t\t"' + str(y) + '" : ' + str(gene_consensus[x][y]) + ","
    #     print "\t},"

    # print "}"

    # sorted_cens = sorted(gene_consensus)

    # updated gene census
    # print "var gene_census = {"
    # for x in sorted(gene_consensus):
    #     print '\t"'+str(x) + '" : { '
    #     for y in gene_consensus[x]:
    #         if y == 'referenceName':
    #             print '\t\t"' + str(y) + '" : ' + '"'+ str(gene_consensus[x][y]) + '"'
    #         else:
    #             print '\t\t"' + str(y) + '" : ' + str(gene_consensus[x][y]) + ","
    #     print "\t},"

    # print "}"

    print "var All_norm_gene_counts = ["
    # print oneeight_rev
    #for x in sorted_counts:
    for x in oneeight_rev:
        # print x[0] + "\t" + str(x[1])
        # print str(counts_all_reg[x[0]]) + ","
        print str(x[1]) + ","
    print "]"

    # buckets1 = []
    # for bucket in sorted(buckets):
    #     buckets1.append({"bucket": bucket, "count": buckets[bucket]})
    # #print data
    # print "var buckets = ", buckets1

    #print "var just_genes = " + str(genes)
    # print len(genes), len(counts)
    #print "var gene_counts = " + str(json.dumps(data))
    # print "var gene_counts = " + str(counts)

    #print json.dumps(data)