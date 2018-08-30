/* Main

Main Object of the Variant DB Interface

*/
 
// initialize the mutation mapper 

// var _mut3dVis = null;
// _mut3dVis = new Mutation3dVis("default3dView", {appOptions: {j2sPath: "mutation-mapper/lib/jsmol/j2s"}});
// _mut3dVis.init();

// $(document).ready(function(){

    var main = function () {

        var that = this;

        Ladda.bind('input[type=submit]')

        $('#title').css('padding-bottom', '25px')
          .css('padding-top', '25px')

        $('#tablist').append($('<li role="presentation" class="active">')
          .append($('<a href="#home" aria-controls="home" role="tab" data-toggle="tab">')
            .text('Home')))

        $('#tablist').append($('<li role="presentation">')
          .append($('<a href="#main_explorer" aria-controls="main_explorer" role="tab" data-toggle="tab">')
            .text('Explore Cancers')))

	    $('#tablist').append($('<li role="presentation">')
	      .append($('<a href="#gene_explorer" aria-controls="gene_explorer" role="tab" data-toggle="tab">')
	        .text('Explore Genes')))

      $('#tab_content').append($('<div role="tabpanel" class="tab-pane active">')
        .attr('id', 'home'));

	    $('#tab_content').append($('<div role="tabpanel" class="tab-pane">')
	      .attr('id', 'main_explorer'));

        $('#tab_content').append($('<div role="tabpanel" class="tab-pane">')
          .attr('id', 'gene_explorer'));

        $('#gene_explorer').append($('<div class="row">')
             .attr('id', 'gene_query'));

        $('#home').append($('<div class="row">')
            .append($('<div class="col-sm-11 alert alert-info" role="alert">')
              .attr('id', 'home_story')
              .css({'margin-top': '15px', 'margin-bottom':'50px', 'margin-left':'15px'}))
            .append($('<div class="col-sm-1">'))
            );

        $('#home_story').append('<p><strong><font size="4">Variant Store</font></strong> is an implementation of <strong>TileDB</strong>, an array database '+
          'developed by Intel Labs at MIT, which is specifically designed for efficient querying across '+
          'the genomic region of a large amount of samples. Variant Store supports the Global Alliance for Genomics and Health (<strong>GA4GH</strong>) standards.</p>')


        var data_stats = [
              {'name': 'cervix', 'Portland': 194, 'Austin': 0},
              {'name': 'head', 'Portland': 403, 'Austin': 121},
              {'name': 'stomach', 'Portland': 289, 'Austin': 9},
              {'name': 'blood', 'Portland': 139, 'Austin': 220},
              {'name': 'bone', 'Portland': 98, 'Austin': 108},
              {'name': 'bladder', 'Portland': 130, 'Austin': 103},
              {'name': 'brain', 'Portland': 531, 'Austin': 310},
              {'name': 'lung', 'Portland': 178, 'Austin': 46},
              {'name': 'liver', 'Portland': 458, 'Austin': 533},
              {'name': 'colorectal', 'Portland': 216, 'Austin': 129},
              {'name': 'skin', 'Portland': 337, 'Austin': 0},
              {'name': 'uterus', 'Portland': 0, 'Austin': 246},
              {'name': 'esophagus', 'Portland': 100, 'Austin': 88},
              {'name': 'pancreas', 'Portland': 792, 'Austin': 392},
              {'name': 'prostate', 'Portland': 256, 'Austin': 186},
              {'name': 'ovary', 'Portland': 88, 'Austin': 228},
              {'name': 'kidney', 'Portland': 404, 'Austin': 264},
              {'name': 'breast', 'Portland': 220, 'Austin': 965}
            ]

        $('#home').append($('<div class="row">').css('margin-top', '50px')
          .append($('<div class="col-sm-8">').attr('id', 'home_stats'))
          .append($('<div class="col-sm-4">').attr('id', 'home_total_data').css('margin-top', '100px')));

        var pie_total_data = c3.generate({
          bindto: '#home_total_data',
          data: {
            columns: [['Portland: 4833 Samples', 4833], 
                     ['Austin: 3948 Samples', 3948]],
            type : 'pie',
            colors:{
              'Austin: 3948 Samples': '#C4D600', 'Portland: 4833 Samples':'#00AEEF'
            },
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
          },
          padding: {
            top: 10,
            right: 5,
            bottom: 10,
            left: 10,
          },
          size: {
            height: '200'
          }
        });

        var stats = c3.generate({
          bindto: '#home_stats',
          size:{
            height: '400'
          },
          data: {
            json: data_stats,
            type: 'bar',
            colors:{
              Austin: '#C4D600', Portland:'#00AEEF'
            },
            keys: {
              x: 'name', // it's possible to specify 'x' when category axis
              value: ['Portland', 'Austin']
            },
            groups: [['Portland', 'Austin']]
          },
          axis: {
            x: {
              type: 'category',
              tick: {
                rotate: 75,
                multiline: false
              }
            },
            y:{
              label: {
                text: '# Samples'
              },
              tick:{
                count: 6,
                values: [200, 400, 600, 800, 1000, 1200]
              }
            }
          }
        });

        $('#gene_explorer').append($('<div class="col-sm-4">')
        	.attr('id', 'input')
        	.css('padding-top', '15px'))
        	.append($('<div class="col-sm-8">')
        	.attr('id', 'output')
        	.css('padding-top', '15px')
        	.append($('<div role="tabpanel">')
        		.append($("<ul class='nav nav-tabs' id='output_tablist' role='tablist'>"))
        		.append($("<div class='tab-content' id='output_content'>"))));

       	$('#input').append($('<div>')
             .attr('id', 'variants_query'));

        this.var_expl_selector = $('#variants_query');


        this.select_view_form = $('<form>').attr('id', 'chart_opts')

        this.select_cancer = $('<select class="form-control">')
          .attr('id', 'primary_site')

        //this.select_cancer.append($('<option>All</option>').attr('value', 'All'))
        this.select_cancer.append($('<option>All - Normalized - Top</option>').attr('value', 'All_norm'))
        this.select_cancer.append($('<option>All - Normalized - Tail</option>').attr('value', 'All_norm_tail'))
        $.each(variantSetIds, function(key){
          if(key == 'head and neck'){
            that.select_cancer.append($('<option>'+'head and neck'+'</option>').attr('value', 'head'))
          }else{
            that.select_cancer.append($('<option>'+key+'</option>').attr('value', key))
          }
        }) 

        this.select_view_form.append($('<div class="form-group input-container">')
            .append(this.select_cancer)).change(function(){
              $('#home_plot').html("");
              $('#home_plot_title').html("");
              //$('#home_plot_title').append('<h4 id="plot_title"><center>Top Mutated Genes</center></h4>');
              var cancer = $('#primary_site').val()
              var chart = plotCounts('#home_plot', Number($('#gene_view_s').val()), Number($('#gene_view_e').val()), cancer)

              //var chart = plotCounts('#home_plot', 0, 100, cancer)
              return false;
            })
       
        $("#main_explorer")
          .append($('<div class="row">')
          .append($('<div class="col-sm-2">').attr('id', 'main_chart_opts'))
          .append($('<div class="col-sm-10">')))
          .append($('<div class="row">').attr('id', 'home_plot_title'))
          .append($("<div class='row'>").attr('id', 'home_plot'))
        $('#main_chart_opts').css('padding-top', '20px')

        $('#main_chart_opts').append(this.select_view_form)

        var cancer = $('#primary_site').val()

        //$('#home_plot_title').append('<h4 id="plot_title"><center>Top Mutated Genes</center></h4>');

        var chart = plotCounts('#home_plot', Number($('#gene_view_s').val()), Number($('#gene_view_e').val()), cancer)
        // var chart = plotCounts('#home_plot', 0, 100, cancer)

        this.gene_querier = new VariantByGeneWidget(this.var_expl_selector[0]);
        //this.variant_explorer = new VariantExplorerWidget(this.var_expl_selector[0])
        //console.log(this.variant_explorer);
        
    };
// })
$(document).ready(main);