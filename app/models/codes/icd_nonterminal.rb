class IcdNonterminal
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  embedded_in :icd_chapter

  def self.find_by_nonterminal(nonterminals)
    arr = nonterminals.split(/-/)
    from = arr[0]
    to = arr[1]
    self.between(code: from..to)
  end
end