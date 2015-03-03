require 'roo'
require 'spreadsheet'
require_relative 'abstract_parser'

class SuDICDParser < AbstractParser

  def parse
    @sheet = Roo::Spreadsheet.open(@filename)

    @sheet.sheet(0).row(23)

  end

end