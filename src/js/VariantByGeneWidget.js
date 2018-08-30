/* VariantByGeneWidget

Explore variants based on gene level query

*/

var VariantByGeneWidget = function(selector){
  this.selector = $(selector)
  var that = this

  this.region_radio = $('<div><label class="radio-inline"><input type="radio" name="optradio" value="gene">Gene</label><label class="radio-inline"><input type="radio" name="optradio" value="chr">Chromosome</label></div>')

  this.selector.append(this.region_radio);

  this.form = $('<div class="well" id="gene_form">')

  this.select = $('<input class="form-control input-large" type="text">').attr('id', 'gene_form_callset_filter')
    .attr('name', 'callset_filter').attr('placeholder', 'CallSets to Filter By')
    .css({'margin-bottom':'15px', 'overflow': 'hidden'});



  this.select_2 = $('<select class="form-control" multiple>').attr('id', 'gene')
    .attr('name', 'gene').css('height', 200);


  $.each(variantSetIds, function(key, value){
    that.select.append($('<option>'+key+'</option>').attr('value', value))
  }) 

  $('input[name="optradio"]').change( function(){

    //clear
    that.select_2.html("");

    if($(this).val() == 'gene'){
        // gene census
      $.each(gene_census, function(key){
        if (key.substring(0,3) != 'chr'){
          that.select_2.append($('<option>'+key+'</option>').attr('value', key))
        }
      })
    }else{
      // chr census
      $.each(gene_census, function(key){
        if (key.substring(0,3) == 'chr'){
          that.select_2.append($('<option>'+key+'</option>').attr('value', key))
        }
      })
    }
  })

  this.filter_gene_button = $('<div class="btn-group" role="group">')
    .css('margin-left', '220px')
    .append($('<div class="btn btn-default dropdown-toggle">')
      .attr('type', 'button')
      .attr('data-toggle', 'dropdown')
      .attr('aria-haspopup', 'true')
      .attr('aria-expanded', 'false')
      .append('<a>Gene List Filter</a><span class="caret"></span>'))
    .append($('<ul class="dropdown-menu">')
      .append('<li><a href="#">Testing One</a></li>')
      .append('<li><a href="#">Testing Two</a></li>'));

  this.form.append($('<span class="help-block">').text("GA4GH /variants/search"))
       // .append($('<div class="form-group input-container">')
       //  .append(that.select))
       .append($('<div class="form-group input-container">')
        .append(that.select)
        .append(that.select_2))
       .append($('<button class="btn btn-primary ladda-button">')
            .attr('data-style', 'expand-right')
            .attr('data-spinner-color', '#74F9FF')
        .attr('type','submit')
            .attr('id', 'gene_submit')
            .append('<span class="ladda-label">Submit</span>'))
  
  this.selector.append(this.form)

  $('#gene_submit').click(function(e){
    // var callset_list = $('#gene_form_callset_filter').val().split(" ")
    e.preventDefault()
    $('#output_tablist').html("");
    $('#output_content').html("");
    var la = Ladda.create(this)
    la.start()

    variant_explorer(la);
    return false;

  })

}

var variant_explorer = function(l){

    var that = this;

    var genes = $('#gene').val();
    var callset_list = $('#gene_form_callset_filter').val().split(" ");
    if (callset_list[0] == ""){
      callset_list = null
    }

    var variantSet = $('#gene_form_primary_site').val();
    if (genes != null){

      var callback = function(responses, timer){
        timer.stop()

        //set tabs
        $('#output_tablist').append($('<li role="presentation" class="active">')
            .append($('<a href="#query_muts_results" aria-controls="query_muts_results" role="tab" data-toggle="tab">')
              .text('Mutation Frequency')))

        $('#output_tablist').append($('<li role="presentation">')
            .append($('<a href="#query_statistics_gene" aria-controls="query_statistics_gene" role="tab" data-toggle="tab">')
              .text('Mutation Spectra')))

        $('#output_tablist').append($('<li role="presentation">')
            .append($('<a href="#query_results" aria-controls="query_results" role="tab" data-toggle="tab">')
              .text('Total Counts')))

        $('#output_content').append($('<div role="tabpanel" class="tab-pane active">')
            .attr('id', 'query_muts_results'));

        $('#output_content').append($('<div role="tabpanel" class="tab-pane">')
             .attr('id', 'query_statistics_gene'));

        $('#output_content').append($('<div role="tabpanel" class="tab-pane">')
            .attr('id', 'query_results'));

        data = _.map(responses, function(value, key) {
            return {"name": key, "value": value.variants.length}
          })

        $('#query_muts_results').append($('<div role="tabpanel">')
          .css('padding-top', '10px')
          .append($("<ul class='nav nav-tabs' id='mut_plot_tablist'>"))
          .append($("<div class='tab-content' id='mut_plot_content'>")));

        $('#query_statistics_gene').append($('<div role="tabpanel">')
          .css('padding-top', '10px')
          .append($("<ul class='nav nav-tabs' id='query_stats_tablist'>"))
          .append($("<div class='tab-content' id='query_stats_content'>")));

        var first = true;

        _.each(responses, function(gene, geneName) {

          //lollipop plot

          var gene_div = 'lolli_'+geneName
          var gene_div2 = 'spectra_'+geneName

          if (first){

            $('#mut_plot_tablist').append($('<li role="presentation" class="active">')
            .append($('<a href="#'+gene_div+'" aria-controls="'+gene_div+'" role="tab" data-toggle="tab">')
              .text(geneName)));

            $('#mut_plot_content').append($('<div role="tabpanel" class="tab-pane active">')
              .attr('id', gene_div));

            $('#query_stats_tablist').append($('<li role="presentation" class="active">')
            .append($('<a href="#'+gene_div2+'" aria-controls="'+gene_div2+'" role="tab" data-toggle="tab">')
              .text(geneName)));

            $('#query_stats_content').append($('<div role="tabpanel" class="tab-pane active">')
              .attr('id', gene_div2));

          }else{

            $('#mut_plot_tablist').append($('<li role="presentation">')
              .append($('<a href="#'+gene_div+'" aria-controls="'+gene_div+'" role="tab" data-toggle="tab">')
                .text(geneName)));

            $('#mut_plot_content').append($('<div role="tabpanel" class="tab-pane">')
              .attr('id', gene_div));

            $('#query_stats_tablist').append($('<li role="presentation">')
              .append($('<a href="#'+gene_div2+'" aria-controls="'+gene_div2+'" role="tab" data-toggle="tab">')
                .text(geneName)))

            $('#query_stats_content').append($('<div role="tabpanel" class="tab-pane">')
              .attr('id', gene_div2));
          }

          var mut_cnts = _.map(gene.variants, function(variant){

            var all = variant['calls'].length
            var vs_tracker = {'Total': all}
            variant['calls'].forEach(function(call){
              if (vs_tracker[call['callSetName']] == undefined){
                vs_tracker[call['callSetName']] = 1;
              }else{
                vs_tracker[call['callSetName']] += 1
              }

            })

            variant['vs_tracker'] = vs_tracker;
            variant['calls'] = all;

            return variant
         });


        // by genes

          var lolli = lollipop_plot('#'+gene_div, geneName, mut_cnts)


          var mutation_frequency = {"A>C":0, "C>A":0, "A>T":0, "T>A":0, "A>G":0, "G>A":0, "T>C":0, "C>T":0, "T>G":0, "G>T":0, "G>C":0, "C>G":0}

          var variants = gene.variants.map(function(variant){
            var alt = variant['alternateBases'][0]
            if (alt.length == 1 && variant['referenceBases'].length == 1){
              var spectra = variant['referenceBases'] +">"+alt
              if (mutation_frequency[spectra] != 'undefined'){
                mutation_frequency[spectra] += 1
              }
            }
            variant['alternateBases'] = alt
            variant['calls'] = 1;
            return variant
          })

          var pie_data1 = [];

          $.each(mutation_frequency, function(key, value){
            pie_data1.push({"name": key, "value": value})
          })

          var pie_vis = d3plus.viz()
            .container("#"+gene_div2)
            .data(pie_data1)
            .type("pie")
            .id("name")
            .size("value")
            .height(300)
            .draw()

          first = false;

        });

        // biology statistiscs

        // all genes
        $('#query_results').append($("<div class='row'>").attr('id', 'mutation_counts'))

        if (data[0]['value'] != 0){

          var visualizationQuery = d3plus.viz()
            .container("#mutation_counts")
            .data(data)
            .type("bar")
            .id("name")
            .x("name")
            .y("value")
            .width(600)
            .height(400)
            .draw()
        }else{
          $('#mutation_counts').append('<div><p><center>No available variants.</center></p></div>');
        }

      }

      _(genes)

        /* Create our payload */
        .map(function(gene){
          return {
            name: gene,
            payload: {
              end: gene_census[gene].end, 
              pageSize: null,
              pageToken: null,
              start: gene_census[gene].start, 
              callSetIds: callset_list, 
              variantName: null, 
              referenceName: gene_census[gene].referenceName, 
              variantSetIds: ["here"]
            }
          }
        })

        /* For each selected gene, send queries to the server and aggregate
         * the results. */
        .map(function(gene){

          var deferred = $.Deferred()

          var results = {variants: []}

          var processResponse = function(data, textStatus, jqXHR){

            /* Need to do this since we get preflight responses passed
             * in here.
             */
            if(textStatus != "success") {
              return
            }

            if(data.variants && data.variants.length > 0){
              results.variants = results.variants.concat(data.variants);
            };

            if(data.nextPageToken){
              gene.payload.pageToken = data.nextPageToken;
              requestPayload.data = JSON.stringify(gene.payload);

              var response = $.ajax(requestPayload);
              processResponse(response);
            }else{
              deferred.resolve({name: gene.name, variants: results.variants});
            };
          };

          var checkError = function(data) {
        	  console.log(data);
          };

          var encrypted_tokens = window.localStorage.tokens;
          
          var requestPayload = {
            url: ga4gh_path + '/variants/search',
            beforeSend: function(xhr) {
            	xhr.setRequestHeader('Authorization', 'Bearer '+encrypted_tokens);
            },
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            cache: true,
            data: JSON.stringify(gene.payload),
            success: processResponse,
            error: function(data) {
            	checkError(data);
              deferred.resolve(null); 
            }
          };

          $.ajax(requestPayload);

          return deferred;
        })

        .thru(function(promises){
          var deferred = $.Deferred();

          $.when.apply($, promises).then(function(){
            deferred.resolve(arguments);
          })

          return deferred;
        })
        
        .value()

        /* Re-group gene variants */
        .then(function(genes){
          return _(genes)

            /* Make genes an array. */
            .toArray()

            /* Replace all null values with a single TP53 instance. */
            .thru(function(genes) {
              if (_.every(genes)){
                return genes;
              } else {
                return _(genes)

                  /* Remove null entries. */
                  .compact()

                  /* Add our TP53 instance. */
                  .concat({
                    name: "TP53",
                    variants: data_fallback["TP53"].variants 
                  })

                  .value()
              }
            })

            /* Transpose our genes collection to get a list of objects
             * containing names & variants.
             */
            .thru(function(genes) {
              return _.zipObject(
                  _.pluck(genes, 'name'),
                  _.map(_.pluck(genes, 'variants'), function(variants){
                    return {variants: variants}
                  }));
            })

            .value();
        })

        /* Do something magical with our genes. */
        .then(function(genes){
          callback(genes, l);
        });

    }else{
      l.stop()
      alert('Select a gene!')
    }
    return false;

}