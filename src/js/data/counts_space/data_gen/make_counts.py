import pandas as pd

# Columns to parse out.
columns = ['name', 'calls', 'blood', 'bladder', 'brain', 'bone', 'breast',
'head_and_neck', 'cervix', 'colorectal', 'esophagus', 'kidney', 'liver',
'ovary', 'lung', 'pancreas', 'prostate', 'skin', 'stomach', 'uterus']

protein_coding = pd.read_csv('pcg.txt',
    usecols=['symbol'],
    sep="\t")

# Read in our genes -- rename head_and neck.
all_genes = pd.read_csv('gene.stats', usecols=columns).\
    rename(columns={'head_and_neck': 'head', 'calls': 'all'})

# Use only genes that have an entry in the protein_coding
genes = all_genes[all_genes.name.isin(protein_coding.symbol)]

# Sort based on all/calls.
genes = genes[genes['all'] > 0].sort(['all'])

with open('all_genes.js', 'wb') as f:

    # Take the top/bottom 500 based on calls.
    df = pd.concat([genes.head(500), genes.tail(500)])

    body = "var All_gene_counts = {};".format(df.to_json(orient='records'))

    f.write(body)

grouped_genes = pd.melt(genes,
    id_vars=['name'],
    value_vars=genes.columns[2:].tolist(),
    var_name='cancer_type',
    value_name='mutation_count')

for cancer, group in grouped_genes.groupby('cancer_type'):
    with open("{}.js".format(cancer), 'wb') as f:
        df = group[["name", "mutation_count"]].\
            sort('mutation_count', ascending=False).\
            rename(columns={'mutation_count': cancer})

        # Take the top/bottom 500 based on mutation count.
        # df_ends = pd.concat([df.head(500), df.tail(500)])
        df_ends = pd.concat([df.head(500)])

        body = "var {}_gene_counts = {};".format(cancer, df_ends.to_json(orient='records'))

        f.write(body)