import sys, os, requests

def get_ref(request):
	#server = "http://rest.ensembl.org"
	r = requests.get(request, headers={ "Content-Type" : "text/plain"})
	if not r.ok:
		r.raise_for_status()
		sys.exit()
	return r.text

if __name__ == "__main__":
    f = open('gene_list.txt')
    for line in f:
    	line = line.strip()
    	server = "http://www.cbioportal.org/getPfamSequence.json?geneSymbol="+line
    	got = get_ref(server)
    	if len(got) > 2:
    		print '"'+line+'" : '+got+","