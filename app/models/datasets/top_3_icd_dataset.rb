class Top3IcdDataset < CategorisedDataset
  pragmatize!

  @tag = :top_3_icd
  @type_description = 'Icd code means something and does something'

  _parser
  def self.top_3_parser
    Top3IcdParser.new('public/statistics/je-d-14.04.02.02.01.xls').stream(Top3IcdStream.new(self))
  end

end