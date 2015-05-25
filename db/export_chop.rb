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

def convert_terminal(nonterminals, terminal)
  {:code => terminal.code,
   :short_code => terminal.short_code,
   :text_de => terminal.text_de,
   :text_fr => terminal.text_fr,
   :text_it => terminal.text_it,

   :annotations => terminal.annotations||[],
   :descriptions_de => terminal.descriptions_de||[],
   :descriptions_fr => terminal.descriptions_fr||[],
   :descriptions_it => terminal.descriptions_it||[],
   :notes_de => terminal.notes_de||[],
   :notes_fr => terminal.notes_fr||[],
   :notes_it => terminal.notes_it||[],
   :search_text_de => terminal.search_text_de,
   :search_text_fr => terminal.search_text_fr,
   :search_text_it => terminal.search_text_it,
   :supplement_codes_de => terminal.supplement_codes_de||[],
   :supplement_codes_fr => terminal.supplement_codes_fr||[],
   :supplement_codes_it => terminal.supplement_codes_it||[],
   :nonterminals => nonterminals.collect{|each| each.code}
  }
end


def export_chop_terminals
  write('chop_terminals.json',
        ChopCode.all.collect{ |terminal| convert_terminal(terminal.parents, terminal) }
            .select{|each| each }
            .flatten
            .sort {|a, b| a[:code] <=> b[:code] }
            .to_json)
end

def convert_nonterminal(nonterminal)
  {:code => nonterminal.code,
   :short_code => nonterminal.short_code,
   :text_de => nonterminal.text_de,
   :text_fr => nonterminal.text_fr,
   :text_it => nonterminal.text_it,

   :notes_de => nonterminal.notes_de||[],
   :notes_fr => nonterminal.notes_fr||[],
   :notes_it => nonterminal.notes_it||[],
   :descriptions_de => nonterminal.descriptions_de||[],
   :descriptions_fr => nonterminal.descriptions_fr||[],
   :descriptions_it => nonterminal.descriptions_it||[],
   :supplement_codes_de => nonterminal.supplement_codes_de||[],
   :supplement_codes_fr => nonterminal.supplement_codes_fr||[],
   :supplement_codes_it => nonterminal.supplement_codes_it||[],
  }
end

def export_chop_nonterminals
  write('chop_nonterminals.json',
        ChopNonterminal.all.collect{ |nonterminal| convert_nonterminal(nonterminal) }
            .select{|each| each }
            .flatten
            .sort {|a, b| a[:code] <=> b[:code] }
            .to_json)
end

#export_chop_terminals
# export_chop_nonterminals