class AbstractParser

  def initialize(file)
    @filename = file
    @sheet = Roo::Excel.new(@filename)
    @sheet.default_sheet = @sheet.sheets[0]
  end

  protected

  def parseRows(numberOfRowsToParse, firstRow)
    parsedRows = Array.new

    firstRowToParse = firstRow + 1
    (firstRowToParse..firstRowToParse + numberOfRowsToParse - 1).each do |row|
      parsedRows.push(@sheet.row(row))
    end

    return parsedRows
  end

end