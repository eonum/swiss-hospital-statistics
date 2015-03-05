class AbstractParser

  def initialize(file)
    @filename = file
    #default value for the first row
    @firstRow = 0
    @sheet = Roo::Excel.new(@filename)
    @sheet.default_sheet = @sheet.sheets[0]
  end

  def parse(numberOfRowsToParse)

    parsedRows = parseRows(numberOfRowsToParse)
    parsedCodes = Array.new

    parsedRows.each do |row|
      # processRow is implemented by the subclass
      parsedCodes.push(processRow(row))
    end

    return parsedCodes
  end

  protected

  def parseRows(numberOfRowsToParse)
    parsedRows = Array.new
    (@firstRow..@firstRow + numberOfRowsToParse - 1).each do |row|
      parsedRows.push(@sheet.row(row))
    end

    return parsedRows
  end

end