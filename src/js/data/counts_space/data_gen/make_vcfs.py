import sys, os, argparse, requests

def get_ref(request):
    #server = "http://rest.ensembl.org"
    r = requests.get(request, headers={ "Content-Type" : "text/plain"})
    if not r.ok:
        r.raise_for_status()
        sys.exit()
    return r.text

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='File Input Parser')
    parser.add_argument('-f', '--files', dest = "files" nargs='+', default=None,
        help='List of files to process')

    args = parser.parse_args()

    f_list = var(args)['files']