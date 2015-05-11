
#############################################################################################################################################
#############################################################################################################################################
#############################################################################################################################################
#############################################################################################################################################
#############################################################################################################################################
#############################################################################################################################################
#############################################################################################################################################

def write (file, output)
  File.write('db/'+file, output)
end

def convert_terminal(adrg, drg)
  {:code => drg.code,
   :short_code => drg.code,
   :text_de => drg.text_de,
   :text_fr => drg.text_fr,
   :text_it => drg.text_it,
   :partition => drg.partition,
   :cost_weight => drg.cost_weight,
   :avg_duration => drg.avg_duration,
   :first_day_discount => drg.first_day_discount,
   :discount_per_day => drg.discount_per_day,
   :first_day_surcharge => drg.first_day_surcharge,
   :surcharge_per_day => drg.surcharge_per_day,
   :transfer_flatrate => drg.transfer_flatrate,
   :exception_from_reuptake => drg.exception_from_reuptake,
   :adrg_code => adrg.code
  }
end


def export_drg_terminals
  write('drg_terminals.json',
        Drg.all.collect{ |drg| convert_terminal(drg.adrg, drg) }
            .select{|each| each }
            .flatten
            .sort {|a, b| a[:code] <=> b[:code] }
            .to_json)
end

def convert_nonterminal(mdc, adrg)
  {:code => adrg.code,
   :short_code => adrg.code,
   :text_de => adrg.text_de,
   :text_fr => adrg.text_fr,
   :text_it => adrg.text_it,
   :mdc_code => mdc.prefix
  }
end

def export_drg_nonterminals
  write('drg_nonterminals.json',
        Adrg.all.collect{ |adrg| convert_nonterminal(adrg.mdc, adrg) }
            .select{|each| each }
            .flatten
            .sort {|a, b| a[:code] <=> b[:code] }
            .to_json)
end

def convert_chapter(mdc)
  {:index => mdc.code,
   :code => mdc.prefix,
   :short_code => mdc.prefix,
   :text_de => mdc.text_de,
   :text_fr => mdc.text_fr,
   :text_it => mdc.text_it,
  }
end

def export_drg_chapters
  write('drg_chapters.json',
        Mdc.all.collect{ |mdc| convert_chapter(mdc) }
            .select{|each| each }
            .flatten
            .sort {|a, b| a[:code] <=> b[:code] }
            .to_json)
end

# export_drg_terminals
# export_drg_nonterminals
# export_drg_chapters